import { useState, useEffect } from "react";

import classes from "./contact-form.module.css";
import Notification from "../ui/notification";
import { sendContactData } from "../../utils/api";

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (requestStatus === "pending") {
      setNotification({
        status: "pending",
        title: "Sending message...",
        message: "Your message is on its way!",
      });
    }
    if (requestStatus === "success") {
      setNotification({
        status: "success",
        title: "Sent message...",
        message: "Your message is being sent successfully!",
      });
    }
    if (requestStatus === "error") {
      setNotification({
        status: "error",
        title: "Sent message failed...",
        message: requestError || "Your message can not be sent!",
      });
    }
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus("success");
      setEnteredMessage("");
      setEnteredEmail("");
      setEnteredName("");
    } catch (error) {
      setRequestError(error.message || error.msg);
      setRequestStatus("error");
    }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
