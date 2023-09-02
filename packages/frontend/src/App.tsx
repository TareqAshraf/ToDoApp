import React, { FC, ChangeEvent, useState,useEffect  } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";


const App: FC = () => {
  // const [task, setTask] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [nextId, setNextId] = useState<number>(1); // Initialize with 1
  const [ isFormValid, setIsFormValid] = useState<boolean>(false); // State to track form validity

    useEffect(() => {
    // Check if all input fields have values and set the form validity accordingly
    setIsFormValid(!!author && !!title && !!content && !!date);
  }, [author, title, content, date]);

useEffect(() => {
    // Fetch tasks from the API when the component mounts
    async function fetchTasks() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/task`);
        if (response.ok) {
          const data = await response.json();
          setTodoList(data); // Update todoList state with data from the API
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);



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

  const addTask = (): void => {
    // Create a new task with the next available id
 const newTask: ITask = {
  taskId: nextId.toString(),
  author,
  title,
  content,
  date,
};

    // Add the new task to the todoList
    setTodoList([...todoList, newTask]);

    // Increment the nextId for the next task
    setNextId(nextId + 1);

    // Clear input fields
    setAuthor("");
    setTitle("");
    setContent("");
    setDate("");
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
        
        <button onClick={addTask}  disabled={!isFormValid}>Add Task</button>
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
