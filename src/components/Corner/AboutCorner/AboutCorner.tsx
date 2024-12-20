import React, { useState } from "react";
import cornerStyle from "@styles/Corner.module.css";
import AboutModal from "./AboutModal";

function AboutCorner() {
  // State to toggle modal display.
  const [showAbout, setShowAbout] = useState<boolean>(false);

  return (
    <>
      <div
        className={`${cornerStyle.botLeft} ${cornerStyle.click}`}
        onClick={() => setShowAbout(true)}
      >
        About
      </div>
      {showAbout && <AboutModal setShowAbout={setShowAbout} />}
    </>
  );
}

export default AboutCorner;
