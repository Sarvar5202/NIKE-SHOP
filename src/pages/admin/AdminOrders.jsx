import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { Table, Tag, Button, Typography, Space, Card } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AdminOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data } = await api.get('/orders');
      return data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, newStatus }) => api.patch(`/orders/${id}`, { status: newStatus }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['admin-orders']);
      toast.info(`Order status updated to ${variables.newStatus}`);
    }
  });

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <strong>#{id}</strong>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(b.date) - new Date(a.date),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `₹ ${total?.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'Delivered' ? 'green' : status === 'Cancelled' ? 'red' : 'blue';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      filters: [
        { text: 'Processing', value: 'Processing' },
        { text: 'Delivered', value: 'Delivered' },
        { text: 'Cancelled', value: 'Cancelled' },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            ghost
            icon={<CheckCircleOutlined />} 
            onClick={() => updateStatusMutation.mutate({ id: record.id, newStatus: 'Delivered' })} 
            disabled={record.status === 'Delivered' || record.status === 'Cancelled'}
            size="small"
          >
            Mark Delivered
          </Button>
          <Button 
            danger 
            icon={<CloseCircleOutlined />} 
            onClick={() => updateStatusMutation.mutate({ id: record.id, newStatus: 'Cancelled' })} 
            disabled={record.status === 'Cancelled'}
            size="small"
          >
            Cancel
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Title level={3} className="mb-6">Orders Management</Title>
      
      <Card className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={orders} 
          rowKey="id" 
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default AdminOrders;
