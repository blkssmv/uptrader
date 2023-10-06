import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import ProjectTasks from "./components/ProjectTasks";
import { Toaster } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";



const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <header>
        <div className="container">
          <Link to={"/"}>Projects</Link>
        </div>
      </header>
      <div className="container">
        <div className="main">
          <Routes>
            <Route exact path="/" element={<ProjectList />} />
            <Route
              path="/project/:id"
              element={<ProjectTasks tasks={tasks} setTasks={setTasks} />}
            />
          </Routes>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
