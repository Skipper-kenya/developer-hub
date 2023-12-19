import React, { useState } from "react";
import axios from "axios";
import Auth from "./Auth";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.REGISTER, {
        username,
        password,
      });

      const { message } = response.data;
      alert(message);
      navigate("/login");
    } catch (error) {
      console.log(`error:register-client:${error.message}`);
    }
  };

  return (
    <>
      <Auth
        handleSubmit={handleSubmit}
        name="Register"
        btnName="Create Account"
        u={username}
        p={password}
        su={setUsername}
        sp={setPassword}
      />
    </>
  );
};

export default Register;
