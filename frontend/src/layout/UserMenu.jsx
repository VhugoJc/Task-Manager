"use client";
import React, { useContext, useState } from "react";
import { Layout, Drawer, Menu, Modal } from "antd";
import "./layout.scss";
import Link from "next/link";
import { BookOutlined, DashboardOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { UserContext } from "../context/UserContext";
import ProfileSection from "../components/ProfileSection";

const { Header, Content, Footer } = Layout;

// New component for the menu
const UserMenu = ({ userData }) => {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useContext(UserContext);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    logout();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className="no-background-button"
      >
        <Menu.Item key="1" onClick={showDrawer}>
          <MenuOutlined />
        </Menu.Item>
      </Menu>
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Menu theme="light" mode="vertical">
        <Menu.Item key="1">
            <Link href="/"><BookOutlined /> Tasks</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/dashboard"><DashboardOutlined /> Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/profile"><UserOutlined /> Profile</Link>
          </Menu.Item>
          <Menu.Item key="4" onClick={showModal} style={{color:"white", backgroundColor:"red",position:"absolute",bottom:"20px", width:"90%"}}>
            <LogoutOutlined /> Logout
          </Menu.Item>
          {/* Add more menu items as needed */}
        </Menu>
      </Drawer>
      <Modal
        title="Confirm Logout"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
};

export default UserMenu;
