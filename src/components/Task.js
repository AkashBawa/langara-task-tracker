import { Link } from "react-router-dom";
import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle, onComplete }) => {
  return (
    <div
      className={`task ${task.reminder && 'reminder'}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
      <p style={{"display": "flex", justifyContent:"space-between"}}> <Link to={`/task/${task.id}`}>View Details</Link> <button onClick={() => {onComplete(task.id)}}>Complete</button></p>
      
    </div>
  )
}

export default Task;