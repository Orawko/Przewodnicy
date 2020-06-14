import React, {Component} from 'react';
import "../styles/profile.css";
import {retrieveData} from "../helpers/token";
import {deleteDate, getDates, sendNewDate} from "../services/dates";
import {formatDate} from "../helpers/methods";
import {refreshPage} from "../helpers/reload";
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: retrieveData(),
      dates: null,
      date: new Date(),
      len: 0
    }
  }

  componentDidMount() {
    if (this.state.user.isGuide) {
      const {IDGuide} = this.state.user.data;
      getDates(IDGuide).then(d => this.setState({dates: d}));
    }
  }

  onChange = date => this.setState({date});

  removeDate(datetime) {
    const {IDGuide} = this.state.user.data;
    deleteDate(IDGuide, formatDate(datetime)).then(() => alert("Date removed!"));
    refreshPage();
  }

  addDate() {
    const date = moment(this.state.date).format("YYYY-MM-DD HH:mm:ss");
    const {IDGuide} = this.state.user.data;
    const length = Number(this.state.len);
    sendNewDate(IDGuide, date, length).then(() => alert("New date added!"));
    refreshPage();
  }

  datesList() {
    const {dates} = this.state;
    return dates ?
      <div className="dates">
        {dates.map(
          date => {
            return (<div key={`${date.IDDate}`} className=" horizontal date ">
              <h2>Duration: {date.Duration}</h2>
              <h2>Date: {formatDate(date.Date)}</h2>
              <button
                className="loginButton"
                onClick={() => this.removeDate(date.Date)}>
                Remove
              </button>
            </div>)
          })
        }
      </div> : null;
  }

  render() {
    const {Name, Surname, Email, Age, PhoneNumber} = this.state.user.data;
    return (
      <div>
        {this.state.user ?
          <div>
            <div className="profileContainer">
              <div className="imageContainer">
                <img src={require('../images/profile.png')} alt="profile"/>
              </div>
              <div className="userData">
                <h1>{Name} {Surname}</h1>
                {this.state.user.isGuide ? <h2>Tourist guide</h2> : <h2>Standard user</h2>}
                <h3>Email: {Email}</h3>
                <h3>Age: {Age}</h3>
                <h3>Phone: {PhoneNumber}</h3>
              </div>
            </div>
            {this.state.user.isGuide ?
              <div>
                <div className="profileContainer dates">
                  <h1>My avaliable dates</h1>
                  <div className="horizontal">
                    <div>
                      <DateTimePicker
                        onChange={this.onChange}
                        value={this.state.date}
                        format={"y-MM-dd HH:mm:ss"}
                      />
                      <input
                        className="loginInput length"
                        placeholder="Length in min"
                        onChange={(input) =>
                          this.setState({len: input.target.value})
                        }
                        type="number"/>
                    </div>
                    <button
                      className="loginButton"
                      onClick={() => this.addDate()}>
                      Add new date
                    </button>
                  </div>
                  {this.datesList()}
                </div>
              </div>
              : null}
          </div> : null}
      </div>
    );
  }
}
