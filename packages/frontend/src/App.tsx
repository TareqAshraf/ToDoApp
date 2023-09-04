import React, { FC, ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";
import { fetchTasks } from "./Components/ListTask";


export const App: FC = () => {
  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [nextId, setNextId] = useState<number>(1); // Initialize with 1
  const [isFormValid, setIsFormValid] = useState<boolean>(false); // State to track form validity


  useEffect(() => {
    // Check if all input fields have values and set the form validity accordingly
    setIsFormValid(!!author && !!title && !!content && !!date);
  }, [author, title, content, date]);
  // Fetch tasks from the API when the component mounts


  useEffect(() => {
    fetchTasks().then((data) => {
      setTodoList(data);

      // Calculate the nextId based on the maximum taskId
      const maxId = data.reduce((max: number, task: ITask) => {
        const taskIdNum = parseInt(task.taskId);
        return taskIdNum > max ? taskIdNum : max;
      }, 0);

      setNextId(maxId + 1);
    });
  }, []);

  const addTaskToAPI = async (): Promise<void> => {
    try {
      // Create a new task object
      const newTask = {
        "taskId": nextId.toString(),
        "author": author,
        "title": title,
        "content": content,
        "date": date,
      };

      // Send a POST request to the API to add the task
      const response = await fetch(`${process.env.REACT_APP_API_URL}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        // If the task was added successfully, fetch the updated task list
        const updatedTasks = await fetchTasks();
        setTodoList(updatedTasks);

        const maxId = updatedTasks.reduce((max: number, task: ITask) => {
          const taskIdNum = parseInt(task.taskId);
          return taskIdNum > max ? taskIdNum : max;
        }, 0);

        setNextId(maxId + 1);

        // Clear input fields
        setAuthor("");
        setTitle("");
        setContent("");
        //   setDate("");
        // Clear input fields
        setAuthor("");
        setTitle("");
        setContent("");
        setDate("");
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };



  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "author") {
      setAuthor(value);
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    } else if (name === "date") {
      setDate(value);
    }
  };

  const completeTask = (taskIdToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskId !== taskIdToDelete;
      })
    );

  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Author..."
            name="author"
            value={author}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Title..."
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Content..."
            name="content"
            value={content}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local" // Use "datetime-local" type for date-time picker
            name="date"
            value={date}
            onChange={handleChange}
            required
          />
        </div>

        <button onClick={addTaskToAPI} disabled={!isFormValid}>Add Task</button>
      </div>
      <div className="todoList">
        {
          todoList.map((task: ITask, key: number) => {
            console.log(task);
            return (
              <TodoTask
                key={task.taskId}
                task={task}
                onDeleteTask={completeTask}
                
              />
            );
          })}
      </div>
    </div>
  );
};

export default App;
