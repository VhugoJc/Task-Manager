"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Row, Col, message } from 'antd';
import AuthLayout from '../../../layout/AuthLayout'; // Adjust the import path as necessary
import { signup } from '../../../api/auth'; // Adjust the import path as necessary

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await signup(email, password, name);
      message.success('Signup successful!');
      router.push('/auth/login'); // Redirect to /login on success
    } catch (error) {
      message.error('Signup failed. Please try again.');
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
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12} xl={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12} xl={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default RegisterPage;