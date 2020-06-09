import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import UserProvider from "../providers/UserProvider";
import {getUser} from "../helpers/user"
import '../styles/App.css';
import Home from "./Home";
import Profile from "./Profile";
import Settings from "./Settings";
import Register from "./Register";
import Login from "./Login";
import SiteNotFound from "./SiteNotFound";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: getUser()
    }
  }

  render() {
    return (
      <UserProvider>
        <BrowserRouter>
          <div className="App">
            {this.state.user ?
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/settings" component={Settings}/>
                <Route path="*" component={SiteNotFound}/>
              </Switch> :
              <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/*" component={Login}/>
                <Route path="*" component={SiteNotFound}/>
              </Switch>}
          </div>
        </BrowserRouter>
      </UserProvider>
    );
  }
}
