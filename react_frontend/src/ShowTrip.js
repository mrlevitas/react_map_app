import React, { Component } from 'react'
import MapContainer from './MapContainer'

class ShowTrip extends Component {
  state = {
     tripJson: {}
  }

  componentDidMount() {
    var that = this;
    var url = 'http://localhost:3002/trips/' + this.props.match.params.tripDate
    fetch(url)
     .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(data) {
      that.setState({ tripJson: data });
    });
  }

  render() {
    const { coords, start_time, end_time } = this.state.tripJson
    var sDate = Date.parse( start_time)
    var eDate = Date.parse( end_time)
    var timeTaken =  parseInt((eDate - sDate)/1000);

    var minutes = Math.floor(timeTaken / 60);
    var hours = Math.floor(timeTaken / 3600);
    var seconds = timeTaken - minutes * 60;

    return(
      <div>
        <h3 >
          {((hours > 0) ? hours + "hours " : "") + minutes + " minutes"  }
        </h3>
        {(coords !== undefined) ?
          <MapContainer
            data={coords}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDVNX5RaLPuOyaXfGAce2z-ecNf1WKDE7Q&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          /> : "Loading..." }
      </div>
    )
  }
}

export default ShowTrip
