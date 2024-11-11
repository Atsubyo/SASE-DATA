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
  const [uin, set_uin] = useState("");
  const [attendance_data, set_attendance_data] =
    useState<AttendanceApiResponse | null>(null);
  const [searching, set_searching] = useState(false);
  const [creating_user, set_creating_user] = useState(false);
  const [user_message, set_user_message] = useState("");
  const [unf, set_unf] = useState(false);

  //Fetching attendance data for a given UIN
  const attendance_fetcher = (): void => {
    if (!check_uin(uin)) {
      alert("Invalid UIN. Please enter a valid 9-digit UIN.");
      return;
    }

    set_searching(true);
    set_attendance_data(null);
    set_user_message("");
    set_unf(false);

    //const data =
    fetch(`/api/attendance?uin=${uin}`)
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
          console.error("Failed to fetch attendance data");
        }
      });

    set_searching(false);
  };

  //Registration/Creation of a new user with the provided UIN
  const NUC = (): void => {
    if (!check_uin(uin)) {
      alert("Invalid UIN. Please enter a valid 9-digit UIN.");
      return;
    }

    set_creating_user(true);
    set_user_message("");

    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UIN: uin, name: "New User" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new UserNotRegisteredError(
            "Failed to register new user.",
            response.status
          );
        }
        set_user_message("Registered successfully! Now checking attendance...");
        set_unf(false);
        attendance_fetcher();
      })
      .catch((error: Error) => {
        if (error instanceof UserNotFoundError) {
          set_user_message(error.message);
          console.error(error.message);
        } else {
          console.error("Error creating new user:", error);
        }
      });

    set_creating_user(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <div className="fixed z-40 w-full">
        <NavBar />
      </div>

      <main className="flex-grow pb-20 pt-20">
        <div className="flex flex-col items-center justify-center bg-white">
          <div className="mt-10 w-5/6 rounded-xl bg-white p-10 shadow-lg md:w-1/2">
            <h1 className="font-bebas text-5xl">Check Your Attendance</h1>
            <p className="mb-2">
              Attendance leads to SASE points which can then be redeemed for
              raffle tickets for prizes at our annual banquet!
            </p>
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

            {user_message && (
              <div className="mt-4 w-full rounded bg-yellow-200 p-4 text-yellow-900">
                <p>{user_message}</p>
              </div>
            )}

            {unf && (
              <button
                onClick={NUC}
                className="mt-4 w-full rounded bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800"
                disabled={creating_user}
              >
                {creating_user ? "Registering..." : "Register as New User"}
              </button>
            )}
          </div>

          {attendance_data && (
            <div className="mt-5 w-5/6 rounded-xl bg-white p-10 shadow-lg md:w-1/2">
              <h2 className="mb-3 font-bebas text-3xl">
                {attendance_data.full_name}, your attendance history is as
                follows:
              </h2>
              <ul>
                {attendance_data.AHC.map((record, index) => (
                  <li key={index}>
                    {record.event_name}:{" "}
                    {record.attended ? `Attended` : "Did not attend"}
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
