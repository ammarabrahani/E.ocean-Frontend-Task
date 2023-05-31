import { Routes, Route } from "react-router-dom";
import Dashboard from "./Layouts/Dashboard";
import Invoice from "./Components/Invoice";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="invoice" element={<Invoice />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
