import React, { useContext } from "react";
import styles from "@styles/AstroCorner.module.css";
import cornerStyle from "@styles/Corner.module.css";
import { NavLink } from "react-router-dom";
import DataContext from "@helpers/DataContext";

interface AstroCornerProps {
  raining: boolean;
}

function AstroCorner(props: AstroCornerProps) {
  const { coords } = useContext(DataContext);

  // Check system time if it is daytime.
  function checkDaytime() {
    const time = new Date().getHours();
    return time > 6 && time < 18;
  }
  return (
    <NavLink to="/astronomy" state={{ coords }}>
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
