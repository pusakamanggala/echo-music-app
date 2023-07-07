import React from "react";
import DashboardLayout from "./layout/DashboardLayout";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <DashboardLayout>
        <HomePage />
      </DashboardLayout>
    </div>
  );
};

export default App;
