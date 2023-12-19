import React, { useState } from "react";
import { Link, Notebook, Notepad, PenNibStraight, User } from "phosphor-react";

import Undraw from "../../assets/5.png";
import Spinner from "../../components/Loading/Spinner";
import { useNavigate } from "react-router-dom";

const Display = ({ allProjects, myProject, loading }) => {
  const navigate = useNavigate();

  return (
    <>
      {(myProject && allProjects.length > 0) ||
      (!myProject && allProjects.length > 0) ? (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <div className="projects_window">
              {allProjects?.map((proj, idx) => {
                const { name, description, link, skills, ownerName } = proj;

                return (
                  <div key={idx} className="project">
                    <div className="theme">
                      <p>
                        <User />
                        {ownerName}
                      </p>
                    </div>
                    <div className="project_details">
                      <h3>{name}</h3>

                      <div className="pro_title">
                        <h5>
                          <PenNibStraight /> Skills
                        </h5>{" "}
                        <div className="pro_cont">
                          {skills.map((skill, idx) => (
                            <p key={idx}>{skill},</p>
                          ))}
                        </div>
                      </div>
                      <div className="pro_title">
                        <h5>
                          <Notepad /> Description
                        </h5>
                        <p>{description}</p>
                      </div>
                    </div>
                    <div className="btn_holder">
                      <button>
                        <a href={link} target="_blank">
                          {" "}
                          View site <Link />
                        </a>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="proj_no_log">
          <h3>You have not uploaded any project yet.</h3>
          <button onClick={() => navigate("/create")}>Upload a Project </button>
          <img src={Undraw} alt="Empty" />
        </div>
      )}
    </>
  );
};

export default Display;
