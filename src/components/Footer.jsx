import React from 'react';
import twitterIcon from '../assets/twitter.svg';
import facebookIcon from '../assets/facebook.svg';
import youtubeIcon from '../assets/youtube.svg';
import instagramIcon from '../assets/instagram.svg';
import locationIcon from '../assets/location.svg';

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full px-10 pt-10 pb-4 text-[11px] font-medium leading-relaxed mt-20">
      <div className="flex flex-col md:flex-row justify-between pb-10 border-b border-[#333]">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-20 space-y-8 md:space-y-0 uppercase">
          {/* Column 1 */}
          <div className="flex flex-col space-y-4">
            <a href="#" className="hover:text-gray-400">Find A Store</a>
            <a href="#" className="hover:text-gray-400">Become A Member</a>
            <a href="#" className="hover:text-gray-400">Sign Up for Email</a>
            <a href="#" className="hover:text-gray-400">Send Us Feedback</a>
            <a href="#" className="hover:text-gray-400">Student Discounts</a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-4">
            <h4 className="hover:text-gray-400 cursor-pointer">Get Help</h4>
            <div className="flex flex-col space-y-2 text-[#7e7e7e] normal-case font-normal text-[11px]">
              <a href="#" className="hover:text-white">Order Status</a>
              <a href="#" className="hover:text-white">Delivery</a>
              <a href="#" className="hover:text-white">Returns</a>
              <a href="#" className="hover:text-white">Payment Options</a>
              <a href="#" className="hover:text-white">Contact Us On Nike.com Inquiries</a>
              <a href="#" className="hover:text-white">Contact Us On All Other Inquiries</a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-4">
            <h4 className="hover:text-gray-400 cursor-pointer">About Nike</h4>
            <div className="flex flex-col space-y-2 text-[#7e7e7e] normal-case font-normal text-[11px]">
              <a href="#" className="hover:text-white">News</a>
              <a href="#" className="hover:text-white">Careers</a>
              <a href="#" className="hover:text-white">Investors</a>
              <a href="#" className="hover:text-white">Sustainability</a>
            </div>
          </div>
        </div>

        {/* Social Icons */}
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

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row justify-between mt-4 text-[#7e7e7e] text-[11px] font-normal">
        <div className="flex items-center space-x-4">
          <span className="text-white flex items-center">
            <img src={locationIcon} alt="Location" className="w-3 h-3 mr-1" />
            India
          </span>
          <span>© 2023 Nike, Inc. All Rights Reserved</span>
        </div>
        <div className="flex space-x-4 hover:text-white">
          <a href="#">Guides</a>
          <a href="#">Terms of Sale</a>
          <a href="#">Terms of Use</a>
          <a href="#">Nike Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
