import React, { useState, useNavigate } from 'react'
import './Join.css';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom'
export default function Join() {
  const [user, setUser] = useState("");
  return (
    <div className="JoinPage">
        <div className="JoinContainer">
            <img src={logo} alt="" />
            <h1>C Chat</h1>
            <input placeholder='Enter Your Name' type="text" id="joinInput" value={user} onChange={(e) => {setUser(e.target.value)}}/>
            <Link to={user ? `/chat?user=${user}` : ""}><button className="joinBtn">Login</button></Link>
        </div>
    </div>
  )
}