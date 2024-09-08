"use client";
import React from "react";
import { Layout, Card } from "antd";
import "./layout.scss";
import UserMenu from "./UserMenu";

const { Header, Content, Footer } = Layout;

const UserLayout = ({ children }) => {
  return (
    <Layout className="user-layout">
      <Header className="user-layout-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between", // Distributes space between title and menu
            alignItems: "center",
            width: "100%",
          }}
        >
          <h1 style={{ color: "white", flex: 1, textAlign: "center" }}>
            {" "}
            {/* Allow title to grow and center text */}
            Task Manager
          </h1>
          <UserMenu style={{ flex: 0 }} /> {/* Prevent menu from growing */}
        </div>
      </Header>
      <Content className="user-layout-content">{children}</Content>
      <Footer className="user-layout-footer">
        <p>&copy; 2024 Task Manager - Victor Jimenez</p>
      </Footer>
    </Layout>
  );
};

export default UserLayout;
