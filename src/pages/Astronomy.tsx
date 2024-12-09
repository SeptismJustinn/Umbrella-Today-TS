import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "@styles/PageText.module.css";
import bgStyles from "@styles/HourlyForecast.module.css";
import { HourlyAstronomy } from "@components";
import { Switch, Grid2, CircularProgress } from "@mui/material";
import { Fetched } from "common-types";

/**
 * Page to fetch Astronomy-related information.
 */
function Astronomy() {
  // State to check if switch is toggled to sgTime or UTC time.
  const [sgTime, setSgTime] = useState<boolean>(true);
  // State to store ASTRO data from 7Timer.
  const [data, setData] = useState<Fetched.AstroDataseries>([]);
  // State to store date of data initialization (default is system time)
  const [date, setDate] = useState<Date>(new Date());
  // Technically this information is available in context but is left in as a useLocation example.
  const location = useLocation();
  // Coordinates to query API. Default to SG Central if state did not get propped properly (e.g. directly accessing /astronomy)
  const coords = location.state?.coords || [103.82, 1.352];
  // Current hour in SGT/UTC
  const hour = (sgTime ? date.getHours() : date.getUTCHours()) % 24;

  async function getAstro() {
    try {
      const res = await fetch(
        `https://www.7timer.info/bin/api.pl?lon=${coords[0]}&lat=${coords[1]}&product=astro&output=json`
      );
      if (res.status === 200) {
        const dat = await res.json();
        // Clean data:
        const currDate = new Date(
          dat.init.slice(0, 4) +
            "-" +
            dat.init.slice(4, 6) +
            "-" +
            dat.init.slice(6, 8) +
            "T" +
            dat.init.slice(-2) +
            ":00+00:00"
        );
        setDate(currDate);
        // Obtain next 48 hour's data.
        setData(dat.dataseries.slice(0, 17));
      } else {
        throw new Error();
      }
    } catch (err) {
      alert("Error fetching data!");
    }
  }

  useEffect(() => {
    getAstro();
  }, []);

  /*
  Displays time in SGT/UTC according to switch state.
  Conditionally renders loading spinner when data not loaded, data presented otherwise
  */
  return (
    <>
      <div className={styles.forecastText}>
        <Grid2 component="label" container alignItems="center" spacing={1}>
          <Grid2>GMT Time</Grid2>
          <Grid2>
            <Switch
              defaultChecked
              onChange={(event) => {
                setSgTime(event.target.checked);
              }}
            />
          </Grid2>
          <Grid2>Singapore Time (GMT+8)</Grid2>
        </Grid2>
        {sgTime && (
          <h2>
            Forecast as at {date.getDate()}/{date.getMonth() + 1},{" "}
            {hour < 10 ? "0" + hour : hour}00Hrs @ Lon: {coords[0]}, Lat:{" "}
            {coords[1]}
          </h2>
        )}
        {!sgTime && (
          <h2>
            Forecast as at {date.getUTCDate()}/{date.getUTCMonth() + 1},{" "}
            {hour < 10 ? "0" + hour : hour}00Hrs @ Lon: {coords[0]}, Lat:{" "}
            {coords[1]}
          </h2>
        )}
        <div className="container">
          <h5 className="row">
            <div className="col-md-1">Time</div>
            <div className="col-md-2">Precipitation</div>
            <div className="col-md-2">Cloud Cover</div>
            <div className="col-md-2">Transparency</div>
            <div className="col-md-1">Seeing</div>
            <div className="col-md-1">Temp</div>
            <div className="col-md-1">Humidity</div>
            <div className="col-md-2">Wind</div>
          </h5>
          {data[0] ? (
            data.map((item, idx) => {
              return (
                <HourlyAstronomy
                  key={idx}
                  id={idx}
                  time={(hour + item.timepoint) % 24}
                  nextDay={item.timepoint >= 24 - hour ? true : false}
                  thirdDay={item.timepoint >= 48 - hour ? true : false}
                  data={item}
                />
              );
            })
          ) : (
            <CircularProgress size="20vh" />
          )}
        </div>
      </div>
      <div className={styles.forecastText}>
        <h4>Parameters</h4>
        <ul>
          <li>
            <h6>Time</h6>
            Each forecast is made over 3-hour time periods for the next 48
            hours, with{" "}
            <span className={bgStyles.next_day}>
              next day forecasts
            </span> and{" "}
            <span className={bgStyles.third_day}>third day forecasts</span>.
          </li>
          <li>
            <h6>Precipitation</h6>
            Indicates whether rain or snow might be expected.
          </li>
          <li>
            <h6>Cloud Cover</h6>
            Rough percentage of skies expected to be obstructed by clouds.
            Accounts for all cloud layers altogether.
          </li>
          <li>
            <h6>Transparency</h6>
            Atmospherical transparency, measured in magnitudes per airmass.
            Indicates how clarity of objects will be impaired due to airmass,
            with lower numbers indicating less impairment.
          </li>
          <li>
            <h6>Seeing</h6>
            Astronomical seeing pertains to the stability of the atmosphere
            overhead. Turbulences, due to heat, winds or storms may destabilize
            air columns overhead, causing them to bend and distort light. Seeing
            here is quantified in arc-seconds, with lower values indicating
            better seeing conditions.
          </li>
          <li>
            <h6>Temperature</h6>
            Temperature 2m from Earth's surface.
          </li>
          <li>
            <h6>Humidity</h6>
            Relative Humidity 2m from Earth's surface.
          </li>
          <li>
            <h6>Wind Speed</h6>
            Wind speed with directions in brackets. Wind speeds coloured in red
            indicates dangerously strong winds.
          </li>
        </ul>
        <hr />
        <p>
          Astronomy forecast from{" "}
          <a href="http://www.7timer.info/doc.php?lang=en">7timer.info</a>
          {"."}
        </p>
      </div>
    </>
  );
}

export default Astronomy;
