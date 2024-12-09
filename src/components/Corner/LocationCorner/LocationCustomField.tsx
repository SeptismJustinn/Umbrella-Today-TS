import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import styles from "@styles/LocationCustomField.module.css";
import { CoordArray } from "common-types";

interface LocationCustomFieldProps {
  coords: CoordArray;
  longErr: boolean;
  setLongErr: Function;
  longRef: React.Ref<HTMLInputElement>;
  latErr: boolean;
  setLatErr: Function;
  latRef: React.Ref<HTMLInputElement>;
}

function LocationCustomField(props: LocationCustomFieldProps) {
  /**
   * Function to handle onChange for longitude input field.
   * @param val HTMLInputElement.value, which is returned as a string
   */
  function handleLongChange(value: string) {
    const val = Number(value);
    if (!Number.isNaN(val) && Number(val) > -180 && Number(val) < 180) {
      props.setLongErr(false);
    } else {
      props.setLongErr(true);
    }
  }

  /**
   * Function to handle onChange for latitude input field.
   * @param val HTMLInputElement.value, which is returned as a string
   */
  function handleLatChange(value: string) {
    const val = Number(value);
    // Input validation -90 to 90 only
    if (!Number.isNaN(val) && val > -90 && val < 90) {
      props.setLatErr(false);
    } else {
      props.setLatErr(true);
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <TextField
          error={props.longErr}
          variant="standard"
          label="Longitude"
          sx={{ width: "100%" }}
          defaultValue={props.coords[0]}
          onChange={(event) => handleLongChange(event.target.value)}
          helperText={props.longErr ? "Enter number between -180 and 180" : ""}
          inputRef={props.longRef}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">&deg;</InputAdornment>
              ),
            },
          }}
        />
      </div>
      <div>
        <TextField
          error={props.latErr}
          variant="standard"
          label="Latitude"
          sx={{ width: "100%" }}
          defaultValue={props.coords[1]}
          onChange={(event) => handleLatChange(event.target.value)}
          helperText={props.latErr ? "Enter number between -90 and 90" : ""}
          inputRef={props.latRef}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">&deg;</InputAdornment>
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default LocationCustomField;
