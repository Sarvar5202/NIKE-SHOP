import React from 'react';
import { motion } from 'framer-motion';
import essentialMen from '../assets/essential-men.png';
import essentialWomen from '../assets/essential-women.png';
import essentialKids from '../assets/essential-kids.png';
import { useTranslation } from 'react-i18next';

const Essentials = () => {
  const { t } = useTranslation();

  return (
    <div className="px-10 mb-20">
      <h2 className="text-[22px] font-medium mb-6 dark:text-white">{t('essentials.title')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative h-[540px] cursor-pointer"
        >
          <img 
            src={essentialMen} 
            alt={t('essentials.men')} 
            className="w-full h-full object-cover rounded-md bg-[#f5f5f5]" 
          />
          <button className="absolute bottom-8 left-8 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
            {t('essentials.men')}
          </button>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="relative h-[540px] cursor-pointer"
        >
          <img 
            src={essentialWomen} 
            alt={t('essentials.women')} 
            className="w-full h-full object-cover rounded-md bg-[#f5f5f5]" 
          />
          <button className="absolute bottom-8 left-8 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
            {t('essentials.women')}
          </button>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="relative h-[540px] cursor-pointer"
        >
          <img 
            src={essentialKids} 
            alt={t('essentials.kids')} 
            className="w-full h-full object-cover rounded-md bg-[#f5f5f5]" 
          />
          <button className="absolute bottom-8 left-8 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
            {t('essentials.kids')}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Essentials;
