import React, { useContext, useState } from "react";
import cornerStyle from "@styles/Corner.module.css";
import LocationModal from "./LocationModal";
import DataContext from "@helpers/DataContext";

function LocationCorner() {
  const { coords, setCoords, setLoading } = useContext(DataContext);
  // State to toggle modal display
  const [showLocation, setShowLocation] = useState<boolean>(false);
  // State to track current location to be displayed
  const [currLocation, setCurrLocation] = useState<string>("Central");

  return (
    <>
      <div
        className={`${cornerStyle.topRight} ${cornerStyle.click}`}
        onClick={() => setShowLocation(true)}
      >
        Location:
        <br />
        {currLocation === "Custom"
          ? "Custom Coordinates"
          : currLocation === "Current"
          ? "Current Location"
          : "Singapore " + currLocation}
        <br />({coords[0]} , {coords[1]})
      </div>

      {showLocation && (
        <LocationModal
          setCoords={setCoords}
          coords={coords}
          currLocation={currLocation}
          setCurrLocation={setCurrLocation}
          setShowLocation={setShowLocation}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

export default LocationCorner;
