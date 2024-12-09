import React, { useState } from "react";
import cornerStyle from "@styles/Corner.module.css";
import LocationModal from "./LocationModal";
import { CoordArray } from "common-types";

interface LocationCornerProps {
  coords: CoordArray;
  setCoords: Function;
  setLoading: Function;
}

function LocationCorner(props: LocationCornerProps) {
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
        <br />({props.coords[0]} , {props.coords[1]})
      </div>

      {showLocation && (
        <LocationModal
          setCoords={props.setCoords}
          coords={props.coords}
          currLocation={currLocation}
          setCurrLocation={setCurrLocation}
          setShowLocation={setShowLocation}
          setLoading={props.setLoading}
        />
      )}
    </>
  );
}

export default LocationCorner;
