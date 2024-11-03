import { type NextPage } from "next";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import Card from "../components/Card";

const Team: NextPage = () => {
  return (
    <div className="bg-white">
      <div className="fixed z-40 w-full">
        <NavBar />
      </div>
      <div className="flex justify-center pt-10 pt-20 font-bebas text-5xl text-black">
        meet our team
      </div>
      <div className="flex justify-center font-bebas text-4xl text-gray-400">
        Executive Board
      </div>
      <div className="flex flex flex-wrap flex-wrap justify-center gap-20 pt-10">
        <Card
          imageSrc="/headshots/24-25/Pres_Noah.JPG"
          name="Noah Saria"
          major="Computer Engineering '25"
          role="President"
          link="https://www.linkedin.com/in/noahdsaria/"
        />
        <Card
          imageSrc="/headshots/24-25/EVP_Amey.JPG"
          name="Amey Halappanavar"
          major="Aerospace Engineering '25"
          role="External Vice President"
          link="https://www.linkedin.com/in/ameyhalappanavar/"
        />
        <Card
          imageSrc="/headshots/24-25/IVP_Charisa.JPG"
          name="Charisa Chairat"
          major="Chemical Engineering '25"
          role="Internal Vice President"
          link="https://www.linkedin.com/in/charisa-chairat-8070a8268/"
        />
        <Card
          imageSrc="/headshots/24-25/Tres_Art.JPG"
          name="Art Young"
          major="Computer Science '25"
          role="Treasurer"
          link="https://www.linkedin.com/in/young-art/"
        />
        <Card
          imageSrc="/headshots/24-25/Secr_Jojo.JPG"
          name="Joseph Nguyen"
          major="Industrial Engineering '26"
          role="Secretary"
          link="https://www.linkedin.com/in/jojon/"
        />
      </div>
      <div className="flex justify-center pt-10 font-bebas text-4xl text-gray-400">
        General Officers
      </div>

      <div className="flex flex flex-wrap flex-wrap justify-center gap-20 pt-10">
        <Card
          imageSrc="/headshots/24-25\TMD_Sam.JPG"
          name="Samantha Li"
          major="Biochemistry '27"
          role="Tech Marketing Director"
          link="https://www.linkedin.com/in/samantha-li-069a282b7/"
        />
        <Card
          imageSrc="/headshots/24-25\Hist_Luis.JPG"
          name="Luis Albos"
          major="MXET '25"
          role="Historian"
          link="https://www.linkedin.com/in/luis-albos/"
        />
        <Card
          imageSrc="/headshots/24-25\SD_Nikki.JPG"
          name="Nikki Arackal"
          major="MMET '25"
          role="Social Director"
          link="null"
        />
        <Card
          imageSrc="/headshots/24-25\PR_Kiera.JPG"
          name="Kiera Ocampo"
          major="ENGR '27"
          role="Public Relations Director"
          link="https://www.linkedin.com/in/kiera-joy-ocampo-2aa054300/"
        />
        <Card
          imageSrc="/headshots/24-25\FD_Pranav.JPG"
          name="Pranav Moogala"
          major="Mechanical Engineering '26"
          role="Fundraising Director"
          link="https://www.linkedin.com/in/pranav-moogala-b826b221b/"
        />
        <Card
          imageSrc="/headshots/24-25\LD_Mya.JPG"
          name="Mya Tinsay"
          major="MXET '26"
          role="Logistics Director"
          link="https://www.linkedin.com/in/mya-tinsay/"
        />
        <Card
          imageSrc="/headshots/24-25\SC_Mihir.JPG"
          name="Mihir Kalvakaalva"
          major="MSEN '26"
          role="Science Chair"
          link="https://www.linkedin.com/in/mihir-kalvakaalva/"
        />
        <Card
          imageSrc="/headshots/24-25\SC_Nick.JPG"
          name="Nick Truong"
          major="CSEN '26"
          role="Sports Chair"
          link="https://www.linkedin.com/in/nick-truong/"
        />
      </div>
      <div className="flex justify-center pt-10 font-bebas text-4xl text-gray-400">
        Advisor
      </div>
      <div className="flex flex flex-wrap flex-wrap justify-center gap-20 pb-20 pt-10">
        <Card
          imageSrc="/headshots/advisor.jpg"
          name="Pauline Wade"
          major="Computer Science & Engineering"
          role="Associate Professor of Practice"
          link="https://www.linkedin.com/in/paulinewade"
        />
      </div>
      <div className="block flex h-96 items-center justify-center bg-white bg-officer_mobile bg-cover bg-fixed bg-center md:hidden"></div>
      <div className="flex hidden h-96 items-center justify-center bg-white bg-officer bg-cover bg-fixed bg-center md:block"></div>
      <Footer />
    </div>
  );
};

export default Team;
