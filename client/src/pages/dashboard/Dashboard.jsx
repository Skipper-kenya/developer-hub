import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.css";

import getDetails from "../../redux/details/detailsAction";
import HomeImg from "../../assets/im2.jpg";
import { Money, Timer, Wallet } from "phosphor-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetails());
  }, []);

  const userName = useSelector((state) => state.userName);

  return (
    <div className="home">
      <div className="left-home">
        <div className="left-cont">
          <h4>Welcome {userName ? userName : ""} showcase your project</h4>
          <h3>Developers' Project Showcasing Hub</h3>
          <div className="top-left">
            <Wallet size={40} color="green" />
            <Money size={40} color="green" />
            <Timer size={40} color="green" />
          </div>

          <p>
            At rastaTech, this is your space to shine, where developers like you
            come together to share their passion projects and inspire the
            community. Whether you're a coding maestro, a design virtuoso, or a
            tech enthusiast, this is the platform to showcase your ingenuity.
          </p>

          <button onClick={() => navigate("/create")}>
            Upload your Project
          </button>
        </div>
      </div>
      <div className="right-home">
        <img src={HomeImg} alt="illust" />
      </div>
    </div>
  );
};

export default Dashboard;
