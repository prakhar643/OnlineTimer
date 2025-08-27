import React, { useEffect } from "react";

export default function Alarm({ play }) {
  useEffect(() => {
    if (play) {
      const audio = new Audio("/alarm.mp3");
      audio.play();
    }
  }, [play]);

  return null;
}
