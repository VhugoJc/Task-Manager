import { Card, Col, Row, Pagination, Button } from "antd";
import TaskTable from "./TaskTable";
import TaskFilter from "./TaskFilter";
import "./TaskSection.scss";
import { useState } from "react";
import NewTaskModal from "./NewTaskModal";

const TaskSection = () => {
  const tasksData = [
    { id: 1, name: "Task 1", status: "Completed", dueDate: "2024-03-10" },
    { id: 2, name: "Task 2", status: "In Progress", dueDate: "2024-03-15" },
    {
      id: 3,
      name: "Finish Project",
      status: "In Progress",
      dueDate: "2024-03-18",
    },
    {
      id: 4,
      name: "Meeting with John",
      status: "Completed",
      dueDate: "2024-03-20",
    },
    { id: 5, name: "Task 5", status: "Completed", dueDate: "2024-03-22" },
    { id: 6, name: "Task 6", status: "In Progress", dueDate: "2024-03-25" },
    { id: 7, name: "Task 7", status: "Completed", dueDate: "2024-03-28" },
    { id: 8, name: "Task 8", status: "In Progress", dueDate: "2024-03-30" },
    { id: 9, name: "Task 9", status: "Completed", dueDate: "2024-04-02" },
    { id: 10, name: "Task 10", status: "In Progress", dueDate: "2024-04-05" },
    // ... more tasks
  ];

  const [tasks, setTasks] = useState(tasksData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pageSize = 10; // Number of tasks per page

  const handleFilterChange = (filters) => {
    const { searchTerm, status } = filters;
    const filteredTasks = tasksData.filter(
      (task) =>
        (searchTerm === "" ||
          task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.dueDate.includes(searchTerm)) &&
        (status === "" || task.status === status)
    );
    setTasks(filteredTasks);
  };

  const handleAddTask = () => {
    setIsModalVisible(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreate = (values) => {
    const newTask = {
      id: tasks.length + 1,
      ...values,
    };
    setTasks([...tasks, newTask]);
    setIsModalVisible(false);
  };

  return (
    <Card className="task-container">
      <div className="task-manager-container">
        <div
          className="button-section"
          style={{
            textAlign: "right",
            marginRight: "20px",
            position: "absolute",
            right: "0",
          }}
        >
          <Button
            type="primary"
            shape="circle"
            icon="+"
            onClick={handleAddTask}
          />
        </div>
        <Row gutter={16} className="filter-section">
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <TaskFilter onFilterChange={handleFilterChange} />
          </Col>
        </Row>
        <div className="table-section">
          <TaskTable tasks={tasks} />
        </div>
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={tasks.length}
            onChange={handlePageChange}
          />
        </div>
        <NewTaskModal
        setIsModalVisible={setIsModalVisible}
          visible={isModalVisible}
          onCreate={handleCreate}
        />
      </div>
    </Card>
  );
};

export default TaskSection;
