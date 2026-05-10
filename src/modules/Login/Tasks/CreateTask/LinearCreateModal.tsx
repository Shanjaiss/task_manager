import { Modal, Input, Tag, Space, Button } from 'antd';
import { useState } from 'react';
import { useCreateQuery } from '../../../../components/hooks/useCreateQuery';

const LinearCreateModal = ({ open, onClose }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createTodo = useCreateQuery({
    url: '/createtodo',
    queryKey: ['todos'], // 🔥 better key (future fetch)
  });

  const handleCreate = () => {
    if (!title.trim()) return;

    createTodo.mutate(
      {
        title,
        description,
      },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          onClose();
        },
      }
    );
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={600}>
      {/* Title */}
      <Input
        placeholder='Issue title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        bordered={false}
        autoFocus
        style={{
          fontSize: 20,
          fontWeight: 500,
        }}
        onPressEnter={handleCreate} // ✅ now works
      />

      {/* Description */}
      <Input.TextArea
        placeholder='Add description...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        bordered={false}
        autoSize
        style={{ marginTop: 8 }}
      />

      {/* Tags */}
      <Space style={{ marginTop: 16, flexWrap: 'wrap' }}>
        <Tag color='blue'>Todo</Tag>
        <Tag>Priority</Tag>
        <Tag>Assignee</Tag>
        <Tag>Project</Tag>
        <Tag>Labels</Tag>
      </Space>

      {/* Footer */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 12 }}>Press Enter to create</span>

        <Button
          type='primary'
          loading={createTodo.isPending}
          onClick={handleCreate}
        >
          Create issue
        </Button>
      </div>
    </Modal>
  );
};

export default LinearCreateModal;
