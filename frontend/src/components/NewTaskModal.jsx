import { Modal, Form, message } from 'antd';
import NewTaskForm from './NewTaskForm';
import { createTask, updateTask } from '../api/task'; // Import updateTask API
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import dayjs from 'dayjs';

// Function to format task values
const formatTaskValues = (values) => {
  return {
    ...values,
    dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DDTHH:mm:ss') : null,
  };
};

const TaskModal = ({ visible, task, onSubmit, onClose, onSubmitEdit }) => {
  const [form] = Form.useForm();
  const { getToken } = useContext(UserContext);

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        ...task,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
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
        const updatedTask = await updateTask(task.id, formattedValues, token);
        message.success('Task updated successfully');
        onSubmitEdit(updatedTask);
        return;
      } else {
        const createdTask = await createTask(formattedValues, token);
        message.success('Task created successfully');
        onSubmit(createdTask);
        return;
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