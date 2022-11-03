import axios from 'axios'
import React from 'react'
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/auth.context";

import { Spinner, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
// import "./EditRecipe.css";

function EditRecipe() {
    const { 

        user, 
      }  = useContext(AppContext)
    
    

  let {id} = useParams()
  
  const [detail, setDetail] = useState(null)
  

  useEffect(() => {
 

  async function getData(){

    try {
      // let userListResponse = await axios.get(`http://localhost:5005/api/users`, {withCredentials: true})
      // setUsers(userListResponse.data)

   
  
      let recipeResponse = await axios.get(`http://localhost:5005/api/myrecipe/edit/${id}`, {withCredentials: true})
      setDetail(recipeResponse.data)
      

      
   

    
    }
    catch(err){
     
    }
  }

  getData()
}, [])

console.log(detail)
//   useEffect(() => {
//     axios.get(`http://localhost:5005/api/myrecipe/${id}`, {withCredentials: true})
//       .then((response) => {
//         console.log(response.data)
//         setDetail(response.data)
//       })
//       .catch((err) => {
//         console.log('Error while getting todos', err)
//       })
//   }, [])
//   console.log(detail)

  function handleChange(event){
    setDetail({...detail, [event.target.name]: event.target.value})
  }

  function onEdit(event){
    event.preventDefault()
    handleEdit(id, detail)
  }

  if(!detail){
    return  <Spinner animation="border" variant="primary" />
  }


  async function handleEdit(id, detail){
    let response = await axios.patch(`http://localhost:5005/api/myrecipe/${detail.RecipeId}`, detail, {withCredentials: true})

    let updatedRecipe = detail.RecipeId.map((myrecipe) => {
      if (myrecipe._id === id) {
        myrecipe.name = response.data.name;
        myrecipe.description = response.data.description
      }
      return myrecipe
    })
    console.log(updatedRecipe)
    setDetail(updatedRecipe)

  }

  return (
    
    <form onSubmit={onEdit}>
        <label>Enter Title</label>
        <input  name="title"  type="text"  defaultValue={detail.RecipeId.title} onChange={handleChange}/>
        
        <label>Image URL</label>
        <input type="file" name="image" accept="image/png, image/jpg" defaultValue={detail.RecipeId.image}  onChange={handleChange}/>
        
        <label>Change ready in minutes</label>
        <input  name="readyInMinutes"  type="number"  defaultValue={detail.RecipeId.readyInMinutes} onChange={handleChange}/>
     <Button  type="submit"  >Submit</Button>
  </form>
  )
}

export default EditRecipe

