import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "react-apexcharts";

function Dashboard() {
  const uid = useParams();
  const [userName, setUserName] = useState("");
  const [memcount, setMemcount] = useState(0);
  const [members, setMembers] = useState([]);
  const [bbooks, setBbooks] = useState(0);
  const [totBooks, setTotBooks] = useState(0);
  const [users, setUsers] = useState(0)
  const [graphData, setGraphData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: "series-1",
        data: []
      }
    ]
  })
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`http://localhost:5000/users/${uid.uid}`).then((res) => {
      setUserName(res.data.user);
    });
    axios.get("http://localhost:5000/member").then((res) => {
      setMemcount(res.data.length);
      setMembers(res.data);
    });
    axios.get("http://localhost:5000/bookinfo").then((res) => {
      var data = res.data;
      var count = 0;
      data.forEach((d) => {
        count += d.quantity;
      });
      setBbooks(count);
    });
    axios.get("http://localhost:5000/books").then((res) => {
      var data = res.data;
      var count = 0;
      data.forEach((d) => {
        count += d.quantity;
      });
      setTotBooks(count);
    });

    axios.get("http://localhost:5000/allbookinfo").then(res=> {
      const data = res.data;
      console.log(data)
      const catg = [];
      const d = [];
      data.forEach(book=> {
        catg.push(book.bookid)
        d.push(book.total_quantity)
      })
      setGraphData(prevState => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: catg
          }
        },
        series: [{
          ...prevState.series[0],
          data: d
        }]
      }));
    })

    axios.get("http://localhost:5000/users").then(res=> {
      setUsers(res.data.length)
    })
  }, []);
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Dashboard</h1>
        <h2>
          <span className="green">Hello</span> {userName}!
        </h2>
        <p>Feb 16, 2024 | Thursday 11:00 AM</p>
        <div className="dashboardDiv1">
          <div>
            <h3>{memcount}</h3>
            <i className="fa-regular fa-user"></i>
            <span>Total visitors</span>
          </div>
          <div>
            <h3>{bbooks}</h3>
            <i className="fa-regular fa-file"></i>
            <span>Borrowed books</span>
          </div>
          <div>
            <h3>{totBooks}</h3>
            <i className="fa-regular fa-hourglass"></i>
            <span>Total books</span>
          </div>
          <div>
            <h3>{users}</h3>
            <i className="fa-regular fa-user"></i>
            <span>Admins</span>
          </div>
        </div>
        <div className="dashboardDiv2">
          <div className="usersList">
          <a onClick={()=> navigate(`/${uid.uid}/members/m`)}>View all...</a>
            <div>
              <span>Members List</span>
              <button onClick={()=>navigate(`/${uid.uid}/addmember`)}>Add New Member</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Member Name</th>
                  <th>Book Issued</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {members.splice(0, 7).map((member, i) => {
                  return (
                    <tr key={i}>
                      <td>{member.mid}</td>
                      <td>{member.mname}</td>
                      <td>{member.books_rented}</td>
                      <td>{member.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bookList">
            <div className="bargraph">
            <Chart
              options={graphData.options}
              series={graphData.series}
              type="bar"
              width="700"
            />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
