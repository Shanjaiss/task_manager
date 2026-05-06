import { Modal, Input, Tag, Space, Button } from 'antd';
import { useState } from 'react';

const LinearCreateModal = ({ open, onClose, onCreate }: any) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return;

    onCreate(title);
    setTitle('');
    setDesc('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      // styles={{
      //   content: {
      //     background: '#1e1e1e',
      //     borderRadius: 12,
      //     padding: 20,
      //   },
      // }}
    >
      {/* 🔥 Title Input */}
      <Input
        placeholder='Issue title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        bordered={false}
        autoFocus
        style={{
          fontSize: 20,
          fontWeight: 500,
          background: 'transparent',
          color: '#fff',
        }}
        onPressEnter={handleCreate}
      />

      {/* 🔥 Description */}
      <Input.TextArea
        placeholder='Add description...'
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        bordered={false}
        autoSize
        style={{
          marginTop: 8,
          background: 'transparent',
          color: '#aaa',
        }}
      />

      {/* 🔥 Tags Row */}
      <Space style={{ marginTop: 16, flexWrap: 'wrap' }}>
        <Tag color='blue'>Todo</Tag>
        <Tag>Priority</Tag>
        <Tag>Assignee</Tag>
        <Tag>Project</Tag>
        <Tag>Labels</Tag>
      </Space>

      {/* 🔥 Footer */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 12, color: '#888' }}>
          Press Enter to create
        </span>

        <Button type='primary' onClick={handleCreate}>
          Create issue
        </Button>
      </div>
    </Modal>
  );
};

export default LinearCreateModal;
