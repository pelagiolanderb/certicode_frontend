import React from 'react';
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import Seromines from "../../assets/images/Anthony A. Seromines.png";
import Morcillo from "../../assets/images/James Vincent A. Morcillo.png"
import Jimenez from "../../assets/images/Katrina O. Jimenez.png"
import Gaza from "../../assets/images/Paul Jasper L. Gaza.png"

const LandingTestimonials = () => {

    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };
  return (
    <>


        <motion.div 
    id="testimonials"
    className="flex items-center justify-center w-full px-8 py-16 border-t border-gray-200 md:py-16 lg:py-24 xl:py-40 xl:px-0"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeIn}
    >

          <div className="max-w-6xl mx-auto">
              <div className="flex-col items-center ">
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                    <h2 className="text-sm font-medium tracking-wider text-[#063F78] uppercase">What our users say</h2>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#063F78]">
                        Testimonials
                    </h3>
                    <h2 className="text-sm font-medium tracking-wider text-[#063F78] uppercase">        
                        See how our platform is making seminar participation easier and hassle-free for everyone.
                    </h2>
                   
                    <div className="w-20 h-1 bg-[#063F78] rounded-full mx-auto mt-2"></div>
                </div>
          
                  <div className="flex flex-col items-center justify-center max-w-2xl py-8 mx-auto xl:flex-row xl:max-w-full">
                      <div className="w-full xl:w-1/2 xl:pr-8">
                          <blockquote className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 text-center transition-all duration-200 bg-[#D6E4F0] rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease">
                              <div className="flex flex-col pr-8">
                                  <div className="relative pl-12">
                                    <Quote className="absolute left-0 w-8 h-8 text-[#37547C] fill-current"/>
                                      <p className="mt-2 text-base text-gray-700">Joining seminars has never been this easy! I love how I can register with just a few clicks and receive my certificate instantly.</p>
                                  </div>
                                  <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">Anthony A. Seromines <span className="mt-1 text-sm leading-5 text-gray-500 truncate">- Marketing Professional</span></h3>
                              </div>
                              <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                  src={Seromines}
                                  alt=""/>
                          </blockquote>
                          <blockquote className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 mt-16 mb-16 text-center transition-all duration-200 bg-[#D6E4F0] rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease xl:mb-0">
                              <div className="flex flex-col pr-10">
                                  <div className="relative pl-12">
                                      <Quote className="absolute left-0 w-8 h-8 text-[#37547C] fill-current"/>
                                      <p className="mt-2 text-base text-gray-700">No more filling out long forms every time I join a seminar! This platform saves so much time and effort.</p>
                                  </div>
                                  <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">James Vincent A. Morcillo <span className="mt-1 text-sm leading-5 text-gray-500 truncate">- IT Specialist</span></h3>
                              </div>
                              <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                  src={Morcillo}
                                  alt=""/>
                          </blockquote>
                      </div>
                      <div className="w-full xl:w-1/2 xl:pl-8">
                          <blockquote className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 text-center transition-all duration-200 bg-[#D6E4F0] rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease">
                              <div className="flex flex-col pr-10">
                                  <div className="relative pl-12">
                                      <Quote className="absolute left-0 w-8 h-8 text-[#37547C] fill-current"/>
                                      <p className="mt-2 text-base text-gray-700">Joining seminars has never been this hassle-free! I love how I can register quickly and receive my certificate without any complications.</p>
                                  </div>
                                  <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">Katrina O. Jimene <span className="mt-1 text-sm leading-5 text-gray-500 truncate">- HR Manager</span></h3>
                              </div>
                              <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                  src={Jimenez}
                                  alt=""/>
                          </blockquote>
                          <blockquote className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 mt-16 text-center transition-all duration-200 bg-[#D6E4F0] rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease">
                              <div className="flex flex-col pr-10">
                                  <div className="relative pl-12">
                                      <Quote className="absolute left-0 w-8 h-8 text-[#37547C] fill-current"/>
                                      <p className="mt-2 text-base text-gray-700">The automatic certification feature is a game-changer. No more waiting for days to receive my certificate!</p>
                                  </div>
                                  <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">Paul Jasper L. Gaza <span className="mt-1 text-sm leading-5 text-gray-500 truncate">- Educator</span></h3>
                              </div>
                              <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                  src={Gaza}
                                  alt=""/>
                          </blockquote>
                      </div>
                  </div>
              </div>
          </div>
        </motion.div>

    </>

  );
};

export default LandingTestimonials;
