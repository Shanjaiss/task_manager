import React from 'react';
import { Card, Row, Col } from 'antd';
import { Pie, Column } from '@ant-design/plots';

const Dashboard: React.FC = () => {
  // 🔥 Mock Data (replace with API later)
  const stats = {
    total: 25,
    completed: 18,
    pending: 5,
    inProgress: 2,
  };

  // 📊 Pie Chart (Task Status)
  const pieData = [
    { type: 'Completed', value: stats.completed },
    { type: 'Pending', value: stats.pending },
    { type: 'In Progress', value: stats.inProgress },
  ];

  const pieConfig = {
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
    },
  };

  // 📊 Column Chart (Today Tasks)
  const todayData = [
    { type: 'Completed', value: 5 },
    { type: 'Pending', value: 3 },
    { type: 'In Progress', value: 2 },
  ];

  const columnConfig = {
    data: todayData,
    xField: 'type',
    yField: 'value',
    label: {
      position: 'top',
    },
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* 🔹 Cards */}
      <Row gutter={16}>
        <Col xs={24} md={6}>
          <Card title='Total Tasks'>{stats.total}</Card>
        </Col>

        <Col xs={24} md={6}>
          <Card title='Completed'>{stats.completed}</Card>
        </Col>

        <Col xs={24} md={6}>
          <Card title='Pending'>{stats.pending}</Card>
        </Col>

        <Col xs={24} md={6}>
          <Card title='In Progress'>{stats.inProgress}</Card>
        </Col>
      </Row>

      {/* 🔹 Charts */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col xs={24} md={12}>
          <Card title='Task Status Overview'>
            <Pie {...pieConfig} />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Today's Tasks">
            <Column {...columnConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
