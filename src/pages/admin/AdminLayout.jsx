import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography, Button } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/admin/products',
      icon: <AppstoreOutlined />,
      label: <Link to="/admin/products">Products</Link>,
    },
    {
      key: '/admin/orders',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/orders">Orders</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" width={250} className="shadow-md">
        <div className="p-4 text-center mt-2 mb-4">
          <Title level={4} style={{ margin: 0 }}>Nike Admin</Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
        <div className="absolute bottom-4 left-0 w-full px-4">
          <Button 
            type="text" 
            danger 
            icon={<LogoutOutlined />} 
            onClick={() => navigate('/')} 
            block
          >
            Exit Admin
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header className="bg-white shadow-sm px-6 flex items-center">
          <Title level={5} style={{ margin: 0 }}>Dashboard Control Panel</Title>
        </Header>
        <Content className="m-6 p-6 bg-white min-h-[280px] rounded-md shadow-sm overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

