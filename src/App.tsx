import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "@pages/Main";
import DataContext from "@helpers/DataContext";
import { CoordArray, Fetched } from "common-types";

function App() {
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

  // getData on mount, re-render and when coords is updated.
  useEffect(() => {
    getData();
  }, [coords]);

  return (
    <>
      <DataContext.Provider
        value={{
          data,
          date,
          coords,
          setCoords,
          outdated,
          setOutdated,
          loading,
          setLoading,
        }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </DataContext.Provider>
    </>
  );
}

export default App;
