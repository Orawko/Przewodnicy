import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      success: false
    }
  }

  render() {
    const {success} = this.state;

    if (success) {
      return <Redirect to="/"/>;
    }

    return (
      <div className="Login">
        <h1>Login</h1>
        <div className="loginContainer">
          <input
            className="loginInput"
            placeholder="email"
            onChange={(userEmail) =>
              this.setState({email: userEmail.target.value})
            }
          />
          <input
            className="loginInput"
            placeholder="password"
            onChange={(userPassword) =>
              this.setState({password: userPassword.target.value})
            }
            type="password"
          />
          <button className="loginButton" onClick={this.login}>
            Sign in
          </button>
          <Link to="/register" className="link">Sign up</Link>
        </div>
      </div>
    );
  }
}
