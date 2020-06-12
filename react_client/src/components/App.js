import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {retrieveData} from "../helpers/token";
import '../styles/App.css';
import Home from "./Home";
import Profile from "./Profile";
import Settings from "./Settings";
import Register from "./Register";
import Login from "./Login";
import Guide from "./Guide";
import SiteNotFound from "./SiteNotFound";
import Nav from "./Nav";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: retrieveData()
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {this.state.user ?
            <div>
              <Nav/>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/guide/:id" component={Guide}/>
                <Route path="*" component={SiteNotFound}/>
              </Switch>
            </div> :
            <Switch>
              <Route path="/register" component={Register}/>
              <Route path="/*" component={Login}/>
              <Route path="*" component={SiteNotFound}/>
            </Switch>}
        </div>
      </BrowserRouter>
    );
  }
}
