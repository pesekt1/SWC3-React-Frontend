import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import CustomersList from "./components/customers/customers-list.component";

class App extends Component {
  render() {
    console.log(process.env.REACT_APP_NAME);
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            {/* this will reload the whole page */}
            <a href="/tutorials" className="navbar-brand">
              React frontend
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/customers"} className="nav-link">
                  Customers
                </Link>
              </li>
            </div>
          </nav>

          {/* className="container mt-3" */}
          <div className="container-expand mt-3">
            <Switch>
              <Route
                exact
                path={["/", "/tutorials"]}
                component={TutorialsList}
              />
              <Route exact path="/add" component={AddTutorial} />
              <Route path="/tutorials/:id" component={Tutorial} />
              <Route path="/customers/" component={CustomersList} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
