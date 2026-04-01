import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import leftArrowIcon from '../assets/left-arrow.svg';
import rightArrowIcon from '../assets/right-arrow.svg';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="min-w-[400px] flex-shrink-0 cursor-pointer snap-start"
      onClick={() => navigate(`/product/${product.id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/product/${product.id}`); }}
    >
    <div className="bg-[#f5f5f5] w-[400px] h-[400px] mb-4">
      <img 
        src={product.image || ""} 
        alt={product.name || "Product"} 
        className="w-full h-full object-cover mix-blend-multiply p-4"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400'; }}
      />
    </div>
    <div className="flex justify-between items-start pe-4">
      <div>
        <h3 className="font-medium text-[15px]">{product.name || "Loading..."}</h3>
        <p className="text-[#757575] text-[15px]">{product.category}</p>
      </div>
      <p className="font-medium text-[15px]">₹ {product.price}</p>
    </div>
  </motion.div>
  );
};

const ProductSlider = ({ title }) => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products', 'shoes'],
    queryFn: async () => {
      const response = await api.get('/products?category=Shoes');
      return response.data;
    }
  });

  // For slider just take top 6 items
  const displayProducts = products.slice(0, 6);

  return (
    <div className="px-10 mb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[22px] font-medium">{title}</h2>
        <div className="flex items-center space-x-4">
          <span className="text-[15px] font-medium">Shop</span>
          <div className="flex space-x-2">
            <button className="bg-[#e5e5e5] p-3 rounded-full hover:bg-gray-300 transition-colors">
              <img src={leftArrowIcon} alt="Previous" className="w-5 h-5" />
            </button>
            <button className="bg-[#e5e5e5] p-3 rounded-full hover:bg-gray-300 transition-colors">
              <img src={rightArrowIcon} alt="Next" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="flex space-x-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
        {isLoading && <p>Loading products...</p>}
        {isError && <p>Error loading products.</p>}
        {!isLoading && !isError && displayProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
