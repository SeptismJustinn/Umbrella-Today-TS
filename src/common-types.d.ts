export type CoordArray = [number, number];

// https://www.7timer.info/doc.php?lang=en
export namespace Fetched {
  interface Data {
    // 3h Timepoint from dataset init time
    timepoint: number;
    // Cloud cover: 1-9
    cloudcover: number;
    // Lifted Index: -10 to 15
    lifted_index: number;
    // Precipitation Type: "snow", "rain", "frzr", "icep", "none"
    prec_type: String;
    // Precipitation Amount: 0-9
    prec_amount: Number;
    // Temperature (celsius) at 2m: -76-60
    temp2m: Number;
    // Relative Humidity at 2m: `${0-100}%`
    rh2m: String;
    // Wind direction in 10m radius:
    // - direction of wind: "N", "NE", "E", "SE", "S", "SW", "W", "NW"
    // - wind speed: 1-8
    wind10m: { direction: String; speed: Number };
    // Weather predicted, "weather" + "day"/"night", weathers:
    // "clear", "pcloudy", "mcloudy", "cloudy", "humid", "lightrain", "oshower", "ishower",
    // "lightsnow", "rain", "snow", "rainsnow"
    weather: String;
  }
  type Dataseries = Data[];
}
