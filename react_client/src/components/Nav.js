import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "../styles/nav.css"

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "home"
    }
  }

  render() {
    return (
      <div className="Nav">
        <Link to="/" className="link navLink">Home</Link>
        <Link to="/profile" className="link navLink">My profile</Link>
        <Link to="/settings" className="link navLink">Settings</Link>
        <Link to="/logout" className="link navLink">LogOut</Link>
      </div>
    );
  }
}
