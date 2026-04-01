import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import leftArrowIcon from '../assets/left-arrow.svg';
import rightArrowIcon from '../assets/right-arrow.svg';
import { useNavigate } from 'react-router-dom';

const GearCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="min-w-[300px] flex-shrink-0 cursor-pointer snap-start"
      onClick={() => navigate(`/product/${product.id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/product/${product.id}`); }}
    >
    <div className="bg-[#f5f5f5] w-[300px] h-[300px] mb-4 overflow-hidden rounded-md">
      <img 
        src={product.image || ""} 
        alt={product.name || "Gear"} 
        className="w-full h-full object-cover mix-blend-multiply p-2" 
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1556821840-dc88570c9eb3?auto=format&fit=crop&q=80&w=300'; }}
      />
    </div>
    <div className="flex justify-between items-start pe-4">
      <div>
        <h3 className="font-medium text-[15px]">{product.name || "Loading..."}</h3>
        <p className="text-[#757575] text-[15px] max-w-[200px]">{product.description?.slice(0, 30)}...</p>
      </div>
      <p className="font-medium text-[15px] whitespace-nowrap">₹ {product.price}</p>
    </div>
    </motion.div>
  );
};

const GearUp = () => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products', 'clothing'],
    queryFn: async () => {
      const response = await api.get('/products?category=Clothing');
      return response.data;
    }
  });

  // Split clothing into Men's and Women's based on description
  const mensClothing = products.filter(p => String(p.description).toLowerCase().includes('men')).slice(0, 4);
  const womensClothing = products.filter(p => String(p.description).toLowerCase().includes('women')).slice(0, 4);

  return (
    <div className="px-10 mb-20 text-[#111111]">
      <h2 className="text-[22px] font-medium mb-6">Gear Up</h2>
      
      <div className="flex flex-col md:flex-row gap-10">
        {/* Shop Men's */}
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-end items-center mb-4 space-x-4">
            <span className="text-[15px] font-medium">Shop Men's</span>
            <div className="flex space-x-2">
              <button className="bg-[#e5e5e5] p-3 rounded-full hover:bg-gray-300">
                <img src={leftArrowIcon} alt="Previous" className="w-5 h-5" />
              </button>
              <button className="bg-[#e5e5e5] p-3 rounded-full hover:bg-gray-300">
                <img src={rightArrowIcon} alt="Next" className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
            {isLoading && <p>Loading men's gear...</p>}
            {isError && <p>Error loading data.</p>}
            {!isLoading && !isError && mensClothing.map(item => <GearCard key={item.id} product={item} />)}
          </div>
        </div>

        {/* Shop Women's */}
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-end items-center mb-4 space-x-4">
            <span className="text-[15px] font-medium">Shop Women's</span>
            <div className="flex space-x-2">
              <button className="bg-[#e5e5e5] p-3 rounded-full hover:bg-gray-300">
                <img src={leftArrowIcon} alt="Previous" className="w-5 h-5" />
              </button>
              <button className="bg-[#e5e5e5] p-3 rounded-full hover:bg-gray-300">
                <img src={rightArrowIcon} alt="Next" className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
            {isLoading && <p>Loading women's gear...</p>}
            {isError && <p>Error loading data.</p>}
            {!isLoading && !isError && womensClothing.map(item => <GearCard key={item.id} product={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GearUp;
