import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/tutorials/add-tutorial.component";
import Tutorial from "./components/tutorials/tutorial.component";
import TutorialsList from "./components/tutorials/tutorials-list.component";
import CustomersList from "./components/customers/customers-list.component";
import Login from "./components/security/login.component";
import Register from "./components/security/register.component";
import AuthService from "./services/auth.service";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      //showModeratorBoard: false,
      //showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        //showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        //showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  //the link will be accessible only for user with ADMIN role.
  _onClick = (e) => {
    console.log(this.state.currentUser);
    if (!this.state.currentUser) {
      e.preventDefault();
    } else if (!this.state.currentUser.roles.includes("ROLE_ADMIN")) {
      e.preventDefault();
    }
  };

  render() {
    const { currentUser } = this.state;

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
                <Link
                  to={"/customers"}
                  className="nav-link"
                  onClick={(e) => this._onClick(e)}
                >
                  Customers
                </Link>
              </li>
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.user}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
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
              <Route path="/customers" component={CustomersList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
