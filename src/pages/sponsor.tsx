import React from "react";
import { NavBar } from "src/components/NavBar";
import { Footer } from "src/components/Footer";
import LogoList from "src/components/LogoList";

//NOTE THAT WHEN ADDING, FILE PATHS ARE CASE-SENSITIVE!

const sponsor = () => {
  const logosPlatinum = [
    {
      link: "https://chevron.com",
      alt: "Chevron",
      path: "./sponsors/chevron.png",
    },
    { link: "https://shell.com", alt: "Shell", path: "./sponsors/shell.png" },
    {
      link: "https://phillips66.com",
      alt: "Phillips 66",
      path: "./sponsors/phillips.png",
    },
    // Add more logo paths as needed
  ];
  const logosGold = [
    {
      link: "https://lockheedmartin.com",
      alt: "Lockheed Martin",
      path: "./sponsors/lockheed.png",
    },
    {
      link: "https://williams.com",
      alt: "Williams",
      path: "./sponsors/williams.png",
    },

    // Add more logo paths as needed
  ];
  const logosSilver = [
    { link: "https://dow.com", alt: "Dow", path: "./sponsors/dow.png" },
    {
      link: "https://southwest.com",
      alt: "Southwest",
      path: "./sponsors/southwest.png",
    },

    // Add more logo paths as needed
  ];
  const logosBronze = [
    {
      link: "https://capitalone.com",
      alt: "Capital One",
      path: "./sponsors/capital_one.png",
    },

    // Add more logo paths as needed
  ];

  return (
    <div>
      <div className="bg-white">
        <div className="z-4 fixed w-full">
          <NavBar />
        </div>

        <div className="flex h-max justify-center bg-white p-10 md:p-10"></div>

        <div className="flex flex-col bg-white font-source text-black md:flex-row">
          <div className="pb-10 pl-10 pr-10 pt-5 md:w-1/2 md:pb-20 md:pl-20">
            <a className="font-bebas text-5xl text-black">sponsorship</a>
            <div className="pb-5 pt-5">
              <div>
                SASE is a non-profit 501(c)3 organization, and contributions to
                SASE are tax deductible.
              </div>
              <div>
                If you are interested in partnering with SASE TAMU, we would
                love to get into contact with you at{" "}
                <a href="mailto:sasetamu.evp@gmail.com" className="underline">
                  sasetamu.evp@gmail.com!
                </a>
              </div>
              <div>Take a look at our current sponsorship package below.</div>
              <button className="mt-5 rounded border bg-sky-700 bg-opacity-75 px-4 py-2 text-white hover:bg-sky-700 hover:text-white">
                <a href="/SASE_TAMU_Corporate_Package.pdf">
                  View our Sponsorship Package Here!
                </a>
              </button>
            </div>
          </div>
          <div className="self-center pb-5 pl-10 pr-10 md:w-1/2 md:pt-5">
            <img
              className="rounded-xl"
              src="/INFO.jpg"
              width={1063}
              height={664}
              alt="SASE Fall Informational"
            />
          </div>
        </div>
        <div className="pt-20 text-center font-bebas text-5xl text-black">
          sponsor sase tamu
        </div>
        <div className="text-md p-5 pl-10 pr-10 text-center font-source text-black md:pl-40 md:pr-40">
          <div className="">
            We would like to thoroughly thank our sponsors for their continued
            support and cooperation.
          </div>
          <div className="">
            The success of our chapter depends on your support. Our sponsors are
            instrumental in helping us achieve our goals and create a more
            diverse and inclusive engineering and science community. We look
            forward to continuing our partnership and working together to make
            an even greater impact in the future.
          </div>
        </div>

        <div className="pl-20 pr-20">
          <div className="pt-5 text-center font-bebas text-5xl text-gray-300">
            Platinum
          </div>
          <LogoList images={logosPlatinum} />

          <div className="pt-5 text-center font-bebas text-5xl text-amber-300">
            Gold
          </div>
          <LogoList images={logosGold} />

          <div className="pt-5 text-center font-bebas text-5xl text-gray-600">
            Silver
          </div>
          <LogoList images={logosSilver} />

          <div className="pt-5 text-center font-bebas text-5xl text-amber-600">
            Bronze
          </div>
          <LogoList images={logosBronze} />
        </div>

        <div className="flex h-max justify-center bg-white p-10 pt-20 md:p-20"></div>
      </div>
      <div className="flex h-96 items-center justify-center bg-white bg-sponsor bg-cover bg-fixed bg-center"></div>
      <Footer />
    </div>
  );
};

export default sponsor;
