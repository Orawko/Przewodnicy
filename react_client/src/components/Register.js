import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import "../styles/login.css";
import {
  validateAge,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateSurname
} from "../helpers/validate";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGuide: false,
      name: null,
      surname: null,
      age: null,
      email: null,
      password: null,
      passwordRepeat: null,
      phone: null,
      success: false
    }
  }

  validateData() {
    const {name, surname, age, email, password, passwordRepeat, phone} = this.state;
    return !!(
      validateEmail(email)
      && validateName(name)
      && validateSurname(surname)
      && validateAge(age)
      && validatePassword(password, passwordRepeat)
      && validatePhone(phone)
    )
  }

  register() {
    this.validateData() ? console.log("ok!") : console.log("invalid data!");
  }

  render() {
    const {success} = this.state;

    if (success) {
      return <Redirect to="/login"/>;
    }

    return (
      <div className="Register">
        <h1>Register</h1>
        <div className="loginContainer">
          <input
            className="loginInput"
            placeholder="email"
            onChange={(input) =>
              this.setState({email: input.target.value})
            }/>
          <input
            className="loginInput"
            placeholder="name"
            onChange={(input) =>
              this.setState({name: input.target.value})
            }/>
          <input
            className="loginInput"
            placeholder="surname"
            onChange={(input) =>
              this.setState({surname: input.target.value})
            }/>
          <input
            className="loginInput"
            placeholder="age"
            onChange={(input) =>
              this.setState({age: input.target.value})
            }
            type="number"/>
          <input
            className="loginInput"
            placeholder="password"
            onChange={(input) =>
              this.setState({password: input.target.value})
            }
            type="password"/>
          <input
            className="loginInput"
            placeholder="password"
            onChange={(input) =>
              this.setState({passwordRepeat: input.target.value})
            }
            type="password"/>
          <input
            className="loginInput"
            placeholder="phone"
            onChange={(input) =>
              this.setState({phone: input.target.value})
            }
            type="number"/>
          <div>
            register as guide <input
            name="register as guide"
            type="checkbox"
            checked={this.state.isGuide}
            onChange={() =>
              this.setState({isGuide: !this.state.isGuide})}/>
          </div>
          <button
            className="loginButton"
            onClick={() => this.register()}>
            Sign up
          </button>
          <Link to="/login" className="link">Sign in</Link>
        </div>
      </div>
    );
  }
}
