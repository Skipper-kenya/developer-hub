import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";

import { DotsNine, List, X } from "phosphor-react";
import { NavLink, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalProvider";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();

  const [isBtnToggle, setIsBtnToggle] = useState(false);

  const { cookie, setCookie } = useContext(GlobalContext);

  const handleLogout = () => {
    setCookie("access_token", "");
    const deleteDetails = () => {
      return JSON.stringify({
        userId: "",
        userName: "",
      });
      toast.info("successful logout");
    };
    window.localStorage.setItem("userDetails", deleteDetails());

    window.location.reload();
  };

  const [width, setWidth] = useState(null);
  const currentWidth = window.innerWidth;
  useEffect(() => {
    setWidth(currentWidth);
  }, [currentWidth]);

  const handleToggle = () => {
    setIsBtnToggle(!isBtnToggle);
  };

  //toggle_div
  return (
    <>
      <div className={!isBtnToggle ? "toggle_div" : "toggle_div hide_toggle"}>
        <div className="label">
          <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            {" "}
            rastaTech
          </h3>
        </div>
      </div>
      <div className="toggle">
        <button onClick={handleToggle}>
          {isBtnToggle ? <X size={30} /> : <List size={30} />}
        </button>
      </div>
      <nav
        // className="nav"
        // style={{
        //   display: !isBtnToggle ? "none" : "flex",
        // }}
        className={!isBtnToggle ? "nav hide_nav" : "nav show_nav"}
      >
        <div className="label">
          <h3> rastaTech</h3>
        </div>

        <div className="links">
          <NavLink
            onClick={() => setIsBtnToggle(!isBtnToggle)}
            activeclassname="active"
            to={"/"}
          >
            Dashboard
          </NavLink>
          <NavLink
            onClick={() => setIsBtnToggle(!isBtnToggle)}
            activeclassname="active"
            to={"/projects"}
          >
            Projects
          </NavLink>
          <NavLink
            onClick={() => setIsBtnToggle(!isBtnToggle)}
            to={"/create"}
            activeclassname="active"
          >
            Upload-a-Project
          </NavLink>

          {cookie.access_token && cookie.access_token !== "undefined" ? (
            <>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                onClick={() => setIsBtnToggle(!isBtnToggle)}
                activeclassname="active"
                to={"/login"}
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
