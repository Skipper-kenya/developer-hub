import { UserCircle } from "phosphor-react";
import React from "react";
import "./auth.css";

import { Link } from "react-router-dom";

const Auth = ({ name, btnName, u, p, su, sp, handleSubmit }) => {
  return (
    <div className="auth-wrapper">
      <h3>{name} page</h3>
      <form>
        <div className="top-wel">
          <h4>{name}</h4>
          <UserCircle size={30} />
        </div>
        <div className="auth">
          <div className="mini-auth">
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              id="username"
              placeholder="your username"
              value={u}
              onChange={(e) => su(e.target.value)}
            />
          </div>
          <div className="mini-auth">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              placeholder="your password"
              value={p}
              onChange={(e) => sp(e.target.value)}
            />
          </div>

          <button onClick={handleSubmit}>{btnName}</button>
          <p>
            {name === "Login" ? (
              <>
                {" "}
                Don't have an account? <Link to={"/register"}>Register</Link>
              </>
            ) : (
              <>
                Already have an account? <Link to={"/login"}>Login</Link>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Auth;
