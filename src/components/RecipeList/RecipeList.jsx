import React, {useContext} from "react";
import { AppContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import {Button} from  'react-bootstrap'

function RecipeList() {

  const { 
    recipe, handleAddRecipe
  }  = useContext(AppContext)




  return (
    <div className="flex">
    {
      recipe.map((recipe) => {
      
    return (
      <div key={recipe._id} className="space">
      <Link to={`/recipe/${recipe._id}`} >
      <img src={`${recipe.image}`}></img>
      <h1>{recipe.title}</h1>
      </Link>
      <Button className="btn"  variant="light" onClick={(event) => {handleAddRecipe(event, recipe._id) }}  >add to my recipes</Button>
	
        
      </div>
    )
  })
}
</div>
  )
}

export default RecipeList