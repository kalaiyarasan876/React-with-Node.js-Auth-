import React from 'react';
import { Layout, Menu, Button, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { LogoutOutlined } from '@ant-design/icons';



const { Header, Content } = Layout;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#1890ff' }}>
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={18} md={16} lg={12}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['dashboard']}
              style={{ backgroundColor: '#1890ff' }}
            >
              <Menu.Item key="dashboard">
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="profile">
                <Link to="/profile">Profile</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col>
          <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
  Logout
</Button>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '24px' }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            <h2>Welcome to the Dashboard!</h2>
            <p>Here you can manage your account, view data, and more.</p>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
