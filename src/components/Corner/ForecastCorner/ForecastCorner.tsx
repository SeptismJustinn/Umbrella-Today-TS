import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import cornerStyle from "@styles/Corner.module.css";
import { CoordArray, Fetched } from "common-types";
import DataContext from "@helpers/DataContext";

function ForecastCorner() {
  const { data, date, coords, loading } = useContext(DataContext);
  return (
    <NavLink
      to="/forecast"
      state={{ data, date, coords }}
      onClick={(event) => {
        if (loading) {
          // Prevent navigation if still loading data.
          event.preventDefault();
        }
      }}
    >
      <div className={`${cornerStyle.botRight} ${cornerStyle.click}`}>
        Detailed Forecast
      </div>
    </NavLink>
  );
}

export default ForecastCorner;
