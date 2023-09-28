import Task from "./Task";

const Tasks = ({tasks, onDelete, onToggle, onComplete}) => {

  return (
    <>
        {
            tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onComplete={onComplete}/> 
            ))
        }
    </>
  )
}

export default Tasks
