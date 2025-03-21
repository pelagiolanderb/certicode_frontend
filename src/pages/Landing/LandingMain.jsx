import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import BeatLoader from "../../components/loading/loading"
import LandingTestimonials from "./LandingTestimonials"
import { motion } from "framer-motion"
import seminar_model_image from "../../assets/images/seminar_model_image.png"
import training_model_image from "../../assets/images/training_model_image.png"

import bottom_page from "../../assets/images/bottom_page.png"
import top_page from "../../assets/images/top_page.png"
import background_page from "../../assets/images/background_page.png"
import banner_model from "../../assets/images/banner_model.png"
import about_us_background_img from "../../assets/images/about_us_background_img.jpg"

import { Laptop, ClipboardCheck, Medal, ChevronDown, ChevronUp } from "lucide-react"

const LandingMain = () => {
  const navigate = useNavigate()
  const [seminars, setSeminars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/seminars")
        const data = await res.json()
        setSeminars(data.slice(0, 3))
      } catch (error) {
        console.log("Error fetching data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSeminars()
  }, [])

  const steps = [
    {
      icon: <Laptop className="h-10 w-10" />,
      title: "Browse Seminars",
      description: "Find topics that match your interests.",
    },
    {
      icon: <ClipboardCheck className="h-10 w-10" />,
      title: "Register",
      description: "Sign up to track your progress.",
    },
    {
      icon: <Medal className="h-10 w-10" />,
      title: "Attend & Get Certified",
      description: "Complete the seminar and receive your certification.",
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  }

  const partners = [
    { id: 1, name: "Partner 1", logo: "/placeholder.svg" },
    { id: 2, name: "Partner 2", logo: "/placeholder.svg" },
    { id: 3, name: "Partner 3", logo: "/placeholder.svg" },
    { id: 4, name: "Partner 4", logo: "/placeholder.svg" },
    { id: 5, name: "Partner 5", logo: "/placeholder.svg" },
  ]

  const [openIndex, setOpenIndex] = useState(null)
  const faqs = [
    {
      question: "How do I create an account on Certicode?",
      answer:
        'To create an account, click the "Sign Up" button at the top right corner of the homepage. After registering, please verify your email address through the link sent to your inbox. You can start using your account once your email is verified.',
    },
    {
      question: "Can I join a seminar without creating an account?",
      answer:
        "Yes! You can join seminars as a guest without creating an account. However, creating an account allows you to track your seminars and access your certificates easily.",
    },
    {
      question: "How do I receive my certificate after completing a seminar?",
      answer:
        "If you've completed a paid seminar, the certificate will be sent to your registered email by the admin. Please ensure your email is verified and accurate to avoid issues.",
    },
    {
      question: "What happens if I haven't paid for a seminar yet?",
      answer:
        "Your certificate will be on hold until the payment is completed. Once verified, it will be sent to your registered email.",
    },
    {
      question: "What payment methods are accepted by Certicode?",
      answer:
        "Currently, we accept BPI and GCash for seminar payments. Please ensure to use these methods to complete your payment.",
    },
    {
      question: "Can I still join a seminar if I haven't paid yet?",
      answer:
        "Yes, you can join the seminar, but your certificate will only be released once your payment is verified.",
    },
    {
      question: "How can I check my payment status?",
      answer:
        "Log in to your verified account and check the seminar details to see if your payment has been verified. If you encounter any issues, please contact our support team.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <div className="flex flex-col bg-cover bg-fixed bg-center">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row md:flex-row bg-gray-200 lg:bg-white md:bg-white min-h-[50vh] lg:min-h-screen relative">
          <div className="w-full lg:w-1/2 relative flex justify-center items-center pt-10 lg:py-0 order-2 md:order-1 lg:order-1">
            {/* Background images only visible on larger screens */}
            <motion.img
              src={top_page}
              className="absolute hidden top-0 right-0 w-[70%] h-[38%] max-w-full
              lg:block 
              md:block"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />

            <motion.img
              src={background_page}
              className="absolute hidden lg:block md:block left-0 top-0 h-full w-auto"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />

            {/* Model image - centered on mobile, positioned on desktop */}
            <motion.img
              src={banner_model}
              className="relative z-20 h-auto w-auto max-h-[70vh] lg:max-h-[90%] lg:absolute lg:bottom-0 sm:bottom-0"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />

            <motion.img
              src={bottom_page}
              className="absolute bottom-0 left-0 w-32 md:w-40 h-auto rounded-lg z-30 hidden md:block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start px-6 md:px-12 pt-20 lg:py-12 order-1 md:order-2 lg:order-2">
            <motion.div
              className="pb-6 md:pb-10 text-4xl md:text-6xl font-bold text-blue-900 text-center lg:text-left"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              CERTICODE
            </motion.div>
            <motion.div
              className="pb-4 text-xl md:text-2xl text-blue-900 text-center lg:text-left"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Seamless Certificate Creation & Delivery!
            </motion.div>
            <motion.div
              className="pb-8 md:pb-10 text-blue-900 leading-relaxed text-center lg:text-left"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Generate professional certificates in seconds,
              <br className="hidden md:block" />
              automate sending to attendees, and ensure a secure,
              <br className="hidden md:block" />
              reliable, and hassle-free experience.
            </motion.div>
            <motion.button
              className="px-6 py-3 w-full sm:w-auto min-w-[200px] text-white bg-blue-900 rounded-full shadow-md hover:bg-blue-700 transition"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onClick={() => navigate("/signup")}
            >
              REGISTER NOW
            </motion.button>
          </div>
        </section>

        {/* How it Works Section */}
        <motion.section
          className="w-full py-12 md:py-16 bg-gradient-to-b from-white to-blue-50 px-4 md:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center space-y-4 mb-8 md:mb-12">
              <h2 className="text-sm font-medium tracking-wider text-[#063F78] uppercase">How It Works</h2>
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-[#063F78]">
                JOIN SEMINARS ANYTIME, ANYWHERE!
              </h3>
              <div className="w-20 h-1 bg-[#063F78] rounded-full mx-auto mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 md:mt-12 mb-8 md:mb-16 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-[#063F78] rounded-xl blur-md opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative flex flex-col items-center p-6 md:p-8 bg-white rounded-xl hover:shadow-md transition-shadow duration-300 h-full">
                    <div className="flex items-center justify-center w-14 md:w-16 h-14 md:h-16 rounded-full bg-blue-100 text-[#063F78] mb-4">
                      {step.icon}
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600 text-center">{step.description}</p>
                    <div className="mt-6">
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-600"
                            >
                              <path d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* seminar and training cards */}
        <motion.div
          className="w-full max-w-6xl mx-auto py-12 md:py-16 px-4 md:px-7 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          {/* Seminars Card */}
          <motion.div
            className="relative bg-gray-700 text-white rounded-lg shadow-lg flex flex-col text-left h-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Text Section */}
            <div className="text-center p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Seminars</h2>
              <p className="text-base md:text-lg mb-4 md:mb-6">
                Learn from industry experts and expand your knowledge.
              </p>
              <Link
                to="/seminar-list"
                className="bg-white text-blue-900 px-5 py-2 md:px-6 md:py-3 rounded-lg font-semibold inline-block"
              >
                Learn More
              </Link>
            </div>

            {/* Image container */}
            <div className="mt-auto w-full">
              <img
                className="w-full h-auto object-contain rounded-b-lg"
                src={seminar_model_image || "/placeholder.svg"}
                alt="Seminar"
              />
            </div>
          </motion.div>

          {/* Training Programs Card */}
          <motion.div
            className="relative bg-blue-300 text-white rounded-lg shadow-lg flex flex-col text-left h-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Text Section */}
            <div className="text-center p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Training Programs</h2>
              <p className="text-base md:text-lg mb-4 md:mb-6">Gain hands-on experience and practical skills.</p>
              <Link
                to="/seminar-list"
                className="bg-white text-blue-900 px-5 py-2 md:px-6 md:py-3 rounded-lg font-semibold inline-block"
              >
                Learn More
              </Link>
            </div>

            {/* Image container */}
            <div className="mt-auto w-full">
              <img
                className="w-full h-auto object-contain rounded-b-lg"
                src={training_model_image || "/placeholder.svg"}
                alt="Training Program"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Upcoming Seminars Section */}
        <motion.div
          id="seminar-list"
          className="w-full max-w-6xl mx-auto py-12 md:py-16 px-4 md:px-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="flex flex-col items-center text-center space-y-4 mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-[#063F78]">
              Upcoming Seminars
            </h3>
            <div className="w-20 h-1 bg-[#063F78] rounded-full mx-auto mt-2"></div>
          </div>

          {/* View All Seminars Link */}
          <div className="flex text-center mt-4 md:mt-8 justify-center md:justify-end">
            <Link
              to="/seminar-list"
              className="text-[#063F78] font-bold text-sm transition-all duration-300 hover:text-blue-300 hover:scale-105"
            >
              View All Seminars →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <BeatLoader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4">
              {seminars.map((seminar) => (
                <div key={seminar.id} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <Link to={`/seminar/${seminar.id}`}>
                    <img
                      src={`http://localhost:8000/storage/${seminar.seminar_image}`}
                      alt="Seminar"
                      className="w-full h-40 md:h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-[#37547C] pb-2 line-clamp-2">{seminar.name_of_seminar}</h3>
                      <p className="text-sm text-gray-600 pb-3">Organized by {seminar.organization_name}</p>
                      <p className="text-md text-[#37547C] pb-1">Topics Covered</p>
                      <p className="text-sm bg-[#B0C4DE] text-[#37547C] px-1 inline rounded-lg">{seminar.topics}</p>
                      <p className="text-xs text-gray-500 pt-3 pb-3">
                        📅 {new Date(seminar.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 pb-3">📍 {seminar.location}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* About Us Section */}
        <motion.section
          id="about-us"
          className="relative py-12 md:py-16 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="flex flex-col items-center text-center space-y-4 mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-[#063F78]">About Us</h3>
            <div className="w-20 h-1 bg-[#063F78] rounded-full mx-auto mt-2"></div>
          </div>

          {/* Mobile layout - stacked */}
          <div className="md:hidden px-4">
            <div className="text-[#063F78] space-y-4 mb-6">
              <h2 className="text-3xl font-bold font-display leading-tight">Empowering Learners Through Knowledge</h2>
              <p className="text-[#063F78] text-lg">
                At Certicode, we provide expert-led seminars designed to help you gain valuable skills and
                certifications. Our platform allows you to learn at your own pace, anywhere and anytime.
              </p>
              <p className="text-[#063F78] text-lg">
                Whether you're looking to upskill, switch careers, or just expand your knowledge, we are here to guide
                you with quality educational content and recognized certifications.
              </p>
            </div>
            <div className="w-full h-60 overflow-hidden rounded-lg">
              <img
                src={about_us_background_img || "/placeholder.svg"}
                alt="About Us"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Desktop layout with skew */}
          <div className="hidden md:flex items-center h-[500px]">
            {/* Text Section */}
            <div className="flex-1 text-[#063F78] pr-8 space-y-6 z-30 pl-10">
              <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
                Empowering Learners Through Knowledge
              </h2>
              <p className="text-[#063F78] text-lg md:text-xl">
                At Certicode, we provide expert-led seminars designed to help you gain valuable skills and
                certifications. Our platform allows you to learn at your own pace, anywhere and anytime.
              </p>
              <p className="text-[#063F78] text-lg md:text-xl">
                Whether you're looking to upskill, switch careers, or just expand your knowledge, we are here to guide
                you with quality educational content and recognized certifications.
              </p>
            </div>

            {/* vertical curve */}
            <div className="absolute w-2/3 top-0 bottom-0 z-20 transform -skew-x-12 bg-white"></div>

            {/* Image Section */}
            <div className="flex-1 h-full w-full z-10">
              <img
                src={about_us_background_img || "/placeholder.svg"}
                alt="About Us"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <LandingTestimonials />

        {/* FAQs section */}
        <motion.section
          className="w-full py-12 md:py-16 bg-[#f8fafc]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0a3977] mb-2">
                Frequently Asked Questions
              </h2>
              <div className="w-24 h-1 bg-[#0a3977] mx-auto mt-4 mb-6"></div>
              <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
                Find answers to common questions about using Certicode for your seminar and certification needs.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <button
                    className="w-full flex justify-between items-center p-4 md:p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-medium text-[#0a3977] text-sm md:text-base">{faq.question}</span>
                    <span className="text-[#0a3977] ml-2 flex-shrink-0">
                      {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96 p-4 md:p-5 bg-white" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-700 text-sm md:text-base">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Trust Badges section */}
        <motion.section
          className="w-full py-12 md:py-16 bg-gradient-to-b from-white to-blue-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-[#063F78]">
                Our Trusted Partners
              </h3>
              <div className="w-20 h-1 bg-[#063F78] rounded-full mx-auto mt-2"></div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-16 mt-8 md:mt-12">
              {partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  className="group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-24 h-20 sm:w-32 sm:h-24 md:w-36 md:h-28 flex items-center justify-center bg-white rounded-xl shadow-sm p-3 md:p-4 transition-all duration-300">
                    {/* Replace with your actual partner logos */}
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="max-h-12 md:max-h-16 max-w-full"
                    />
                  </div>
                  <p className="text-center text-xs sm:text-sm font-medium text-[#37547C] mt-2 md:mt-3">
                    {partner.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </>
  )
}

export default LandingMain