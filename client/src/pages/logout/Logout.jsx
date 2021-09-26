import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Logout = ({ history }) => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    window.localStorage.removeItem("user");
    setUser(null);
    history.push("/");
  }, []);

  return <></>;
};

export default Logout;
