import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
    <div className='homeContainer'>
    <div className="logo">
    <i class="fa-solid fa-book"></i>
      <h1>Book Inventory Management</h1>
    </div>
      <h4>Sign In or Create an account to continue</h4>
      <button className='homeBtn' onClick={()=>navigate("/signin")}>Sign In</button>
      <button className='homeBtn' onClick={()=>navigate("/signup")}>Create account</button>
    </div>
  )
}

export default Home;