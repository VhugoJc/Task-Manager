// src/layout/AuthLayout.jsx
"use client";
import React from "react";
import { Layout, Card } from "antd";
import "./layout.scss";
import Link from "next/link";

const { Header, Content, Footer } = Layout;

const AuthLayout = ({ children, title, linkText, linkHref }) => {
  return (
    <Layout className="auth-layout">
      <Content className="content">
        <Card className="login-card" style={{ width: 400 }}>
          <h1 className="login-title">{title}</h1>
          {children}
          <Link href={linkHref} style={{ display: "block", textAlign: "center", marginTop: 16 }}>
            {linkText}
          </Link>
        </Card>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
