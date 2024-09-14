import { Form, Input } from 'antd';

const NewTaskForm = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Task Name" name="taskName" rules={[{ required: true, message: 'Please input the task name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please input the status!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Due Date" name="dueDate" rules={[{ required: true, message: 'Please input the due date!' }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default NewTaskForm;