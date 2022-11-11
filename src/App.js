import { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";
import { Alert, Spinner } from "react-bootstrap";
import RecipeList from "./components/RecipeList/RecipeList";
import Title from "./components/Title/Title";
import { AppContext } from "./context/auth.context";
import { gapi } from 'gapi-script';

import axios from "axios";
import RandomRecipes from "./components/RandomRecipes/RandomRecipes";
import SignIn from "./components/SignIn.js/SignIn";
import SignUp from "./components/Signup/Signup";
import MyRecipeList from "./components/MyRecipeList/MyRecipeList"
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import AddRecipe from "./components/AddRecipe/AddRecipe";

import EditRecipe from "./components/EditRecipe/EditRecipe";
import RecipePictures from "./components/RecipePictures/RecipePictures";


export default function App() {

  
  const [error, setError] = useState(null)


  let navigate = useNavigate()


  const { 
          isLoading, setIsLoading, 
          user, setUser,
          fetchingData, setFetchingData,
          recipe, setRecipe,
          myRecipe, setMyRecipe
        }  = useContext(AppContext)


  
        // const clientId = '287129342879-e80960vamh3h50ueahml77sq3jog9n60.apps.googleusercontent.com';

  // useEffect(() => {
  //   const initClient = () => {
  //      gapi.client.init({
  //         clientId: clientId,
  //           scope: ''
  //          });
  //       };
  //    gapi.load('client:auth2', initClient);
  //       });




  

  useEffect(() => {
    console.log('User/todo Update Render')

    if (!fetchingData) {
      navigate('/')
    }
    
  }, [recipe])


  useEffect(() => {
 
  async function getData(){

    try {
      // let userListResponse = await axios.get(`http://localhost:5005/api/users`, {withCredentials: true})
      // setUsers(userListResponse.data)

   
      
      let recipeResponse = await axios.get('https://foodsnitch.herokuapp.com/api/recipe', {withCredentials: true})
      setRecipe(recipeResponse.data)

      let myRecipeResponse = await axios.get('http://localhost:5005/api/myrecipe', {withCredentials: true})
      console.log(myRecipeResponse.data)
      setMyRecipe(myRecipeResponse.data)

      let response = await axios.get('http://localhost:5005/api/user', {withCredentials: true})  

      setUser(response.data)

      setFetchingData(false)
    }
    catch(err){
      setFetchingData(false)
    }
  }

  getData()
}, [])


async function handleSignUp(event){
  console.log(event)
  event.preventDefault()
  
  let user = {
    username: event.target.username.value, 
    email: event.target.email.value, 
    password: event.target.password.value, 
  }
  try {
    await axios.post('http://localhost:5005/api/signup', user, {withCredentials: true})
    navigate('/signin')
  }
  catch(err){
    setError(err.response.data.errorMessage)
  }
}




async function handleSignIn(event){
  event.preventDefault()
  let user = {
    email: event.target.email.value, 
    password: event.target.password.value, 
  }
  try {
    let response = await axios.post('http://localhost:5005/api/signin', user,{withCredentials: true})
    setUser(response.data)
  }
  catch(err){
    setError(err.response.data.errorMessage)
  }
 
}



  

async function handleLogOut(){
  await axios.get('http://localhost:5005/api/logout', {withCredentials: true})
  setUser(null)
}

// const handleGoogleSuccess = (data) => {

// setFetchingData(true)

// const {givenName, familyName, email, imageUrl, googleId} = data.profileObj
// let newUser = {
//   firstName: givenName,
//   lastName: familyName,
//   email,
//   image: imageUrl,
//   googleId
// }

// axios.post(`http:///localhost:5005/api/google/info`, newUser , {withCredentials: true})
//   .then((response) => {
//     setUser(response.data.data)
//     setFetchingData(false)
//   })
// }

 

  // if (fetchingData){
  //   return <Spinner animation="border" variant="primary" />
  // }

  // function authenticate(user) {
  //   setUser(user);
  // }

  if (fetchingData) {
    return <Spinner animation="border" variant="primary" />
  }
  return (
    <div className="App">
      <Navbar handleLogout={handleLogOut} user={user} />
      

      <Routes>
     
        <Route path="/recipes" element={<RecipeList/>} />
                <Route path="/randomrecipes" element={<RandomRecipes/>} />
                <Route path="/recipes" element={<RecipeList/>} />
                <Route path="/auth/signup" element={<SignUp/>} />
                <Route path="/signin" element={<SignIn handleSignIn={handleSignIn} />} />
                <Route path="/signup" element={<SignUp handleSignUp={handleSignUp} />} />
                <Route path="/myrecipes" element={<MyRecipeList/>} />
                <Route path="/recipe/:id" element={<RecipeDetails/> }/>
                <Route path="/myrecipes/add" element={<AddRecipe/>} />
                <Route path="/myrecipes/:id" element={<EditRecipe/>} />
                <Route path="/" element={[

                <Title/>,
                <RecipePictures/>,
                <RandomRecipes/>
                ]
                } />
      </Routes>
    </div>
  );
}

