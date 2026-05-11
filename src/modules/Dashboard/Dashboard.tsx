import { Card, Row, Col } from 'antd';
import { Pie, Column } from '@ant-design/plots';
import { useFetchQuery } from '../../components/hooks/useFetchQuery';
import Loader from '../../components/loader/Loader';

type Task = {
  id: number;
  status: 'todo' | 'inProgress' | 'testing' | 'completed';
};

const Dashboard = () => {
  const { data: tasks = [], isLoading } = useFetchQuery<Task[]>({
    url: '/todos',
    queryKey: ['todos'],
  });
  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'completed').length,
    pending: tasks.filter((task) => task.status === 'todo').length,
    inProgress: tasks.filter(
      (task) => task.status === 'inProgress' || task.status === 'testing'
    ).length,
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

  // 📊 Column Chart (Live Task Distribution)
  const todayData = [
    { type: 'Completed', value: stats.completed },
    { type: 'Pending', value: stats.pending },
    { type: 'In Progress', value: stats.inProgress },
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
      {isLoading ? <Loader /> : null}

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
