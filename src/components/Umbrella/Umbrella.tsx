import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "@styles/Umbrella.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import DataContext from "@helpers/DataContext";

interface UmbrellaProps {
  raining: boolean;
}

function Umbrella(props: UmbrellaProps) {
  const { data, date, coords, outdated, loading } = useContext(DataContext);
  // Function to determine what image to display
  function displayImage() {
    if (loading) {
      // Loading spinner
      return <CircularProgress size="70vh" />;
    } else if (outdated) {
      // Error if database outdated or failed to fetch properly
      return <img src="/umbrella_error.png" alt="Outdated dataset" />;
    } else {
      if (props.raining) {
        // Open umbrella
        return <img src="/umbrella_open.png" />;
      } else {
        // Closed umbrella
        return <img src="/umbrella_closed.png" />;
      }
    }
  }

  function displayMessage() {
    if (loading) {
      // No message while loading
      return;
    } else if (outdated) {
      // Contingency message if error/outdated
      return (
        <>
          Problems with database...
          <br />
          Bring your umbrella just in case!
        </>
      );
    } else {
      if (props.raining) {
        // Raining
        return "Bring your umbrella along!";
      } else {
        // No rain expected
        return "Leave your umbrella behind!";
      }
    }
  }

  return (
    <div className={`${styles.centered}`}>
      <NavLink
        to="/forecast"
        state={{ data: data, date: date, coords: coords }}
        onClick={(event) => {
          if (loading) {
            // Prevent navigation if still loading data.
            event.preventDefault();
          }
        }}
      >
        {displayImage()}
      </NavLink>
      <div>{displayMessage()}</div>
    </div>
  );
}

export default Umbrella;
