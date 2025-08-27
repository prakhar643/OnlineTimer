import React, { useState, useRef, useEffect } from "react";
import Alarm from "./Alarm";

export default function Timer() {
  const [timeInput, setTimeInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);

  // Countdown Logic
  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && running) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, timeLeft]);

  const handleSetTimer = () => {
    const seconds = parseInt(timeInput, 10);
    if (!isNaN(seconds) && seconds > 0) {
      setTimeLeft(seconds);
      setTimeInput("");
    }
  };

  const handleStartStop = () => {
    if (timeLeft > 0) {
      setRunning(!running);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Display Time */}
      <div className="text-5xl font-bold bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-8 py-4 rounded-2xl shadow-md">
        {formatTime(timeLeft)}
      </div>

      {/* Input */}
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Seconds"
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
          className="w-32 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSetTimer}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
        >
          Set
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleStartStop}
          className={`px-5 py-2 rounded-lg font-semibold shadow transition ${
            running
              ? "bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600"
              : "bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"
          }`}
        >
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={handleReset}
          className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>

      {/* Alarm */}
      <Alarm play={timeLeft === 0 && running} />
    </div>
  );
}
