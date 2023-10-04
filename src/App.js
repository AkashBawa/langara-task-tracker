import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";
import CompletedTasks from "./components/CompletedTasks";

function App() {

  
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState ([]);
  const [taskCompleted, setCompletedTasks] = useState(); 

  useEffect(() => {
    
    getTasks();
    fetchCompletedTasks();

  }, []);

  const getTasks = async () => {
    const taskFromServer =  await fetchTasks();
    setTasks(taskFromServer);
  }

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks?status=active");
    const data = await res.json();
    return data;
  }

  const fetchCompletedTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks?status=completed");
    const data = await res.json();
    setCompletedTasks(data);
}

  // Fetch single task
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
    await fetchCompletedTasks();
    await fetchTasks();
  }

  const completeTask = async (id) => {
    const activeTask = await fetchTask(id);
    const completedTask = {...activeTask, status: "completed"};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(completedTask)
    })
    
    const data = await res.json();
    const newTasks = await fetchTasks();
    setTasks(newTasks);
    await fetchCompletedTasks();
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
    await getTasks();
  }

    

  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id);
    const upTask = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(upTask)
    })
    
    const data = await res.json();

    setTasks( tasks.map((task) => {
      return task.id === id ? {...task, reminder: !task.reminder} : task;
    }))

  }

  const addTask = async (task) => {
    
    const res = await fetch ("http://localhost:5000/tasks", {
      method: "POST", 
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  }

  return (

    <div className="container">
      <Router>
        <Header onAdd={ () => { setShowAddTask(!showAddTask)}} showAdd={showAddTask}/>
              
        <Routes>

        
          <Route path="/" 
            element= {
              <>
                {
                  showAddTask && <AddTask onAdd={addTask}/>
                }
                {
                  tasks.length > 0 ?  <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} onComplete={completeTask}/> : 
                  "No tasks to Show"
                }
              
              </>
          }/>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/completedTasks" element={<CompletedTasks tasks={taskCompleted}  reactivateTask={reactivateTask} deleteTask={deleteTask}/>}></Route>
          <Route path="/task/:id" element={<TaskDetails/> }></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}


export default App;
