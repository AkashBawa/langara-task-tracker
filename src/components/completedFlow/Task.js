import { Link } from "react-router-dom";
import { FaTimes, FaCheck, FaCircle } from 'react-icons/fa'

const Task = ({ task, onDelete, onReactivate }) => {
  return (
    <div
      className={`task ${task.reminder && 'reminder'}`}
    >
      <h3>
        {task.text}{' '}
        <div>
          <FaCheck style={{color:"green"}}/>
          <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => onDelete(task.id)}
          />
          <FaCircle
            style={{color: "blue"}}
            onClick={() => onReactivate(task.id)}
          >

          </FaCircle>
        </div>
        
        
      </h3>
      <p>{task.day}</p>
      <p style={{"display": "flex", justifyContent:"space-between"}}> <Link to={`/task/${task.id}`}>View Details</Link></p>
      
    </div>
  )
}

export default Task;