import React from 'react';
import { motion } from 'framer-motion';
import featuredImage from '../assets/featured.png';

const Featured = () => {
  return (
    <div className="px-10 mb-20">
      <h2 className="text-[22px] font-medium mb-4">Featured</h2>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="w-full h-[700px] mb-12">
          <img 
            src={featuredImage} 
            alt="Running in hills" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          <h1 className="text-[54px] font-black uppercase tracking-tight mb-4">
            Step Into What Feels Good
          </h1>
          <p className="text-[15px] text-[#111111] mb-8">
            Cause everyone should know the feeling of running in that perfect pair.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Find Your Shoe
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Featured;
