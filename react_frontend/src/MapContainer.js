import React, {Component} from 'react';
// import { compose, withProps, withStateHandlers } from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MAX_SPEED = 100

// https://stackoverflow.com/a/5624139
const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

// https://stackoverflow.com/a/5137964
function RainBowColor(speed){
  var i = (speed * 255 / MAX_SPEED);
  var r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
  var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
  var b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
  return rgbToHex(r, g, b)
}

function roundSpeed(coord) {
  return Math.round(parseFloat(coord.speed));
}

function speedScale(speed) {
  var sp = speed/MAX_SPEED;
  return sp;
}

// https://stackoverflow.com/a/25306038/4260179
function heading(pd,ps) {
  if (ps === undefined) {
    return 0
  }
  return ((Math.atan2(
    (ps.lng-pd.lng),
    (ps.lat-pd.lat)
  ) + Math.PI) * 360.0 / (2.0 * Math.PI) )
}

class MapContainer extends Component {
  state = {
    isOpen: false,
    selectedIndex: 0
  }

  onMarkerClick = (index) => {
    this.setState({
      isOpen: true,
      selectedIndex: index
    })
  }

  onToggleOpen = () => {
    this.setState((prevState, props) => ({
      isOpen: !prevState.isOpen
    }))
  }

  render() {
    var { data } = this.props;
    var google = window.google;
    var midex = null;

    if (data !== undefined) {
      midex = data[(data.length/2)];
    }else{
      midex = { lat: -34.397, lng: 150.644 };
    }

    var selectedCoord = data[this.state.selectedIndex] ;
    var selectedSpeed = roundSpeed(selectedCoord) + " mph";
    var selectedPosition = "lng: " + selectedCoord.lng.toString() + "\n" + "lat: " + selectedCoord.lat.toString();

    return (
      <div>
      <GoogleMap
          defaultZoom={13}
          defaultCenter={midex}
        >
        {data.map((coord, index) => (
          <Marker
                key={coord.index}
                title={roundSpeed(coord).toString() + " mph"}
                position={ (({ lng, lat }) => ({ lng, lat }))(coord)}
                icon={{
                  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  fillColor: RainBowColor(roundSpeed(coord)),
                  scale: (speedScale(roundSpeed(coord))*25,speedScale(roundSpeed(coord))*25),
                  fillOpacity: 1,
                  rotation: heading(coord, data[index+1]),
                  strokeOpacity: 0
                }}
                onClick={() => (this.onMarkerClick(index))}
          />
        ))}
          {this.state.isOpen &&
            <InfoWindow onCloseClick={this.onToggleOpen}
              position={(({ lng, lat }) => ({ lng, lat }))(selectedCoord)}>
              <div>
                <div>{selectedSpeed}</div>
                <div>{selectedPosition}</div>
              </div>
            </InfoWindow>}
         </GoogleMap>
       </div>
    );
  }
}
export default withScriptjs(withGoogleMap(MapContainer))
