import React from 'react';
import heroImg from '../assets/hero-image.png';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center bg-white dark:bg-black transition-colors duration-300">
      <div className="w-full px-10">
        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src={heroImg} 
          alt="NIKE Air Max Pulse" 
          className="w-full object-cover rounded-md" 
        />
      </div>

      <div className="flex flex-col items-center py-12 px-6 text-center max-w-[800px]">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[15px] font-medium mb-2 dark:text-gray-300"
        >
          {t('hero.first_look')}
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[48px] md:text-[56px] font-bold leading-[1.1] mb-6 uppercase dark:text-white"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[16px] mb-8 dark:text-gray-400"
        >
          {t('hero.description')}
        </motion.p>

        <div className="flex space-x-2">
          <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
            {t('hero.notify_me')}
          </button>
          <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
            {t('hero.shop_air_max')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
