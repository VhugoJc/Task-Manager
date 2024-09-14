// src/app/auth/login/page.jsx
"use client";
import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import AuthLayout from "@/layout/AuthLayout"; 
import "../login.scss"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (values) => {
    // Handle login submission here (e.g., send data to backend)
    console.log("Login submitted:", values);
  };

  return (
    <AuthLayout title="Task Manager" linkText="Create an account" linkHref="/auth/signup">
      <Form onFinish={handleSubmit} layout="vertical" className="login-form">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Email"
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
          <Button type="primary" htmlType="submit" style={{ height: "40px", marginTop: "15px" }} block className="login-button">
            Login
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default Login;
