import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#000000] p-6 text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-8"
      >
        <span className="text-4xl font-bold tracking-tighter uppercase text-black dark:text-white">NIKE</span>
      </motion.div>
      <div className="w-[180px] h-1 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-4">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full bg-black dark:bg-white"
        />
      </div>
    </motion.div>
  );
};

export default Loader;
