import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

function Billing() {
  const [bookState, setBookState] = useState("buy");
  const [books, setBooks] = useState([]);
  const [id, setID] = useState(0);
  const [mid, setMid] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("-");
  const [member, setMember] = useState({});
  const [address, setAddress] = useState("-");
  const [phone, setPhone] = useState("-");
  const compRef = useRef();
  const [subtotal, setSubtotal] = useState(0);
  const [refresher, setRefresher] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const cdate = new Date();
  const mDate = `${String(cdate.getDate()).padStart(2, '0')}-${String(cdate.getMonth() + 1).padStart(2, '0')}-${cdate.getFullYear()}`;

  const total = books.reduce(
    (tot, book) => (tot = tot + book.quantity * book.price),
    0
  );

  function fetchMember() {
    axios.get(`http://localhost:5000/member/${mid}`).then((res) => {
      setMember(res.data[0]);
    });
  }

  useEffect(() => {
    if (bookState == "buy") setDate("-");
  }, [bookState]);

  useEffect(() => {
    setSubtotal(total);
  }, [refresher]);

  useEffect(() => {
    setDiscount(0.1 * subtotal);
  }, [subtotal]);

  useEffect(() => {
    setGrandtotal(subtotal - discount);
  }, [discount]);

  function handleAdd() {
    axios
      .get(`http://localhost:5000/book/${id}`)
      .then((res) => {
        if (res.data.length === 1) {
          const bookData = res.data[0];
          const newBook = {
            id: bookData.id,
            title: bookData.name,
            price: bookData.price,
            type: bookState === "rent" ? "Rent" : "Buy",
            quantity: quantity,
            due_date: date,
            mid: mid,
          };
          setBooks((prevBooks) => [...prevBooks, newBook]);
          setRefresher(Math.random());
        } else {
          alert("Book not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }

  function handleConfirm() {
    if(mid == 0 || id == 0)
    {
      alert("MID and BOOK ID are required!!")
      return;
    }
    books.forEach((book) => {
      axios
        .post(`http://localhost:5000/updatequantity/${book.id}`, {
          quantity: book.quantity,
        })
        .then((res) => {
          if (res.data.notAvailable == true) {
            alert("Books not available");
            return;
          }
        });
        axios.post("http://localhost:5000/bookinfo", book).then((res) => {
          if (res.data.result == true) alert("Confirmed successfully..");
        });
    });
  }

  function handleDelete(bid) {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bid));
    setRefresher(Math.random());
  }

  const handlePrint = useReactToPrint({
    content: () => compRef.current,
  });

  return (
    <>
      <Navbar />
      <div className="billing">
        <h1>Invoice Details</h1>
        <div className="billing-container">
          <div className="billing-inputs">
            <div className="member-details">
              <h3>Member detils</h3>
              <input
                type="text"
                placeholder="Enter member ID"
                onChange={(e) => setMid(e.target.value)}
              />
              <button className="detail-btn" onClick={fetchMember}>
                Get details
              </button>
              <input type="text" placeholder="Name" value={member.mname} />
              <input type="email" placeholder="Email" value={member.email} />
              <input
                type="text"
                placeholder="Address(Optional)"
                className="address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone(Optional)"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="book-details">
              <h3>Book details</h3>
              <input
                type="text"
                placeholder="Enter book ID"
                onChange={(e) => setID(e.target.value)}
              />
              <select
                name=""
                id=""
                onChange={(e) => setBookState(e.target.value)}
              >
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
              <input type="text" value={quantity} />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="addBtn"
              >
                +
              </button>
              <button
                onClick={() => setQuantity(quantity - 1)}
                className="addBtn"
              >
                -
              </button>
              {bookState === "rent" ? (
                <input
                  type="date"
                  name=""
                  id=""
                  onChange={(e) => setDate(e.target.value)}
                />
              ) : null}
            </div>
            <button className="add-book-btn" onClick={handleAdd}>
              Add
            </button>
            <p style={{marginTop: "20px"}}><span style={{color: "red"}}>*</span>please note to add one book at a time</p>
            {books.length == 0 ? null : (
              <>
                <div className="book-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Book id</th>
                        <th>Book Name</th>
                        <th>Book Price</th>
                        <th>Book Quantity</th>
                        <th>Rent/Buy</th>
                        <th>Due Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book, i) => {
                        return (
                          <tr key={i}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.price}</td>
                            <td>{book.quantity}</td>
                            <td>{book.type}</td>
                            <td>{book.due_date}</td>
                            <td>
                              <button onClick={() => handleDelete(book.id)} className="rmvBtn">
                                <i class="fa-solid fa-trash" />
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
                <div className="billBtns">
                <button onClick={handleConfirm} className="confirmBtn">Confirm</button>
                <button onClick={handlePrint} className="printBtn">Print Invoice</button>
                </div>
          </div>
          <div className="bill-preview" ref={compRef}>
            <div className="bill-section-1">
              <div className="bill-section-1-1">
                <h1>INVOICE</h1>
                <p>Invoice no.</p>
                <p>#{Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}</p>
                <p>Invoice date</p>
                <p>{mDate}</p>
              </div>
              <div className="bill-section-1-1">
                <p>[Book store name]</p>
                <p>[Book store address]</p>
                <p>[Contact number]</p>
              </div>
            </div>
            <div className="bill-section-2">
              <h3>Invoice to</h3>
              <p>{member.mname}</p>
              <p>{address}</p>
              <p>{member.email}</p>
              <p>+91 {phone}</p>
            </div>
            <div className="bill-section-3">
              <table>
                <thead>
                  <tr>
                    <th>Product Description</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, i) => {
                    return (
                      <tr>
                        <td>{book.title}</td>
                        <td>{book.quantity}</td>
                        <td>{book.price}</td>
                        <td>{book.price * book.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={3}>Sub total</th>
                    <td>{subtotal}</td>
                  </tr>
                  <tr>
                    <th colSpan={3}>Discount 10%</th>
                    <td>{discount}</td>
                  </tr>
                  <tr style={{ backgroundColor: "#5dfcaf" }}>
                    <th colSpan={3}>Grand Total</th>
                    <td>{grandtotal}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="bill-section-4">
              <div className="bill-section-4-1">
                <h3>Payment method</h3>
                <p>We accept payments through Credit Cards</p>
              </div>
              <div className="bill-section-4-2">
                <p>Store Manager Sign</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Billing;
