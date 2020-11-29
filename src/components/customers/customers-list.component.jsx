import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "../../services/httpService";

export default class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);

    this.state = {
      // state variable
      customers: [],
      currentCustomer: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }

  retrieveCustomers() {
    http
      .get("/customers", { headers: http.authHeader() })
      .then((response) => {
        //this is the response from web server
        this.setState({
          customers: response.data,
        });
        console.log(this.state.customers); //print in console, just for testing
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCustomers();
    this.setState({
      currentCustomer: null,
      currentIndex: -1,
    });
  }

  setActiveCustomer(customer, index) {
    this.setState({
      currentCustomer: customer,
      currentIndex: index,
    });
  }

  removeCustomer(id) {
    http
      .delete("/customers/" + id)
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { customers, currentCustomer } = this.state;

    return (
      <div className="customers-list row">
        <div className="col-md-10">
          <h4>Customers List</h4>

          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>State</th>
                <th>City</th>
                <th>Birth</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {customers &&
                customers.map((customer, index) => (
                  <tr
                    onClick={() => this.setActiveCustomer(customer, index)}
                    key={index}
                  >
                    <th>{`${customer.firstName} ${customer.lastName}`}</th>
                    <th>{customer.phone}</th>
                    <th>{customer.address}</th>
                    <th>{customer.state}</th>
                    <th>{customer.city}</th>
                    <th>{customer.birthDate}</th>
                    <th>{customer.points}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-2">
          {currentCustomer ? (
            <div>
              <h4>Customer</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentCustomer.firstName + " " + currentCustomer.lastName}
              </div>
              <div>
                <label>
                  <strong>phone:</strong>
                </label>
                {"    "}
                {currentCustomer.phone}
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>{" "}
                {currentCustomer.address}
              </div>

              <Link
                to={"/customers/" + currentCustomer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Customer...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
