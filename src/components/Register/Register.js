import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Input from "../../helpers/Input";

import "./Register.css";

function Register(props) {
  const dispatch = useDispatch();
  const regMode = useSelector((state) => state.userStatus.regMode);

  let history = useHistory();

  let NameValidationRules = {
    required: false,
  };
  let PasswordValidationRules = {
    required: false,
    minLength: 4,
    maxLength: 8,
    pattern: "(?=.*[0-9])(?=.*[A-Z])",
  };
  let CityValidationRules = { required: false };
  let CountryValidationRules = { required: false };

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
  const {
    value: city,
    bind: bindCity,
    reset: resetCity,
    touched: cityTouched,
    errors: cityErrors,
  } = Input(CityValidationRules);
  const {
    value: country,
    bind: bindCountry,
    reset: resetCountry,
    touched: countryTouched,
    errors: countryErrors,
  } = Input(CountryValidationRules);

  console.log(
    `name errors: ${JSON.stringify(
      nameErrors
    )}, password errors: ${JSON.stringify(
      passwordErrors
    )}, name touched: ${nameTouched}, password touched: ${passwordTouched}`
  );

  const invalidNameInput = nameErrors?.required;
  const invalidPasswordInputRequired =
    passwordErrors?.required &&
    passwordErrors?.minLength &&
    !passwordErrors?.maxLength &&
    !passwordErrors?.pattern;
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

  const invalidCityLabel = cityTouched && cityErrors?.required;
  const invalidCountryLabel = countryTouched && countryErrors?.required;

  console.log(
    Object.values(passwordErrors).filter((er) => er === true).length === 0
  );
  console.log(
    `one of fields untouched: ${!(
      !nameTouched ||
      !passwordTouched ||
      !cityTouched ||
      !countryTouched
    )}`
  );
  console.log(nameTouched, passwordTouched, cityTouched, countryTouched);

  const invalidForm = () => {
    return !(
      !nameTouched ||
      !passwordTouched ||
      !cityTouched ||
      !countryTouched
    ) ||
      Object.values(passwordErrors).filter((er) => er === true).length > 0 ||
      nameErrors?.required ||
      cityErrors?.required ||
      countryErrors?.required
      ? true
      : false;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      name,
      password,
      city,
      country,
    };
    console.log(JSON.stringify(user));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    /*
        fetch('http://localhost:4000/users/register', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data) );
        
        */
    fetch("http://localhost:4000/auth/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        resetName();
        resetPassword();
        resetCity();
        resetCountry();
        dispatch({ type: "SET_REGISTER_MODE", payload: false });
      });
  };

  return (
    <div className="register-page">
      {regMode ? (
        <div className="register-page-container">
          <form
            onSubmit={handleRegister}
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
                <div class="feedback invalid-feedback">
                  Password is required
                </div>
              ) : null}
              {invalidPasswordInputShort ? (
                <div class="feedback invalid-feedback">Password too short</div>
              ) : null}
              {invalidPasswordInputLong ? (
                <div class="feedback invalid-feedback">Password too long</div>
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
            <div className="input-group">
              <input
                type="text"
                name="city"
                className="input"
                autoComplete="off"
                {...bindCity}
              />
              {cityErrors?.required ? (
                <div className="feedback invalid-feedback">
                  City is required
                </div>
              ) : null}
              <label
                htmlFor="city"
                className={`label ${
                  invalidCityLabel
                    ? "is-invalid"
                    : cityTouched
                    ? "is-valid"
                    : ""
                }`}
              >
                {cityErrors?.required ? "City!!!" : "City"}
              </label>
            </div>
            <div className="input-group">
              <input
                type="text"
                name="country"
                className="input"
                autoComplete="off"
                {...bindCountry}
              />
              {countryErrors?.required ? (
                <div className="feedback invalid-feedback">
                  Country is required
                </div>
              ) : null}
              <label
                htmlFor="name"
                className={`label ${
                  invalidCountryLabel
                    ? "is-invalid"
                    : countryTouched
                    ? "is-valid"
                    : ""
                }`}
              >
                {countryErrors?.required ? "Country!!!" : "Country"}
              </label>
            </div>

            <div className="register-btns">
              <button
                type="submit"
                className={`btn-raise btn-design btn-register ${
                  invalidForm() ? "" : ""
                }`}
              >
                Register
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
      ) : null}
    </div>
  );
}

export default Register;
