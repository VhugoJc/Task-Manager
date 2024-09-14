import React, { useState } from 'react';
import { Pagination, Table } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '10%', 
  },
  {
    title: 'Task Name',
    dataIndex: 'name',
    key: 'name',
    width: '30%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: '20%',
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
    width: '20%',
  },
];

const TaskTable = ({ tasks }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Number of tasks per page
  
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