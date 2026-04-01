import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { Table, Form, Input, Button, Popconfirm, Card, Typography, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data } = await api.get('/products');
      return data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products']);
      toast.success('Product deleted');
    }
  });

  const saveMutation = useMutation({
    mutationFn: (product) => {
      if (editingId) return api.put(`/products/${editingId}`, product);
      return api.post('/products', product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products']);
      handleCancel();
      toast.success(editingId ? 'Product uzgartirildi' : 'Product qushildi');
    }
  });

  const onFinish = (values) => {
    saveMutation.mutate({
      ...values,
      price: Number(values.price)
    });
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      category: record.category,
      image: record.image,
      description: record.description || ''
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => <img src={text} alt={record.name} style={{ width: 48, height: 48, objectFit: 'contain' }} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹ ${price.toLocaleString()}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Shoes', value: 'Shoes' },
        { text: 'Clothing', value: 'Clothing' },
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)} size="small" />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Title level={3} className="mb-6">Products Management</Title>
      
      <Card title={editingId ? 'Edit Product' : 'Add New Product'} className="mb-8 shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ name: '', price: '', category: '', image: '', description: '' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the product name!' }]}>
              <Input placeholder="Becent Air Max" />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
              <Input type="number" placeholder="12000" />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please input the category!' }]}>
              <Input placeholder="Shoes" />
            </Form.Item>
            <Form.Item name="image" label="Image URL" rules={[{ required: true, message: 'Please input the image url!' }]}>
              <Input placeholder="https://..." />
            </Form.Item>
          </div>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Product description..." />
          </Form.Item>
          
          <Space>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={saveMutation.isLoading}>
              {editingId ? 'Update Product' : 'Add Product'}
            </Button>
            {editingId && (
              <Button onClick={handleCancel}>Cancel</Button>
            )}
          </Space>
        </Form>
      </Card>

      <Card className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={products} 
          rowKey="id" 
          loading={isLoading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default AdminProducts;

