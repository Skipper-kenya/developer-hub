import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Undraw from "../../assets/1.png";
import getDetails from "../../redux/details/detailsAction";
import { GlobalContext } from "../../context/GlobalProvider";

import "./projects.css";
import Display from "./Display";
import { useNavigate } from "react-router-dom";
const Projects = ({ spin, setSpin }) => {
  const navigate = useNavigate();

  const { cookie } = useContext(GlobalContext);
  const token = cookie.access_token;

  const [allProjects, setAllProjects] = useState([]);
  const [myProject, setMyProject] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjects = async () => {
      dispatch(getDetails());
      try {
        setSpin(true);
        const response = await axios.get(
          `${process.env.REACT_APP_GET_PROJECTS}/${token}`
        );
        const { projects } = response.data;

        setAllProjects([...projects]);
        setSpin(false);
      } catch (error) {
        setSpin(false);
        console.log(error.message);
      }
    };

    fetchProjects();
  }, []);

  const userId = useSelector((state) => state.userId);

  const handleAllProjects = async () => {
    setMyProject(false);
    try {
      setSpin(true);
      const response = await axios.get(
        `${process.env.REACT_APP_GET_PROJECTS}/${token}`
      );
      const { projects } = response.data;

      setAllProjects([...projects]);
      setSpin(false);
    } catch (error) {
      setSpin(false);
      console.log(error.message);
    }
  };

  const handleMyProjects = async () => {
    setMyProject(true);

    try {
      setSpin(true);
      const response = await axios.get(
        `${process.env.REACT_APP_GET_MY_PROJECTS}/${userId}/${token}`
      );

      const { myProjects } = response.data;

      setAllProjects([...myProjects]);
      setSpin(false);
    } catch (error) {
      setSpin(false);
      console.log(error.message);
    }
  };

  return (
    <div className="projects_wrapper">
      {cookie.access_token ? (
        <>
          {" "}
          <div className="top-toggler">
            <button
              onClick={handleAllProjects}
              style={{
                backgroundColor: myProject ? "transparent" : "blue",
                color: myProject ? "black" : "white",
              }}
            >
              All Projects
            </button>
            <button
              style={{
                backgroundColor: myProject ? "blue" : "transparent",
                color: myProject ? "white" : "black",
              }}
              onClick={handleMyProjects}
            >
              My Projects
            </button>
          </div>
          <Display
            allProjects={allProjects}
            myProject={myProject}
            spin={spin}
            setSpin={setSpin}
          />
        </>
      ) : (
        <div className="proj_no_log">
          <h3>Please Login to Access this page.</h3>
          <button onClick={() => navigate("/login")}> Login</button>
          <img src={Undraw} alt="Access denied" />
        </div>
      )}
    </div>
  );
};

export default Projects;
