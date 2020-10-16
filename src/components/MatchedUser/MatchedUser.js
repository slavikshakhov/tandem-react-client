import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./MatchedUser.css";

const MatchedUser = ({ user, userFromSocket }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  console.log(user);
  /*
  const addContact = () => {
    console.log(user.name);
    dispatch({ type: "SET_CONTACT", payload: user.name });
    history.push("chat");
  };
  */
  const openContactForm = () => {
    dispatch({ type: "SET_CONTACT", payload: user });
    history.push("/contact");
  };
  const startChat = () => {
    dispatch({ type: "SET_CHATTER", payload: userFromSocket });
    history.push("chat");
  };
  return (
    <div className="user-container">
      <div className="user-content">
        <div className="user-card-header">
          <p>
            {user.name[0].toUpperCase() + user.name.slice(1, user.name.length)}
          </p>
          <button
            className={`start-chat ${!userFromSocket && "start-chat-inactive"}`}
            disabled={!userFromSocket}
            onClick={() => startChat()}
          >
            {userFromSocket ? ` online` : ` offline`}
          </button>
        </div>
        <div className="divider"></div>
        <div className="horizontal-center">
          <b>
            {user.city}, {user.country}
          </b>
        </div>
        <div className="languages-container">
          <div className="lgs">
            <h4 className="lgs-header">Speaks:</h4>

            {user.offeredLgs?.map((lg) => {
              return <p>{lg}</p>;
            })}
          </div>
          <div className="lgs">
            <h4 className="lgs-header">Learning:</h4>

            {user.wantedLgs?.map((lg) => {
              return <p>{lg}</p>;
            })}
          </div>
        </div>
      </div>

      <button
        className="btn-raise contact-btn"
        onClick={() => openContactForm()}
      >
        Send Email
      </button>
    </div>
  );
};
export default MatchedUser;
