import React, {Component} from 'react';
import "../styles/home.css"

export default class GuidesList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const list = this.props.data;
    console.log(list);
    return (
      <div className="guidesList">
        {list.map(elem => {
          return <div className="guidesElem" key={elem.IDGuide}>
            <div className="imageContainerSmall">
              <img src={require('../images/profile.png')} alt="profile"/>
            </div>
            <h3>{elem.Name} {elem.Surname}</h3>
            <a className="guideProfile" href={`http://localhost:3000/guide/${elem.IDGuide}?_id=${elem.IDGuide}`}>View
              Profile</a>
          </div>
        })}
      </div>
    );
  }
}
