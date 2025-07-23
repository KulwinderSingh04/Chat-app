import { useState } from 'react'
import './App.css'
import socketIO from 'socket.io-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const ENDPOINT = "http//localhost:8080";
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
// const socket = socketIO(ENDPOINT, {transports : ["websocket"]});
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Join/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
