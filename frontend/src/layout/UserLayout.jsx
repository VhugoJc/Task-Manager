"use client";
import React from "react";
import { Layout, Card } from "antd";
import "./layout.scss";
import Link from "next/link";

const { Header, Content, Footer } = Layout;

const UserLayout = ({ children, title }) => {
  return (
    <Layout className="user-layout">
      <Header className="user-layout-header">
        {/* Your navigation content goes here */}
        <h1 style={{ color: "white" }}>{title}</h1>
      </Header>
      <Content className="user-layout-content">{children}</Content>
      <Footer className="user-layout-footer">
        {/* Your footer content goes here */}
        <p>&copy; 2024 Task Manager - Victor Jimenez</p>
      </Footer>
    </Layout>
  );
};

export default UserLayout;
