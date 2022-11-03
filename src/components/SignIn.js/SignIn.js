import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import {AppContext} from '../../context/auth.context'

function SignIn({handleSignIn}) {

  const {school} = useContext(AppContext)	

  return (
    <form onSubmit={handleSignIn}>
		<h1>Welcome to {school}</h1>
		<input  name="email"  type="email"  placeholder="Enter Email"/>
		<input  name="password"  type="password"  placeholder="Enter Password"/>
		<Button  type="submit"  >Submit</Button>
	</form>
  )
}

export default SignIn