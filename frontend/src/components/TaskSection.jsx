import { Card, Col, Row, Pagination, Button } from "antd";
import TaskTable from "./TaskTable";
import TaskFilter from "./TaskFilter";
import "./TaskSection.scss";
import { useContext, useEffect, useState } from "react";
import NewTaskModal from "./NewTaskModal";
import { getTasks } from "../api/task";
import { UserContext } from "../context/UserContext";

const TaskSection = () => {
  const { getToken, logout } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [taskModal, setTaskModal] = useState(null);

  // Calculate the indices for slicing the tasks array
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the tasks array to get the items for the current page
  const currentTasks = tasks.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = getToken(); // Replace with your token retrieval logic
        const fetchedTasks = await getTasks(token);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        if (error.response.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setTaskModal(task);
    setIsModalVisible(true);
  };

  const handleFilterChange = (filters) => {
    const { searchTerm, status } = filters;
    const filteredTasks = tasks.filter(
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
    setTaskModal(null);
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

  const submitEdit = (values) => {
    const updatedTasks = tasks.map((task) =>
      task.id === values.id ? { ...task, ...values } : task
    );
    setTasks(updatedTasks);
    setIsModalVisible(false);
  };
  if (loading) {
    return <p>Loading...</p>;
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
          <TaskTable 
            tasks={currentTasks}
            handleEdit={handleEdit}
           />
        </div>
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={tasks.length}
            onChange={handlePageChange}
          />
        </div>
        <NewTaskModal
          onClose={() => setIsModalVisible(false)}
          task={taskModal}
          visible={isModalVisible}
          onSubmit={handleCreate}
          onSubmitEdit={submitEdit}
        />
      </div>
    </Card>
  );
};

export default TaskSection;