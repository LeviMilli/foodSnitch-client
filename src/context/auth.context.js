import { createContext, useState, useEffect } from "react";
import axios from "axios";

let AppContext = createContext()

function AppContextWrapper(props){

    
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchingData, setFetchingData] = useState(true)
    const [recipe, setRecipe] = useState([])
    const [myRecipe, setMyRecipe] = useState([])
    
    async function handleLogOut(){
      await axios.get('http://localhost:5005/api/logout', {withCredentials: true})
      setUser(null)
    }
    

    async function handleEdit(id, detail){
      let response = await axios.patch(`http://localhost:5005/api/recipe/${id}`, detail, {withCredentials: true})
  
      let updatedRecipe = myRecipe.map((recipe) => {
        if (recipe._id == id) {
          recipe.name = response.data.name;
          recipe.description = response.data.description
        }
        return recipe
      })
      console.log(updatedRecipe)
      setMyRecipe(updatedRecipe)
  
    }

    async function handleAddRecipe(event, id){
        console.log(event)
        event.preventDefault()
    
     
        let response  = await axios.post(`http://localhost:5005/api/create`, {
            UserId: user._id,
            RecipeId: id
        //   description: description.value,
        })
        console.log(response.data)
    // we also need to add to our todos on the client side
    setMyRecipe([response.data, ...myRecipe])


   
  } async function handleDelete(event, id){
    await axios.delete(`http://localhost:5005/api/myrecipe/${id}`, {withCredentials: true})

    let newMyRecipe = myRecipe.filter(recipe => {
      return  recipe._id !== id
    })
    setMyRecipe(newMyRecipe)
  }



    return (
        <AppContext.Provider value={{
         user, setUser,
         isLoading, setIsLoading, 
         fetchingData, setFetchingData,
         recipe, setRecipe,
         handleAddRecipe,
         handleDelete, setMyRecipe, myRecipe, handleLogOut,
         handleEdit
         }}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextWrapper}