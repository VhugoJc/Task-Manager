import { MenuOutlined } from "@ant-design/icons";

const { Menu, Drawer } = require("antd");
const { default: Link } = require("next/link");
const { useState } = require("react");

// New component for the menu
const UserMenu = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item
          key="1"
          onClick={showDrawer}
        >
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
            <Link href="/">Tasks</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/dashboard">Dashboard</Link>
          </Menu.Item>
          {/* Add more menu items as needed */}
        </Menu>
      </Drawer>
    </>
  );
};

export default UserMenu;
