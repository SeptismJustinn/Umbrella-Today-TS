import React from "react";
import styles from "./HourlyForecast.module.css";

// === Static values from https://www.7timer.info/doc.php?lang=en ===
// Average rainfall mm/hr (0-9)
const precipitationRates = [
  "Negligible",
  "0-0.25",
  "0.25-1",
  "1-4",
  "4-10",
  "10-16",
  "16-30",
  "30-50",
  "50-75",
  ">75",
];
// Average cloud cover (1-9)
const cloudiness = [
  "0%-6%",
  "6%-19%",
  "19%-31%",
  "31%-44%",
  "44%-56%",
  "56%-69%",
  "69%-81%",
  "81%-94%",
  "94%-100%",
];

// Function takes in "weather" string from data set and converts it into human readable string.
function decipherWeather(datasetString) {
  let string = datasetString;
  let output;
  // Check if unique prefix was identified.
  let switchFlag = true;
  // Check if thunderstorm reported.
  let thunderFlag = false;
  // Handle unique prefixes p, m, o, i, t
  switch (string.charAt(0)) {
    case "p":
      output = "Partially cloudy skies";
      break;
    case "m":
      output = "Very cloudy skies";
      break;
    case "o":
      output = "Occasional showers";
      break;
    case "i":
      output = "Isolated showers";
      break;
    case "t":
      // Thunderstorm unique in that it is prefixed by "ts" instead of just "t"
      thunderFlag = true;
      break;
    default:
      switchFlag = false;
  }
  if (thunderFlag) {
    // If "t" prefix identified, string[2] onwards deterimines if likely storm.
    if (string.substring(2, 6) === "rain") {
      return "Thunderstorm";
    } else {
      return "Possible thunderstorm";
    }
  } else if (switchFlag) {
    return output;
  } else {
    // If no prefix, first 4 chars gives sufficiently unique cases.
    const sub = string.substring(0, 4);
    switch (sub) {
      case "clea":
        output = "Clear skies";
        break;
      case "clou":
        output = "Extremely cloudy";
        break;
      case "humi":
        output = "Foggy";
        break;
      case "ligh":
        output = "Light rain/showers";
        if (string.charAt(5) === "s") {
          output = "Lightly snowing";
        }
        break;
      case "rain":
        output = "Rain expected";
        if (string.charAt(4) === "s") {
          output = "Rainy snow";
        }
        break;
      case "snow":
        output = "Snow expected";
        break;
    }
  }
  return output;
}

// Function takes in prec_type string and converts it into human readable form
function decipherPrecipitation(datasetString) {
  let output = "";
  switch (datasetString) {
    case "rain":
      output = "Rain";
      break;
    case "none":
      output = "No precipitation";
      break;
    case "snow":
      output = "Snow";
      break;
    case "icep":
      output = "Ice pellets";
      break;
    case "frzr":
      output = "Freezing rain";
      break;
  }
  return output;
}

// ======

function HourlyForecast(props) {
  return (
    <div
      className={`row ${props.thirdDay ? styles.third_day : props.nextDay ? styles.next_day : ""
        }`}
    >
      <div className="col-md-1">
        {props.time < 12
          ? (props.time || 12) + "AM"
          : (props.time % 12 || 12) + "PM"}
      </div>
      <div className="col-md-2">{decipherWeather(props.forecast)}</div>
      <div
        className={`col-md-2 ${props.precType === "none"
          ? ""
          : props.precType === "rain" || props.precType === "snow"
            ? styles.prec_text
            : styles.danger_text
          }`}
      >
        {decipherPrecipitation(props.precType)}
      </div>
      <div className="col-md-2">
        {precipitationRates[props.prec] + (props.prec === 0 ? "" : "mm/hr")}
      </div>
      <div className="col-md-2">{cloudiness[props.cloudcover - 1]}</div>
      <div className="col-md-2">
        {props.temp}
        <span>&#8451;</span>
      </div>
      <div className="col-md-1">{props.humidity}</div>
    </div>
  );
}

export default HourlyForecast;
