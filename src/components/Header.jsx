import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import nikeLogo from '../assets/nike-logo.svg';
import searchIcon from '../assets/search-icon.svg';
import heartIcon from '../assets/heart-icon.svg';
import bagIcon from '../assets/bag-icon.svg';

const Header = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <header className="header-wrapper">
        <Link to="/" className="flex items-center">
          <img src={nikeLogo} alt="Logo" className="w-[60px] h-[60px] dark:invert" />
        </Link>

        {/* Navigation Links */}
        <nav className="header-nav">
          <Link to="/" className="header-nav-link">{t('nav.new_featured')}</Link>
          <Link to="/" className="header-nav-link">{t('nav.men')}</Link>
          <Link to="/" className="header-nav-link">{t('nav.women')}</Link>
          <Link to="/" className="header-nav-link">{t('nav.kids')}</Link>
          <Link to="/" className="header-nav-link">{t('nav.sale')}</Link>
          <Link to="/" className="header-nav-link">{t('nav.snkrs')}</Link>
        </nav>

        {/* Actions (Search, Localization, Theme, Cart) */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:flex items-center text-black">
            <img src={searchIcon} alt="Search" className="absolute left-3 w-5 h-5" />
            <input
              type="text"
              placeholder={t('nav.search')}
              className="bg-[#f5f5f5] rounded-full pl-10 pr-4 py-2 text-[15px] font-medium outline-none transition-colors"
            />
          </div>

          <select 
            className="hidden sm:block bg-transparent text-sm outline-none dark:text-gray-100 dark:bg-gray-800" 
            onChange={handleLanguageChange} 
            defaultValue={i18n.language}
          >
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
          
          <button onClick={toggleDarkMode} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-xl">
            🌓
          </button>

          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <img src={heartIcon} alt="Heart" className="w-6 h-6 dark:invert" />
          </button>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors relative">
            <img src={bagIcon} alt="Bag" className="w-6 h-6 dark:invert" />
          </button>
        </div>
      </header>

      {/* Top Banner Message */}
      <div className="banner-message">
        <span className="text-[15px] font-medium">{t('home.hello')}</span>
        <span className="text-[11px] underline font-medium cursor-pointer">{t('home.download')}</span>
      </div>
    </>
  );
};

export default Header;
