import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

const CreatingForm = ({tasks, setTasks}) => {

    const { id } = useParams()

    const [task, setTask] = useState({
        id: v4,
        title: "",
        subtitle: "",
        status: "queue",
        project_id: id
      })
      

      const handleSubmit = (e) => {
        e.preventDefault()

        if(task.title.length < 3 || task.subtitle.length < 3){
            return toast.error("Minimum length of project title must not be less than 3")
        }

        setTasks((prev) => {
            const list = [...(prev || []), task]
            localStorage.setItem("tasks", JSON.stringify(list))
            return list
        })

        toast.success("Success")
        setTask({title: "", id: "", status: "queue", subtitle: ""})
      }
    
    return (
        <form onSubmit={handleSubmit} style={{display: "flex", gap: "10px", width: "50%"}}>
            <input 
            style={{padding: "8px 12px", borderRadius: "7px", border: "1px solid #000", width: "100%"}}
                type="text" 
                onChange={(e) => {
                    setTask({
                        ...task,
                        title: e.target.value,
                    })
                }}
                placeholder='title'
                value={task.title}
            />
            <input 
            style={{padding: "8px 12px", borderRadius: "7px", border: "1px solid #000", width: "100%"}}
                type="text" 
                placeholder='subtitle'
                onChange={(e) => {
                    setTask({
                        ...task,
                        subtitle: e.target.value,
                    })
                }}
                value={task.subtitle}
            />
            <button style={{background: "green", padding: "5px 10px", color: "#FFF", borderRadius: "7px", border: "none", cursor: "pointer", width: "100%" }} >Create task</button>
        </form>
    );
};

export default CreatingForm;