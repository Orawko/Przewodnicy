import React, {Component} from 'react';
import {validatePassword, validatePhone} from "../helpers/validate";
import {retrieveData} from "../helpers/token";
import {addCity, deleteCity, setNewDescription, setNewPassword, setNewPhoneNumber} from "../services/settings"
import {refreshPage} from "../helpers/reload";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: retrieveData(),
      password: null,
      passwordRepeat: null,
      phone: null,
      email: null,
      description: null,
      city: null
    }
  }

  updatePassword() {
    if (validatePassword(this.state.password, this.state.passwordRepeat)) {
      const {password, passwordRepeat} = this.state;
      const id = this.state.user.isGuide ? this.state.user.data.IDGuide : this.state.user.data.IDUser;
      const {isGuide} = this.state.user;
      setNewPassword(password, passwordRepeat, isGuide, id).then(ok => ok ? refreshPage() : console.log("error"));
    }
  }

  updatePhone() {
    if (validatePhone(this.state.phone)) {
      const id = this.state.user.isGuide ? this.state.user.data.IDGuide : this.state.user.data.IDUser;
      const {isGuide} = this.state.user;
      const {phone} = this.state;
      setNewPhoneNumber(phone, isGuide, id);
    }
  }

  updateDescription() {
    const id = this.state.user.data.IDGuide;
    const {description} = this.state;
    setNewDescription(description, id);
  }

  addCity() {
    const id = this.state.user.data.IDGuide;
    const {city} = this.state;
    addCity(city, id);
  }

  removeCity() {
    const id = this.state.user.data.IDGuide;
    const {city} = this.state;
    deleteCity(city, id);
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
        {this.state.user.isGuide ? <div>
          <div className="loginContainer">
            <h3>New description</h3>
            <input
              className="loginInput"
              placeholder="new phone"
              onChange={(input) =>
                this.setState({description: input.target.value})
              }
              type="text"/>
            <button
              className="loginButton"
              onClick={() => this.updateDescription()}>
              Change description
            </button>
          </div>
          <div className="loginContainer">
            <h3>Add city</h3>
            <input
              className="loginInput"
              placeholder="new phone"
              onChange={(input) =>
                this.setState({city: input.target.value})
              }/>
            <button
              className="loginButton"
              onClick={() => this.addCity()}>
              Add city
            </button>
          </div>
          <div className="loginContainer">
            <h3>Remove city</h3>
            <input
              className="loginInput"
              placeholder="new phone"
              onChange={(input) =>
                this.setState({city: input.target.value})
              }/>
            <button
              className="loginButton"
              onClick={() => this.removeCity()}>
              Remove city
            </button>
          </div>
        </div> : null}
      </div>
    );
  }
}
