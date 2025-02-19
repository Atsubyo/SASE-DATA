"use client";
import React, { useState } from 'react';
import { NavBar } from "~/components/NavBar";
import { Footer } from "~/components/Footer";
import { UserNotFoundError, UserNotRegisteredError } from "~/types/errors";
import type { AttendanceApiResponse } from "~/types/AttendanceTypes";

const check_uin = (uin: string) => {
  const uin_regex = new RegExp("^[0-9]{9}$");
  return uin_regex.test(uin);
};

const Attendance = () => {
  const [mode, setMode] = useState<"view" | "register">("view"); // "view" mode by default
  const [uin, set_uin] = useState("");
  const [fullName, set_fullName] = useState("");       // For registration
  const [eventCode, set_eventCode] = useState("");       // For registration
  const [attendance_data, set_attendance_data] = useState<AttendanceApiResponse | null>(null);
  const [searching, set_searching] = useState(false);
  const [creating_user, set_creating_user] = useState(false);
  const [user_message, set_user_message] = useState("");
  const [unf, set_unf] = useState(false);

  // Existing function for viewing attendance remains unchanged:
  const attendance_fetcher = (): void => {
    if (!check_uin(uin)) {
      alert("Invalid UIN. Please enter a valid 9-digit UIN.");
      return;
    }

    set_searching(true);
    set_attendance_data(null);
    set_user_message("");
    set_unf(false);

    fetch(`https://localhost:3000/api/attendance?uin=${uin}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new UserNotFoundError(
            "We could not find you, please register yourself by clicking the button below.",
            response.status
          );
        }
        const jsonResponse = (await response.json()) as AttendanceApiResponse;
        set_attendance_data(jsonResponse);
        set_user_message("");
      })
      .catch((error: Error) => {
        if (error instanceof UserNotFoundError) {
          set_user_message(error.message);
          set_unf(true);
          console.error(error.message);
        } else {
          console.error("Failed to fetch attendance data", error);
        }
      })
      .finally(() => {
        set_searching(false);
      });
  };

  // New function for registering attendance:
  const registerAttendance = (): void => {
    // Validate fields
    if (!check_uin(uin)) {
      alert("Invalid UIN. Please enter a valid 9-digit UIN.");
      return;
    }
    if (!fullName.trim() || !eventCode.trim()) {
      alert("Please fill in both the Event Code and Full Name.");
      return;
    }
    set_creating_user(true);
    set_user_message("");

    // POST to a new API endpoint that handles registration
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UIN: uin,
        name: fullName,
        event: eventCode,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Registration failed");
        }
        const result = await response.json();
        set_user_message("Attendance registered successfully!");
      })
      .catch((error: Error) => {
        console.error("Error registering attendance:", error);
        set_user_message("Registration failed. Please try again.");
      })
      .finally(() => {
        set_creating_user(false);
      });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <div className="fixed z-40 w-full">
        <NavBar />
      </div>

      <main className="flex-grow pb-20 pt-20">
        <div className="flex flex-col items-center justify-center bg-white">
          <div className="mt-10 w-5/6 rounded-xl bg-white p-10 shadow-lg md:w-1/2">
            <h1 className="font-bebas text-5xl">Attendance Tracker</h1>
            <div className="mb-4 flex space-x-4">
              <button
                className={`rounded px-4 py-2 ${mode === "view" ? "bg-sky-700 text-white" : "bg-gray-300 text-black"}`}
                onClick={() => setMode("view")}
              >
                View Attendance
              </button>
              <button
                className={`rounded px-4 py-2 ${mode === "register" ? "bg-sky-700 text-white" : "bg-gray-300 text-black"}`}
                onClick={() => setMode("register")}
              >
                Register Attendance
              </button>
            </div>

            {mode === "view" && (
              <div>
                <input
                  type="text"
                  placeholder="Your UIN"
                  value={uin}
                  onChange={(e) => set_uin(e.currentTarget.value)}
                  className="mb-4 w-full border bg-white p-2"
                />
                <button
                  onClick={attendance_fetcher}
                  className="mb-4 w-full rounded bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800"
                  disabled={searching}
                >
                  {searching ? "Checking..." : "Check Attendance"}
                </button>
              </div>
            )}

            {mode === "register" && (
              <div>
                <input
                  type="text"
                  placeholder="Your UIN"
                  value={uin}
                  onChange={(e) => set_uin(e.currentTarget.value)}
                  className="mb-4 w-full border bg-white p-2"
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => set_fullName(e.currentTarget.value)}
                  className="mb-4 w-full border bg-white p-2"
                />
                <input
                  type="text"
                  placeholder="Event Code"
                  value={eventCode}
                  onChange={(e) => set_eventCode(e.currentTarget.value)}
                  className="mb-4 w-full border bg-white p-2"
                />
                <button
                  onClick={registerAttendance}
                  className="mb-4 w-full rounded bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800"
                  disabled={creating_user}
                >
                  {creating_user ? "Registering..." : "Register Attendance"}
                </button>
              </div>
            )}

            {user_message && (
              <div className="mt-4 w-full rounded bg-yellow-200 p-4 text-yellow-900">
                <p>{user_message}</p>
              </div>
            )}
          </div>

          {mode === "view" && attendance_data && (
            <div className="mt-5 w-5/6 rounded-xl bg-white p-10 shadow-lg md:w-1/2">
              <h2 className="mb-3 font-bebas text-3xl">
                {attendance_data.full_name}, your attendance history is as follows:
              </h2>
              <ul>
                {attendance_data.AHC.map((record, index) => (
                  <li key={index}>
                    {record.event_name}: {record.attended ? "Attended" : "Did not attend"}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Attendance;
