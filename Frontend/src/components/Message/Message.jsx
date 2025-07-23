import React from 'react'
import './Message.css';
export default function Message({user, message, classs}) {
  if(user) {
    return (
      <div className={`messageBox ${classs}`}>
        {`${user} : ${message}`}
        </div>
    )
  }
  return (
    <div className={`messageBox ${classs} `}>
      {`You : ${message}`}
      </div>
  )
  
}
