// src/app/auth/signup/page.jsx
"use client";
import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import AuthLayout from "@/layout/AuthLayout";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (values) => {
    // Handle signup submission here (e.g., send data to backend)
    console.log("Signup submitted:", values);
  };

  return (
    <AuthLayout title="Task Manager" linkText="I already have an account" linkHref="/auth/login">
      <Form onFinish={handleSubmit} layout="vertical" className="login-form">
        <Row gutter={16}>
          <Col  xs={24} lg={12} xl={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
          </Col>
          <Col  xs={24} lg={12} xl={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
          </Col>
          <Col  xs={24} lg={12} xl={12}>
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
          <Col  xs={24} lg={12} xl={12}>
            <Form.Item
              label="Repeat Password"
              name="repeatPassword"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ height: "40px", marginTop: "15px" }} block className="login-button">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default SignUp;
