import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero-image.png';

const Hero = () => {
  return (
    <div className="flex flex-col items-center pb-[84px]">
      {/* Main Image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full relative px-10"
      >
        <img 
          src={heroImage} 
          alt="Nike Air Max Pulse" 
          className="w-full object-cover object-center bg-[#f5f5f5]"
          style={{ height: '700px' }}
        />
      </motion.div>

      {/* Text Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12 flex flex-col items-center text-center max-w-[800px] px-4"
      >
        <p className="text-[15px] font-medium mb-1">First Look</p>
        <h1 className="text-[56px] font-black leading-[60px] uppercase mb-6 tracking-tight">
          Nike Air Max Pulse
        </h1>
        <p className="text-[15px] leading-6 mb-8 text-[#111111]">
          Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse <br/> 
          —designed to push you past your limits and help you go to the max.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Notify Me
          </button>
          <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Shop Air Max
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
