import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios"
import { useParams } from "react-router-dom";

function EditBook() {
    const [quantity, setQuantity] = useState(10);
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [id, setID] = useState(0)
    const [publisher, setPublisher] = useState("")
    const [genre, setGenre] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState(
      "https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg"
    );
    const bid = useParams();

    useEffect(()=> {
        axios.get(`http://localhost:5000/book/${bid.bookid}`)
        .then(res=> {
            setTitle(res.data[0].name)
            setAuthor(res.data[0].author)
            setQuantity(res.data[0].quantity)
            setID(res.data[0].id)
            setPublisher(res.data[0].publisher)
            setGenre(res.data[0].genre)
            setDescription(res.data[0].description)
            setLocation(res.data[0].location)
            setPrice(res.data[0].price)
            setImageUrl(res.data[0].imageurl)
        })
    }, [])
  
    function handleSubmit(e) {
      e.preventDefault();
      axios.post("http://localhost:5000/editbook", {title: title, author:author, id:id, publisher:publisher, genre:genre, description:description, location:location, qunatity:quantity, price:price, imageurl:imageUrl})
      .then(res=> {
        if(res.data.result == 1) {
          alert("Book updated successfully!");
        }
        else
          alert("There was an error in editing please try again")
      })
    }

    const handleChange = (event) => {
      const value = parseInt(event.target.value);
      if (!isNaN(value)) {
        setQuantity(value);
      }
    };
  
    const increment = (e) => {
      e.preventDefault();
      setQuantity(quantity + 10);
    };
  
    const decrement = (e) => {
      e.preventDefault();
      if (quantity > 10) {
        setQuantity(quantity - 10);
      }
    };

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
                  value={title}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter author name"
                  onChange={(e)=>setAuthor(e.target.value)}
                  value={author}
                />
                <input type="text" placeholder="ISBN" onChange={(e)=>setID(e.target.value)} value={id} disabled/>
                <input type="text" placeholder="Publisher" onChange={(e)=>setPublisher(e.target.value)} value={publisher}/>
                <select name="" id="" onChange={(e)=>setGenre(e.target.value)} value={genre}>
                  <option value="action">Action</option>
                  <option value="fiction">Fiction</option>
                  <option value="biography">Biography</option>
                  <option value="adventure">Adventure</option>
                </select>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Description"
                  onChange={(e)=>setDescription(e.target.value)}
                  value={description}
                ></textarea>
                <input type="text" placeholder="Quantity" value={quantity} onChange={handleChange}/>
                <button
                  onClick={(e)=>increment(e)}
                >
                  +
                </button>
                <button
                  onClick={(e)=>decrement(e)}
                >
                  -
                </button>
                <input type="text" name="" id="" placeholder="Location" onChange={(e)=>setLocation(e.target.value)} value={location}/>
                <input type="text" placeholder="Enter price" onChange={(e)=>setPrice(e.target.value)} value={price}/>
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
                  value={imageUrl}
                />
              </div>
              <div className="addBooks-btns">
                <button onClick={handleSubmit}>Save</button>
                <p><span style={{color:"red"}}>*</span>You are not able to change the book id</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditBook