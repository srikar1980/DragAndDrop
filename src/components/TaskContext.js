import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const initialState = {
    categories: {
      core: ["Finance", "Maths", "Science", "Commerce", "Language"],
      special: ["Space Technologies", "Robotics and Electronics"],
      creative: ["GraphicNovel", "Yoga", "Dance", "Music"],
    },
    priorities: {
      school: [],
      home: [],
    },
  };

  const [taskState, setTaskState] = useState(initialState);

  console.log("test", taskState);

  const updateTaskState = (newState) => {
    setTaskState(newState);
  };

  return (
    <TaskContext.Provider value={{ taskState, updateTaskState }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
