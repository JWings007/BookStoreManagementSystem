import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";

function Navbar() {
  const uid = useParams();
  const [userName, setUserName] = useState("");
  useEffect(()=> {
    axios.get(`http://localhost:5000/users/${uid.uid}`)
    .then(res => {
      setUserName(res.data.user)
    })
  },[])
  const navigate = useNavigate()
  return (
    <div className="navbar">
      <div className="nav-div1">
        <i className="fa-solid fa-layer-group"></i>
        <h3>In.ventory</h3>
      </div>
      <div className="nav-div2">
        <button className="nav-links" onClick={()=>navigate(`/${uid.uid}/dashboard/d`)} style={{backgroundColor: uid.path === "d"?"#a1ffd2":null, }}><i className="fa-solid fa-clock" style={{color: uid.path === "d"?"#00df72":null}}></i>  Dashboard</button>
        <button className="nav-links" onClick={()=>navigate(`/${uid.uid}/members/m`)} style={{backgroundColor: uid.path === "m"?"#a1ffd2":null}}><i className="fa-solid fa-user" style={{color: uid.path === "m"?"#00df72":null}}></i>  Members</button>
        <button className="nav-links" onClick={()=>navigate(`/${uid.uid}/addbooks/a`)} style={{backgroundColor: uid.path === "a"?"#a1ffd2":null}}><i className="fa-solid fa-book" style={{color: uid.path === "a"?"#00df72":null}}></i>  Add Books</button>
        <button className="nav-links" onClick={()=>navigate(`/${uid.uid}/checkout/c`)} style={{backgroundColor: uid.path === "c"?"#a1ffd2":null}}><i className="fa-solid fa-list" style={{color: uid.path === "c"?"#00df72":null}}></i>  Checkout Books</button>
        <button className="nav-links" onClick={()=>navigate(`/${uid.uid}/billing/b`)} style={{backgroundColor: uid.path === "b"?"#a1ffd2":null}}><i className="fa-solid fa-receipt" style={{color: uid.path === "b"?"#00df72":null}}></i>  Billing</button>
      </div>
      <div className="nav-div3">
        <div className="user-backdrop">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
            alt=""
          />
          <span>{userName}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
