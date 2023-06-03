import { Layout, Menu, theme } from "antd";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";

const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <div className="">
          <img src="" alt="" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            {
              key: "dashboard",
              icon: <MdDashboard />,
              label: <NavLink to={"/"}>Dashboard</NavLink>,
            },
            {
              key: "invoice",
              icon: <TbFileInvoice />,
              label: <NavLink to="/invoice">Invoice</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="dashboard_header">
            <b>Dashboard</b>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          {location.pathname === "/" ? (
            <div className="main_dashboard">
              <h1 className="main_title">Welcome to Dashboard!!</h1>
              <p>
                In this dashboard, you will find all the essential details
                related to your invoices. We have organized the information in a
                user-friendly manner, allowing you to track and manage your
                invoices effectively.
              </p>
            </div>
          ) : location.pathname === "/invoice" ? (
            <Outlet />
          ) : (
            ""
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
