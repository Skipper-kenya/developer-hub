import React, { useState } from "react";
import { Toaster } from "sonner";
import { Spin } from "antd";
import Navbar from "./components/navbar/Navbar";

import Dashboard from "./pages/dashboard/Dashboard";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import GlobalProvider from "./context/GlobalProvider";

const LazyCreateProject = React.lazy(() =>
  import("./pages/new-project/CreateProject")
);
const LazyProjects = React.lazy(() => import("./pages/projects/Projects"));
    // "react": "^18.2.0",

function App() {
  const [spin, setSpin] = useState(false);
  return (
    <>
      <GlobalProvider>
        <Spin fullscreen spinning={spin} />
        <Toaster richColors position="top-center" />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login setSpin={setSpin} />} />
            <Route path="/register" element={<Register setSpin={setSpin} />} />
            <Route
              path="/create"
              element={
                <React.Suspense>
                  <LazyCreateProject spin={spin} setSpin={setSpin} />
                </React.Suspense>
              }
            />
            <Route
              path="/projects"
              element={
                <React.Suspense>
                  <LazyProjects setSpin={setSpin} spin={spin} />
                </React.Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
