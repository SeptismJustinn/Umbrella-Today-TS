import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@styles/Modal.module.css";
import LocationCustomField from "./LocationCustomField";
import { CoordArray } from "common-types";

interface LocationModalProps {
  coords: CoordArray;
  setCoords: Function;
  currLocation: string;
  setCurrLocation: Function;
  setShowLocation: Function;
  setLoading: Function;
}

function Overlay(props: LocationModalProps) {
  // State to hold new location before confirm click
  const [newLocation, setNewLocation] = useState<string>(props.currLocation);
  // State to toggle custom coordinate input fields
  const [showCustomField, setShowCustomField] = useState<boolean>(
    props.currLocation === "Custom"
  );
  // State to toggle box, required to initialize box in inactive state to trigger activation animation
  const [activeBox, setActiveBox] = useState<boolean>(false);
  // States to track if invalid values are entered into input fields.
  const [longErr, setLongErr] = useState<boolean>(false);
  const [latErr, setLatErr] = useState<boolean>(false);
  // Refs to allow for focusing onto input fields.
  const longRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  // Function to lift coordinates to Main
  function adjustCoords() {
    const longRefVal = Number(longRef.current?.value || 0);
    const latRefVal = Number(latRef.current?.value || 0);
    const coordArr = [0, 0];
    switch (newLocation) {
      case "Custom":
        // Extract custom coordinates from input fields.
        coordArr[0] = Math.round(longRefVal * 1000) / 1000;
        coordArr[1] = Math.round(latRefVal * 1000) / 1000;
        props.setCoords(coordArr);
        break;
      case "Current":
        // Utilize system location's coordinates.
        navigator.geolocation.getCurrentPosition(
          (info) => {
            let lon = Math.round(info.coords.longitude * 1000) / 1000;
            let lat = Math.round(info.coords.latitude * 1000) / 1000;
            coordArr[0] = lon;
            coordArr[1] = lat;
            // setCoords MUST be called within callback function here.
            props.setCoords(coordArr);
          },
          () => {
            alert("Error getting current coordinates...");
          }
        );
        break;
      case "Central":
        // Upper Peirce reservoir.
        coordArr[0] = 103.82;
        coordArr[1] = 1.352;
        props.setCoords(coordArr);
        break;
      case "North":
        // Sembawang MRT.
        coordArr[0] = 103.82;
        coordArr[1] = 1.449;
        props.setCoords(coordArr);
        break;
      case "East":
        // Tampines East MRT.
        coordArr[0] = 103.955;
        coordArr[1] = 1.356;
        props.setCoords(coordArr);
        break;
      case "South":
        // SGH.
        coordArr[0] = 103.836;
        coordArr[1] = 1.28;
        props.setCoords(coordArr);
        break;
      case "West":
        // NTU.
        coordArr[0] = 103.683;
        coordArr[1] = 1.351;
        props.setCoords(coordArr);
        break;
    }
  }

  // Function to handle confirm button click.
  function handleConfirm(confirmed: boolean) {
    // If confirm button click
    if (confirmed) {
      // Focus on erroneous fields.
      if (longErr) {
        return longRef.current?.focus();
      } else if (latErr) {
        return latRef.current?.focus();
      } else {
        // Set umbrella image to load
        props.setLoading(true);
        // Set new location
        props.setCurrLocation(newLocation);
        // Lift coords
        adjustCoords();
      }
    }
    // Trigger inactivation animation and hide modal roughly when animation ends.
    setActiveBox(() => {
      setTimeout(() => {
        props.setShowLocation(false);
      }, 500);
      return false;
    });
  }

  useEffect(() => {
    // On mount, activate the inactive box to trigger transform animation.
    if (!activeBox) {
      setActiveBox(true);
    }
  }, []);

  return (
    <div className={activeBox ? styles.backdrop : styles.no_backdrop}>
      <div
        className={`${styles.drawer} ${
          activeBox ? styles.active_drawer : styles.inactive_drawer
        }`}
      >
        <h4>Choose region:</h4>
        <br />
        <form className="container">
          <div className="row">
            <label>
              Central
              <input
                type="radio"
                value="Central"
                checked={newLocation === "Central"}
                onChange={(event) => {
                  setNewLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              North
              <input
                type="radio"
                value="North"
                checked={newLocation === "North"}
                onChange={(event) => {
                  setNewLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              East
              <input
                type="radio"
                value="East"
                checked={newLocation === "East"}
                onChange={(event) => {
                  setNewLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              South
              <input
                type="radio"
                value="South"
                checked={newLocation === "South"}
                onChange={(event) => {
                  setNewLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              West
              <input
                type="radio"
                value="West"
                checked={newLocation === "West"}
                onChange={(event) => {
                  setNewLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              Current
              <input
                type="radio"
                value="Current"
                checked={newLocation === "Current"}
                onChange={(event) => {
                  setNewLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              Custom
              <input
                type="radio"
                value="Custom"
                checked={newLocation === "Custom"}
                onChange={(event) => {
                  setNewLocation(event.target.value);
                  setShowCustomField(true);
                }}
              />
            </label>
          </div>
        </form>
        {showCustomField && (
          <LocationCustomField
            coords={props.coords}
            longErr={longErr}
            latErr={latErr}
            setLongErr={setLongErr}
            setLatErr={setLatErr}
            longRef={longRef}
            latRef={latRef}
          />
        )}
        <hr />
        <div className="row">
          <button
            className="btn btn-primary col-md-6"
            onClick={(event) => {
              event.preventDefault();
              handleConfirm(true);
            }}
          >
            Confirm
          </button>
          <button
            className="btn btn-danger col-md-6"
            onClick={(event) => {
              event.preventDefault();
              handleConfirm(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function LocationModal(props: LocationModalProps) {
  const modalRoot = document.querySelector("#modal-root");
  if (modalRoot) {
    return ReactDOM.createPortal(
      <Overlay
        setCoords={props.setCoords}
        coords={props.coords}
        currLocation={props.currLocation}
        setCurrLocation={props.setCurrLocation}
        setShowLocation={props.setShowLocation}
        setLoading={props.setLoading}
      />,
      modalRoot
    );
  } else {
    throw new Error("No modal root defined!");
  }
}

export default LocationModal;
