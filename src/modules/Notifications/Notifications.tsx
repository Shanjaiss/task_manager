import React, { useState } from 'react';
import { List, Avatar, Typography, Button, theme } from 'antd';
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

type Notification = {
  id: number;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning';
  read: boolean;
  time: string;
};

// 🔥 Mock Data
const initialData: Notification[] = [
  {
    id: 1,
    title: 'Task Completed',
    description: 'You completed "Design UI"',
    type: 'success',
    read: false,
    time: '2 min ago',
  },
  {
    id: 2,
    title: 'New Task Assigned',
    description: 'You got a new task "API Integration"',
    type: 'info',
    read: false,
    time: '10 min ago',
  },
  {
    id: 3,
    title: 'Deadline Warning',
    description: 'Task "Testing" is due today',
    type: 'warning',
    read: true,
    time: '1 hour ago',
  },
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(initialData);

  // 🎨 Theme Tokens (auto switch light/dark)
  const {
    token: {
      colorBgContainer,
      colorPrimaryBg,
      colorBorder,
      colorSuccess,
      colorWarning,
      colorInfo,
    },
  } = theme.useToken();

  // 🔹 Icon based on type (theme-aware)
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlined style={{ color: colorSuccess }} />;
      case 'warning':
        return <WarningOutlined style={{ color: colorWarning }} />;
      default:
        return <InfoCircleOutlined style={{ color: colorInfo }} />;
    }
  };

  // 🔥 Mark single as read
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // 🔥 Mark all as read
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>Notifications</h2>

        <Button
          onClick={markAllRead}
          disabled={notifications.every((n) => n.read)}
        >
          Mark all as read
        </Button>
      </div>

      {/* List */}
      <List
        itemLayout='horizontal'
        dataSource={notifications}
        locale={{ emptyText: 'No notifications' }}
        renderItem={(item) => (
          <List.Item
            style={{
              background: item.read ? colorBgContainer : colorPrimaryBg,
              border: `1px solid ${colorBorder}`,
              borderRadius: 8,
              marginBottom: 10,
              padding: 12,
              transition: 'all 0.2s',
            }}
            actions={[
              !item.read && (
                <Button
                  key='mark-read'
                  type='link'
                  onClick={() => markAsRead(item.id)}
                >
                  Mark as read
                </Button>
              ),
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon={getIcon(item.type)} />}
              title={<Text strong={!item.read}>{item.title}</Text>}
              description={
                <>
                  <div>{item.description}</div>
                  <Text type='secondary' style={{ fontSize: 12 }}>
                    {item.time}
                  </Text>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notifications;
