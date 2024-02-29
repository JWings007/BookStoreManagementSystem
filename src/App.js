import react from "react";
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Members from "./components/Members";
import Addbooks from "./components/Addbooks";
import Checkout from "./components/Checkout";
import EditBook from "./components/EditBook";
import Billing from "./components/Billing";
import AddMembers from "./components/AddMembers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/:uid/dashboard/:path" element={<Dashboard/>}/>
        <Route path="/:uid/members/:path" element={<Members/>}/>
        <Route path="/:uid/addbooks/:path" element={<Addbooks/>}/>
        <Route path="/:uid/checkout/:path" element={<Checkout/>}/>
        <Route path="/:uid/billing/:path" element={<Billing/>}/>
        <Route path="/:uid/addmember" element={<AddMembers/>}/>
        <Route path="/:uid/:bookid/edit" element={<EditBook/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
