import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'
import './Chat.css'

const Chat = () => {
  const decodedToken = useSelector((state) => state.userStatus.decodedToken)
  const currentUser = useSelector((state) => state.userStatus.currentUser)
  const chatter = useSelector((state) => state.chatReducer.chatter)
  const socket = useSelector((state) => state.chatReducer.socket)
  const message = useSelector((state) => state.chatReducer.message)

  const [text, setText] = useState('')
  useEffect(() => {
    console.log(currentUser)
    console.log(chatter)

    /*
    socket.on("user-connected", (data) => {
      console.log("from user-connected");
      console.log(
        `user with id: ${data.userId}, and socketId: ${data.socketId} connected`
      );
    });
    */

    //return () => socket.disconnect();
  }, [])
  // here chatter is to whom message sent, sender: who sends message
  const onFormSubmit = (e) => {
    console.log(currentUser)
    console.log(chatter)
    const messageToSend = { text, chatter, sender: JSON.parse(currentUser) }
    e.preventDefault()
    console.log(message)
    socket.emit('new-contact', messageToSend)
  }
  return (
    <div className="">
      {chatter ? (
        <div className="chat-container">
          <form onSubmit={onFormSubmit} className="form">
            <h3 className="chat-header">
              <span className="name">{JSON.parse(currentUser).name}, </span>you
              are chatting with <span className="name">{chatter.userName}</span>
            </h3>
            <div className="chat-form">
              <textarea
                className="chat-textarea"
                type="text"
                onChange={(e) => setText(e.target.value)}
              />
              <button className="chat-btn" type="submit">
                Send
              </button>
            </div>
          </form>
          <div className="chat-messages-container">
            {chatter.userName === message?.from && (
              <div className="message">
                <p className="from">{message?.from}</p>
                <p className="text">{message?.text}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="no-messages-container">
          <div className="no-messages">
            You have no active chats at the moment!
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat
