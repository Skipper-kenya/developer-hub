import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import getDetails from "../../redux/details/detailsAction";

import Undraw from "../../assets/2.png";

import "./createProject.css";

import { CloudArrowDown } from "phosphor-react";
import { GlobalContext } from "../../context/GlobalProvider";

const CreateProject = () => {
  const { cookie } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [projDetails, setProjDetails] = useState({
    name: "",
    description: "",
    link: "",
    skills: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails());
  }, []);

  const userId = useSelector((state) => state.userId);
  const username = useSelector((state) => state.userName);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProjDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    setProjDetails((prev) => ({
      ...prev,
      skills: [...projDetails.skills, ""],
    }));
  };

  const handleSkillsChange = (e, idx) => {
    const skillsCpy = projDetails.skills;
    skillsCpy[idx] = e.target.value;

    setProjDetails((prev) => ({ ...prev, skills: skillsCpy }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(process.env.REACT_APP_PUT_PROJECT, {
        projDetails,
        userId,
        username,
      });

      const { action, message } = response.data;
      if (action === "success") {
        alert(message);
        navigate("/projects");
      }
    } catch (error) {
      console.error(`error:create-project:${error.message}`);
    }
  };

  return (
    <div className="create_wrapper">
      {cookie.access_token ? (
        <>
          <h3>
            Upload your project here <CloudArrowDown size={20} />{" "}
            <CloudArrowDown size={20} />
          </h3>
          <div className="project_container">
            <form>
              <div className="mini-cont">
                <label>Project name</label>
                <input
                  type="text"
                  name="name"
                  value={projDetails.name}
                  onChange={handleChange}
                  placeholder="Name of your project..."
                />
              </div>
              <div className="mini-cont">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={projDetails.description}
                  onChange={handleChange}
                  placeholder="what is your project about?"
                />
              </div>
              <div className="mini-cont">
                <label>Project link</label>
                <input
                  type="text"
                  name="link"
                  value={projDetails.link}
                  onChange={handleChange}
                  placeholder="link to your project..."
                />
              </div>
              <div className="skills-cont">
                <label>Skills</label>
                {projDetails.skills?.map((skill, idx) => {
                  return (
                    <input
                      type="text"
                      value={skill}
                      key={idx}
                      onChange={(e) => handleSkillsChange(e, idx)}
                    />
                  );
                })}
                <button type="button" onClick={handleAddSkill}>
                  Add Skill
                </button>
              </div>

              <button
                onClick={handleSubmit}
                className="submit_btn"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="proj_no_log">
          <h3>Please Login to Access this page.</h3>
          <button onClick={() => navigate("/login")}>Login</button>
          <img src={Undraw} alt="Access denied" />
        </div>
      )}
    </div>
  );
};

export default CreateProject;
