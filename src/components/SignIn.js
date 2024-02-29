import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  function handleSubmit() {
    axios.post("http://localhost:5000/signin", {username: username, password: password})
    .then(res => {
      console.log(res.data)
      if(res.data.redirect){
        navigate(`/${res.data.username}/dashboard/d`)
      }
      else {
        alert("Incorrect username or password try again")
      }
      
    })
  }

  return (
    <div className="signin-container">
    <h1>Book Management <span className='orange'>SignIn</span></h1>
      <div className="l-container">
      <p>Enter username</p>
        <input type="text" placeholder='Enter username' onChange={(e)=> setUsername(e.target.value)}/>
        <p>Enter password</p>
        <input type="text" placeholder='Enter password' onChange={(e)=> setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>Sign in</button>
        <a href="/signup">Don't have an account?</a>
      </div>
        
    </div>
  )
}

export default Login