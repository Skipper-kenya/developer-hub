import React, { useState } from "react";
import axios from "axios";
import Auth from "./Auth";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(process.env.REACT_APP_REGISTER, {
        username,
        password,
      });

      const { message } = response.data;
      setLoading(false);
      alert(message);
      navigate("/login");
    } catch (error) {
      setLoading(false);
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
        loading={loading}
      />
    </>
  );
};

export default Register;
