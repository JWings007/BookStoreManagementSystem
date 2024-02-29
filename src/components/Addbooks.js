import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios"

function Addbooks() {
  const [quantity, setQuantity] = useState(10);
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [isbn, setIsbn] = useState(0)
  const [publisher, setPublisher] = useState("")
  const [genre, setGenre] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState(0)
  const [imageUrl, setImageUrl] = useState(
    "https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg"
  );

  useEffect(() => {
    if (quantity < 10) setQuantity(10);
  }, [quantity]);

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:5000/addbook", {title: title, author:author, id:isbn, publisher:publisher, genre:genre, description:description, location:location, qunatity:quantity, price:price, imageurl:imageUrl})
    .then(res=> {
      console.log(res)
    })
  }

  return (
    <>
      <Navbar />
      <div className="addBooks">
        <h1>Add Books</h1>
        <div className="addBooks-top">
          <h3>Enter books details</h3>
          <div className="addBooks-inputs">
            <form>
              <div className="input-info">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter book name"
                  onChange={(e)=>setTitle(e.target.value)}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter author name"
                  onChange={(e)=>setAuthor(e.target.value)}
                />
                <input type="text" placeholder="ISBN" onChange={(e)=>setIsbn(e.target.value)}/>
                <input type="text" placeholder="Publisher" onChange={(e)=>setPublisher(e.target.value)}/>
                <select name="" id="" onChange={(e)=>setGenre(e.target.value)}>
                  <option value="action">Action</option>
                  <option value="fiction">Fiction</option>
                  <option value="biography">Biography</option>
                  <option value="adventure">Adventure</option>
                </select>
                <input type="text" placeholder="Quantity" value={quantity}/>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setQuantity(quantity + 10);
                  }}
                >
                  +
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setQuantity(quantity - 10);
                  }}
                >
                  -
                </button>
                <input type="text" name="" id="" placeholder="Location" onChange={(e)=>setLocation(e.target.value)}/>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Description"
                  onChange={(e)=>setDescription(e.target.value)}
                ></textarea>
                <input type="text" placeholder="Enter price" onChange={(e)=>setPrice(e.target.value)}/>
              </div>
              <div className="input-cover">
                <div className="preview">
                  <img src={imageUrl} alt="" />
                </div>
                <input
                  type="text"
                  placeholder="Enter cover picture URL"
                  onChange={(e) => {
                    if (e.target.value == "")
                      setImageUrl(
                        "https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg"
                      );
                    else setImageUrl(e.target.value);
                  }}
                />
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

export default Addbooks;
