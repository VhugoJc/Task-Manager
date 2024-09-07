import React, { useState } from 'react';
import { Table } from 'antd';

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

  const paginatedTasks = tasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Table
      dataSource={paginatedTasks}
      columns={columns}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: tasks.length,
        onChange: handlePageChange,
      }}
      scroll={{ x: 800 }} // Adjust the value as needed
    />
  );
};

export default TaskTable;
