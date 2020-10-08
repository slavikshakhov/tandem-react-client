import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImageUploader from "react-images-upload";
import Input from "../../helpers/Input";

import "./Nav.css";

export default function Nav() {
  let history = useHistory();
  const regMode = useSelector((state) => state.userStatus.regMode);
  const loggedIn = useSelector((state) => state.userStatus.loggedIn);
  const currentUser = useSelector((state) => state.userStatus.currentUser);
  const [photo, setPhoto] = useState("");
  const socket = useSelector((state) => state.chatReducer.socket);
  console.log();
  const dispatch = useDispatch();

  let NameValidationRules = {
    required: false,
  };
  let PasswordValidationRules = {
    required: false,
    minLength: 3,
    maxLength: 10,
  };
  const {
    value: name,
    bind: bindName,
    reset: resetName,
    touched: nameTouched,
    errors: nameErrors,
  } = Input(NameValidationRules);
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
    touched: passwordTouched,
    errors: passwordErrors,
  } = Input(PasswordValidationRules);

  const invalidNameInput = nameErrors?.required;
  const invalidPasswordInputRequired =
    passwordErrors?.required &&
    passwordErrors?.minLength &&
    !passwordErrors?.maxLength;
  const invalidPasswordInputShort =
    passwordTouched && passwordErrors?.minLength && !passwordErrors?.required;
  const invalidPasswordInputLong = passwordErrors?.maxLength;

  const invalidNameLabel = nameTouched && nameErrors?.required;

  const invalidPasswordLabel =
    passwordTouched &&
    (passwordErrors?.required ||
      passwordErrors?.minLength ||
      passwordErrors?.maxLength);
  const validPasswordLabel = passwordTouched && !passwordErrors?.required;

  // console.log(`name errors: ${JSON.stringify(nameErrors)}, password errors: ${JSON.stringify(passwordErrors)}, name touched: ${nameTouched}, password touched: ${passwordTouched}`);

  const invalidForm = () => {
    return !(nameTouched || passwordTouched) ||
      Object.values(passwordErrors).filter((er) => er === true).length > 0 ||
      nameErrors?.required
      ? true
      : false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, password };
    console.log(JSON.stringify(user));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    //post request to Node.js server
    fetch("http://localhost:4000/auth/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token !== undefined) {
          resetName();
          resetPassword();
          localStorage.setItem("token", data.token);
          dispatch({ type: "LOGGEDIN", payload: data.token });
          dispatch({
            type: "CURRENT_USER",
            payload: JSON.stringify(data.user),
          });
          history.push("home");
        }
        //localStorage.setItem('user', JSON.stringify(data.user));
      });
    /*
       //post request to ASP.NET server
       fetch('http://localhost:5000/auth/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                dispatch({type: 'CURRENT_USER', payload: JSON.stringify(data.user)});
                dispatch({type: 'DECODED_TOKEN', payload: data.token});
            });
        */
  };
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGGEDIN", payload: null });
    console.log(socket.id);
    if (socket) {
      socket.disconnect();
    }
  };
  const onDrop = (picture) => {
    setPhoto(picture);
  };

  return (
    <nav className={`navbar ${regMode ? "hide-navigation" : ""}`}>
      <div className="pic">
        <img src={photo} />
      </div>
      {/* 
         <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      */}

      <div className="burger-container">
        <input type="checkbox" id="burger-check" className="burger-check" />
        <label
          className={`burger ${regMode ? "remove-burger" : ""}`}
          htmlFor="burger-check"
        >
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </label>
        <div
          className={`side-menu ${regMode ? "remove-side-menu" : ""}`}
          id="sideMenu"
        >
          <a href="" className="close-side-menu">
            &times;
          </a>
          <a href="# " className="side-menu-item main-link">
            LanguageTandem
          </a>
          <a href="# " className="side-menu-item hover-item">
            about
          </a>
          <a href="# " className="side-menu-item hover-item">
            contact
          </a>

          {!loggedIn ? (
            <form onSubmit={handleSubmit} className="form-container">
              <p className="heading">Login</p>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  className="input"
                  autoComplete="off"
                  {...bindName}
                />
                {invalidNameInput ? (
                  <div className="feedback invalid-feedback">
                    Name is required
                  </div>
                ) : null}
                <label
                  htmlFor="name"
                  className={`label ${
                    invalidNameLabel
                      ? "is-invalid"
                      : nameTouched
                      ? "is-valid"
                      : ""
                  }`}
                >
                  {nameErrors?.required ? "Name!!!" : "Name"}
                </label>
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  className="input"
                  autoComplete="off"
                  {...bindPassword}
                />
                {invalidPasswordInputRequired ? (
                  <div className="feedback invalid-feedback">
                    Password is required
                  </div>
                ) : null}
                {invalidPasswordInputShort ? (
                  <div className="feedback invalid-feedback">
                    Password too short
                  </div>
                ) : null}
                {invalidPasswordInputLong ? (
                  <div className="feedback invalid-feedback">
                    Password too long
                  </div>
                ) : null}

                <label
                  htmlFor="password"
                  className={`label ${
                    invalidPasswordLabel ? "is-invalid" : ""
                  } ${validPasswordLabel ? "is-valid" : ""}`}
                >
                  {passwordErrors?.required ||
                  (passwordTouched &&
                    (passwordErrors?.minLength || passwordErrors?.maxLength))
                    ? "Password!!!"
                    : "Password"}
                </label>
              </div>
              <div className="line"></div>
              <button
                type="submit"
                className={`btn-raise btn-design ${
                  invalidForm() ? "btn-disabled" : ""
                }`}
              >
                Login
              </button>
              <div className="side-menu-register-btn-container">
                <span className="side-menu-text">Not a member yet?</span>
                <Link to="/register">
                  <button
                    className="btn-link side-menu-btn-link"
                    onClick={() =>
                      dispatch({ type: "SET_REGISTER_MODE", payload: true })
                    }
                  >
                    Register
                  </button>
                </Link>
              </div>
            </form>
          ) : null}
        </div>
      </div>

      <div className="top-menu">
        <div className="links">
          <a href="# " className="top-menu-item main-link">
            LanguageTandem
          </a>
          {!loggedIn && (
            <a href="# " className="top-menu-item">
              about
            </a>
          )}

          {loggedIn && (
            <Link to="/languages" className="top-menu-item">
              My Languages
            </Link>
          )}
          {loggedIn && (
            <Link to="/matchedusers" className="top-menu-item">
              Learners
            </Link>
          )}
          {loggedIn && (
            <Link to="/chat" className="top-menu-item">
              Messages
            </Link>
          )}

          {loggedIn && (
            <a href="# " className="top-menu-item">
              contact
            </a>
          )}
        </div>
        <div className="admin-box">
          {!regMode && !loggedIn ? (
            <div className="login-register">
              <div className="login-link">
                <Link to="/login">
                  <button className="btn-link register-btn-design">
                    Login
                  </button>
                </Link>
              </div>

              <form
                onSubmit={handleSubmit}
                className="login-form login-form-top"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name is required"
                  autoComplete="off"
                  {...bindName}
                  className={`inline-input ${
                    nameTouched && nameErrors?.required ? "invalid-input" : ""
                  }`}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password is required"
                  autoComplete="off"
                  {...bindPassword}
                  className={`inline-input ${
                    (passwordTouched && passwordErrors?.required) ||
                    (passwordTouched && passwordErrors?.minLength) ||
                    (passwordTouched && passwordErrors?.maxLength)
                      ? "invalid-input"
                      : ""
                  }`}
                />

                <button
                  type="submit"
                  className={`btn-raise btn-design ${
                    invalidForm() ? "btn-disabled" : ""
                  }`}
                >
                  Login
                </button>
              </form>
              <Link to="/register">
                <button
                  className="btn-link register-btn-design"
                  onClick={() =>
                    dispatch({ type: "SET_REGISTER_MODE", payload: true })
                  }
                >
                  Register
                </button>
              </Link>
            </div>
          ) : (
            loggedIn && (
              <Link to="/start">
                <button
                  className="btn-design btn-raise logout-md"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

/*

<nav class="navbar">

        <label for="burger-check" class="burger-container" onclick="openMenu()">
            <input type="checkbox" id="burger-check" class="burger-check">
            <div class="side-menu" id="sideMenu">
                <a href="" class="close-side-menu">&times;</a>
                <a href="" class="side-menu-item">home</a>
                <a href="" class="side-menu-item">about</a>
                <a href="" class="side-menu-item">contact</a>
            </div>
            <div class="burger">
                <div class="burger-line"></div>
                <div class="burger-line"></div>
                <div class="burger-line"></div>
            </div>

        </label>

        <ul class="top-menu">
            <a href="" class="top-menu-item">home</a>
            <a href="" class="top-menu-item">about</a>
            <a href="" class="top-menu-item">contact</a>
        </ul>

    </nav>
*/
