import React, { Component } from "react";
//import TutorialDataService from "../../services/tutorial.service";
import http from "../../services/httpService";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.setPage = this.setPage.bind(this);

    this.state = {
      // state variable
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      currentPage: 0,
      totalPages: 0,
    };
  }

  componentDidMount() {
    this.retrieveTutorials(this.state.currentPage);
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
    // console.log(this.state.searchTitle);
    // this.searchTitle();
  }

  retrieveTutorials(currentPage) {
    console.log(http.authHeader());
    //axios.get("http://localhost:5557/api/tutorials?...")
    http
      .get("/tutorials?page=" + currentPage, {
        headers: http.authHeader(),
      })
      .then((response) => {
        //this is the response from web server
        this.setState({
          tutorials: response.data.tutorials,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
        });
        console.log(response.data); //print in console, just for testing
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials(this.state.currentPage);
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeAllTutorials() {
    http
      .delete("/tutorials", { headers: http.authHeader() })
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    http
      .get("/tutorials?title=" + this.state.searchTitle, {
        headers: http.authHeader(),
      })
      .then((response) => {
        this.setState({
          tutorials: response.data.tutorials,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  setPage(increment) {
    this.retrieveTutorials(this.state.currentPage + increment);
    this.setState({
      currentPage: this.state.currentPage + increment,
      currentIndex: -1,
      currentTutorial: null,
    });
  }

  render() {
    const {
      searchTitle,
      tutorials,
      currentTutorial,
      currentIndex,
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
              {this.state.currentPage < this.state.totalPages - 1 ? (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => this.setPage(1)}
                >
                  Next
                  {/* {this.state.currentPage === this.state.totalPages - 1
                  ? "Previous"
                  : "Next"} */}
                </button>
              ) : (
                ""
              )}
              {this.state.currentPage === 0 ? (
                ""
              ) : (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => this.setPage(-1)}
                >
                  Previous
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tutorials List</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={() => this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>
                {"    "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
