import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface AboutModalProps {
  setShowAbout: Function;
}

function Overlay(props: AboutModalProps) {
  const [active, setActive] = useState(false);
  function handleClose() {
    setActive(() => {
      setTimeout(() => {
        props.setShowAbout(false);
      }, 500);
      return false;
    });
  }

  useEffect(() => {
    // On mount, trigger activation animation.
    if (!active) {
      setActive(true);
    }
  }, []);

  return (
    <div
      className={active ? styles.backdrop : styles.no_backdrop}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal} ${
          active ? styles.active : styles.inactive
        }`}
      >
        Geolocation information will solely be used for query into 7Timer's API
        in order to obtain more accurate forecasts.
        <br />
        <br />
        Umbrella recommendation as long as precipitation in any form is
        expected.
        <br />
        App was designed in Singapore's context and as such, caters primarily to
        GMT +8 timezones.
        <br />
        Daytime determined using system's time and is generically calculated as
        system time between 6 AM and 6 PM.
        <br />
        Should any instance of rain be predicted up to 12 hours from time of
        launching app, umbrella would be recommended.
        <br />
        <br />
        Should additional weather information be desired, please click the
        umbrella or the "Detailed Forecast" button in the bottom right.
        <br />
        Alternatively, please click the image in the top left for
        Astronomy-related information.
        <hr />
        <h4>Credits:</h4>
        Information used in this app provided via{" "}
        <a href="http://www.7timer.info/doc.php?lang=en" target="_blank">
          7Timer's
        </a>{" "}
        CIVIL and ASTRO APIs.
        <br />
        Images used drawn by Mifune Takashi,{" "}
        <a href="https://www.irasutoya.com/" target="_blank">
          みふねたかし
        </a>
        .<br />
        Components from{" "}
        <a href="https://mui.com/" target="_blank">
          Material UI
        </a>{" "}
        were utilized.
      </div>
    </div>
  );
}

function AboutModal(props: AboutModalProps) {
  const modalRoot = document.querySelector("#modal-root");
  if (modalRoot) {
    return ReactDOM.createPortal(
      <Overlay setShowAbout={props.setShowAbout} />,
      modalRoot
    );
  } else {
    throw new Error("No modal root defined!");
  }
}

export default AboutModal;
