import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCartStore from '../store/useCartStore';
import { useTranslation } from 'react-i18next';
import api from '../api/axios';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { items, total, removeFromCart, clearCart } = useCartStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const order = {
        date: new Date().toISOString(),
        status: 'Processing',
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          price: item.price
        })),
        total: total,
      };
      
      await api.post('/orders', order);
      
      toast.success(t('cart.order_success'), {
        position: "top-center",
        autoClose: 5000,
      });
      
      clearCart();
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error(err);
      toast.error('Error occurred. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1240px] mx-auto px-6 lg:px-10 py-12 min-h-[60vh] dark:bg-black"
    >
      <h1 className="text-[22px] font-medium text-[#111] dark:text-white mb-8">{t('cart.bag')}</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-20 bg-[#f5f5f5] dark:bg-[#111] rounded-xl transition-colors">
          <p className="text-xl text-[#666] dark:text-gray-400">{t('cart.empty')}</p>
          <Link 
            to="/" 
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:bg-[#333] dark:hover:bg-[#eee] transition-all"
          >
            {t('cart.shop_new')}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 flex flex-col gap-8">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-6 border-b border-[#e5e5e5] dark:border-[#222] pb-8 group">
                <div className="w-[150px] lg:w-[180px] h-[150px] lg:h-[180px] bg-[#f5f5f5] dark:bg-[#111] flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-[85%] h-[85%] object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h2 className="text-[17px] font-medium text-[#111] dark:text-white uppercase tracking-tighter">{item.name}</h2>
                      <div className="text-[17px] font-medium text-[#111] dark:text-white">₹ {item.price.toLocaleString('en-IN')}.00</div>
                    </div>
                    <p className="text-[15px] text-[#757575] dark:text-gray-400 mt-1">{item.category}</p>
                    <div className="flex gap-8 mt-4 text-[15px] text-[#757575] dark:text-gray-400">
                      <p>{t('product.select_size').split(' ')[1] || 'Size'}: <span className="text-[#111] dark:text-white font-medium">{item.size}</span></p>
                      <p>Quantity: <span className="text-[#111] dark:text-white font-medium">{item.quantity}</span></p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-[14px] text-[#757575] dark:text-gray-500 hover:text-red-600 underline underline-offset-4 decoration-1 transition-colors"
                    >
                      Remove
                    </button>
                    <button className="text-[14px] text-[#757575] dark:text-gray-500 hover:text-[#111] dark:hover:text-white underline underline-offset-4 decoration-1 transition-colors">
                      {t('product.favourite')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="w-full lg:w-[380px]">
            <h2 className="text-[22px] font-medium text-[#111] dark:text-white mb-8">{t('cart.summary')}</h2>
            <div className="flex flex-col gap-4 text-[15px] text-[#111] dark:text-gray-300">
              <div className="flex justify-between">
                <span className="text-[#757575] dark:text-gray-500">{t('cart.subtotal')}</span>
                <span>₹ {total.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#757575] dark:text-gray-500">{t('cart.delivery_handling')}</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              
              <div className="h-[1px] bg-[#e5e5e5] dark:bg-[#222] my-2" />
              
              <div className="flex justify-between py-4 border-y border-[#e5e5e5] dark:border-[#222]">
                <span className="text-[16px] font-medium text-[#111] dark:text-white">{t('cart.total')}</span>
                <span className="text-[18px] font-bold text-[#111] dark:text-white">₹ {total.toLocaleString('en-IN')}.00</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`w-full rounded-full py-5 mt-10 font-medium text-[16px] transition-all duration-300 flex items-center justify-center gap-2 ${
                isCheckingOut 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black text-white dark:bg-white dark:text-black hover:bg-[#333] dark:hover:bg-[#eee]'
              }`}
            >
              {isCheckingOut ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin" />
                  {t('cart.checkout_processing')}
                </>
              ) : t('cart.checkout')}
            </button>

            <div className="mt-8 p-4 bg-[#f9f9f9] dark:bg-[#111] rounded-lg transition-colors">
              <p className="text-[12px] text-[#757575] dark:text-gray-500 leading-relaxed">
                {t('cart.terms_agreement')}
              </p>
            </div>
          </aside>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;

