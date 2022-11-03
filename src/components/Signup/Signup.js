import React from 'react'
import { Button } from 'react-bootstrap'

function SignUp({handleSignUp}) {
  return (
    <form onSubmit={handleSignUp}>
        <p>Please Signup</p>
        <input  name="username"  type="text"  placeholder="Enter Username"/>
        <input  name="email"  type="email"  placeholder="Enter Email"/>
        <input  name="password"  type="password"  placeholder="Enter Password"/>
        <Button  type="submit" >Submit</Button>
    </form>
  )
}

export default SignUp