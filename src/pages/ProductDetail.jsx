import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const SHOE_SIZES = ['UK 3.5', 'UK 4', 'UK 4.5', 'UK 5', 'UK 5.5', 'UK 6', 'UK 6.5', 'UK 7', 'UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 10.5', 'UK 11', 'UK 12'];
const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const { t } = useTranslation();

  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const [ordered, setOrdered] = useState(false);

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
    .filter(p => p.id !== id)
    .slice(0, 8);

  const handleCheckout = async () => {
    if (!selectedSize) { setShowSizeError(true); return; }
    try {
      const order = {
        date: new Date().toISOString(),
        status: 'Processing',
        items: [{ productId: Number(id), quantity }],
        total: product.price * quantity,
      };
      await api.post('/orders', order);
      dispatch(addToCart({ ...product, quantity, size: selectedSize }));
      toast.success(t('cart.order_success') || 'Product zakaz qilindi!');
      setOrdered(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error(err);
      toast.error('Xatolik yuz berdi!');
    }
  };

  const scrollSlider = (dir) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir * 350, behavior: 'smooth' });
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div style={{ width: 40, height: 40, border: '3px solid #e5e5e5', borderTopColor: '#111', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
  if (isError || !product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg text-[#666]">Product not found.</p>
      <Link to="/" className="underline text-[#111]">Back to Home</Link>
    </div>
  );

  const sizes = product.category === 'Clothing' ? CLOTHING_SIZES : SHOE_SIZES;
  const subtotal = product.price * quantity;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      {/* Banner */}
      <div className="max-w-[1240px] mx-auto px-10 pt-4">
        <div className="bg-[#f5f5f5] p-3 rounded-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-[#111]">Free Delivery</span>
            <span className="text-[11px] text-[#111]">
              Applies to orders of ₹ 14 000.00 or more. <button className="underline font-medium decoration-1">View details</button>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-10 py-4 flex flex-col lg:flex-row gap-10">
        
        {/* LEFT: Items */}
        <div className="flex-1">
          <h1 className="text-[22px] font-medium text-[#111] mb-6">Bag</h1>

          {/* Item Row */}
          <div className="flex gap-6 py-6 items-start">
            {/* Image */}
            <div className="w-[150px] h-[150px] bg-[#f5f5f5] flex-shrink-0 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-[90%] h-[90%] object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-[15px] font-medium text-[#111]">{product.name}</h2>
                  <p className="text-[15px] text-[#757575]">{product.category === 'Shoes' ? "Men's Shoes" : product.category}</p>
                  <p className="text-[15px] text-[#757575]">{product.description?.split('.')[0]}</p>
                  
                  <div className="flex gap-10 mt-2 text-[15px] text-[#757575]">
                    <div className="flex items-center gap-2">
                      <span>Size</span>
                      <select 
                        value={selectedSize} 
                        onChange={e => setSelectedSize(e.target.value)}
                        className="bg-transparent border-none outline-none text-[#757575] cursor-pointer"
                      >
                        {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Quantity</span>
                      <select 
                        value={quantity} 
                        onChange={e => setQuantity(Number(e.target.value))}
                        className="bg-transparent border-none outline-none text-[#757575] cursor-pointer"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => setIsFavourite(!isFavourite)} className="hover:opacity-70">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavourite ? "#111" : "none"} stroke="#111" strokeWidth="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                    <button className="hover:opacity-70">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="text-[15px] text-[#111]">
                  MRP: ₹ {product.price.toLocaleString('en-IN')}.00
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-[#e5e5e5] my-2" />

          {/* Favourites Section */}
          <div className="mt-12">
            <h2 className="text-[19px] font-medium text-[#111] mb-2">Favourites</h2>
            <p className="text-[15px] text-[#111]">There are no items saved to your favourites.</p>
          </div>
        </div>

        {/* RIGHT: Summary */}
        <aside className="w-full lg:w-[350px]">
          <h2 className="text-[21px] font-medium text-[#111] mb-6">Summary</h2>
          
          <div className="flex flex-col gap-3 text-[15px] text-[#111]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subtotal.toLocaleString('en-IN')}.00</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery & Handling</span>
              <span>Free</span>
            </div>
            
            <div className="border-b border-[#e5e5e5] my-2" />
            
            <div className="flex justify-between py-2 border-y border-[#e5e5e5]">
              <span>Total</span>
              <span className="font-medium">₹ {subtotal.toLocaleString('en-IN')}.00</span>
            </div>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={ordered}
            className={`w-full rounded-full py-4 mt-8 font-medium transition-all duration-300 ${
              ordered 
                ? 'bg-green-600 text-white cursor-default' 
                : 'bg-black text-white hover:bg-[#333] cursor-pointer'
            }`}
          >
            {ordered ? 'Buyurtma berildi! ✓' : 'Member Checkout'}
          </button>
        </aside>

      </div>

      {/* You Might Also Like Section */}
      <div className="max-w-[1240px] mx-auto px-10 py-12 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[19px] font-medium text-[#111]">You Might Also Like</h2>
          <div className="flex gap-3">
            <button 
              onClick={() => scrollSlider(-1)}
              className="w-[48px] h-[48px] rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#e5e5e5]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button 
              onClick={() => scrollSlider(1)}
              className="w-[48px] h-[48px] rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#e5e5e5]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x"
        >
          {relatedProducts.map((p) => (
            <Link 
              to={`/product/${p.id}`} 
              key={p.id} 
              className="min-w-[430px] snap-start mb-10"
            >
              <div className="aspect-square bg-[#f5f5f5] mb-4 flex items-center justify-center overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-[90%] h-[90%] object-contain hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[15px] font-medium text-[#111]">{p.name}</h3>
                <p className="text-[15px] text-[#757575]">{p.category === 'Shoes' ? "Men's Shoes" : p.category}</p>
                <div className="text-[15px] font-medium text-[#111] mt-1">
                  MRP : ₹ {p.price.toLocaleString('en-IN')}.00
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;

