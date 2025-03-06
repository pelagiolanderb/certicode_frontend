import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import browse from "../../assets/images/browse.jpg";
import register from "../../assets/images/register.jpg";
import attend from "../../assets/images/attend.jpg";
import landing_page from "../../assets/images/landing_page.jpg";
import about_us from "../../assets/images/about_us.jpg";
import hero from "../../assets/images/hero.jpg";
import BeatLoader from "../../components/loading/loading";
import LandingTestimonials from "./LandingTestimonials";
import LandingPageBg from "../../assets/images/LandingPageBg.jpg";
import { motion } from "framer-motion";

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
    className="relative bg-black text-gray-300 bg-cover bg-fixed bg-center"
    style={{ backgroundImage: `url(${LandingPageBg})` }} 
    >

      <div 
        className="relative bg-black text-gray-300 bg-cover bg-fixed bg-center h-screen flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${hero})` }} // Set hero as background
      >
        <div className="relative z-10 text-center px-6">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-12">
            Expand Your Knowledge with Expert-Led Seminars
          </h1>
          <Link
            to="/seminar-list"
            className="bg-[#B0C4DE] text-[#37547C] uppercase text-sm px-8 py-4 rounded-md"
          >
            Browse Seminars
          </Link>
        </div>
      </div>

      {/* How it Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-screen-xl px-6">
          <div className="text-center mb-12">
            <p className="text-[#37547C] text-lg font-semibold uppercase tracking-widest pb-3">
              How it Works
            </p>
            <p className="text-4xl text-[#37547C]  font-bold uppercase tracking-widest">
              {" "}
              Join seminars anytime, anywhere!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {howItWorksData.map((item, i) => (
              <div
                key={i}
                className="bg-[#D6E4F0] p-8 shadow-lg rounded-3xl flex flex-col items-center text-center relative mt-15"
              >
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 absolute -top-12">
                  <img
                    src={item.imgSrc}
                    className="w-16 h-16 object-contain"
                    alt={item.heading}
                  />
                </div>

                <h3 className="text-2xl font-semibold text-[#37547C] mt-12">
                  {item.heading}
                </h3>
                <p className="text-[#37547C] mt-2">{item.subheading}</p>
              </div>
            ))}
          </div>
        </div>
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
                    <p className="text-md text-[#37547C] pb-3">
                      Topic Corvered
                    </p>
                    <p className="text-sm text-gray-600 pb-3">
                      {seminar.topics}
                    </p>
                    <p className="text-xs text-gray-500 pb-3">
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
      <section id="about-us" className="py-24 bg-white">
        <div className="container mx-auto max-w-screen-xl px-6 grid grid-cols-1 md:grid-cols-2 items-center">

          {/* Text Section */}
          <div>
            <p className="text-lg font-semibold text-[#37547C] uppercase tracking-widest pb-3">
              About Us
            </p>
            <h2 className="text-4xl font-bold text-[#37547C] mb-6">
              Empowering Learners Through Knowledge
            </h2>
            <p className="text-gray-700 mb-6">
              At Certicode, we provide expert-led seminars designed to help you
              gain valuable skills and certifications. Our platform allows you
              to learn at your own pace, anywhere and anytime.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you’re looking to upskill, switch careers, or just expand
              your knowledge, we are here to guide you with quality educational
              content and recognized certifications.
            </p>
          </div>
          {/* Image Section */}
          <div className="ml-20">
            <img
              src={about_us}
              className="rounded-2xl shadow-lg"
              alt="About Us"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <LandingTestimonials />
   

      {/* Call to Action */}

      <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-12 p-12 md:p-24 items-center bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      >
        <div>
          <img
            src={landing_page}
            className="w-full max-w-md rounded-2xl shadow-lg"
            alt="Seminar"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#37547C] mb-4">
            Start Learning Today!
          </h2>
          <p className="text-[#37547C] mb-6">
            Join our community of learners and get certified.
          </p>

          <Link
            to="/signup"
            className="bg-[#B0C4DE] text-[#37547C] px-8 py-4 rounded-md font-bold"
          >
            Sign Up Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingMain;
