import React, { useContext, useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { AuthContext } from "../../context/AuthContext";

import "./Login.css";

const Login = ({ history }) => {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  const responseGoogle = (response) => {
    const { profileObj } = response;

    const user = {
      message: "Login successful",
      user: {
        id: profileObj.googleId,
        name: profileObj.name,
        email: profileObj.email,
        image: profileObj.imageUrl,
      },
    };

    setUser(user);

    window.localStorage.setItem("user", JSON.stringify(user));

    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    fetch("http://localhost:5000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setUser(data);
          window.localStorage.setItem("user", JSON.stringify(data));
          history.push("/");
        } else {
          alert(data.error);
        }
      });
  };

  return (
    <div className="login_form_container">
      <h1>Login</h1>
      <form className="login_form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <GoogleLogin
          clientId="141334552985-s16djfk8ohg5bt5rauo2ir2rdf8ge1ip.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </form>
    </div>
  );
};

export default Login;
