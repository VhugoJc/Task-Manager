"use client";
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Card, Row, Col } from "antd";
import "./login.scss";

// 805AD5
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here, e.g., send a request to your backend
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h1 className="login-title">Task Manager</h1>
        <Form onFinish={handleSubmit} layout="vertical" className="login-form">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ height: "40px", marginTop:"15px" }} block className="login-button">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
