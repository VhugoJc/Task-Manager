// src/app/auth/login/page.jsx
"use client"
import { Form, Input, Button, Row, message, Col } from "antd";
import AuthLayout from "@/layout/AuthLayout"; 
import "../login.scss"; 
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext"; // Ensure you have the correct path to UserContext
import { login } from "@/api/auth"; // Ensure you have the correct path to the login function

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginJWT } = useContext(UserContext); // Get the setUser function from context
  const router = useRouter(); // Initialize useRouter
  const [error, setError] = useState(null); // State for managing error messages
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (error) {
      messageApi.error(error);
      setError("");
    }
  }, [error, messageApi]);

  const handleSubmit = async () => {
    try {
      const userData = await login(email, password);
      loginJWT(userData.token); // Update the context with user data
      if (typeof window !== "undefined") {
        router.push("/");
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response.data.message ?error.response.data.message : "Login failed. Please try again"); // Set the error message
    }
  };

  return (
    <AuthLayout title="Task Manager" linkText="Create an account" linkHref="/auth/signup">
      {contextHolder}
      <Form onFinish={handleSubmit} layout="vertical" className="login-form">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Email" name="email">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Password" name="password">
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Col>
        </Row>
      </Form>
    </AuthLayout>
  );
};

export default Login;