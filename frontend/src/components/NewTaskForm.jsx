import { Form, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';

// Custom validation rule to check if the date is in the future
const validateFutureDate = (_, value) => {
  if (value && value.isBefore(dayjs(), 'day')) {
    return Promise.reject(new Error('Due date must be a future date'));
  }
  return Promise.resolve();
};

const NewTaskForm = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Task Name" name="name" rules={[{ required: true, message: 'Please input the task name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Due Date"
        name="dueDate"
        rules={[
          { required: true, message: 'Please input the due date!' },
          { validator: validateFutureDate },
        ]}
      >
        <DatePicker />
      </Form.Item>
    </Form>
  );
};

export default NewTaskForm;