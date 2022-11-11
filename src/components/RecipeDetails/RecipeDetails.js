import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from "../../context/auth.context";
import { Button, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./RecipeDetails.css";


function RecipeDetails() {
    let {id} = useParams()
    let navigate = useNavigate()
    const [detail, setDetail] = useState(null)

    const { 
         handleDelete, user
      }  = useContext(AppContext)


      useEffect(() => {
        console.log('Detail Did Mount Effect')
        axios.get(`https://foodsnitch.herokuapp.com/api/recipe/${id}`, {withCredentials: true})
          .then((response) => {
            console.log()
            setDetail(response.data)
          })
          .catch((err) => {
            console.log('Error while getting todos', err)
          })
      }, [])

      if(!user){
        return navigate('/signin')
      }
    
    
      if(!detail){
        return  <Spinner animation="border" variant="primary" />
      }


      console.log(detail)
  return (
    <div className='main'>
       <h1>{detail.title}</h1> 
       
       <img src={`${detail.image}`}></img>

       <h2>Ingredients Needed:</h2>

       {detail.ingredients.map((recipe) => {
        
        return <li>{recipe.name}</li>
       })
       }
       <p><b>Prep Time:</b> {detail.readyInMinutes} minutes </p>
       <b></b>
       
       <div dangerouslySetInnerHTML={{__html: detail.summary}} />


       <a href={detail.sourceUrl}><p>Complete Guide</p></a>
    </div>
  )
}

export default RecipeDetails