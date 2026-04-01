import { Routes, Route } from 'react-router-dom';
import UserLayout from './components/UserLayout';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';

import AdminLayout from './pages/admin/AdminLayout';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  )
}

export default App
