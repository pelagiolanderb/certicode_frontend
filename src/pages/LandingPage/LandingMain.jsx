import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import browse from "../../assets/images/browse.jpg";
import register from "../../assets/images/register.jpg";
import attend from "../../assets/images/attend.jpg";
import landing_page from "../../assets/images/landing_page.jpg";
import banner_certicode_about_us from "../../assets/images/banner_certicode_about_us.png";
import hero from "../../assets/images/hero.jpg";
import BeatLoader from "../../components/loading/loading";
import LandingTestimonials from "./LandingTestimonials";
import LandingPageBg from "../../assets/images/LandingPageBg.jpg";
import { motion } from "framer-motion";
import model_about_us from "../../assets/images/model_about_us.png"
import banner_certicode_cta from "../../assets/images/banner_certicode_cta.png"
import banner_certicode_profile_cta from "../../assets/images/banner_certicode_profile_cta.PNG"

const LandingMain = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/seminars");
        const data = await res.json();
        setSeminars(data.slice(0, 3));
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeminars();
  }, []);

  const howItWorksData = [
    {
      imgSrc: browse,
      heading: "Browse Seminars",
      subheading: "Find topics that match your interests.",
    },
    {
      imgSrc: register,
      heading: "Register",
      subheading: "Sign up to track your progress.",
    },
    {
      imgSrc: attend,
      heading: "Attend & Get Certified",
      subheading: "Complete the seminar and receive your certification.",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div 
    className="relative text-gray-300 bg-cover bg-fixed bg-center"
    >

      <div 
        className="relative bg-gradient-to-b from-[#5882ED] to-blue-300 text-gray-300 bg-cover bg-fixed bg-center h-screen flex flex-col items-center justify-center"
       
      >
        <motion.div 
        className="relative z-10 text-center px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        >
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-12">
            Expand Your Knowledge with Expert-Led Seminars
          </h1>

          <Link
            to="/seminar-list"
            className="bg-white text-[#5882ED] uppercase text-sm px-8 py-4 rounded-md"
          >
            Browse Seminars
          </Link>
        </motion.div>
      </div>

      {/* How it Works Section */}
      <section className="relative py-24">
        {/* Background Layer with Opacity */}
        <div className="absolute inset-0 bg-white "></div>

        {/* Content Layer */}
        <motion.div 
        className="relative z-10 container mx-auto max-w-screen-xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        >
          <div className="text-center mb-12">
            <p className="text-gray-800 text-lg font-semibold uppercase tracking-widest pb-3">
              How it Works
            </p>
            <p className="text-4xl text-gray-800 font-bold uppercase tracking-widest">
              Join seminars anytime, anywhere!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {howItWorksData.map((item, i) => (
              <div
                key={i}
                className="bg-blue-200 p-8 shadow-lg rounded-3xl flex flex-col items-center text-center relative mt-15"
              >
                <motion.div 
                className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 absolute -top-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
                >
                  <img
                    src={item.imgSrc}
                    className="w-16 h-16 object-contain"
                    alt={item.heading}
                  />
                </motion.div>

                <h3 className="text-2xl font-semibold text-gray-800 mt-12">
                  {item.heading}
                </h3>
                <p className="text-gray-800 mt-2">{item.subheading}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>


      {/* Upcoming Seminars Section */}
      <motion.div 
      id="seminar-list" 
      className="max-w-6xl mx-auto py-12 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-center text-white  mb-8">
          Upcoming Seminars
        </h2>
        {loading ? (
          <BeatLoader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {seminars.map((seminar) => (
              <div
                key={seminar.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <Link to={`/seminar/${seminar.id}`}>
                  <img
                    src={`http://localhost:8000/storage/${seminar.seminar_image}`}
                    alt="Seminar"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#37547C] pb-2">
                      {seminar.name_of_seminar}
                    </h3>
                    <p className="text-sm text-gray-600 pb-3">
                      Organized by {seminar.organization_name}
                    </p>
                    <p className="text-md text-[#37547C] pb-1">
                      Topic Corvered
                    </p>
                    <p className="text-sm bg-[#B0C4DE] text-[#37547C] px-1 inline rounded-lg">
                      {seminar.topics}
                    </p>
                    <p className="text-xs text-gray-500 pt-3 pb-3">
                      📅 {new Date(seminar.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500 pb-3">
                      📍 {seminar.location}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link to="/seminar-list" className="text-white font-bold text-lg">
            View All Seminars →
          </Link>
        </div>
      </motion.div>

      {/* About Us Section */}
      <section id="about-us" className="relative">
        <div
          className="w-full h-[600px] flex items-center justify-end"
          style={{
            backgroundImage: `url(${banner_certicode_about_us})`,
            backgroundSize: "100% 100%", 
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="w-1/2 p-10">
            <h2 className="text-xl font-semibold text-white">About us</h2>
            <h1 className="text-4xl font-bold text-white">
              Empowering Learners Through Knowledge
            </h1>
            <p className="mt-4 text-lg text-white">
              At Certicode, we provide expert-led seminars designed to help you gain
              valuable skills and certifications. Our platform allows you to learn at
              your own pace, anywhere and anytime.
            </p>
            <p className="mt-4 text-lg text-white">
              Whether you’re looking to upskill, switch careers, or just expand your
              knowledge, we are here to guide you with quality educational content and
              recognized certifications.
            </p>
          </div>

          <div className="relative w-1/2 flex justify-end overflow-hidden pt-37 pr-25">
            <img src={model_about_us} alt="About Us" className="h-[450px] object-contain scale-155" />
          </div>
        </div>
      </section>


      
      {/* Testimonials */}
      <LandingTestimonials />
   

      {/* Call to Action */}
      <div className="relative">
        <div
          className="w-full h-[400px] flex items-center"
          style={{
            backgroundImage: `url(${banner_certicode_cta})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="grid grid-cols-2 w-full px-10">
            {/* Left Side Content */}
            <div className="pl-15 pb-15">
              <h2 className="text-4xl font-bold text-white mb-5 pt-10">
                Innovate, Learn, and Lead <br /> with Certicode
              </h2>
              <p className="text-white mb-8">
                “Unlock endless career opportunities with our seminars.”
              </p>
              <div className="pt-4">
                <Link
                  to="/signup"
                  className="bg-white text-[#5882ED] px-8 py-4 rounded-lg"
                >
                  Sign Up Now
                </Link>
              </div>
            </div>

            {/* Right Side Image (Inside Blue Oval) */}
            <div
              className="absolute top-1/2 right-20 transform -translate-y-20 -translate-x-12 flex justify-center items-center w-63 h-63 rounded-full bg-white overflow-hidden"
            >
              <img
                src={banner_certicode_profile_cta}
                className="w-80 h-80 object-contain pt-10 pr-3"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingMain;
