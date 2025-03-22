import React from 'react';
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

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
          
                <div className="flex flex-col items-center justify-center max-w-7xl px-6 py-8 mx-auto xl:flex-row gap-8 ">
                    {/* Left Column */}
                    <div className="w-full xl:w-1/2 space-y-16">
                        {/* Testimonial 1 */}
                        <blockquote className="relative flex flex-col-reverse items-center text-center 
                        md:flex-row md:text-left p-4 pt-6 bg-[#D6E4F0] 
                        rounded-lg transition-all duration-200 hover:bg-white hover:shadow-lg"
                        >
                        <Quote className="absolute w-8 h-8 text-[#37547C] fill-current top-4 left-6"/>


                        <div className="flex flex-col text-center md:text-start">
                            <div className="md:pl-12">
                            <p className="mt-2 text-gray-700">Joining seminars has never been this easy! I love how I can register with just a few clicks and receive my certificate instantly.</p>
                            </div>
                            <h3 className="pl-12 mt-3 text-base font-medium text-gray-800">Anna Rodriguez <span className="block text-sm text-gray-500">- Marketing Professional</span></h3>
                        </div>
                        <img className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full" src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2694&q=80" alt="Anna Rodriguez" />
                        </blockquote>

                        {/* Testimonial 2 */}
                        <blockquote className="relative flex flex-col-reverse items-center text-center 
                        md:flex-row md:text-left p-4 pt-6 bg-[#D6E4F0] 
                        rounded-lg transition-all duration-200 hover:bg-white hover:shadow-lg"
                        >
                        <Quote className="absolute w-8 h-8 text-[#37547C] fill-current top-4 left-6"/>

                        <div className="flex flex-col text-center md:text-start">
                            <div className=" md:pl-12">
                            <p className="mt-2 text-gray-700">No more filling out long forms every time I join a seminar! This platform saves so much time and effort.</p>
                            </div>
                            <h3 className="pl-12 mt-3 text-base font-medium text-gray-800">David Martinez <span className="block text-sm text-gray-500">- IT Specialist</span></h3>
                        </div>
                        <img className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full" src="https://images.unsplash.com/photo-1546820389-44d77e1f3b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80" alt="David Martinez" />
                        </blockquote>
                    </div>

                    {/* Right Column */}
                    <div className="w-full xl:w-1/2 space-y-16">
                        {/* Testimonial 3 */}
                        
                        <blockquote className="relative flex flex-col-reverse items-center text-center 
                        md:flex-row md:text-left p-4 pt-6 bg-[#D6E4F0] 
                        rounded-lg transition-all duration-200 hover:bg-white hover:shadow-lg"
                        >
                        <Quote className="absolute w-8 h-8 text-[#37547C] fill-current top-4 left-6"/>

                        <div className="flex flex-col text-center md:text-start">
                            <div className="relative md:pl-12">
                            <p className="mt-2 text-gray-700">Joining seminars has never been this hassle-free! I love how I can register quickly and receive my certificate without any complications.</p>
                            </div>
                            <h3 className="pl-12 mt-3 text-base font-medium text-gray-800">Michael Lee <span className="block text-sm text-gray-500">- HR Manager</span></h3>
                        </div>
                        <img className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1700&q=80" alt="Michael Lee" />
                        </blockquote>

                        {/* Testimonial 4 */}
                        <blockquote className="relative flex flex-col-reverse items-center text-center 
                        md:flex-row md:text-left p-4 pt-6 bg-[#D6E4F0] 
                        rounded-lg transition-all duration-200 hover:bg-white hover:shadow-lg"
                        >
                        <Quote className="absolute w-8 h-8 text-[#37547C] fill-current top-4 left-6"/>

                        <div className="flex flex-col text-center md:text-start">
                            <div className="relative md:pl-12">
                            <p className="mt-2 text-gray-700">The automatic certification feature is a game-changer. No more waiting for days to receive my certificate!</p>
                            </div>
                            <h3 className="pl-12 mt-3 text-base font-medium text-gray-800">Sophia Kim <span className="block text-sm text-gray-500">- Educator</span></h3>
                        </div>
                        <img className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80" alt="Sophia Kim" />
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
