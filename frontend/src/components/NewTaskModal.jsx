import { Modal, Form } from 'antd';
import NewTaskForm from './NewTaskForm';

const NewTaskModal = ({ visible, onCreate, setIsModalVisible }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New Task"
      open={visible}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={e=>setIsModalVisible(false)}
    >
      <NewTaskForm form={form} />
    </Modal>
  );
};

export default NewTaskModal;