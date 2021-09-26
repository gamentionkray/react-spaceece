import React, { useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./Header.css";

const Header = ({ history }) => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    window.localStorage.getItem("user") &&
      setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">SpaceECE</Link>
      </div>
      <div className="menu_wrapper">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="#">About Us</Link>
          </li>
          <li>
            <Link to="#">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="auth_wrapper">
        <ul>
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              {/* <li>
                <Link to="/register">Register</Link>
              </li> */}
            </>
          ) : (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Header);
