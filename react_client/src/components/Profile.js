import React, {Component} from 'react';
import "../styles/profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGuide: true,
      dates: []
    }
  }

  render() {
    return (
      <div>
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
        {this.state.isGuide
          ? <div>
            <div className="profileContainer dates">
              <h1>My reservations</h1>
            </div>
            <div className="profileContainer dates">
              <div className="horizontal">
                <h1>My dates</h1>
                <button
                  className="loginButton"
                  onClick={() => this.register()}>
                  Add new date
                </button>
              </div>
            </div>
          </div>
          : null}
      </div>
    );
  }
}
