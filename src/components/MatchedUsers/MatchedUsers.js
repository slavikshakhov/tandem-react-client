import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import io from "socket.io-client";
import "./MatchedUsers.css";
//import Slider from "react-slick";
import MatchedUser from "../MatchedUser/MatchedUser";

const MatchedUsers = () => {
  /*
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 6,
  };
  */
  const users = useSelector((state) => state.userStatus.filteredUsers);
  const decodedToken = useSelector((state) => state.userStatus.decodedToken);
  const currentUser = useSelector((state) => state.userStatus.currentUser);
  const contact = useSelector((state) => state.chatReducer.contactName);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const connectedMembers = useSelector(
    (state) => state.chatReducer.connectedMembers
  );
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [notifyAboutMessage, setNotifyAboutMessage] = useState(false);
  let dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    console.log(currentUser);
    const socket = io("http://localhost:4000").on("connect", () => {
      console.log("connected to server");
    });
    if (connectedMembers) {
      setConnectedUsers(connectedMembers);
      console.log(connectedMembers);
    }
    if (!connectedMembers) {
      socket.emit("connect-user", { userName: JSON.parse(currentUser).name });
    }

    socket.on("all-users", (members) => {
      setConnectedUsers(members);
      dispatch({ type: "SET_CONNECTED_USERS", payload: members });
      setConnectedUsers(members);

      console.log(members);
    });
    console.log(connectedUsers);
    // sender here is who originally sent, currentUser is the receiver
    socket.on("message-received", ({ text, chatter, sender }) => {
      console.log(text);
      console.log(chatter);
      console.log(currentUser);
      console.log(sender);
      console.log(connectedMembers);
      console.log(connectedUsers);

      setNotifyAboutMessage(true);

      console.log(JSON.parse(currentUser));
      if (sender[0]) {
        setMessage({
          from: sender[0].userName,
          to: JSON.parse(currentUser).name,
          text,
        });
        dispatch({
          type: "SET_MESSAGE",
          payload: {
            from: sender[0].userName,
            to: JSON.parse(currentUser).name,
            text,
          },
        });
      }

      // payload: {userName: sender.name, socketId:     }  !!! check from sonnectedUsers, by userName
      dispatch({ type: "SET_CHATTER", payload: sender[0] });
    });
    dispatch({ type: "SET_SOCKET", payload: socket });
    setSocket(socket);
    return () => setNotifyAboutMessage(false);
  }, []);

  const getUserFromSocket = (user) => {
    console.log(connectedUsers);
    console.log(connectedMembers);
    const userFromSocket = connectedUsers.filter((connectedUser) => {
      console.log(connectedUser);
      if (connectedUser.userName === user.name) {
        return connectedUser;
      }
    });

    return userFromSocket.length === 0 ? null : userFromSocket[0];
  };
  console.log(users);
  return (
    <div className="main">
      {users && users.length !== 0 ? (
        <div className="users-page-container">
          <div className="users-container">
            {users?.map((user, key) => {
              return (
                <div key={`${key}`} className="">
                  <MatchedUser
                    user={user}
                    userFromSocket={getUserFromSocket(user)}
                  />
                </div>
              );
            })}
          </div>
          {notifyAboutMessage && (
            <button
              className="message-notification"
              onClick={() => history.push("/chat")}
            >
              You have a message from{" "}
              <span className="message-from-name">{message.from}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="no-users-container">
          <div className="no-users">
            So far no users found that match your languages
          </div>
        </div>
      )}
    </div>
  );
};
export default MatchedUsers;
