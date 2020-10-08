import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Input from "../../helpers/Input";

import "./Login.css";

function Login(props) {
  const dispatch = useDispatch();

  let history = useHistory();

  let NameValidationRules = {
    required: false,
  };
  let PasswordValidationRules = {
    required: false,
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

  console.log(
    `name errors: ${JSON.stringify(
      nameErrors
    )}, password errors: ${JSON.stringify(
      passwordErrors
    )}, name touched: ${nameTouched}, password touched: ${passwordTouched}`
  );

  const invalidNameInput = nameErrors?.required;
  const invalidPasswordInputRequired = passwordErrors?.required;

  const invalidNameLabel = nameTouched && nameErrors?.required;

  const invalidPasswordLabel = passwordTouched && passwordErrors?.required;

  const validPasswordLabel = passwordTouched && !passwordErrors?.required;

  console.log(
    Object.values(passwordErrors).filter((er) => er === true).length === 0
  );

  const invalidForm = () => {
    return !(!nameTouched || !passwordTouched || !nameErrors?.required
      ? true
      : false);
  };

  const handleLogin = (e) => {
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
          history.push("home");
        }
        //localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: "CURRENT_USER", payload: JSON.stringify(data.user) });
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

  return (
    <div className="register-page">
      <div className="register-page-container">
        <form
          onSubmit={handleLogin}
          className="register-form-container"
          autoComplete="off"
        >
          <p className="heading">Register</p>
          <div className="input-group">
            <input
              type="text"
              name="name"
              className="input"
              autoComplete="off"
              {...bindName}
            />
            {invalidNameInput ? (
              <div className="feedback invalid-feedback">Name is required</div>
            ) : null}
            <label
              htmlFor="name"
              className={`label ${
                invalidNameLabel ? "is-invalid" : nameTouched ? "is-valid" : ""
              }`}
            >
              {nameErrors?.required ? "Name!!!" : "Name"}
            </label>
          </div>
          {/* {`required: ${nameErrors?.required}, touched: ${nameErrors?.touched}`} */}
          <div className="input-group">
            <input
              name="password"
              type="password"
              className="input"
              autoComplete="off"
              {...bindPassword}
            />
            {invalidPasswordInputRequired ? (
              <div class="feedback invalid-feedback">Password is required</div>
            ) : null}

            {passwordErrors?.pattern ? (
              <div class="feedback invalid-feedback">
                at least one capital letter / digit!
              </div>
            ) : null}

            <label
              htmlFor="password"
              className={`label ${invalidPasswordLabel ? "is-invalid" : ""} ${
                validPasswordLabel ? "is-valid" : ""
              }`}
            >
              {passwordErrors?.required ||
              (passwordTouched &&
                (passwordErrors?.minLength || passwordErrors?.maxLength))
                ? "Password!!!"
                : "Password"}
            </label>
          </div>

          <div className="register-btns">
            <button
              type="submit"
              className={`btn-raise btn-design btn-register ${
                invalidForm() ? "" : ""
              }`}
            >
              Login
            </button>
            <Link to="/">
              <button
                className="btn-link cancel-register-btn"
                onClick={() =>
                  dispatch({ type: "SET_REGISTER_MODE", payload: false })
                }
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
