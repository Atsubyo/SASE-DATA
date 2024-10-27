import React, { useState } from 'react';
import { NavBar } from '../src/components/NavBar';
import { Footer } from '../src/components/Footer';

interface AAR {
  full_name: string;
  AHC: {
    event_name: string;
    attended: boolean;
    timestamp: string | null;
  }[];
}

const check_uin = (uin: string) => {
  const uin_regex = new RegExp("^[0-9]{9}$");
  return uin_regex.test(uin);
};

const Attendance = () => {
  const [uin, set_uin] = useState('');
  const [attendance_data, set_attendance_data] = useState<AAR | null>(null);
  const [searching, set_searching] = useState(false);
  const [creating_user, set_creating_user] = useState(false);
  const [user_message, set_user_message] = useState('');
  const [unf, set_unf] = useState(false);

  //Fetching attendance data for a given UIN
  const attendance_fetcher = async () => {
    if (!check_uin(uin)) {
      alert("Invalid UIN. Please enter a valid 9-digit UIN.");
      return;
    }

    set_searching(true);
    set_attendance_data(null);
    set_user_message('');
    set_unf(false);

    try {
      const response = await fetch(`/api/attendance?uin=${uin}`);
      if (response.ok) {
        const jsonResponse = await response.json() as AAR;
        set_attendance_data(jsonResponse);
        set_user_message('');
      } else if (response.status === 404) {
        set_user_message('We could not find you, please register yourself by clicking the button below.');
        set_unf(true);
      } else {
        console.error("Failed to fetch attendance data");
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      set_searching(false);
    }
  };

  //Registration/Creation of a new user with the provided UIN
  const NUC = async () => {
    if (!check_uin(uin)) {
      alert("Invalid UIN. Please enter a valid 9-digit UIN.");
      return;
    }

    set_creating_user(true);
    set_user_message('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UIN: uin, name: 'New User' })
      });

      if (response.ok) {
        set_user_message('Registered successfully! Now checking attendance...');
        set_unf(false);
        await attendance_fetcher();
      } else {
        set_user_message('Failed to register new user.');
        console.error("Failed to register new user");
      }
    } catch (error) {
      console.error("Error creating new user:", error);
    } finally {
      set_creating_user(false);
    }
  };

  return (
    <div className="text-black flex flex-col min-h-screen bg-white">
      <div className="fixed w-full z-40">
        <NavBar />
      </div>

      <main className="flex-grow pt-20 pb-20">
        <div className="bg-white flex flex-col items-center justify-center">
          <div className="w-5/6 md:w-1/2 p-10 bg-white shadow-lg rounded-xl mt-10">
            <h1 className="font-bebas text-5xl">Check Your Attendance</h1>
            <p className="mb-2">Attendance leads to SASE points which can then be redeemed for raffle tickets for prizes at our annual banquet!</p>
            <input 
              type="text" 
              placeholder='Your UIN' 
              value={uin} 
              onChange={e => set_uin(e.currentTarget.value)} 
              className='w-full mb-4 p-2 bg-white border'
            />
            <button 
              onClick={attendance_fetcher}
              className='w-full bg-sky-700 hover:bg-sky-800 text-white font-semibold py-2 px-4 rounded mb-4'
              disabled={searching}
            >
              {searching ? 'Checking...' : 'Check Attendance'}
            </button>

            {user_message && (
              <div className="w-full mt-4 p-4 bg-yellow-200 text-yellow-900 rounded">
                <p>{user_message}</p>
              </div>
            )}

            {unf && (
              <button 
                onClick={NUC}
                className='w-full mt-4 bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded'
                disabled={creating_user}
              >
                {creating_user ? 'Registering...' : 'Register as New User'}
              </button>
            )}
          </div>

          {attendance_data && (
            <div className="w-5/6 md:w-1/2 p-10 bg-white shadow-lg rounded-xl mt-5">
              <h2 className="font-bebas text-3xl mb-3">{attendance_data.full_name}, your attendance history is as follows:</h2>
              <ul>
                {attendance_data.AHC.map((record, index) => (
                  <li key={index}>
                    {record.event_name}: {record.attended ? `Attended` : 'Did not attend'}
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
