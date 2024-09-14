// src/layout/AuthLayout.jsx
"use client";
import React from "react";
import { Layout, Card, Row, Col } from "antd";
import "./layout.scss";
import Link from "next/link";

const { Header, Content, Footer } = Layout;

const AuthLayout = ({ children, title, linkText, linkHref }) => {
  return (
    <Layout className="auth-layout">
      <Content className="content">
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Col xs={22} sm={20} md={24} lg={24} xl={24}> 
            <Card className="login-card"> 
          <h1 className="login-title">{title}</h1>
          {children}
          <Link href={linkHref} style={{ display: "block", textAlign: "center", marginTop: 16 }}>
            {linkText}
          </Link>
        </Card>
        </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
