import React, {Component} from 'react';
import "../styles/home.css"

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null
    }
  }

  render() {
    return (
      <div className="home">
        <div className="homeBackground">
          <img src={require('../images/background.jpg')} alt="Mountains"/>
        </div>
        <div className="searchContainer">
          <h2>Find your city</h2>
          <input
            className="loginInput"
            placeholder="city name"
            onChange={(input) =>
              this.setState({city: input.target.value})
            }
          />
          <button className="loginButton" onClick={this.login}>
            search
          </button>
        </div>
      </div>
    );
  }
}
