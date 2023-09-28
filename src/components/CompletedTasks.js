import { useEffect, useState } from "react";
import TaskComplete from "./completedFlow/Task";

const CompletedTasks = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchCompletedTasks();
    }, [])

    const fetchCompletedTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks?status=completed");
        const data = await res.json();
        setTasks(data)
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();
        return data;
      }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE"
      })
        setTasks(tasks.filter((task) => task.id !== id));
      }

    
  const reactivateTask = async (id) => {
    const completedTask = await fetchTask(id);
    const activeTask = {...completedTask, status: "active"};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(activeTask)
    })
    
    const data = await res.json();
    await fetchCompletedTasks();
  }

    return (
        <div>
        <>
            {
                tasks.map((task) => (
                    <TaskComplete task={task} onReactivate={reactivateTask} onDelete={deleteTask}/>  
                ))
            }
        </>
        </div>
    )
}

export default CompletedTasks
