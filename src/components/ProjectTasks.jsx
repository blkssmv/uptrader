// Страница проекта с задачами ToDo (ProjectTasks.js)
import React, { useEffect, useState } from "react";
import CreatingForm from "./CreatingForm";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ProjectTasks = ({ tasks, setTasks }) => {
  const [queue, setQueue] = useState([]);
  const [development, setDevelopment] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const fQueue = tasks?.filter((task) => task.status === "queue");
    const fDevelopment = tasks?.filter((task) => task.status === "development");
    const fDone = tasks?.filter((task) => task.status === "done");

    setQueue(fQueue);
    setDevelopment(fDevelopment);
    setDone(fDone);
  }, [tasks]);

  const statuses = ["queue", "development", "done"];

  return (
    <div className="tasks" style={{ display: "flex", flexDirection: "column" }}>
      <div className="form">
        <CreatingForm tasks={tasks} setTasks={setTasks} />
      </div>
      <div style={{ display: "flex", gap: "50px" }}>
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
    </div>
  );
};

export default ProjectTasks;

const Section = ({ status, tasks, setTasks, queue, development, done }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const { id } = useParams();
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

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mTasks));
      toast("Task status changed");
      return mTasks;
    });
  };

  return (
    <div
      ref={drop}
      style={{
        width: "100%",
        height: "100vh",
        borderRadius: "12px",
        background: isOver && "rgb(226 232 240)",
      }}
    >
      <Header text={text} bg={bg} count={tasksToMap?.length} />

      {tasksToMap?.length > 0 &&
        tasksToMap.map((task, idx) => {
          return (
            task.project_id === id && (
              <Task
                number={idx}
                key={task.id}
                tasks={tasks}
                setTasks={setTasks}
                task={task}
              />
            )
          );
        })}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      style={{
        background: bg,
        display: "flex",
        alignItems: "center",
        textTransform: "uppercase",
        borderRadius: "12px",
        padding: "15px 22px",
        marginBottom: "12px",
      }}
    >
      {text}{" "}
      <div
        style={{
          background: "#FFF",
          marginLeft: 5,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 20,
          height: 20,
        }}
      >
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks, number }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    const fTasks = tasks?.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast.success("Removed");
  };
  return (
    <div
      ref={drag}
      style={{
        display: "flex",
        padding: "10px 12px",
        borderRadius: "12px",
        alignItems: "center",
        opacity: isDragging && "25%",
        marginBottom: 10,
        background: "teal",
        cursor: "grab",
      }}
    >
      <strong style={{ marginRight: "5px" }}>{number + 1}.</strong>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <p>{task.title}</p>
        <p>{task.subtitle}</p>
        <button
          onClick={() => handleRemove(task.id)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            background: "#FFF",
            cursor: "pointer",
            border: "1px solid #FFF",
            width: "30px",
            height: "30px"
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};
