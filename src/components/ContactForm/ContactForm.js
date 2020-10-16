import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./ContactForm.css";

const ContactForm = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const userToContact = useSelector((state) => state.chatReducer.contact);
  const currentUser = useSelector((state) => state.userStatus.currentUser);
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState(false);
  let history = useHistory();

  const submitForm = (data) => {
    const { from, password, to, subject, text } = data;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        password,
        to,
        subject,
        text,
      }), //id: token.id
    };
    fetch("http://localhost:4000/auth/sendemail", requestOptions)
      .then((res) => {
        setMessageSent(true);
        setTimeout(() => {
          history.push("/matchedusers");
        }, 2000);
      })
      .catch((err) => setError(true));
  };
  return (
    <div className="contact-page">
      <div className="contact-column">
        <form
          className="contact-form-container"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="contact-input-group">
            <label htmlFor="" className="contact-label">
              My Email
            </label>
            <input
              className="contact-input"
              type="email"
              name="from"
              ref={register({ required: true })}
              placeholder={JSON.parse(currentUser).email}
              defaultValue={JSON.parse(currentUser).email}
              required
            />
            {errors.from && <div className="">{errors.from.message}</div>}
          </div>
          <div className="contact-input-group">
            <label htmlFor="" className="contact-label">
              My Password
            </label>
            <input
              className="contact-input"
              type="password"
              name="password"
              ref={register({ required: true })}
              required
            />
            {errors.password && (
              <div className="">{errors.password.message}</div>
            )}
          </div>
          <div className="contact-input-group">
            <label htmlFor="" className="contact-label">
              Email to
            </label>
            <input
              className="contact-input"
              type="email"
              name="to"
              ref={register({ required: true })}
              placeholder={userToContact.email}
              defaultValue={userToContact.email}
              required
            />
            {errors.to && <div className="">{errors.to.message}</div>}
          </div>
          <div className="contact-input-group">
            <label htmlFor="" className="contact-label">
              Subject
            </label>
            <input
              className="contact-input"
              type="text"
              name="subject"
              ref={register({ required: true })}
              required
            />
            {errors.subject && <div className="">{errors.subject.message}</div>}
          </div>

          <div className="contact-input-group">
            <textarea
              className="contact-text"
              name="text"
              placeholder="My message here..."
              ref={register({ required: true })}
            />
            {errors.text && <div className="">{errors.text.message}</div>}
          </div>

          <input type="submit" value="submit" className="contact-btn" />
        </form>
        {messageSent && (
          <div className="contact-feedback">
            Email successfully sent to {userToContact.name}
          </div>
        )}
        {error && (
          <div className="contact-feedback">
            There was a problem sending email to{" "}
            <span className="contact-with">{userToContact.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
