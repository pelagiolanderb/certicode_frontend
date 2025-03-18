import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import browse from "../../assets/images/browse.jpg";
import register from "../../assets/images/register.jpg";
import attend from "../../assets/images/attend.jpg";

import BeatLoader from "../../components/loading/loading";
import LandingTestimonials from "./LandingTestimonials";
import { motion, useScroll, useTransform } from "framer-motion";
import model_about_us from "../../assets/images/model_about_us.png"
import seminar_model_image from "../../assets/images/seminar_model_image.png"
import training_model_image from "../../assets/images/training_model_image.png"
import banner_certicode_cta from "../../assets/images/banner_certicode_cta.png"

import bottom_page from "../../assets/images/bottom_page.png"
import top_page from "../../assets/images/top_page.png"
import background_page from "../../assets/images/background_page.png"
import banner_model from "../../assets/images/banner_model.png"


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

  const { scrollYProgress } = useScroll();

  // Hero title moves up while scrolling
  const scrollUpAnimation = useTransform(scrollYProgress, [0, 1], [100, -100]);



  return (
    <>
    <div 
    className=" text-gray-300 bg-cover bg-fixed bg-center"
    >
      <section className="flex h-screen bg-white">
        {/* Left Side - Image & Graphics */}
        <div className="relative flex-1/2 h-full w-full justify-center items-center">
          {/* Top Left Triangle */}
          <motion.img 
          src={top_page} className="absolute top-0 right-0 w-155 h-75"
          initial={{ y: -100, opacity:0}}  // No opacity change
          animate={{ y: 0, opacity:1 }}
          transition={{ duration: .5, delay:.5 }}
          />

          {/* Background Image */}
          <motion.img 
          src={background_page} className="absolute top-0 left-0 h-full w-auto]" 
          initial={{ x: -100, opacity:0 }}  // No opacity change
          animate={{ x: 0, opacity:1 }}
          transition={{ duration: .5, delay:.5 }}
          />

          {/* Banner Model (People Holding Laptop) */}
          <motion.img 
          src={banner_model} className="absolute bottom-0 z-20 h-auto w-auto max-h-[90%]" 
          initial={{ x: -100, opacity:0 }}  // No opacity change
          animate={{ x: 0, opacity:1 }}
          transition={{ duration: .5, delay:.5 }}
          />

          {/* Bottom Small Triangle */}
          <motion.img 
          src={bottom_page} className="absolute bottom-0 left-0 w-40 h-auto rounded-lg z-30" 
          initial={{ y: 100, opacity:0 }}  // No opacity change
          animate={{ y: 0, opacity:1}}
          transition={{ duration: .5, delay:.5 }}
          />
        </div>

        {/* Right Side - Hero Content */}
        <div className=" flex flex-col flex-1/3 justify-center">
          <motion.span 
          className="pb-10 text-6xl font-bold text-blue-900"
          initial={{ x: 100, opacity:0 }}  // No opacity change
          animate={{ x: 0, opacity:1 }}
          transition={{ duration: .5, delay:.5 }}
          >
            CERTICODE
          </motion.span>
          <motion.span 
          className="pb-4 text-2xl text-blue-900"
          initial={{ x: 100, opacity:0 }}  // No opacity change
          animate={{ x: 0, opacity:1 }}
          transition={{ duration: .5, delay:.5 }}
          >
            Seamless Certificate Creation & Delivery!
          </motion.span>
          <motion.p 
          className="pb-10 text-blue-900 leading-relaxed"
          initial={{ x: 100, opacity:0 }}  // No opacity change
          animate={{ x: 0, opacity:1}}
          transition={{ duration: .5, delay:.5 }}
          >
            Generate professional certificates in seconds,<br/> automate sending to attendees, and ensure a secure, reliable, and hassle-free experience.
          </motion.p>
          <motion.button 
          className="px-6 py-3 w-[30%] text-white bg-blue-900 rounded-4xl shadow-md hover:bg-blue-700 transition"
          initial={{ x: 100,opacity:0 }}  // No opacity change
          animate={{ x: 0,opacity:1 }}
          transition={{ duration: .5, delay:.5 }}
          >
            REGISTER NOW
          </motion.button>

        </div>
    </section>
      {/* <section className="flex">
        <div className="relative w-full h-screen bg-white">
            
              <img 
                src={top_page} 
                className="z-5 absolute top-0 right-130 h-70 w-160"
              />

              <img 
              src={banner_model}
              className=" absolute z-20 max-h-full right-170 bottom-0"
              />

              
              <img 
                src={background_page} 
                className="z-0 absolute  max-h-full max-w-full"
              />
             
              <img 
                src={bottom_page} 
                className="z-30 absolute bottom-0 left-0  h-30  max-w-full rounded-lg"
              />
        </div>

        <div>
          <div className="">
            <h1>Certicode</h1>
          </div>
          <div className="">
            <p>Seamless Certificate Creation & Delivery!</p>
          </div>
          <div className="">
            <p>Generate professional certificates in seconds, automate sending to attendees, and ensure a secure, reliable, and hassle-free experience.</p>
          </div>
          <div className="">
            <button>Register now!</button>
          </div>
        </div>
      </section> */}
      



      {/* How it Works Section */}
      <motion.section 
      className="relative py-24"
   
      >
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
      </motion.section>

      <div className="max-w-6xl mx-auto py-16 px-7 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Seminars Card */}
      <motion.div
        className="relative bg-gray-700 text-white rounded-lg shadow-lg flex flex-col text-left justify-between"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Text Section */}
        <div className="text-center mt-8">
          <h2 className="text-3xl font-bold mb-4">Seminars</h2>
          <p className="text-lg mb-6">
            Learn from industry experts and expand your knowledge.
          </p>
          <Link
            to="/seminar-list"
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold"
          >
            Learn More
          </Link>
        </div>

        {/* Image positioned in the right-bottom corner */}
        
        <img className="h-auto max-w-full" src={seminar_model_image} alt="Seminar" />
     
      </motion.div>



      {/* Training Programs Card */}
      <motion.div
        className="relative bg-blue-300 text-white rounded-lg shadow-lg flex flex-col text-left justify-between"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Text Section */}
        <div className="text-center mt-8">
          <h2 className="text-3xl font-bold mb-4">Training Programs</h2>
          <p className="text-lg mb-6">
            Gain hands-on experience and practical skills.
          </p>
          <Link
            to="/seminar-list"
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold"
          >
            Learn More
          </Link>
        </div>

        {/* Image positioned in the right-bottom corner */}
        
        <img className="h-auto max-w-full" src={training_model_image} alt="Seminar" />
     
      </motion.div>
    </div>


      {/* Upcoming Seminars Section */}
      <motion.div 
      id="seminar-list" 
      className="max-w-6xl mx-auto py-7 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800  mb-17">
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
          <Link to="/seminar-list" className="text-gray-800 font-bold text-lg">
            View All Seminars →
          </Link>
        </div>
      </motion.div>

      {/* About Us Section */}
      <section id="about-us" className="relative">
        <div
          className="w-full min-h-[600px] flex flex-col 
          md:flex-row items-center justify-center md:justify-end 
          px-6 md:px-0
          bg-gradient-to-b from-[#5882ED] to-white 
          about-us-bg
          "
        >
          {/* Text Content */}
          <div className="w-full md:w-1/2 p-6 md:p-10 text-center md:text-left">
            <h2 className="text-lg font-semibold text-white">About us</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Empowering Learners Through Knowledge
            </h1>
            <p className="mt-4 text-base md:text-lg text-white">
              At Certicode, we provide expert-led seminars designed to help you gain
              valuable skills and certifications. Our platform allows you to learn at
              your own pace, anywhere and anytime.
            </p>
            <p className="mt-4 text-base md:text-lg text-white">
              Whether you’re looking to upskill, switch careers, or just expand your
              knowledge, we are here to guide you with quality educational content and
              recognized certifications.
            </p>
          </div>

          {/* Image Section */}
          <div className="relative w-full md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
            <img
              src={model_about_us}
              alt="About Us"
              className="h-[300px] md:h-[450px] object-contain md:scale-100"
            />
          </div>
        </div>
      </section>



      
      {/* Testimonials */}
      <LandingTestimonials />
   

      {/* Call to Action */}
      <div 
      className="
      relative w-full flex flex-col-reverse 
      md:flex-row items-center 
      bg-gradient-to-t from-[#5882ED] to-white
      lg:bg-gradient-to-r lg:from-[#5882ED] lg:to-white 
      sm:bg-gradient-to-t sm:from-[#5882ED] sm:to-white
      md:bg-gradient-to-r md:from-[#5882ED] md:to-white "
      >
        {/* Content Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 md:p-10 w-full md:w-1/2 order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Innovate, Learn, and Lead <br /> with Certicode
          </h2>
          <p className="text-white mb-6">
            “Unlock endless career opportunities with our seminars.”
          </p>
          <Link to="/signup" className="bg-white text-[#5882ED] px-6 py-3 rounded-lg text-lg">
            Sign Up Now
          </Link>
        </div>

        {/* Background Image */}
        <div className="w-full md:w-1/2 order-2 md:order-1 flex justify-center">
          <img className="max-w-full h-[250px] md:h-[400px]" src={banner_certicode_cta} alt="Certicode Banner" />
        </div>
      </div>

      


    </div>




    </>
   
  );
};

export default LandingMain;
