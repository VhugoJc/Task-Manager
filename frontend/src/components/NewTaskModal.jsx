import { Modal, Form, message } from 'antd';
import NewTaskForm from './NewTaskForm';
import { createTask, updateTask } from '../api/task'; // Import updateTask API
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import moment from 'moment';

// Function to format task values
const formatTaskValues = (values) => {
  return {
    ...values,
    dueDate: values.dueDate ? moment(values.dueDate).toISOString() : null,
  };
};

const TaskModal = ({ visible, task, onSubmit, onClose }) => {
  const [form] = Form.useForm();
  const { getToken } = useContext(UserContext);

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        ...task,
        dueDate: task.dueDate ? moment(task.dueDate) : null,
      });
    } else {
      form.resetFields();
    }
  }, [task, form]);

  const handleSubmit = async (values) => {
    const token = getToken();
    const formattedValues = formatTaskValues(values);
    try {
      if (task) {
        await updateTask(task.id, formattedValues, token);
        message.success('Task updated successfully');
      } else {
        await createTask(formattedValues, token);
        message.success('Task created successfully');
        onSubmit(formattedValues);
        return
      }
    } catch (error) {
      message.error(`Failed to ${task ? 'update' : 'create'} task`);
      console.error(`${task ? 'Update' : 'Create'} Task Failed:`, error);
    }
  };

  return (
    <Modal
      title={task ? "Edit Task" : "Add New Task"}
      open={visible}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            handleSubmit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={onClose}
    >
      <NewTaskForm form={form} />
    </Modal>
  );
};

export default TaskModal;