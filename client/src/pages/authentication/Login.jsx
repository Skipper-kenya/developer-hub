import React, { useContext, useState } from "react";
import axios from "axios";

import "./auth.css";
import Auth from "./Auth";

import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalProvider";

const Login = () => {
  const { setCookie } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN, {
        username,
        password,
      });
      const { message, token, userId, userName } = response.data;

      setCookie("access_token", token, {
        path: "/",
        maxAge: 7200,
        secure: true,
      });

      const userDetails = {
        userId,
        userName,
      };

      window.localStorage.setItem("userDetails", JSON.stringify(userDetails));
      alert(message);
      if (token) {
        navigate("/");
      }
    } catch (error) {
      console.log(`err:login-client:${error.message}`);
    }
  };

  return (
    <>
      <Auth
        handleSubmit={handleSubmit}
        name="Login"
        btnName="Login"
        u={username}
        p={password}
        su={setUsername}
        sp={setPassword}
      />
    </>
  );
};

export default Login;
