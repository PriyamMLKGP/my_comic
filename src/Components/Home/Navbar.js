import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ width: "fit-content" }}
      >
        <div
          style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}
        >
          <Link to="/" style={{ color: "white" }}>
            Easy Comic
          </Link>
        </div>
      </Menu>
    </Header>
  );
};

export default Navbar;
