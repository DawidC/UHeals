import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const JOIN_MUTATION = gql`
  mutation ($rideId: ID!) {
    createJoin(rideId: $rideId) {
      id
      ride {
        from
        to
        joins {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

class Ride extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      // <div>
      //   <div>
      //     {this.props.ride.from} - {this.props.ride.to} ({this.props.ride.date}) {this.props.ride.driver && <span>K: {this.props.ride.driver.name}</span>}
      //   </div>
      // </div>
      //if(this.props.ride.current_seats<this.props.ride.max_seats){
        <div>
        <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          
          {authToken && (
            
            // <div className="ml1 gray f11" onClick={() => this._joinRide()}>
            //   ▲
            // </div>
            //console.log(this.props.ride.current_seats)
            //console.log(this.props.max_seats)
            
            <Mutation mutation={JOIN_MUTATION} 
              variables={{ rideId: this.props.ride.id, max_seats: this.props.ride.max_seats, current_seats: this.props.ride.current_seats }}
              
              update={(store, { data: { createJoin } }) =>
              this.props.updateStoreAfterJoin(store, createJoin, this.props.ride.id)
            }
            >
           
              {
                  joinMutation => (
                    <div className="ml1 gray f11" onClick={joinMutation}>
                    {console.log(this.props.ride.from, this.props.ride.to,this.props.ride.joins.length,' ',this.props.ride.max_seats)}
                     {(this.props.ride.joins.length<this.props.ride.max_seats)&& <span>+</span>}
                    
                    </div>
                  )
            }
            </Mutation>
          )}
        </div>
        <div className="ml1">
          <div>
          {this.props.ride.from} - {this.props.ride.to} ({this.props.ride.date}) {/*this.props.ride.driver && <span>K: {this.props.ride.driver.name}</span>*/}
          </div>
          <div className="f6 lh-copy gray">
            {this.props.ride.joins.length} zapisanych | ilość miejsc {this.props.ride.max_seats} | kierowca: 
            {this.props.ride.driver
              ? this.props.ride.driver.name
              : 'Nieznany'}{' '} 
              {this.props.ride.driver
                ? this.props.ride.driver.phonenumber
                : ''}{' '} 
          </div>
        </div>
      </div>
     </div>
      
    )
  }
}

export default Ride