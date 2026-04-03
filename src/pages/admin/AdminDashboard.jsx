import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { Typography, Card, Row, Col, Space } from 'antd';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders-dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/orders');
      return data;
    }
  });

  const { data: products = [] } = useQuery({
    queryKey: ['admin-products-dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/products');
      return data;
    }
  });

  // Calculate some stats
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, curr) => acc + curr.total, 0);

  const totalOrders = orders.length;

  // Bar Chart Data -> Orders over time
  const chartLabels = orders.map(o => new Date(o.date).toLocaleDateString());
  const chartDataPoints = orders.map(o => o.total);

  const barData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Orders Revenue (₹)',
        data: chartDataPoints,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Revenue Timeline' },
    },
  };

  // Doughnut Chart Data -> Products by Category
  const categories = products.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Products',
        data: Object.values(categories),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Products by Category' },
    },
  };

  if (isLoading) return <p>Loading Dashboard...</p>;

  return (
    <div>
      <Title level={3} className="mb-6">Dashboard Summary</Title>

      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-sm">
            <Space direction="vertical">
              <Text type="secondary">Total Revenue</Text>
              <Title level={2} style={{ margin: 0 }}>₹ {totalRevenue.toLocaleString()}</Title>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-sm">
            <Space direction="vertical">
              <Text type="secondary">Total Orders</Text>
              <Title level={2} style={{ margin: 0 }}>{totalOrders}</Title>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-sm">
            <Space direction="vertical">
              <Text type="secondary">Total Products</Text>
              <Title level={2} style={{ margin: 0 }}>{products.length}</Title>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card bordered={false} className="shadow-sm">
            <div style={{ height: 350 }}>
              <Bar options={barOptions} data={barData} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card bordered={false} className="shadow-sm">
            <div style={{ height: 350, display: 'flex', justifyContent: 'center' }}>
              <Doughnut options={doughnutOptions} data={doughnutData} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
