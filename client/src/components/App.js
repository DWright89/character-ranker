import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import CharacterList from "./content/CharacterList";
import CharacterShow from "./content/CharacterShow.js";
import NewCharacterForm from "./content/NewCharacterForm.js";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <div className="gridContainer">
      <Switch>
        <Route exact path="/">
          <h2>Hello from react</h2>
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/characters" component={CharacterList} />
        <AuthenticatedRoute 
          exact={true} 
          path="/characters/new"
          component={NewCharacterForm}
          user={currentUser}
        />
        <Route exact path="/characters/:id">
          <CharacterShow user={currentUser} />
        </Route>
      </Switch>
      </div>
    </Router>
  );
};

export default hot(App);