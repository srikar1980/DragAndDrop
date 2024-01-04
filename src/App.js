import React from "react";
import TaskManager from "./components/TaskManager";
import { TaskProvider } from "./components/TaskContext";

const App = () => {
  return (
    <TaskProvider>
      <TaskManager />
    </TaskProvider>
  );
};

export default App;
