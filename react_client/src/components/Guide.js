import React, {Component} from 'react';
import "../styles/profile.css";
import "../styles/guide.css";
import {getDates, getGuideInfo, getOpinions, sendOpinion} from "../services/guide";
import {refreshPage} from "../helpers/reload";
import {retrieveData} from "../helpers/token";
import {formatDate} from "../helpers/methods";

export default class Guide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: retrieveData(),
      opinionsScreen: false,
      guide: {Name: null, Surname: null, Email: null, Age: null, PhoneNumber: null},
      opinions: [],
      dates: [],
      addOpinion: false,
      myOpinion: ""
    }

  }

  componentDidMount() {
    const params = this.props.location.search
    const id = params.substring(params.indexOf('=') + 1);
    getGuideInfo(id).then(guide => {
      this.setState({guide: guide[0]});
    })
    getOpinions(id).then(opinions => {
      this.setState({opinions: opinions});
    })
    getDates(id).then(dates => {
      this.setState({dates: dates});
    })
  }

  showOpinions() {
    const {opinions} = this.state;
    return (
      <div className="opinionsContainer">
        {opinions.map(elem => {
          return <div className="opinion" key={elem.Contents}>
            <div className="horizontal">
              <div className="imageContainerSmall">
                <img src={require('../images/profile.png')} alt="profile"/>
              </div>
              <h3>{elem.Name} {elem.Surname}</h3>
              <h3>{elem.Date.substring(0, 10)}</h3>
            </div>
            <p>{elem.Contents}</p>
          </div>
        })}
      </div>
    );
  }

  showDates() {
    const {dates} = this.state;
    return (
      <div className="opinionsContainer">
        {dates.map(elem => {
          return <div className="opinion" key={elem.IDDate}>
            <div className="horizontal">
              <h3>{formatDate(elem.Date)}</h3>
              <h4>Length: {elem.Duration} minutes</h4>
            </div>
            <p>{elem.Contents}</p>
          </div>
        })}
      </div>
    );
  }

  addOpinion() {
    return (<div>
      <input
        className="loginInput"
        placeholder="Write here..."
        onChange={(input) =>
          this.setState({myOpinion: input.target.value})
        }
        type="text"/>
      <button
        className="loginButton"
        onClick={() => {
          this.setState({myOpinion: false})
          this.add();
          refreshPage();
        }}>
        Add
      </button>
    </div>)
  }

  add() {
    const {IDUser} = this.state.user.data;
    const id = this.state.guide.IDGuide;
    const {myOpinion} = this.state;
    sendOpinion(id, myOpinion, IDUser).then(r => console.log(r));
  }

  render() {
    const {Name, Surname, Age, Email, PhoneNumber, Description} = this.state.guide;
    return (
      <div>
        {this.state.guide.Name ?
          <div className="profileContainer">
            <div>
              <div className="imageContainer">
                <img src={require('../images/profile.png')} alt="Guide face"/>
              </div>
              <div>
                <button
                  className="loginButton"
                  onClick={() => this.setState({opinionsScreen: true})}>
                  Opinions
                </button>
                <button
                  className="loginButton"
                  onClick={() => this.setState({opinionsScreen: false})}>
                  Dates
                </button>
              </div>
              {this.state.user.isGuide ? null :
                <button
                  className="loginButton"
                  onClick={() => this.setState({addOpinion: true})}>
                  +Add Opinion
                </button>}
            </div>
            <div className="guideData">
              <h1>{Name} {Surname}</h1>
              <h3>Email: {Email}</h3>
              <h3>Age: {Age}</h3>
              <h3>Phone: {PhoneNumber}</h3>
              <p>{Description}</p>
            </div>
          </div> : null}
        {this.state.addOpinion ? this.addOpinion() : null}
        {this.state.opinionsScreen ? this.showOpinions() : this.showDates()}
      </div>);
  }
}