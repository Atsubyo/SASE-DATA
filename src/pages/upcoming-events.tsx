import React from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const upcoming_events = () => {
  return (
    <>
      <div className="bg-white">
        <div className="fixed z-40 w-full">
          <NavBar />
        </div>

        <div className="flex h-max justify-center bg-white p-10 md:p-10"></div>
        <div className="bg-white font-source text-black">
          <a className="pl-5 pr-5 pt-40 font-bebas text-5xl md:pl-20">
            Upcoming Events
          </a>
          <div className="hidden md:block">
            <div className="flex justify-center p-10 pb-10">
              <div className="googleCalendar">
                <iframe src="https://calendar.google.com/calendar/embed?src=sasetamu%40gmail.com&ctz=America%2FChicago"></iframe>
              </div>
            </div>
          </div>

          <div className="block md:hidden">
            <div className="flex justify-center pl-10 pr-10 pt-10">
              <div className="smgoogleCalendar">
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=sasetamu%40gmail.com&ctz=America%2FChicago&mode=AGENDA"
                  height="400"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-96 items-center justify-center bg-white bg-karaoke bg-cover bg-fixed bg-center"></div>
      <Footer />
    </>
  );
};

export default upcoming_events;
