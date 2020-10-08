import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UsersToMeet from "../UsersToMeet/UsersToMeet";
import MatchedUsers from "../MatchedUsers/MatchedUsers";
import LanguagesForm from "../LanguagesForm/LanguagesForm";
import "./Home.css";

import io from "socket.io-client";

const Home = () => {
  const decodedToken = useSelector((state) => state.userStatus.decodedToken);
  const currentUser = useSelector((state) => state.userStatus.currentUser);
  //console.log(decodedToken.id);
  /*
  const thisUserOfferedLgs = useSelector(
    (state) => state.languagesReducer.userWantedLgs
  );
  */
  const [offeredLgs, setOfferedLgs] = useState([]);
  const [wantedLgs, setWantedLgs] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usersToMeet, setUsersToMeet] = useState([]);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(currentUser);
    getUserOfferedLgs();
    getUserWanteddLgs();
  }, []);
  useEffect(() => {
    console.log(wantedLgs);
    console.log(offeredLgs);
    if (wantedLgs?.length > 0 && offeredLgs?.length > 0) {
      searchUsers(wantedLgs, offeredLgs);
    }
  }, [wantedLgs, offeredLgs]);
  /*
  useEffect(() => {
    console.log(currentUser);
    const socket = io("http://localhost:4000").on("connect", () => {
      console.log("connected to server");
    });
    
    socket.emit("connect-user", { userName: JSON.parse(currentUser).name });
    socket.on("all-users", (members) => {
      console.log(`members connected: ${JSON.stringify(members)}`);
      dispatch({ type: "SET_CONNECTED_USERS", payload: members });
    });

    socket.on("message-received", (text) => {
      console.log(text);
    });
    dispatch({ type: "SET_SOCKET", payload: socket });
    setSocket(socket);
    return () => socket.disconnect();
  }, []);
  */
  const getUserOfferedLgs = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: decodedToken.id }), // id: decodedToken.id
    };
    fetch("http://localhost:4000/auth/thisUserOfferedLgs", requestOptions)
      .then((resp) => resp.json())
      .then((offeredLgs) => {
        const mode = offeredLgs?.offeredlgs.length === 0 ? true : false;
        console.log(offeredLgs?.offeredlgs);
        dispatch({
          type: "SET_USER_OFFEREDLGS",
          payload: offeredLgs.offeredlgs,
        });
        dispatch({ type: "SET_OFFERED_LGS_MODE", payload: mode });
        setOfferedLgs(offeredLgs.offeredlgs);
      });
  };
  const getUserWanteddLgs = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: decodedToken.id }), // id: decodedToken.id
    };
    fetch("http://localhost:4000/auth/thisUserWantedLgs", requestOptions)
      .then((resp) => resp.json())
      .then((wantedLgs) => {
        const mode = wantedLgs?.wantedlgs.length === 0 ? true : false;
        dispatch({ type: "SET_USER_WANTEDLGS", payload: wantedLgs.wantedlgs });
        dispatch({ type: "SET_WANTED_LGS_MODE", payload: mode });
        setWantedLgs(wantedLgs.wantedlgs);
      });
  };
  const searchUsers = (wantedlgs, offeredlgs) => {
    console.log("submit");
    const offeredLgsArr = offeredlgs.map((el) => el.name);
    const wantedLgsArr = wantedlgs.map((el) => el.name);
    console.log(wantedLgsArr);
    console.log(offeredLgsArr);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offeredLgs: offeredLgsArr,
        wantedLgs: wantedLgsArr,
      }),
    };
    fetch("http://localhost:4000/auth/filterUsers", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.filteredUsers);
        const matchedUsers = data.filteredUsers.filter((user) => {
          console.log(user.name, currentUser, JSON.parse(currentUser).name);
          return user.name !== JSON.parse(currentUser).name;
        });
        console.log(matchedUsers);
        dispatch({ type: "FILTERED_USERS", payload: matchedUsers });
        setFilteredUsers(matchedUsers);
      });
  };

  return (
    <div className="container-section">
      {usersToMeet.length > 0 ? (
        <UsersToMeet />
      ) : filteredUsers.length > 0 ? (
        <MatchedUsers />
      ) : offeredLgs.length === 0 || wantedLgs.length === 0 ? (
        <LanguagesForm />
      ) : null}
    </div>
  );
};
export default Home;
