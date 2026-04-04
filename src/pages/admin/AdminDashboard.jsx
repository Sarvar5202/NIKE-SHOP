import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { Typography, Card, Row, Col, Space, Statistic, Spin } from 'antd';
import { Bar, Doughnut, Line, PolarArea } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  ArrowUpRight 
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-orders-dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/orders');
      return data;
    }
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['admin-products-dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/products');
      return data;
    }
  });

  if (ordersLoading || productsLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  // Calculate Stats
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, curr) => acc + (curr.total || 0), 0);

  const totalOrders = orders.length;
  
  // Charts Data Prep
  const sortedOrdersByDate = [...orders].sort((a, b) => new Date(a.date) - new Date(b.date));
  const chartLabels = sortedOrdersByDate.map(o => new Date(o.date).toLocaleDateString());
  const chartDataPoints = sortedOrdersByDate.map(o => o.total);

  // Line Chart (Area) - Revenue Growth
  const lineData = {
    labels: chartLabels,
    datasets: [
      {
        fill: true,
        label: 'Revenue Trend',
        data: chartDataPoints,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Bar Chart Data -> Orders over time
  const barData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Order Totals (₹)',
        data: chartDataPoints,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderRadius: 8,
      },
    ],
  };

  // Categories Distribution
  const categoriesMap = products.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const categoryLabels = Object.keys(categoriesMap);
  const categoryValues = Object.values(categoriesMap);

  const polarData = {
    labels: categoryLabels,
    datasets: [
      {
        label: 'Product Count',
        data: categoryValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverOffset: 15,
        cutout: '70%',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 12,
        cornerRadius: 8,
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="p-1"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <Title level={2} style={{ margin: 0 }}>Analytics Dashboard</Title>
          <Text type="secondary">Monitor your store performance in real-time</Text>
        </div>
        <div className="bg-blue-50 p-2 px-4 rounded-full flex items-center gap-2 text-blue-600">
          <ArrowUpRight size={18} />
          <span className="font-semibold">+12% Growth</span>
        </div>
      </div>

      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} md={8}>
          <motion.div variants={itemVariants}>
            <Card bordered={false} className="shadow-lg hover:shadow-xl transition-shadow rounded-2xl bg-gradient-to-br from-white to-blue-50">
              <Statistic
                title={<Text strong type="secondary">Total Revenue</Text>}
                value={totalRevenue}
                precision={2}
                prefix={<TrendingUp className="text-blue-500 mr-2" />}
                suffix="₹"
                valueStyle={{ color: '#1d4ed8', fontWeight: 'bold', fontSize: '2rem' }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <motion.div variants={itemVariants}>
            <Card bordered={false} className="shadow-lg hover:shadow-xl transition-shadow rounded-2xl bg-gradient-to-br from-white to-green-50">
              <Statistic
                title={<Text strong type="secondary">Total Orders</Text>}
                value={totalOrders}
                prefix={<ShoppingCart className="text-green-500 mr-2" />}
                valueStyle={{ color: '#15803d', fontWeight: 'bold', fontSize: '2rem' }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <motion.div variants={itemVariants}>
            <Card bordered={false} className="shadow-lg hover:shadow-xl transition-shadow rounded-2xl bg-gradient-to-br from-white to-purple-50">
              <Statistic
                title={<Text strong type="secondary">Products in Stock</Text>}
                value={products.length}
                prefix={<Package className="text-purple-500 mr-2" />}
                valueStyle={{ color: '#7e22ce', fontWeight: 'bold', fontSize: '2rem' }}
              />
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <motion.div variants={itemVariants}>
            <Card 
              title={<span className="flex items-center gap-2"><TrendingUp size={20} /> Revenue Performance</span>}
              bordered={false} 
              className="shadow-lg rounded-2xl overflow-hidden"
              extra={<Text type="secondary">Last 30 Days</Text>}
            >
              <div style={{ height: 400 }}>
                <Line options={chartOptions} data={lineData} />
              </div>
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} lg={8}>
          <motion.div variants={itemVariants}>
            <Card 
              title="Category Distribution" 
              bordered={false} 
              className="shadow-lg rounded-2xl"
            >
              <div style={{ height: 400 }}>
                <PolarArea options={chartOptions} data={polarData} />
              </div>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card 
              title="Order History" 
              bordered={false} 
              className="shadow-lg rounded-2xl"
            >
              <div style={{ height: 350 }}>
                <Bar options={chartOptions} data={barData} />
              </div>
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card 
              title="Category Focus" 
              bordered={false} 
              className="shadow-lg rounded-2xl"
            >
              <div style={{ height: 350, display: 'flex', justifyContent: 'center' }}>
                <Doughnut options={{ ...chartOptions, cutout: '70%' }} data={doughnutData} />
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default AdminDashboard;

