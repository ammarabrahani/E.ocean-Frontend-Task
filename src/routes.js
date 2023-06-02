import { Routes, Route } from "react-router-dom";
import Dashboard from "./Layouts/Dashboard";
import Invoice from "./Components/Invoice";
import Home from "./Components/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/home" element={<Home />} />
        <Route path="invoice" element={<Invoice />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
