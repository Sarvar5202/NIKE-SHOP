import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from './Loader';
import { useIsFetching } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';

const UserLayout = () => {
  const isFetching = useIsFetching();
  
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isFetching === 0) {
      const timer = setTimeout(() => setShowLoader(false), 800);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(true);
    }
  }, [isFetching]);

  return (
    <div className="app-container">
      <AnimatePresence>
        {showLoader && <Loader key="loader" />}
      </AnimatePresence>
      
      <div className="figma-container">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
