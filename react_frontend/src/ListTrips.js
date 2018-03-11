import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ListTrips extends Component {

  render() {
    const { trips } = this.props

    return (
      <div className='list-trips'>
        <ol className='trip-list'>
          {trips.map((trip) => (
            <li key={trip} className='trip-list-item'>
              <div className='trip-details'>
                <p>{trip}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListTrips
