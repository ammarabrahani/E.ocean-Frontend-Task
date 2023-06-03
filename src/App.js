import "./assets/scss/main.scss";

import AppRoutes from "./routes";

import { Provider } from "react-redux";

import { store } from "./Redux/Store";
import { useEffect, useState } from "react";
import { Spin, ConfigProvider } from "antd";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#413ea0",
            fontFamily: "Poppins, sans-serif",
          },
        }}
      >
        {loading ? (
          <Spin className="main_loader" />
        ) : (
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        )}
      </ConfigProvider>
    </>
  );
}

export default App;
