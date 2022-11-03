import React, {useContext} from "react";
import { AppContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import "./RandomRecipe.css";
import {Button} from  'react-bootstrap'


function RandomRecipes(props) {
  const { 
    recipe,
    handleAddRecipe
  }  = useContext(AppContext)

  const shuffled = recipe.sort(() => 0.5 - Math.random());

  const onlyTen = shuffled.slice(0, 10);



console.log(onlyTen)
  return (

    
  <div className="flex">
          {
            onlyTen.map((recipe) => {
            
          return (

            <div key={recipe._id} className="space">
            <a href={`/recipe/${recipe._id}`} >
            <img src={`${recipe.image}`}></img>
            <h1>{recipe.title}</h1>
            </a>
            
            
			<Button className="btn"  variant="light" onClick={(event) => {handleAddRecipe(event, recipe._id) }}  >add to my recipes</Button>
	
            </div>
          )
        })
      }
    </div>
  )
}

export default RandomRecipes




