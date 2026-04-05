import React from 'react';
import { motion } from 'framer-motion';
import dontMissImage1 from '../assets/dont-miss-1.png';
import dontMissImage2 from '../assets/dont-miss-2.png';
import { useTranslation } from 'react-i18next';

const DontMiss = () => {
  const { t } = useTranslation();

  return (
    <div className="px-10 mb-20">
      <h2 className="text-[22px] font-medium mb-6 dark:text-white">{t('dont_miss.title')}</h2>
      
      <div className="flex flex-col mb-12">
        <div className="flex w-full h-[700px]">
          <div className="flex-1 mr-2">
            <img 
              src={dontMissImage1} 
              alt={t('dont_miss.promo_title')} 
              className="w-full h-full object-cover object-center bg-[#f5f5f5]" 
            />
          </div>
          <div className="flex-1 ml-2">
            <img 
              src={dontMissImage2} 
              alt={t('dont_miss.promo_title')} 
              className="w-full h-full object-cover object-center bg-[#f5f5f5]" 
            />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mt-12 mb-8 max-w-[800px] mx-auto"
        >
          <h1 className="text-[54px] font-black uppercase tracking-tight mb-4">
            {t('dont_miss.promo_title')}
          </h1>
          <p className="text-[15px] text-[#111111] dark:text-[#ccc] mb-8">
            {t('dont_miss.promo_description')}
          </p>
          <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            {t('dont_miss.shop')}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DontMiss;
