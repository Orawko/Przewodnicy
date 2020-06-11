import React, {Component} from 'react';
import {validateEmail, validatePassword, validatePhone} from "../helpers/validate";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: null,
      passwordRepeat: null,
      phone: null,
      email: null
    }
  }

  updatePassword() {
    validatePassword(this.state.password, this.state.passwordRepeat);
  }

  updateEmail() {
    validateEmail(this.state.email);
  }

  updatePhone() {
    validatePhone(this.state.phone);
  }

  render() {
    return (
      <div className="Settings">
        <h1>Settings</h1>
        <div className="loginContainer">
          <h3>Change password</h3>
          <input
            className="loginInput"
            placeholder="new password"
            onChange={(input) =>
              this.setState({password: input.target.value})
            }
            type="password"/>
          <input
            className="loginInput"
            placeholder="confirm new password"
            onChange={(input) =>
              this.setState({passwordRepeat: input.target.value})
            }
            type="password"/>
          <button
            className="loginButton"
            onClick={() => this.updatePassword()}>
            Change password
          </button>
        </div>
        <div className="loginContainer">
          <h3>Change Email</h3>
          <input
            className="loginInput"
            placeholder="new email"
            onChange={(input) =>
              this.setState({email: input.target.value})
            }/>
          <button
            className="loginButton"
            onClick={() => this.updateEmail()}>
            Change email
          </button>
        </div>
        <div className="loginContainer">
          <h3>Change phone</h3>
          <input
            className="loginInput"
            placeholder="new phone"
            onChange={(input) =>
              this.setState({phone: input.target.value})
            }
            type="number"/>
          <button
            className="loginButton"
            onClick={() => this.updatePhone()}>
            Change phone
          </button>
        </div>
      </div>
    );
  }
}
