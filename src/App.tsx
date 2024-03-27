import React from "react";
import "./App.css";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/login/login";
import { Home } from "./components/home";
import Register from "./components/register/Register";
import TasksPage from "./components/tasks/TasksPage";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={<TasksPage />} />
    </Routes>
  );
}

export default App;
