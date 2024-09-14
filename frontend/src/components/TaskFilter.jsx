"use client";
import React, { useState } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

const TaskFilter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange({ searchTerm: e.target.value, status: statusFilter });
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    onFilterChange({ searchTerm, status: value });
  };

  return (
    <div style={{ marginBottom: 16, display: 'flex', gap: '1rem' }}>
      <Input.Search
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Select
        placeholder="Filter by status"
        value={statusFilter}
        onChange={handleStatusChange}
        style={{ width: 150 }}
        allowClear
      >
        <Option value="">All</Option>
        <Option value="Completed">Completed</Option>
        <Option value="In Progress">In Progress</Option>
        {/* Add more status options as needed */}
      </Select>
    </div>
  );
};

export default TaskFilter;

