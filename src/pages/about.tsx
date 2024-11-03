import React from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const about = () => {
  return (
    <div>
      <div className="fixed z-40 w-full">
        <NavBar />
      </div>
      <div className="flex h-max justify-center bg-white p-10 md:p-10"></div>
      <div className="bg-white font-source text-black">
        <div className="flex flex-col bg-white font-source md:flex-row">
          <div className="pl-10 pr-10 pt-10 md:w-1/2 md:pl-20">
            <a className="font-bebas text-5xl">OUR MISSION</a>
            <div className="pb-5 pt-5">
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
              <div className="font-bold">
                For more information about SASE's national mission, check out{" "}
                <a href="https://saseconnect.org" className="underline">
                  https://saseconnect.org
                </a>
                .
              </div>
            </div>
          </div>
          <div className="self-center pl-10 pr-10 pt-5 md:w-1/2">
            <img
              className="w-full rounded-xl"
              src="/scrc.jpg"
              width={400}
              height={300}
              alt="Picture of SASE SCRC"
            />
          </div>
        </div>

        <div className="flex h-max justify-center bg-white p-10 pt-20 md:p-20"></div>

        <div>
          <a className="pl-10 pr-5 pt-20 font-bebas text-5xl md:pl-20">
            Core Pilars
          </a>

          <section
            id="projects"
            className="grid justify-center gap-5 bg-white py-10 pl-10 pr-10 font-source text-lg text-black md:flex-row md:pl-20 md:pr-20 lg:flex"
          >
            <div className="w-100 card bg-base-100 shadow-lg md:w-96">
              <figure>
                <img src="/NC2.jpg" alt="NC" />
                <div className="text-shadow-md absolute inset-0 z-10 flex justify-center rounded-2xl pt-10 font-bebas text-3xl text-white opacity-0 duration-300 hover:bg-black hover:bg-opacity-25 hover:opacity-100">
                  SASE @ NC
                </div>
              </figure>
              <div className="card-body bg-white">
                <p className="pb-10">
                  Prepare Asian-heritage students for success in the
                  transnational, global business world.
                </p>
              </div>
            </div>

            <div className="w-100 card bg-base-100 shadow-lg md:w-96">
              <figure>
                <img
                  src="/LANTERN.jpg"
                  alt="Lantern Making Social"
                  title="Social"
                />
                <div className="text-shadow-md absolute inset-0 z-10 flex justify-center rounded-2xl pt-10 font-bebas text-3xl text-white opacity-0 duration-300 hover:bg-black hover:bg-opacity-25 hover:opacity-100">
                  Our Lantern Making Social!
                </div>
              </figure>
              <div className="card-body bg-white">
                <p className="pb-10">
                  Promote diversity and tolerance on campuses and in the
                  workplace.
                </p>
              </div>
            </div>

            <div className="w-100 card bg-base-100 shadow-lg md:w-96">
              <figure>
                <img src="/STEMFEST.jpg" alt="SASE at STEMFest" />
                <div className="text-shadow-md absolute inset-0 z-10 flex justify-center rounded-2xl pt-10 font-bebas text-3xl text-white opacity-0 duration-300 hover:bg-black hover:bg-opacity-25 hover:opacity-100">
                  SASE @ Stemfest
                </div>
              </figure>
              <div className="card-body bg-white">
                <p className="pb-10">
                  Provide opportunities for its members to make contributions to
                  their local communities.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="flex h-max justify-center bg-white p-5 md:p-20"></div>

        <div className="flex flex-col bg-white font-source md:flex-row">
          <div className="pl-10 pr-10 md:w-1/2 md:pl-20">
            <a className="font-bebas text-5xl">Corporate Partnerships</a>
            <div className="pb-5 pt-5">
              <div>
                SASE is a non-profit 501(c)3 organization, and contributions to
                SASE are tax deductible.
              </div>
              <button className="mt-5 rounded border bg-sky-700 bg-opacity-75 px-4 py-2 text-white hover:bg-sky-700 hover:text-white">
                <a href="/sponsor">Learn more!</a>
              </button>
            </div>
          </div>
          <div className="self-center pl-10 pr-10 pt-5 md:w-1/2">
            <img
              className="w-full rounded-xl"
              src="/INFO.jpg"
              width={600}
              height={400}
              alt="Picture of SASE Meeting"
            />
          </div>
        </div>

        <div className="flex h-max justify-center bg-white p-10 pt-20 md:p-20"></div>
      </div>

      <div className="flex h-96 items-center justify-center bg-white bg-big bg-cover bg-fixed bg-center"></div>

      <Footer />
    </div>
  );
};

export default about;
