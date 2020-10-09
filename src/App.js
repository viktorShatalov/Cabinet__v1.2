import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";

function App() {
  const [login, setLogin] = useState(false);

  const handleLogoutClick = () => {
    setLogin(true);
    console.log(login);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Контакты
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Добавить контакт
            </Link>
          </li>
        </div>
        <button onClick={handleLogoutClick}>{!login ? "Войти" : "Выйти"}</button>
      </nav>
      {login ? (
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} />
          </Switch>
        </div>
      ) : (
        <span className="container">Авторизируйтесь</span>
      )}
    </div>
  );
}

export default App;
