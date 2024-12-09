import React from "react";
import cornerStyle from "./Corner.module.css";
import { NavLink } from "react-router-dom";

import styles from "./AstroCorner.module.css";

interface AstroCornerProps {
  coords: [Number, Number];
  raining: Boolean;
}

function AstroCorner(props: AstroCornerProps) {
  // Check system time if it is daytime.
  function checkDaytime() {
    const time = new Date().getHours();
    return time > 6 && time < 18;
  }
  return (
    <NavLink to="/astronomy" state={{ coords: props.coords }}>
      <div className={`${styles.container} ${cornerStyle.topLeft}`}>
        <div
          className={`${styles.astral} ${
            checkDaytime() ? styles.sun : styles.moon
          }`}
        />
        {props.raining && (
          <>
            <img className={styles.cloud_bottom} src="/cloud.png" />
            <img className={styles.cloud_bottomright} src="/cloud.png" />
            <img className={styles.cloud_right} src="/cloud.png" />
          </>
        )}
      </div>
    </NavLink>
  );
}

export default AstroCorner;
