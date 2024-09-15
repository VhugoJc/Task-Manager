// src/app/auth/login/page.jsx
"use client";import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext"; // Adjust the import path as needed
import { login } from "@/api/auth"; // Import the login function

import { Form, Input, Button, Row, Col } from "antd";
import AuthLayout from "@/layout/AuthLayout"; 
import "../login.scss"; 
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext); // Get the setUser function from context
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async() => {
    try {
      const userData = await login(email, password);
      console.log('Login successful:', userData);
      setUser(userData); // Update the context with user data
      if (typeof window !== "undefined") {
        router.push("/");
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., show error message)
    }
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
