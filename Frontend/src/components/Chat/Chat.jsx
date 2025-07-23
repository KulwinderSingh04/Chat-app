import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import socketIO from 'socket.io-client';
import './Chat.css';
import Message from '../Message/Message.jsx';
import sendLogo from '../../images/send.png';
import closeIcon from '../../images/closeIcon.png';
import ReactScrolToBottom from 'react-scroll-to-bottom'

const ENDPOINT = "https://chat-app-production-814b.up.railway.app/";



function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Chat() {
    const query = useQuery();
    const user = query.get('user');
    // console.log(user);
    
    const socketRef = useRef(null);

    const [id, setId] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const send = () => {
      if(message === "") return;
      socketRef.current.emit("message", {message, id});
      setMessage("");
    }

    const handleLeave = () => {
      if (socketRef.current) {
        socketRef.current.emit("userLeft");
        socketRef.current.disconnect();
      }
      window.location.href = "/";
    };


    useEffect(() => {

      const socket = socketIO(ENDPOINT, { transports: ['websocket'] });
      socketRef.current = socket;
      socket.on("connect", () => {
        alert("connected");
        setId(socket.id);
      })

      socket.emit("joined", {user});
      socket.on("welcome", (data) => {
        setMessages((prev) => [...prev, data]);
        console.log(`${data.user} : ${data.message}`);
      });

      socket.on("user joined", (data) => {
        setMessages((prev) => [...prev, data]);
        console.log(`${data.user} : ${data.message}`);
      })



      socket.on("leave", (data) => {
        setMessages((prev) => [...prev, data]);
        console.log(data);
      })
      
      return () => {
        socket.emit("userLeft");
        socket.disconnect();
      }
    }, []);

    useEffect(() => {
      socketRef.current.on("sendMessage", (data) => {
        setMessages((prev) => [...prev, data]);
        console.log(data);
      })
    }, [])
  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h1>C CHAT</h1>
          <button onClick={handleLeave} className='closeBtn'><img src={closeIcon} alt="Close" /></button>

        </div>
        <ReactScrolToBottom className="chatBox">
          {messages.map((item) => <Message user={item.id === id ? "" : item.user} message={ item.message} classs={item.id === id ? "right" : "left"}/>)}
        </ReactScrolToBottom>
        <div className="inputBox">
          <input type="text" id='chatInput' value={message} onKeyPress={(e) => { e.key === 'Enter' ? send() : null}} onChange={(e) => {setMessage(e.target.value)}}/> 
          <button className='sendBtn' onClick={send} ><img src={sendLogo} alt="Send" /></button>
        </div>
      </div>
    </div>
  )
}
