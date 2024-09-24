import { Card, Col, Row, Pagination, Button } from "antd";
import TaskTable from "./TaskTable";
import TaskFilter from "./TaskFilter";
import "./TaskSection.scss";
import { useContext, useEffect, useState } from "react";
import NewTaskModal from "./NewTaskModal";
import { getTasks } from '../api/task';
import {UserContext} from '../context/UserContext';

const TaskSection = () => {
  const { getToken, logout } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pageSize = 10; // Number of tasks per
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = getToken(); // Replace with your token retrieval logic
        const fetchedTasks = await getTasks(token);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        if(error.response.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);


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

  if (loading) {
    return <p>Loading...</p>
  }
  
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
