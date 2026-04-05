import React from 'react';
import twitterIcon from '../assets/twitter.svg';
import facebookIcon from '../assets/facebook.svg';
import youtubeIcon from '../assets/youtube.svg';
import instagramIcon from '../assets/instagram.svg';
import locationIcon from '../assets/location.svg';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white w-full px-10 pt-10 pb-4 text-[11px] font-medium leading-relaxed mt-20">
      <div className="flex flex-col md:flex-row justify-between pb-10 border-b border-[#333]">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-20 space-y-8 md:space-y-0 uppercase">
          <div className="flex flex-col space-y-4">
            <a href="#" className="hover:text-gray-400">{t('footer.find_store')}</a>
            <a href="#" className="hover:text-gray-400">{t('footer.become_member')}</a>
            <a href="#" className="hover:text-gray-400">{t('footer.signup_email')}</a>
            <a href="#" className="hover:text-gray-400">{t('footer.feedback')}</a>
            <a href="#" className="hover:text-gray-400">{t('footer.student_discounts')}</a>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="hover:text-gray-400 cursor-pointer">{t('footer.get_help')}</h4>
            <div className="flex flex-col space-y-2 text-[#7e7e7e] normal-case font-normal text-[11px]">
              <a href="#" className="hover:text-white">{t('footer.order_status')}</a>
              <a href="#" className="hover:text-white">{t('footer.delivery')}</a>
              <a href="#" className="hover:text-white">{t('footer.returns')}</a>
              <a href="#" className="hover:text-white">{t('footer.payment_options')}</a>
              <a href="#" className="hover:text-white">{t('footer.contact_inquiries')}</a>
              <a href="#" className="hover:text-white">{t('footer.contact_other')}</a>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="hover:text-gray-400 cursor-pointer">{t('footer.about')}</h4>
            <div className="flex flex-col space-y-2 text-[#7e7e7e] normal-case font-normal text-[11px]">
              <a href="#" className="hover:text-white">{t('footer.news')}</a>
              <a href="#" className="hover:text-white">{t('footer.careers')}</a>
              <a href="#" className="hover:text-white">{t('footer.investors')}</a>
              <a href="#" className="hover:text-white">{t('footer.sustainability')}</a>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-8 md:mt-0">
          <div className="w-[30px] h-[30px] rounded-full bg-[#7e7e7e] hover:bg-white transition-colors cursor-pointer flex items-center justify-center text-black p-1">
            <img src={twitterIcon} alt="Twitter" className="w-full h-full" />
          </div>
          <div className="w-[30px] h-[30px] rounded-full bg-[#7e7e7e] hover:bg-white transition-colors cursor-pointer flex items-center justify-center text-black p-1">
            <img src={facebookIcon} alt="Facebook" className="w-full h-full" />
          </div>
          <div className="w-[30px] h-[30px] rounded-full bg-[#7e7e7e] hover:bg-white transition-colors cursor-pointer flex items-center justify-center text-black p-1">
            <img src={youtubeIcon} alt="YouTube" className="w-full h-full" />
          </div>
          <div className="w-[30px] h-[30px] rounded-full bg-[#7e7e7e] hover:bg-white transition-colors cursor-pointer flex items-center justify-center text-black p-1">
            <img src={instagramIcon} alt="Instagram" className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-4 text-[#7e7e7e] text-[11px] font-normal">
        <div className="flex items-center space-x-4">
          <span className="text-white flex items-center">
            <img src={locationIcon} alt="Location" className="w-3 h-3 mr-1" />
            India
          </span>
          <span>© 2023 NIKE, Inc. All Rights Reserved</span>
        </div>
        <div className="flex space-x-4 hover:text-white">
          <a href="#">{t('footer.guides')}</a>
          <a href="#">{t('footer.terms_sale')}</a>
          <a href="#">{t('footer.terms_use')}</a>
          <a href="#">{t('footer.privacy_policy')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
