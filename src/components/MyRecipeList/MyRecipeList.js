import React from 'react'
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/auth.context";
import {Button} from  'react-bootstrap'
import { Link } from "react-router-dom";
import "./MyRecipeList.css";

function MyRecipeList() {


    const { 

        myRecipe, setMyRecipe, handleDelete
      }  = useContext(AppContext)

console.log(myRecipe)
  return (
    <div className="flex">
    <div className='btnLeft'>
    <Button className='add' href='/myrecipes/add' > Add personal recipe</Button>
</div>
<div className='flex'>
    {
      myRecipe.map((recipe) => {
      
    return (
      
      <div key={recipe._id} className="space">
      <Link to={`/recipe/${recipe.RecipeId._id}`} >
      <img src={`${recipe.RecipeId.image}`}></img>
      <h1>{recipe.RecipeId.title}</h1>
      
      </Link>
      
      <Link to={`/myrecipes/${recipe._id}`}>
      <Button className='myRecipBtn' >Edit</Button></Link>
      <Button className='myRecipBtn' onClick={(event) => {handleDelete(event, recipe._id) }}  >delete</Button>

      </div>
    )
  })
}
</div>
</div>
  )
}

export default MyRecipeList