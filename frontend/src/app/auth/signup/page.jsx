"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Row, Col, message } from "antd";
import AuthLayout from "@/layout/AuthLayout";
import { register } from "@/api/auth"; // Import the register function from the auth API

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await register(email, password, name); // Call the register function with the email, password, and name
      message.success("Signup successful!");
      router.push("/auth/login"); // Redirect to /login on success
    } catch (error) {
      message.error("Signup failed. Please try again.");
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Task Manager" linkText="I already have an account" linkHref="/auth/login">
      <Form onFinish={handleSubmit} layout="vertical" className="login-form">
        <Row gutter={16}>
          <Col xs={24} lg={12} xl={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12} xl={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12} xl={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12} xl={12}>
            <Form.Item
              label="Repeat Password"
              name="repeatPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: "Please repeat your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default SignUp;