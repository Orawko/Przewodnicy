import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {refreshPage} from "../helpers/reload";

import "../styles/nav.css"

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "home"
    }
  }

  logout() {
    window.localStorage.removeItem("token");
    refreshPage();
  }

  render() {
    return (
      <div className="Nav">
        <Link to="/" className="link navLink">Home</Link>
        <Link to="/profile" className="link navLink">My profile</Link>
        <Link to="/settings" className="link navLink">Settings</Link>
        <p onClick={() => this.logout()} className="link navLink">LogOut</p>
      </div>
    );
  }
}
