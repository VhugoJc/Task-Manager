"use client";
import React from "react";
import { Card, Col, Progress, Row, Statistic } from "antd";
import "./TaskSection.scss";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

const DashboardSection = () => {
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
  ];

  const totalTasks = tasksData.length;
  const tasksDueSoon = 8; // Replace with your logic
  const completedTasks = tasksData.filter(
    (task) => task.status === "Completed"
  ).length;
  const incompleteTasks = totalTasks - completedTasks;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
      <Card className="task-container" style={{width:"850px"}}>
        <div className="task-manager-container">
          <h2>Dashboard</h2>
          <Row gutter={16} className="filter-section">
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Card className="task-card">
                <Statistic
                  title="Total Tasks"
                  value={totalTasks}
                  prefix={<EditOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Card className="task-card">
                <Statistic
                  title="Due Soon"
                  value={tasksDueSoon}
                  prefix={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Card className="task-card">
                <Statistic
                  title="Completed"
                  value={completedTasks}
                  prefix={<CheckCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* Progress Bar */}
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={24}>
              <Card className="task-card">
                <div>
                  <h3>Task Completion</h3>
                  <Progress
                    percent={completionPercentage}
                    status="active"
                    format={() => `${completedTasks} / ${totalTasks}`}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
  );
};

export default DashboardSection;
