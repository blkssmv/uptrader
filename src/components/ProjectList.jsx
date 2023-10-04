// Список проектов (ProjectList.js)
import React from "react";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const projects = [{
    id: 1,
    name: "Project 1",
  },
  {
    id: 2,
    name: "Project 2",
  },
  {
    id: 3,
    name: "Project 3",
  }
];

  return (
    <div>
      <h1>Список проектов</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
