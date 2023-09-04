import React from "react";
import { ITask } from "../Interfaces";
import { fetchTasks } from "./ListTask";


interface Props {
  task: ITask;
 onDeleteTask(taskIdToDelete: string): void;
}


const TodoTask = ({ task, onDeleteTask }: Props) => {
  const handleDeleteClick = async () => {
    try {
      //  const requestBody = ;
      // Make a DELETE request to the API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/task/${task.taskId}`, {
        method: "DELETE",
      headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ taskId: task.taskId }),
      });


        console.log(response);
      if (response.ok) {
        // Call the onDeleteTask callback to update the state in the parent component
        onDeleteTask(task.taskId);
        await fetchTasks();
      } else {
        // Handle the error if the delete request fails
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
let formattedDate = "";
  if (task.date) {
    const dateObject = new Date(task.date);
    if (!isNaN(dateObject.getTime())) {
      formattedDate = dateObject.toISOString().slice(0, 16);
    }
  }
  
  // console.log(process.env.REACT_APP_API_URL)

  return (
    <div className="task">
      <div className="content">
        <span>{task.taskId}</span>  
        <span>{task.author}</span>  
        <span>{task.title}</span>  
        <span>{task.content}</span>
        <span>{formattedDate}</span>  
      </div>
      <button
        onClick={handleDeleteClick}
        //  onClick={() => {
        //   onDeleteTask(task.taskId);
        // }}
      >
        X
      </button>
    </div>
  );
};

export default TodoTask;
