import React, { useContext, useState } from "react";
import axios from "axios";

import "./auth.css";
import Auth from "./Auth";

import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalProvider";
import { toast } from "sonner";

const Login = ({ setSpin }) => {
  const { setCookie } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpin(true);
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

      if (token) {
        toast.success(message);
        navigate("/");
      } else {
        toast.error(message);
      }
      setSpin(false);
    } catch (error) {
      setSpin(false);
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
