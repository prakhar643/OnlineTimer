import React, { useEffect, useState } from "react";
import Timer from "./components/Timer";

import Stopwatch from './components/StopWatch';

export default function App() {
  const [dark, setDark] = useState(() => {
    // optional: remember preference
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <header className="flex items-center justify-between p-6 shadow-md bg-indigo-600 dark:bg-indigo-800 text-white">
        <h1 className="text-2xl font-bold">Online Timer Tool</h1>
        <button
          onClick={() => setDark((v) => !v)}
          className="px-4 py-2 bg-white text-indigo-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <main className="flex flex-col items-center mt-10 px-4">
        <div className="grid w-full max-w-5xl gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold">Countdown Timer</h2>
            <Timer />
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold">Stopwatch</h2>
            <Stopwatch />
          </div>
        </div>
      </main>
    </div>
  );
}
