import React, { Component } from 'react'
import Ride from './Ride'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'


export const FEED_QUERY = gql`
  {
      allRides {
        id
        from
        to
        date
        current_seats
        max_seats
        joins{
          id
          user{
            id
            name
          }
        }
        driver {
          id
          name
          phonenumber
        }
      }
  }
`


class RideList extends Component {

  _updateCacheAfterJoin = (store, createJoin, rideId) => {
    const data = store.readQuery({ query: FEED_QUERY })
  
    const joinedRide = data.allRides.find(allRides => allRides.id === rideId)
    console.log(joinedRide)
    console.log(createJoin)
    joinedRide.joins = createJoin.ride.joins
  
    store.writeQuery({ query: FEED_QUERY, data })
  }
  
  render() {
    return (
        <Query query={FEED_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            // console.log(data)
      
            const ridesToRender = data.allRides
          
      
            return (
              <div>
                {ridesToRender.map((ride,index) => <Ride 
                key={ride.id}
                ride={ride}
                index={index}
                updateStoreAfterJoin={this._updateCacheAfterJoin}
                
                />)}
              </div>
            )
          }}
        </Query>
      )
  }
}

export default RideList