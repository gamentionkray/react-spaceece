import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./Home.css";

const Home = () => {
  const { user } = useContext(AuthContext);

  return <>{!user ? <h1>Home</h1> : <h1>Welcome {user.user.name}</h1>}</>;
};

export default Home;
