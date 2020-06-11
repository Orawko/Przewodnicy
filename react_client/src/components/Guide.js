import React, {Component} from 'react';
import "../styles/profile.css";

export default class Guide extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profileContainer">
        <div className="imageContainer">
          <img src={require('../images/profile.jpg')} alt="My picture"/>
        </div>
        <div className="userData">
          <h1>Name</h1>
          <h1>Surname</h1>
          <h1>Email</h1>
          <h1>Age</h1>
          <h1>Phone</h1>
        </div>
      </div>
    );
  }
}