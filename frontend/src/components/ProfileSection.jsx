"use client";
import React from "react";
import { Avatar, Button, Card, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./TaskSection.scss"

const ProfileSection = ({ onLogout }) => {
    const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
      };
  return (
    <Card className="task-container" style={{width:850}}>
      <Row gutter={16} align="middle">
        <Col xs={24} sm={8} md={6} style={{textAlign:"center"}}>
          <UserOutlined style={{fontSize: 100}} />
        </Col>
        <Col xs={24} sm={16} md={18}>
          <div className="user-info">
            <h2>{userData.name || "User Name"}</h2>
            <p>{userData.email || "user@example.com"}</p>
            <Button type="primary" danger onClick={onLogout}>
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileSection;

