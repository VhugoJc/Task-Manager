import { Modal, Form, message } from 'antd';
import NewTaskForm from './NewTaskForm';
import { createTask } from '../api/task';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import moment from 'moment';

// Function to format task values
const formatTaskValues = (values) => {
  return {
    ...values,
    dueDate: values.dueDate ? moment(values.dueDate).toISOString() : null,
  };
};

const NewTaskModal = ({ visible, onCreate, setIsModalVisible }) => {
  const [form] = Form.useForm();
  const { getToken } = useContext(UserContext);

  const handleCreateTask = async (values) => {
    const token = getToken();
    try {
      const formattedValues = formatTaskValues(values);
      await createTask(formattedValues, token);
      message.success('Task created successfully');
      onCreate(formattedValues);
    } catch (error) {
      message.error('Failed to create task');
      console.error('Create Task Failed:', error);
    }
  };

  return (
    <Modal
      title="Add New Task"
      open={visible}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            handleCreateTask(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={() => setIsModalVisible(false)}
    >
      <NewTaskForm form={form} />
    </Modal>
  );
};

export default NewTaskModal;