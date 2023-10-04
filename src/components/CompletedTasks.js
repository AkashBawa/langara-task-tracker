import { useEffect, useState } from "react";
import TaskComplete from "./completedFlow/Task";

const CompletedTasks = ({tasks, reactivateTask, deleteTask}) => {

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
