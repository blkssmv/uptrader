// Страница проекта с задачами ToDo (ProjectTasks.js)
import React, { useEffect, useState } from "react";

const ProjectTasks = ({ tasks, setTasks }) => {
  const [queue, setQueue] = useState([]);
  const [development, setDevelopment] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const fQueue = tasks.filter((task) => task.status === "queue");
    const fDevelopment = tasks.filter((task) => task.status === "development");
    const fDone = tasks.filter((task) => task.status === "done");

    setQueue(fQueue);
    setDevelopment(fDevelopment);
    setDone(fDone);
  }, [tasks]);

  const statuses = ["queue", "development", "done"];

  return (
    <div className="tasks">
      {statuses.map((status, idx) => (
        <Section
          key={idx}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          queue={queue}
          development={development}
          done={done}
        />
      ))}
    </div>
  );
};

export default ProjectTasks;

const Section = ({ status, tasks, setTasks, queue, development, done }) => {
  let text = "queue";
  let bg = "gray";
  let tasksToMap = queue;

  if (status === "development") {
    text = "development";
    bg = "orange";
    tasksToMap = development;
  }

  if (status === "done") {
    text = "done";
    bg = "green";
    tasksToMap = done;
  }

  return (
    <div style={{width: "200px"}}>
      <Header text={text} bg={bg} count={tasksToMap.length} />
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div style={{ background: bg, display: "flex", height: "35px", alignItems: "center", textTransform: "uppercase", borderRadius: "12px", padding: "5px 7px" }}>
      {text} <div style={{background: "#FFF", marginLeft: 5, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", width: 20, height: 20}}>{count}</div>
    </div>
  );
};
