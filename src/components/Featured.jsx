import React from 'react';
import { motion } from 'framer-motion';
import featuredImage from '../assets/featured.png';
import { useTranslation } from 'react-i18next';

const Featured = () => {
  const { t } = useTranslation();

  return (
    <div className="px-10 mb-20">
      <h2 className="text-[22px] font-medium mb-4">{t('featured.title')}</h2>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="w-full h-[700px] mb-12">
          <img 
            src={featuredImage} 
            alt={t('featured.promo_title')} 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          <h1 className="text-[54px] font-black uppercase tracking-tight mb-4">
            {t('featured.promo_title')}
          </h1>
          <p className="text-[15px] text-[#111111] dark:text-[#ccc] mb-8">
            {t('featured.promo_description')}
          </p>
          <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            {t('featured.find_your_shoe')}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Featured;
