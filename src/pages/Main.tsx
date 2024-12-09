import { AboutCorner, AstroCorner, ForecastCorner } from "@components";
import React, { useEffect, useState } from "react";
import { CoordArray, Fetched } from "common-types";

function Main() {
  // State to contain fetched data.
  const [data, setData] = useState<Fetched.Dataseries>([]);
  // State to contain the date at which data was initialized.
  const [date, setDate] = useState<Date>(new Date());
  // State to check if dataset might be outdated.
  const [outdated, setOutdated] = useState<boolean>(false);
  // State to store cooridnates.
  const [coords, setCoords] = useState<CoordArray>([103.82, 1.352]);
  // State to check if dataset is loaded.
  const [loading, setLoading] = useState<boolean>(!data[0]);

  // GET method specific to 7timer API.
  async function getData() {
    try {
      // 7timer's init is in UTC time.
      const res = await fetch(
        `https://www.7timer.info/bin/api.pl?lon=${coords[0]}&lat=${coords[1]}&product=civil&output=json`
      );
      if (res.status === 200) {
        const weatherData = await res.json();
        // Clean data:
        const currDate = new Date(
          weatherData.init.slice(0, 4) +
            "-" +
            weatherData.init.slice(4, 6) +
            "-" +
            weatherData.init.slice(6, 8) +
            "T" +
            weatherData.init.slice(-2) +
            ":00+00:00"
        );
        setDate(currDate);
        // Obtain next 48 hour's data.
        console.log(weatherData.dataseries.slice(0, 17));
        setData(weatherData.dataseries.slice(0, 17));
        setLoading(false);
        if (
          (new Date().getDate() - currDate.getDate()) * 24 +
            new Date().getHours() -
            currDate.getHours() >
          24
        ) {
          // Check if it has been more than 24 hours since initialization
          setOutdated(true);
        } else {
          setOutdated(false);
        }
      } else {
        setOutdated(true);
        throw new Error();
      }
    } catch (err) {
      alert("Error fetching data!");
    }
  }

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

  // getData on mount, re-render and when coords is updated.
  useEffect(() => {
    getData();
  }, [coords]);
  return (
    <>
      <AstroCorner raining={checkRain()} coords={coords} />
      <AboutCorner />
      <ForecastCorner
        data={data}
        date={date}
        coords={coords}
        loading={loading}
      />
      <LocationCorner
        setCoords={setCoords}
        coords={coords}
        setLoading={setLoading}
      />
      <Umbrella
        raining={checkRain()}
        data={data}
        date={date}
        coords={coords}
        outdated={outdated}
        loading={loading}
      />
    </>
  );
}

export default Main;
