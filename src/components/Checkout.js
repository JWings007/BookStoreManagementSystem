import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Checkout() {
  const [books, setBooks] = useState([]);
  const [reloader, setReloader] = useState(0)
  const navigate = useNavigate();
  const uid = useParams();
  useEffect(() => {
    axios.get("http://localhost:5000/books").then((res) => {
      setBooks(res.data)
    });
  },[reloader]);

  function handleDelete(bid) {
    axios.get(`http://localhost:5000/deletebook/${bid}`).then(res=> {
      setReloader(Math.random())
    })
    }

  return (
    <>
      <Navbar />
      <div className="checkOut">
        <div className="checkout-book-list">
          <table>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Book Author</th>
                <th>Book Publisher</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, i) => {
                return (
                  <tr key={i}>
                    <td>{book.id}</td>
                    <td className="td">
                      <img
                        src={book.imageurl}
                        alt=""
                      />
                      <span>{book.name}</span>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.price}</td>
                    <td>{book.quantity}</td>
                    <td>{book.location}</td>
                    <td>
                      <span className="status">Available</span>
                    </td>
                    <td><button onClick={()=> {
                      navigate(`/${uid.uid}/${book.id}/edit`)
                    }}><i class="fa-solid fa-pen"></i>Edit</button><button bookid = {book.id} onClick={(e)=> {
                      if(window.confirm(`Are you sure to delete the book ${book.name}`) == true)
                        handleDelete(e.target.getAttribute("bookid"));

                    }}><i class="fa-solid fa-trash"></i>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Checkout;
