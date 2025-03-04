import React from "react";
import img1 from "../../assets/images/house_3.jpg";
import img2 from "../../assets/images/house_4.jpg";
import { Link } from "react-router";

const LandingMain = () => {
  let seminars = [
    {
      name_of_seminar: "AI and the Future of Work",
      topics: ["Artificial Intelligence", "Automation", "Job Market Trends"],
      description:
        "A discussion on how AI is shaping the future of work and the skills needed to stay relevant.",
      date: "2025-03-15",
      location: "Tech Hub Conference Center, Manila",
      speaker_name: "Dr. Carlos Mendoza",
      organization_name: "TechVision AI Institute",
      speaker_image: "https://example.com/speakers/carlos_mendoza.jpg",
      certificate_template:
        "https://example.com/certificates/ai_seminar_template.pdf",
      about_the_speaker:
        "Dr. Mendoza is a renowned AI researcher and author of 'The AI Revolution'.",
    },
    {
      name_of_seminar: "Cybersecurity in the Digital Age",
      topics: ["Cyber Threats", "Data Protection", "Ethical Hacking"],
      description:
        "An informative seminar on the latest cybersecurity threats and best practices.",
      date: "2025-04-10",
      location: "Cyber Defense Academy, Cebu",
      speaker_name: "Ms. Joanna Cruz",
      organization_name: "CyberSec Philippines",
      speaker_image: "https://example.com/speakers/joanna_cruz.jpg",
      certificate_template:
        "https://example.com/certificates/cybersecurity_seminar_template.pdf",
      about_the_speaker:
        "Ms. Cruz is a certified ethical hacker and cybersecurity consultant with 10 years of experience.",
    },
    {
      name_of_seminar: "Web Development Trends 2025",
      topics: ["React.js", "Web 3.0", "Serverless Architecture"],
      description:
        "Exploring modern web development trends and technologies shaping the future.",
      date: "2025-05-20",
      location: "Innovate IT Conference Hall, Davao",
      speaker_name: "Engr. Mark Dela Torre",
      organization_name: "WebDev Community PH",
      speaker_image: "https://example.com/speakers/mark_delatorre.jpg",
      certificate_template:
        "https://example.com/certificates/webdev_seminar_template.pdf",
      about_the_speaker:
        "Engr. Dela Torre is a full-stack web developer and tech lead specializing in modern JavaScript frameworks.",
    },
    {
      name_of_seminar: "Cloud Computing and DevOps",
      topics: ["AWS", "Docker", "CI/CD Pipelines"],
      description:
        "A deep dive into cloud computing technologies and the DevOps culture.",
      date: "2025-06-05",
      location: "Cloud Tech Summit, Quezon City",
      speaker_name: "Mr. Raymond Tan",
      organization_name: "Cloud Innovators Inc.",
      speaker_image: "https://example.com/speakers/raymond_tan.jpg",
      certificate_template:
        "https://example.com/certificates/cloud_seminar_template.pdf",
      about_the_speaker:
        "Mr. Tan is a cloud solutions architect and DevOps engineer with expertise in AWS and Kubernetes.",
    },
    {
      name_of_seminar: "Ethical AI and Responsible Innovation",
      topics: ["AI Ethics", "Bias in AI", "Responsible AI Development"],
      description:
        "A seminar on the ethical considerations in AI and how to ensure responsible innovation.",
      date: "2025-07-12",
      location: "AI Research Institute, Baguio",
      speaker_name: "Dr. Angela Santos",
      organization_name: "AI Ethics Foundation",
      speaker_image: "https://example.com/speakers/angela_santos.jpg",
      certificate_template:
        "https://example.com/certificates/ethical_ai_seminar_template.pdf",
      about_the_speaker:
        "Dr. Santos is an AI ethicist and researcher focusing on fairness and transparency in AI systems.",
    },
  ];

  return (
    <main className="pt-16">
      <div className="z-1 relative w-full py-12 px-12 bg-[#37547C]">
        <div className="relative z-10 text-center py-24 md:py-48">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-12">
            Expand Your Knowledge with Expert-Led Seminars
          </h1>
          <a className="inline-block bg-[#B0C4DE] text-[#37547C] uppercase text-sm px-8 py-4 rounded-md">
            Browse Seminars
          </a>
        </div>
        <img
          src={img1}
          className="w-full h-full absolute inset-0 object-cover opacity-70"
          alt="Background"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-white p-12 md:p-24 flex justify-end items-center">
          <a href="{{ post.url }}">
            <img src={img1} className="w-full max-w-md rounded-2xl" />
          </a>
        </div>
        <div className="bg-[#B0C4DE] p-12 md:p-24 flex justify-start items-center">
          <div className="max-w-md">
            <div className="w-24 h-2 bg-[#37547C] mb-4"></div>
            <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-6">
              Join seminars anytime, anywhere!
            </h2>
            <p className="font-light text-[#677D9B] text-sm md:text-base mb-6 leading-relaxed">
              Whether you're a guest or a registered user!
            </p>
            <a
              href="{{ post.url }}"
              className="inline-block border-2 border-[#37547C] font-light text-[#37547C] text-sm uppercase tracking-widest py-3 px-8 hover:bg-[#37547C] hover:text-white"
            >
              Read more
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Available Seminars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {seminars.map((seminar, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <Link to={`/seminar/${index}`}>
                <img
                  src={img2}
                  alt="Seminar"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#37547C]">
                    {seminar.name_of_seminar}
                  </h3>
                  <p className="text-sm text-[#677D9B]">
                    Organized by {seminar.organization_name}
                  </p>
                  <p className="text-xs text-[#677D9B]">
                    📅 {new Date(seminar.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-[#677D9B]">
                    📍 {seminar.location}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/seminars" className="text-[#37547C] font-bold text-lg">
            View All Seminars →
          </Link>
        </div>
      </div>

      <img src={img2} className="w-full h-screen object-cover" />

      <div className="max-w-xl mx-auto text-center py-24 md:py-32">
        <div className="w-24 h-2 bg-[#37547C] mb-4 mx-auto"></div>
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
          Gain valuable insights
        </h2>
        <p className="font-light text-gray-600 mb-6 leading-relaxed">
          Engage with top speakers, and earn a certification upon completion
        </p>
      </div>

      <div className="relative w-full py-12 px-12">
        <div className="relative z-10 text-center py-12 md:py-24">
          <h1 className="text-white text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6">
            Join, Learn, and Get Certified—For Free!
          </h1>
          <p className="text-white mb-10 text-base md:text-lg font-bold">
            No account? No problem! Join as a guest.
          </p>
          <a
            href="{{ home.footer_cta_button_link }}"
            className="inline-block bg-[#B0C4DE] text-[#37547C] uppercase text-sm tracking-widest font-heading px-8 py-4"
          >
            asdfasdfasdf
          </a>
        </div>

        <img
          src={img1}
          className="w-full h-full absolute inset-0 object-cover"
        />
      </div>

      <div className="text-center py-24 bg-[#B0C4DE]">
        <h2 className="text-3xl font-bold mb-4">asdfasdf</h2>
        <p className="text-gray-600 mb-6">asdfasdf</p>
      </div>

      <div className="relative w-full py-12 px-12 bg-[#37547C] text-center text-white">
        <h1 className="text-3xl font-bold mb-6">asdfasdf</h1>
        <p className="mb-6">asdfas</p>
        <a className="inline-block bg-[#37547C] text-white text-sm px-8 py-4 rounded-md">
          asdfasdf
        </a>
      </div>
    </main>
  );
};

export default LandingMain;
