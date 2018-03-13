import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom'
import ListTrips from './ListTrips'
import ShowTrip from './ShowTrip'

class App extends Component {

  state = {
     tripDates: []
   }

   componentDidMount() {
     var that = this;
     var url = 'http://localhost:3002/trips'

     fetch(url)
      .then(function(response) {
         if (response.status >= 400) {
           throw new Error("Bad response from server");
         }
         return response.json();
     })
     .then(function(data) {
       that.setState({ tripDates: data });
     });
   }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="comma-logo" />
          <h1 className="App-title">Comma.ai Trips</h1>
        </header>
        <div>
          <Switch>
            <Route exact path='/' render={() => (
               <Redirect to="/trips"/>
            )}/>
            <Route exact path='/trips' render={() => (
              <ListTrips
                trips={this.state.tripDates}
              />
            )}/>
            <Route path="/trips/:tripDate" component={ShowTrip}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
