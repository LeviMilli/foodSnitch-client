import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from "../../context/auth.context";
import { Button, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'

function AddRecipe() {


    const { 
        myRecipe, setMyRecipe, user, handleAdd
     }  = useContext(AppContext)

    
    // const [formValues, setFormValues] = useState([{ ingredients: ""}])


    // let handleChange = (i, e) => {
    //     let newFormValues = [...formValues];
    //     newFormValues[i][e.target.name] = e.target.value;
    //     setFormValues(newFormValues);
    //  }
        
    // let addFormFields = () => {
    //     setFormValues([...formValues, { name: "", email: "" }])
    //  }
    
    // let removeFormFields = (i) => {
    //     let newFormValues = [...formValues];
    //     newFormValues.splice(i, 1);
    //     setFormValues(newFormValues)
    // }

   

     async function handleAddRecipe(event){
        console.log(event.target.title.value)
        event.preventDefault()
        const {title, readyInMinutes, image} = event.target
        console.log(image)
    
        const formData = new FormData();
        formData.append('image', image.files[0]);
    
        let imageResponse = await axios.post('http://localhost:5005/api/upload', formData)
     
        let response  = await axios.post('http://localhost:5005/api/create/recipe', {
        title: title.value,
          readyInMinutes: readyInMinutes.value,
          image: imageResponse.data.imageUrl, 
        
        })

        let myresponse  = await axios.post('http://localhost:5005/api/create', {
            UserId: user._id,
            RecipeId: response.data._id
            })
            

    
        // we also need to add to our todos on the client side
        setMyRecipe([myresponse.data, ...myRecipe])
        
      }

  return (
    
    <form onSubmit={handleAddRecipe} enctype="multipart/form-data">
        <p>Enter Personal Recipe Details</p>
        
        <label>Enter Title</label>
        <input  name="title"  type="text"  placeholder="Enter title"/>
        <label>Image URL</label>
        
        <input type="file" name="image" accept="image/png, image/jpg" />
        <input  name="readyInMinutes"  type="number"  placeholder="Mintues to complete"/>
        {/* <input  name="dishTypes"  type="array"  placeholder="Dishtype"/> */}
        {/* {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <label>Ingredient #{index + 1}</label>
              <input type="text" name={`ingredients${index}`} value={element.ingredients || ""} onChange={e => handleChange(index, e)} />

              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <button className="button add" type="button" onClick={() => addFormFields()}>Add another ingredient</button> */}

    <Button  type="submit" >Submit</Button>
</form>
  )
}

export default AddRecipe