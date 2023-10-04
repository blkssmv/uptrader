import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import ProjectTasks from "./components/ProjectTasks";
import { Toaster } from "react-hot-toast";
import CreatingForm from "./components/CreatingForm";

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      <Toaster />
      <header>
        <div className="container">
          <Link to={"/"}>Projects</Link>
        </div>
      </header>
      <div className="container">
        <div className="form">
          <CreatingForm tasks={tasks} setTasks={setTasks} />
        </div>
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
    </div>
  );
};

export default App;
