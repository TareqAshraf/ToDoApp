import React from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
 onDeleteTask(taskIdToDelete: string): void;
}

const TodoTask = ({ task, onDeleteTask }: Props) => {
  const handleDeleteClick = async () => {
    try {
      // Make a DELETE request to the API
      const response = await fetch(`/api/task/${task.taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Call the onDeleteTask callback to update the state in the parent component
        onDeleteTask(task.taskId);
      } else {
        // Handle the error if the delete request fails
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="task">
      <div className="content">
        <span>{task.author}</span>  
        <span>{task.title}</span>  
        <span>{task.content}</span>
        <span>{task.date}</span>  
      </div>
      <button
        onClick={handleDeleteClick}
      >
        X
      </button>
    </div>
  );
};

export default TodoTask;
