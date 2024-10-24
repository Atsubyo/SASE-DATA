import React, { useState } from 'react';
import { NavBar } from '../src/components/NavBar';
import { Footer } from '../src/components/Footer';

interface AttendanceApiResponse {
  attendedEvents: string[];
}

const check_uin = (uin: string) => {
  const uin_regex = new RegExp("^[0-9]{9}$");
  return uin_regex.test(uin);
};

const Attendance = () => {
  const [uin, setUin] = useState('');
  const [attendedEvents, setAttendedEvents] = useState<string[]>([]);
  const [displayUIN, setDisplayUIN] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [isUserNotFound, setIsUserNotFound] = useState(false);

  // Fetch attendance data for a given UIN
  const fetchAttendance = async () => {
    if (!check_uin(uin)) {
      alert("Invalid UIN. Please enter a valid 9-digit UIN.");
      return;
    }

    setIsSearching(true);
    setAttendedEvents([]);
    setUserMessage('');
    setDisplayUIN(uin);
    setIsUserNotFound(false);

    try {
      const response = await fetch(`/api/attendance?uin=${uin}`);
      if (response.ok) {
        const jsonResponse = await response.json() as AttendanceApiResponse;
        if ('attendedEvents' in jsonResponse) {
          setAttendedEvents(jsonResponse.attendedEvents);
          setUserMessage('');
        } else {
          console.error("Invalid response structure:", jsonResponse);
        }
      } else if (response.status === 404) {
        setUserMessage('We could not find you, please register yourself by clicking the button below.');
        setIsUserNotFound(true);
      } else {
        console.error("Failed to fetch attendance data");
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // New User Creation based on given UIN
  const NUC = async () => {
    if (!check_uin(uin)) {
      alert("Invalid UIN. Please enter a valid 9-digit UIN.");
      return;
    }

    setIsCreatingUser(true);
    setUserMessage('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UIN: uin, name: 'New User' })
      });

      if (response.ok) {
        setUserMessage('Registered successfully! Now checking attendance...');
        setIsUserNotFound(false);

        // Verifying whether new user was created
        const resp_ver = await fetch(`/api/attendance?uin=${uin}`);
        if (resp_ver.ok) {
          await fetchAttendance();
        } else {
          setUserMessage('User creation failed or was not captured correctly.');
        }
      } else {
        setUserMessage('Failed to register new user.');
        console.error("Failed to register new user");
      }
    } catch (error) {
      console.error("Error creating new user:", error);
    } finally {
      setIsCreatingUser(false);
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
              onChange={e => setUin(e.currentTarget.value)} 
              className='w-full mb-4 p-2 bg-white border'
            />
            <button 
              onClick={fetchAttendance}
              className='w-full bg-sky-700 hover:bg-sky-800 text-white font-semibold py-2 px-4 rounded mb-4'
              disabled={isSearching}
            >
              {isSearching ? 'Checking...' : 'Check Attendance'}
            </button>
            
            {userMessage && (
              <div className="w-full mt-4 p-4 bg-yellow-200 text-yellow-900 rounded">
                <p>{userMessage}</p>
              </div>
            )}

            {isUserNotFound && (
              <button 
                onClick={NUC}
                className='w-full mt-4 bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded'
                disabled={isCreatingUser}
              >
                {isCreatingUser ? 'Registering...' : 'Register as New User'}
              </button>
            )}
          </div>

          {displayUIN && (
            <div className="w-5/6 md:w-1/2 p-10 bg-white shadow-lg rounded-xl mt-5">
              <h2 className="font-bebas text-3xl mb-3">(Spring '24) Attendance for UIN: {displayUIN}</h2>
              {attendedEvents.length > 0 ? (
                <ul>
                  {attendedEvents.map(event => (
                    <li key={event}>{event}</li>
                  ))}
                </ul>
              ) : (
                <p>No events attended yet.</p>
              )}
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
