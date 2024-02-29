import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (name == "" || username == "" || password == "" || email == "")
      document.querySelector(".subBtn").disabled = true;
    else document.querySelector(".subBtn").disabled = false;
  }, [name, password, username, email]);

  useEffect(() => {
    if (password != conPass || conPass.length > 10) {
      document.querySelector(".alert").innerHTML = "Passwords are not matching";
      document.querySelector(".subBtn").disabled = true;
      if (conPass == "")
        document.querySelector(".alert").style.display = "none";
      else document.querySelector(".alert").style.display = "block";
    } else {
      document.querySelector(".subBtn").disabled = false;
      document.querySelector(".alert").innerHTML = "Passwords are not matching";
      document.querySelector(".alert").style.display = "none";
    }
  }, [conPass]);

  useEffect(() => {
    if (password.length < 6) {
      document.querySelector(".subBtn").disabled = true;
      document.querySelector(".alert").innerHTML =
        "Minimum length of password should be 6";
      if (password == "") {
        document.querySelector(".alert").style.display = "none";
      } else {
        document.querySelector(".alert").style.display = "block";
      }
    } else if (password.length > 10) {
      document.querySelector(".subBtn").disabled = true;
      document.querySelector(".alert").innerHTML =
        "Maximum length of password shouldn't exceed 10";
      document.querySelector(".alert").style.display = "block";
    } else {
      document.querySelector(".subBtn").disabled = false;
      document.querySelector(".alert").style.display = "none";
    }
  }, [password]);

  function handleSubmit() {
    axios
      .post("http://localhost:5000/signup", {
        name: name,
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.alreadyPresent) {
          alert("Account already exists try signing in");
          navigate("/signin");
        } else {
          alert("Account created. You can sign in using your credentials");
          navigate("/signin");
        }
      });
  }

  return (
    <div className="signin-container">
      <h1>Book Management <span className="orange">SignUp</span></h1>
      <div className="l-container">
        <p>Enter Name</p>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <p>Enter username</p>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Enter Email</p>
        <input
          type="email"
          placeholder="Enter username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Enter password</p>
        <input
          type="text"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Confirm password</p>
        <input
          type="text"
          placeholder="Confirm password"
          onChange={(e) => setConPass(e.target.value)}
        />
        <span className="alert"></span>
        <button onClick={handleSubmit} className="subBtn">
          Sign Up
        </button>
        <a href="/signin">Already have an account, Sigin In</a>
      </div>
    </div>
  );
}

export default Login;
