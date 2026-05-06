import React, { useState } from 'react';
import { Card, Col, Row, Typography, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import LinearCreateModal from './CreateTask/LinearCreateModal';

const { Title } = Typography;

type Task = {
  id: number;
  title: string;
  status: 'todo' | 'inProgress' | 'testing' | 'completed';
};

const initialTasks: Task[] = [
  { id: 1, title: 'Design UI', status: 'todo' },
  { id: 2, title: 'Build API', status: 'inProgress' },
  { id: 3, title: 'Write Tests', status: 'testing' },
  { id: 4, title: 'Deploy App', status: 'completed' },
  { id: 5, title: 'Fix Bugs', status: 'todo' },
];

const statuses: Task['status'][] = [
  'todo',
  'inProgress',
  'testing',
  'completed',
];

// 🔹 Draggable Task
const DraggableTask = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    marginBottom: 8,
    cursor: 'grab',
  };

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      size='small'
      style={style}
    >
      {task.title}
    </Card>
  );
};

// 🔹 Droppable Column
const DroppableColumn = ({
  status,
  tasks,
}: {
  status: Task['status'];
  tasks: Task[];
}) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Col xs={24} md={6}>
      <div ref={setNodeRef}>
        <Card title={status.toUpperCase()}>
          {tasks.map((task) => (
            <DraggableTask key={task.id} task={task} />
          ))}
        </Card>
      </div>
    </Col>
  );
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [open, setOpen] = useState(false);

  // 🔥 Create Task
  const handleCreateTask = (title: string) => {
    const newItem: Task = {
      id: Date.now(),
      title,
      status: 'todo',
    };

    setTasks((prev) => [newItem, ...prev]);
  };

  // 🔥 Drag End
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const newStatus = over.id;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Title level={3} style={{ margin: 0 }}>
          Tasks
        </Title>

        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          New Task
        </Button>
      </Space>

      {/* Board */}
      <DndContext onDragEnd={handleDragEnd}>
        <Row gutter={16} style={{ marginTop: 16 }}>
          {statuses.map((status) => (
            <DroppableColumn
              key={status}
              status={status}
              tasks={tasks.filter((t) => t.status === status)}
            />
          ))}
        </Row>
      </DndContext>

      {/* Linear Modal */}
      <LinearCreateModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
};

export default Tasks;
