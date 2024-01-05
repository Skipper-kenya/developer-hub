import React from "react";
import { Toaster } from "sonner";

import Navbar from "./components/navbar/Navbar";

import Dashboard from "./pages/dashboard/Dashboard";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import CreateProject from "./pages/new-project/CreateProject";
import GlobalProvider from "./context/GlobalProvider";
import Projects from "./pages/projects/Projects";

function App() {
  return (
    <>
      <GlobalProvider>
        <Toaster richColors position="top-center" />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateProject />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
