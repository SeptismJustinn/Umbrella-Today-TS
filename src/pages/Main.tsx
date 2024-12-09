import {
  AboutCorner,
  AstroCorner,
  ForecastCorner,
  LocationCorner,
  Umbrella,
} from "@components";
import React, { useContext } from "react";
import DataContext from "@helpers/DataContext";

function Main() {
  const { data, date } = useContext(DataContext);

  // Function to check if there will be rain in the next ~12hrs from rounded up hour at which component rendered.
  function checkRain() {
    const currTime = new Date();
    // Get current hour, rounded off.
    let currHour = currTime.getHours() + (currTime.getMinutes() > 30 ? 1 : 0);
    // If it is currently a day after dataset initialization, account for 24hour time's reset to 0.
    if (currTime.getDate() > date.getDate()) {
      currHour += 24;
    }
    // Get current timepoint in dataset.
    const timePoint = Math.floor((currHour - date.getHours()) / 3);
    // Check prec_type for the next 4 timepoints from database.
    const weather12Hr = [...data.slice(timePoint, timePoint + 4)].map(
      (item) => {
        return item.prec_type;
      }
    );
    if (
      weather12Hr.length === 0 ||
      (currTime.getDate() - date.getDate()) * 24 +
        (currTime.getHours() - date.getHours()) >
        24
    ) {
      // If database is not updated in the last 24 hrs...\
      return true;
    } else {
      // Check if any precipitation predicted
      return (
        weather12Hr.includes("rain") ||
        weather12Hr.includes("snow") ||
        weather12Hr.includes("frzr") ||
        weather12Hr.includes("icep")
      );
    }
  }

  return (
    <>
      <AstroCorner raining={checkRain()} />
      <AboutCorner />
      <ForecastCorner />
      <LocationCorner />
      <Umbrella raining={checkRain()} />
    </>
  );
}

export default Main;
