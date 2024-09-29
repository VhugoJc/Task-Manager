import { DeleteOutlined } from "@ant-design/icons";
import { Table, Checkbox } from "antd";
import { useState } from "react";



const TaskTable = ({ tasks, handleEdit, handleDelete}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of tasks per page
  const columns = [
    {
      title: "Task Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => <Checkbox checked={completed} />,
    },
    {
      title:"Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_,e) => <>
        <a onClick={()=>handleEdit(e)}>Edit</a>
        <DeleteOutlined onClick={()=>handleDelete(e)}  style={{ marginLeft: 8, color: 'red', cursor: 'pointer' }} /> 
      </>,
    },
  ];
  return (
    <div style={{ width: 800, position: 'relative' }}> {/* Set fixed width */}
      <Table
        dataSource={tasks.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((task) => ({ ...task, key: task.id }))} // Add key here
        columns={columns}
        scroll={{ x: 800 }} // Make table horizontally scrollable if needed
        pagination={false} 
      />
    </div>
  );
};

export default TaskTable;