import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

const CreatingForm = ({tasks, setTasks}) => {

    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "queue",
        project_id: ""
      })
      const { id } = useParams()

      const handleSubmit = (e) => {
        e.preventDefault()

        if(task.name.length < 3){
            return toast.error("Minimum length of project name must not be less than 3")
            
        }

        setTasks((prev) => {
            const list = [...prev, task]
            localStorage.setItem("tasks", JSON.stringify(list))
            return list
        })

        toast.success("Success")
        setTask({name: "", id: ""})
      }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                onChange={(e) => {
                    setTask({
                        ...task,
                        id: v4(),
                        name: e.target.value,
                        project_id: id
                    })
                }}
                value={task.name}
            />
            <button>Create task</button>
        </form>
    );
};

export default CreatingForm;