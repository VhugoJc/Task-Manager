"use client";
import React, { useContext } from "react";
import { Layout, Card } from "antd";
import "./layout.scss";
import UserMenu from "./UserMenu";
import { useUser } from "../hooks/useUser"; 
import { useRouter } from "next/navigation";

const { Header, Content, Footer } = Layout;

const UserLayout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    // Redirect to login page if user is not authenticated
    if (typeof window !== "undefined") {
      router.push("/auth/login");
    }
    return null; // Or you can return a loading spinner or message
  }

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
