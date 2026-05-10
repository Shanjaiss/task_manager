import { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core';
import LinearCreateModal from './CreateTask/LinearCreateModal';
import { useFetchQuery } from '../../../components/hooks/useFetchQuery';
import { useEditQuery } from '../../../components/hooks/useEditQuery';

const { Title } = Typography;

type Task = {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'testing' | 'completed';
};

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
      <div>
        {' '}
        <h2> {task.title}</h2>
      </div>
      <div> {task.description} </div>
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

const Tasks = () => {
  const { data: fetchedTasks = [] } = useFetchQuery<Task[]>({
    url: '/todos',
    queryKey: ['todos'],
  });
  const updateTodoStatus = useEditQuery({
    url: '/todos',
    queryKey: ['todos'],
    successMessage: 'Task status updated',
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTasks(fetchedTasks);
  }, [fetchedTasks]);

  // 🔥 Drag End
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    const taskId = Number(active.id);
    const newStatus = over.id as Task['status'];
    const activeTask = tasks.find((task) => task.id === taskId);

    if (!activeTask || activeTask.status === newStatus) return;

    const previousTasks = tasks;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    updateTodoStatus.mutate(
      {
        id: taskId,
        payload: { status: newStatus },
      },
      {
        onError: () => {
          setTasks(previousTasks);
        },
      }
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
      <LinearCreateModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Tasks;
