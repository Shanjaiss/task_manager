import React, { useState } from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Avatar,
  Dropdown,
  Space,
  Grid,
  Switch,
} from 'antd';
import type { MenuProps } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../components/context/ThemeContext';

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // 📌 Sidebar Menu
  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <UserOutlined />,
      label: <Link to='/dashboard'>Dashboard</Link>,
    },
    {
      key: '/tasks',
      icon: <LaptopOutlined />,
      label: <Link to='/tasks'>Tasks</Link>,
    },
    {
      key: '/notifications',
      icon: <NotificationOutlined />,
      label: <Link to='/notifications'>Notifications</Link>,
    },
  ];

  // 📌 Profile Dropdown
  const profileMenu: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Profile',
    },
    {
      key: 'settings',
      label: 'Settings',
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 🔝 HEADER */}
      <Header
        style={{
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        {/* Left side */}
        <Space>
          {/* Mobile Toggle */}
          {!screens.md && (
            <span
              onClick={() => setCollapsed(!collapsed)}
              style={{ color: '#fff', fontSize: 18, cursor: 'pointer' }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          )}

          <h2 style={{ margin: 0 }}>Task Manager</h2>
        </Space>

        <Space>
          {/* 🌙 Theme Toggle */}
          <Switch
            checked={isDark}
            onChange={toggleTheme}
            checkedChildren='🌙'
            unCheckedChildren='☀️'
          />

          {/* 👤 Profile */}
          <Dropdown menu={{ items: profileMenu }} placement='bottomRight'>
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>Shanjai</span>
            </Space>
          </Dropdown>
        </Space>
      </Header>

      <Layout>
        {/* 📌 SIDEBAR */}
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          breakpoint='md'
          collapsedWidth={screens.md ? 80 : 0} // mobile = hide fully
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode='inline'
            selectedKeys={[location.pathname]}
            style={{ height: '100%' }}
            items={menuItems}
          />
        </Sider>

        {/* 📌 CONTENT */}
        <Layout style={{ padding: '0 16px 16px' }}>
          <Breadcrumb
            items={[
              { title: 'Home' },
              { title: location.pathname.replace('/', '') },
            ]}
            style={{ margin: '16px 0' }}
          />

          <Content
            style={{
              padding: 16,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
