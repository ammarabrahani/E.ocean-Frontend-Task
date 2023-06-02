import "./App.css";
import "./assets/scss/main.scss";

import AppRoutes from "./routes";

import { Provider } from "react-redux";

import { store } from "./Redux/Store";
import { useEffect, useState } from "react";
import { Spin, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";

import Dashboard from "./Layouts/Dashboard";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Spin
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        />
      ) : (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#413ea0",
              fontFamily: "Poppins, sans-serif",
            },
          }}
        >
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </ConfigProvider>
      )}
    </>
  );
}

export default App;
