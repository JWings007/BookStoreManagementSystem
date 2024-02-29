import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function AddMembers() {
    const [mname, setMname] = useState("")
    const [memail, setMemail] = useState("")
    const [rentBooks, setRentBooks] = useState(0)

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/member", {mname: mname, memail:memail, rent_books:rentBooks}).then(res=> {
            console.log(res);
        })
    }
  return (
    <>
    <Navbar/>
      <div className="addMembers">
      <h1>Add Member</h1>
        <div className="addBooks-top">
          <h3>Enter Member details</h3>
          <div className="addBooks-inputs">
            <form>
              <div className="input-info">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter member name"
                  onChange={(e)=>setMname(e.target.value)}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter email"
                  onChange={(e)=>setMemail(e.target.value)}
                />
                <input type="text" placeholder="Enter number of books rented"  onChange={(e)=>setRentBooks(e.target.value)}/>
              </div>
              <div className="addBooks-btns">
                <button onClick={handleSubmit}>Add</button>
                <input type="reset" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMembers;
