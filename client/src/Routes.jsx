import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import { AuthContext } from "./context/AuthContext";

const Routes = () => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <AuthContext.Provider value={value}>
        <div className="container">
          <Header />

          <Switch>
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
          </Switch>

          <Footer />
        </div>
      </AuthContext.Provider>
    </Router>
  );
};

export default Routes;
