import React, { useState } from "react";
import axios from "axios";
import Auth from "./Auth";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = ({ setSpin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSpin(true);
      const response = await axios.post(process.env.REACT_APP_REGISTER, {
        username,
        password,
      });

      const { message } = response.data;
      setSpin(false);
      toast(message);
      navigate("/login");
    } catch (error) {
      setSpin(false);
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
