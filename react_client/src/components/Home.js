import React, {Component} from 'react';
import {getCities, getGuides} from "../services/cities";
import "../styles/home.css"
import GuidesList from "./guidesList";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      guideList: [],
      availableCities: [],
    }
  }

  componentDidMount() {
    getCities().then(cities => {
      this.setState({availableCities: cities});
    })
  }

  async searchCityName(cityNameInput) {
    const cityName = this.state.availableCities.filter(item => {
      if (item.Name.toLowerCase() === cityNameInput.toLowerCase()) return item;
    });
    if (cityName.length > 0) {
      this.setState({
        cityName: `${cityName[0].Name}`,
        idCity: `${cityName[0].IDCity}`,
        idImage: `${cityName[0].IDImage}`,
        numberOfGuides: `${cityName[0].NumberOfGuides}`,
        cityDescription: `${cityName[0].Description}`,
        searchedCityName: cityNameInput
      });
      const guides = await getGuides(`${cityName[0].IDCity}`);
      console.log(guides);
      this.setState({guideList: guides});

    } else {
      alert("City not found!");
    }
  }

  render() {
    const {guideList} = this.state;
    return (
      <div className="home">
        <div className="homeBackground">
          <img src={require('../images/background.jpg')} alt="Mountains+-"/>
        </div>
        <div className="searchContainer">
          <h2>Find a guide in your city</h2>
          <input
            className="loginInput"
            placeholder="City name"
            onChange={(input) =>
              this.setState({city: input.target.value})
            }
          />
          <button className="loginButton" onClick={() => this.searchCityName(this.state.city)}>
            Search
          </button>
        </div>
        {guideList.length > 0 ? <GuidesList data={guideList}/> : null}
      </div>
    );
  }
}
