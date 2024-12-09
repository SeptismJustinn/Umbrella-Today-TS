import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "@styles/PageText.module.css";
import bgStyles from "@styles/HourlyForecast.module.css";
import { Switch, Grid2 } from "@mui/material";
import DataContext from "@helpers/DataContext";
import { HourlyForecast } from "@components";

function Forecast() {
  const [sgTime, setSgTime] = useState(true);
  const dataCtx = useContext(DataContext);
  // Redirect back to main page if no data present.
  if (!dataCtx?.data) {
    return <Navigate replace to="/" />;
  } else {
    const hour =
      (sgTime ? dataCtx.date.getHours() : dataCtx.date.getUTCHours()) % 24;
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
              Forecast as at {dataCtx.date.getDate()}/
              {dataCtx.date.getMonth() + 1}, {hour < 10 ? "0" + hour : hour}
              00Hrs @ Lon: {dataCtx.coords[0]}, Lat: {dataCtx.coords[1]}
            </h2>
          )}
          {!sgTime && (
            <h2>
              Forecast as at {dataCtx.date.getUTCDate()}/
              {dataCtx.date.getUTCMonth() + 1}, {hour < 10 ? "0" + hour : hour}
              00Hrs @ Lon: {dataCtx.coords[0]}, Lat: {dataCtx.coords[1]}
            </h2>
          )}
          <div className="container">
            <h5 className="row">
              <div className="col-md-1">Time</div>
              <div className="col-md-2">Forecast</div>
              <div className="col-md-2">Precipitation</div>
              <div className="col-md-2">Precipitation Rate</div>
              <div className="col-md-2">Cloudiness</div>
              <div className="col-md-2">Temperature</div>
              <div className="col-md-1">Humidity</div>
            </h5>

            {dataCtx.data.map((item, idx) => {
              return (
                <HourlyForecast
                  key={idx}
                  id={idx}
                  time={(hour + item.timepoint) % 24}
                  nextDay={item.timepoint >= 24 - hour ? true : false}
                  thirdDay={item.timepoint >= 48 - hour ? true : false}
                  data={item}
                />
              );
            })}
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
              <h6>Forecast</h6>
              Forecast takes into account all parameters to give a general
              prediction of the average weather conditions over the 3 hours.
            </li>
            <li>
              <h6>Precipitation</h6>
              Describes what type of precipitation is to be expected over the 3
              hours: <span className={bgStyles.prec_text}>Rain</span>,
              <span className={bgStyles.prec_text}> Snow</span>,
              <span className={bgStyles.danger_text}> Freezing rain</span>,
              <span className={bgStyles.danger_text}> Ice pellets </span>
              or None.
            </li>
            <li>
              <h6>Precipitation Rate</h6>
              Average volume of precipitation expected per hour over the time
              period. <br />
            </li>
            <li>
              <h6>Temperature</h6>
              Expected temperature up to 2 meters from Earth's surface.
            </li>
            <li>
              <h6>Humidity</h6>
              Relative humidity up to 2 meters from Earth's surface.
            </li>
            <li>
              <h6>Cloudiness</h6>
              Percentage of sky covered by clouds. Accounts for all cloud layers
              together.
            </li>
          </ul>
          <span className={styles.boldText}>Note:</span> In cases where
          preciptation and rates do not tally (e.g. 0-0.25mm/hr of no
          precipitation), it may be due to the fact that precipitation is only
          expected to occur for short periods of the 3 hours for which the
          forecast was made, leading to some volume of precipitation predicted
          but no precipitation identified, or precipitation being forecast with
          negligible volume.
        </div>
      </>
    );
  }
}

export default Forecast;
