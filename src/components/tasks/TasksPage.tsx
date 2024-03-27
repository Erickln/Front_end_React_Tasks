import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { sha256 } from "crypto-hash";

interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authCookie = document.cookie
      .split(";")
      .find((row) => row.trim().startsWith("token="));

    if (!authCookie || authCookie.split("=")[1] === "") {
      navigate("/login"); // Redirect to login page if _auth cookie does not exist or is empty
      return;
    }

    const userID = authCookie.split("=")[1];
    console.log("UserID:", userID);

    axios
      .get(`http://localhost:8080/api/user/${userID}/tasks`)
      .then((response) => {
        setTasks(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setIsLoading(false);
      });
  }, [navigate]);
  
  const handleNewTaskNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTaskName(event.target.value);
  };

  const handleNewTaskDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTaskDescription(event.target.value);
  };

  const handleAddTask = async () => {
    // Prevent adding empty task
    if (!newTaskName.trim() || !newTaskDescription.trim()) {
      return;
    }

    const id = await sha256(newTaskName); // Generate ID using SHA-256 hash of task name
    const newTask: Task = {
      id: id,
      name: newTaskName.trim(),
      description: newTaskDescription.trim(),
      completed: false,
    };

    // Add the new task locally
    setTasks([...tasks, newTask]);
    setNewTaskName("");
    setNewTaskDescription("");

    //
    //

    // Post the new task to the server
    const authCookie = document.cookie
        .split(";")
        .find((row) => row.trim().startsWith("token="));

    const userID = authCookie ? authCookie.split("=")[1] : "";

    axios
        .post(`http://localhost:8080/api/user/${userID}/tasks`, newTask)
        .then((response) => {
            console.log("New task added successfully:", response.data);
        })
        .catch((error) => {
            console.error("Error adding new task:", error);
        });
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Completed: {task.completed ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTaskName}
          onChange={handleNewTaskNameChange}
          placeholder="Enter task name"
        />
        <input
          type="text"
          value={newTaskDescription}
          onChange={handleNewTaskDescriptionChange}
          placeholder="Enter task description"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
}

export default TasksPage;