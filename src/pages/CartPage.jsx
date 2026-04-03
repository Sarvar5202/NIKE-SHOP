import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCartStore from '../store/useCartStore';
import { useTranslation } from 'react-i18next';

const CartPage = () => {
  const { items, total, removeFromCart } = useCartStore();
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1240px] mx-auto px-10 py-12 min-h-[60vh]"
    >
      <h1 className="text-[22px] font-medium text-[#111] mb-6">Bag</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-lg text-[#666]">Your bag is empty.</p>
          <Link to="/" className="underline text-[#111] font-medium">Continue Shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 border-b border-[#e5e5e5] pb-6">
                <div className="w-[150px] h-[150px] bg-[#f5f5f5] flex-shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-[90%] h-[90%] object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <h2 className="text-[15px] font-medium text-[#111]">{item.name}</h2>
                      <div className="text-[15px] text-[#111]">₹ {item.price.toLocaleString('en-IN')}.00</div>
                    </div>
                    <p className="text-[15px] text-[#757575]">{item.category}</p>
                    <p className="text-[15px] text-[#757575]">Size: {item.size} &nbsp;&nbsp; Qty: {item.quantity}</p>
                    {item.orderedAt && (
                      <p className="text-[13px] text-green-600 mt-2 font-medium">
                        Karzinkaga tushgan vaqt: {new Date(item.orderedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[14px] text-red-500 hover:text-red-700 underline mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="w-full lg:w-[350px]">
            <h2 className="text-[21px] font-medium text-[#111] mb-6">Summary</h2>
            <div className="flex flex-col gap-3 text-[15px] text-[#111]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹ {total.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span>Free</span>
              </div>
              <div className="border-b border-[#e5e5e5] my-2" />
              <div className="flex justify-between py-2 border-y border-[#e5e5e5]">
                <span>Total</span>
                <span className="font-medium">₹ {total.toLocaleString('en-IN')}.00</span>
              </div>
            </div>
            <button className="w-full bg-black text-white hover:bg-[#333] rounded-full py-4 mt-8 font-medium transition-all duration-300">
              Checkout
            </button>
          </aside>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;
