import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import useCartStore from '../store/useCartStore';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const SHOE_SIZES = ['UK 3.5', 'UK 4', 'UK 4.5', 'UK 5', 'UK 5.5', 'UK 6', 'UK 6.5', 'UK 7', 'UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 10.5', 'UK 11', 'UK 12'];
const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const sliderRef = useRef(null);
  const { t } = useTranslation();

  const [selectedSize, setSelectedSize] = useState('L');
  const [isFavourite, setIsFavourite] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: allProducts = [] } = useQuery({
    queryKey: ['products-all'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
  });

  const relatedProducts = allProducts
    .filter(p => String(p.id) !== String(id))
    .slice(0, 8);

  const handleAddToBag = () => {
    if (!selectedSize) { 
      setShowSizeError(true); 
      return; 
    }
    
    addToCart({ 
      ...product, 
      quantity: 1, 
      size: selectedSize, 
      addedAt: new Date().toISOString() 
    });
    
    toast.success(t('cart.added_to_bag') || 'Savatga qo\'shildi!', {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) { 
      setShowSizeError(true); 
      return; 
    }
    handleAddToBag();
    navigate('/cart');
  };

  const scrollSlider = (dir) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir * 350, behavior: 'smooth' });
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-[#e5e5e5] border-t-[#111] rounded-full animate-spin" />
    </div>
  );
  
  if (isError || !product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg text-[#666]">Product not found.</p>
      <Link to="/" className="underline text-[#111]">Back to Home</Link>
    </div>
  );

  const sizes = product.category === 'Clothing' ? CLOTHING_SIZES : SHOE_SIZES;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen pt-10"
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-12 mb-20">
        
        {/* LEFT: Images */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="aspect-square w-full bg-[#f5f5f5] flex items-center justify-center overflow-hidden rounded-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-[85%] h-[85%] object-contain hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-[#f5f5f5] rounded-lg animate-pulse" />
            <div className="aspect-square bg-[#f5f5f5] rounded-lg animate-pulse" />
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="w-full lg:w-[440px] flex flex-col">
          <div className="mb-8">
            <h1 className="text-[28px] font-medium leading-tight mb-2">{product.name}</h1>
            <p className="text-[16px] text-[#111] mb-2">{product.category === 'Shoes' ? "Men's Shoes" : product.category}</p>
            <div className="text-[20px] font-medium mt-4">
              MRP: ₹ {product.price.toLocaleString('en-IN')}.00
            </div>
            <p className="text-[14px] text-[#757575] mt-1">incl. of all taxes</p>
            <p className="text-[14px] text-[#757575]">(Also includes all applicable duties)</p>
          </div>

          {/* Size Selection */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className={`text-[16px] font-medium ${showSizeError && !selectedSize ? 'text-red-500' : ''}`}>
                Select Size
              </span>
              <button className="text-[16px] text-[#757575] hover:text-[#111] underline underline-offset-4 decoration-1">Size Guide</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setShowSizeError(false); }}
                  className={`py-3 text-[14px] font-medium rounded-sm border transition-all ${
                    selectedSize === size 
                      ? 'border-[#111] bg-[#111] text-white' 
                      : 'border-[#e5e5e5] hover:border-[#111] bg-white text-[#111]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleAddToBag}
              className="w-full bg-black text-white py-4 rounded-full font-medium text-[16px] transition-transform active:scale-95 hover:bg-[#333]"
            >
              Add to Bag
            </button>
            <button 
              onClick={() => setIsFavourite(!isFavourite)}
              className="w-full bg-white text-black border border-[#e5e5e5] py-4 rounded-full font-medium text-[16px] flex items-center justify-center gap-2 hover:border-[#111] transition-all"
            >
              Favourite 
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavourite ? "#111" : "none"} stroke="#111" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button 
              onClick={handleBuyNow}
              className="w-full bg-blue-600 text-white py-4 rounded-full font-medium text-[16px] mt-2 transition-transform active:scale-95 hover:bg-blue-700"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-12 text-[16px] leading-[1.6] text-[#111]">
            <p>{product.description}</p>
            <ul className="list-disc pl-5 mt-6 flex flex-col gap-2">
              <li>Colour Shown: Multi-Colour/Black</li>
              <li>Style: DZ4549-001</li>
              <li className="underline cursor-pointer font-medium mt-2">View Product Details</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-12 border-t">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[20px] font-medium">You Might Also Like</h2>
          <div className="flex gap-3">
            <button onClick={() => scrollSlider(-1)} className="w-12 h-12 rounded-full border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button onClick={() => scrollSlider(1)} className="w-12 h-12 rounded-full border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>

        <div 
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x"
        >
          {relatedProducts.map((p) => (
            <Link to={`/product/${p.id}`} key={p.id} className="min-w-[320px] lg:min-w-[380px] snap-start group">
              <div className="aspect-square bg-[#f5f5f5] mb-4 flex items-center justify-center rounded-lg overflow-hidden">
                <img src={p.image} alt={p.name} className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-[15px] font-medium text-[#111]">{p.name}</h3>
              <p className="text-[15px] text-[#757575]">{p.category}</p>
              <div className="text-[15px] font-medium mt-1">₹ {p.price.toLocaleString('en-IN')}</div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;


