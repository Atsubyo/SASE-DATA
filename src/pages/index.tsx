"use client"; // This is a client component

import { type NextPage } from "next";
import Head from "next/head";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SASE TAMU</title>
      </Head>

      <div className="fixed z-40 w-full">
        <NavBar />
      </div>
      <div className="bg-white font-source text-black">
        <div className="mb-12 flex h-screen items-center justify-center bg-white bg-informational bg-cover bg-fixed bg-center">
          {/* DESKTOP */}
          <div className="animated animatedFadeInUp fadeInUp mt-12 hidden md:block">
            <div>
              <div className="dash md:dash-md mb-5"></div>
            </div>
            <div className="text-center">
              <div className="font-bebas text-8xl text-white">
                Howdy! We are SASE TAMU.
              </div>
            </div>
            <div>
              <div className="dash mt-3"></div>
            </div>
            <div className="mt-3 flex flex-row items-center justify-center space-x-5 font-source text-lg">
              <button className="mt-5 rounded border bg-sky-700 bg-opacity-75 px-4 py-2 text-white hover:bg-sky-700 hover:text-white">
                <a href="/join">Join SASE!</a>
              </button>
              <button className="mt-5 rounded border bg-slate-500 bg-opacity-25 px-4 py-2 text-white hover:bg-slate-500 hover:text-white">
                <a href="/upcoming-events">Upcoming Events</a>
              </button>
            </div>
          </div>

          {/* MOBILE */}
          <div className="animated animatedFadeInUp fadeInUp block md:hidden">
            <div>
              <div className="dash-sm mb-5"></div>
            </div>
            <div className="text-center">
              <div className="font-bebas text-7xl text-white">
                Howdy! We are SASE TAMU.
              </div>
            </div>
            <div>
              <div className="dash-sm mt-3"></div>
            </div>
            <div className="mt-3 flex flex-row items-center justify-center space-x-5 font-source text-lg">
              <button className="mt-5 rounded border bg-sky-700 bg-opacity-75 px-4 py-2 text-white hover:bg-sky-700 hover:text-white">
                <a href="/join">Join SASE!</a>
              </button>
              <button className="mt-5 rounded border bg-slate-500 bg-opacity-25 px-4 py-2 text-white hover:bg-slate-500 hover:text-white">
                <a href="/upcoming-events">Upcoming Events</a>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white font-source md:flex-row">
          <div className="pb-20 pl-10 pr-10 pt-5 md:w-1/2 md:pl-20">
            <a className="font-bebas text-5xl">Our Mission</a>
            <div className="pt-5 md:pb-5">
              <div>
                The Society of Asian Scientists and Engineers (SASE) was founded
                in November 2007 to help Asian heritage scientific and
                engineering professionals achieve their full potential.
              </div>
              <div className="font-bold">
                SASE is dedicated to the advancement of Asian heritage
                scientists and engineers in education and employment so that
                they can achieve their full career potential. In addition to
                professional development, SASE also encourages members to
                contribute to the enhancement of the communities in which they
                live.
              </div>
              <button className="mt-5 rounded border bg-sky-700 bg-opacity-75 px-4 py-2 text-white hover:bg-sky-700 hover:text-white">
                <a href="/about">Learn more!</a>
              </button>
            </div>
          </div>
          <div className="-mt-10 self-center pl-10 pr-10 md:mt-0 md:w-1/2">
            <img
              className="w-full rounded-xl"
              src="/LONESTAR.jpg"
              width={450}
              height={50}
              alt="Picture of SASE at Lonestar"
            />
          </div>
        </div>

        <div className="flex justify-center bg-white pt-10 md:p-10"></div>

        <a className="pb-10 pl-10 pr-5 font-bebas text-5xl md:pl-20">
          Upcoming Events
        </a>

        <div className="hidden md:block">
          <div className="flex justify-center p-10">
            <div className="googleCalendar">
              <iframe src="https://calendar.google.com/calendar/embed?src=sasetamu%40gmail.com&ctz=America%2FChicago"></iframe>
            </div>
          </div>
        </div>

        <div className="block md:hidden">
          <div className="flex justify-center pl-10 pr-10 pt-5">
            <div className="smgoogleCalendar">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=sasetamu%40gmail.com&ctz=America%2FChicago&mode=AGENDA"
                height="400"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="flex hidden h-max justify-center bg-white p-10 pt-20 md:block md:p-20"></div>
      </div>
      <div className="flex hidden h-96 items-center justify-center bg-white bg-cuties bg-cover bg-fixed bg-center md:block"></div>
      <div className="block flex h-96 items-center justify-center bg-white bg-elevator bg-cover bg-fixed bg-center md:hidden"></div>
      <Footer />
    </>
  );
};

export default Home;
