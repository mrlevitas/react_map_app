import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { Route } from 'react-router-dom'
import ListTrips from './ListTrips'


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
          <Route exact path='/' render={() => (
            <ListTrips
              trips={this.state.tripDates}
            />
          )}/>
        </div>
      </div>
    )
  }
}

export default App;
