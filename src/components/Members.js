import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Members() {
  const navigate = useNavigate();
  const uid = useParams();
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookinfo, setBookinfo] = useState([])
  const [reloader, setReloader] = useState(0);
  const [newInfo, setNewInfo] = useState([]);
  const [update, setUpdate] = useState([]);
  const [mid, setMid] = useState("")
  const [mname, setMname] = useState("")

  function handleDelete(memberid) {
    axios.post(`http://localhost:5000/deletemember/${memberid}`).then((res) => {
      setReloader(Math.random());
    });
  }

  useEffect(()=> {
    axios.get("http://localhost:5000/books").then((res) => {
      setBooks(res.data)
    });
    axios.get("http://localhost:5000/bookinfo").then((res) => {
      setBookinfo(res.data)
    });
  },[])

  function handleClick(mid, mname) {
    setNewInfo(bookinfo.filter(book=> {
      return book.memberid == mid
    }))
    setMid(mid);
    setMname(mname)
  }

  useEffect(()=> {
    var arr = [];
    newInfo.forEach(info=> {
      books.forEach(book=> {
        if(info.bookid == book.id)
          arr.push({...info, title: book.name, imageurl: book.imageurl})
      })
    })
    setUpdate(arr)
  }, [newInfo])

  useEffect(() => {
    axios.get("http://localhost:5000/member").then((res) => {
      setMembers(res.data);
    });
  }, [reloader]);
  return (
    <>
      <Navbar />
      <div className="members">
        <div className="members-container">
          <div className="member-top">
            <div>
              <h1>Members</h1>
              <p>To create a members view members detail</p>
            </div>
            <div>
              <input type="text" placeholder="Search member" />
              <button onClick={() => navigate(`/${uid.uid}/addmember`)}>
                <i className="fa-solid fa-user"></i>Add member
              </button>
            </div>
          </div>
          <div className="member-bottom">
            <table>
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Member Name</th>
                <th>Email</th>
                <th>Books rented</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
                {members.map((member, i) => {
                  return (
                    <tr onClick={()=>handleClick(member.mid, member.mname)} key={i}>
                      <td>{member.mid}</td>
                      <td>{member.mname}</td>
                      <td>{member.email}</td>
                      <td>{member.books_rented}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            if (
                              window.confirm(
                                `Are you sure to remove ${member.mname} ?`
                              ) == true
                            )
                              handleDelete(e.target.getAttribute("memberid"));
                          }}
                          memberid={member.mid}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="rent-preview">
              <h2>{mname}</h2>
              <p>Member ID : {mid}</p>
              <h4>Books rented</h4>
              <div className="rent-books">
                {update.map((info, i)=> {
                  return <div className="r-book" key={i}>
                      <img
                        src={info.imageurl}
                        alt=""
                      />
                      <h3>{info.title}</h3>
                      <p>Due date: {info.due_date}</p>
                      <p>Quantity: {info.quantity}</p>
                    </div>
                })}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Members;
