const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-gray-900 text-white text-opacity-40 font-semibold uppercase text-xs tracking-widest bg-opacity-80 px-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 text-center lg:text-left py-10">
        <div>
          <div className="text-white opacity-50 text-4xl font-display">
            Certicode
          </div>
        </div>

        <div>
          <div className="font-display text-white uppercase text-sm tracking-widest mb-6">
            Quick Links
          </div>
          <a href="/seminars" className="block mb-4 text-xs ">
            Upcoming Seminars
          </a>
          <a href="/about" className="block mb-4 text-xs">
            About Us
          </a>
          <a href="/contact" className="block mb-4 text-xs">
            Contact
          </a>
        </div>
        <div>
          <div className="font-display text-white uppercase text-sm tracking-widest mb-6">
            Support
          </div>
          <a href="/faq" className="block mb-4 text-xs">
            FAQs
          </a>
          <a href="/help" className="block mb-4 text-xs">
            Help Center
          </a>
          <a href="/terms" className="block mb-4 text-xs">
            Terms & Conditions
          </a>
        </div>

        <div>
          <div className="font-display text-white uppercase text-sm tracking-widest mb-6">
            Stay Connected
          </div>
          <a href="https://facebook.com" className="block mb-4 text-xs">
            Facebook
          </a>
          <a href="https://twitter.com" className="block mb-4 text-xs">
            Twitter
          </a>
          <a href="https://linkedin.com" className="block mb-4 text-xs">
            LinkedIn
          </a>
        </div>
      </div>

      <div className="text-sm lg:text-base text-center font-heading font-light tracking-widest uppercase text-white opacity-75 pb-10">
        <p>&copy; {currentYear} Certicode. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
