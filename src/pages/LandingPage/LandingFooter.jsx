import { Link } from "react-router-dom";

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToSeminarList = (e) => {
    e.preventDefault();
    const seminarSection = document.getElementById("seminar-list");
    if (seminarSection) {
      seminarSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about-us");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-800 text-white text-opacity-40 font-semibold uppercase text-xs tracking-widest bg-opacity-80 px-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 text-center lg:text-left py-10">
        {/* Brand Name */}
        <div>
          <div className="text-white opacity-50 text-4xl font-display">
            Certicode
          </div>
        </div>

        <div>
          <div className="font-display text-white uppercase text-sm tracking-widest mb-6">
            Quick Links
          </div>
          <Link
            to="#seminar-list"
            onClick={handleScrollToSeminarList}
            className="block mb-4 text-xs "
          >
            Upcoming Seminars
          </Link>
          <Link
            to="#about-us"
            onClick={handleScrollToAbout}
            className="block mb-4 text-xs"
          >
            About Us
          </Link>
        </div>

        {/*        
        <div>
          <div className="font-display text-white uppercase text-sm tracking-widest mb-6">
            Support
          </div>
          <a href="/faq" className="block mb-4 text-xs">FAQs</a>
          <a href="/help" className="block mb-4 text-xs">Help Center</a>
          <a href="/terms" className="block mb-4 text-xs">Terms & Conditions</a>
        </div> */}

        {/* Stay Connected */}
        <div>
          <div className="font-display text-white uppercase text-sm tracking-widest mb-6">
            Stay Connected
          </div>
          <a href="https://www.facebook.com/CertiCode" className="block mb-4 text-xs" target="_blank">
            Facebook
          </a>
          <a href="https://x.com/CertiCode?s=09" className="block mb-4 text-xs" target="_blank">
            X
          </a>
          <a href="https://www.linkedin.com/in/certi-code-501785355/?originalSubdomain=ph" className="block mb-4 text-xs" target="_blank">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/certi_code/" className="block mb-4 text-xs" target="_blank">
            Instagrram
          </a>
        </div>

        <div>
          <h2 className="font-display text-white uppercase text-sm tracking-widest mb-6" >
            Contact Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-center lg:text-left md: ">
            <div>
              <p className="block mb-4 text-xs">
                📍 <span>Your Address Here</span>
              </p>
              <p className="block mb-4 text-xs">
                📧 <span>codecerti@gmail.com</span>
              </p>
              <p className="block mb-4 text-xs">
                📞 <span>(123) 456-7890</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-sm lg:text-base text-center font-heading font-light tracking-widest uppercase text-white opacity-75 pb-10">
        <p>&copy; {currentYear} Certicode. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingFooter;
