import "./App.css";
import "./assets/scss/main.scss";

import AppRoutes from "./routes";

import { Provider } from "react-redux";

import { store } from "./Redux/Store";
import { useEffect, useState } from "react";
import { Spin } from "antd";

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
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      )}
    </>
  );
}

export default App;
