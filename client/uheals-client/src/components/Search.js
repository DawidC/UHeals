import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Ride from './Ride'
import Button from '@material-ui/core/Button';



const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    allRides(filter: 
    {date_contains: $filter}
    ) {
    #   links {
        id
        from
        to
        date
        current_seats
        max_seats
        driver {
          id
          name
        }
        joins {
          id
          user {
            id
          }
        }
    #  }
    }
  }
`


class Search extends Component {

  state = {
    allRides: [],
    filter: ''
  }

  render() {
    return (
      <div>
        <div className="d-flex align-center justify-center">
          
          <input
          className="w-100 mt-3"
            type='text'
            placeholder='Data'
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <Button className="mt-3" size="small" variant="contained" color="primary" onClick={() => this._executeSearch()}>OK</Button>
          
        </div>
        {this.state.allRides.map((ride, index) => (
          <Ride key={ride.id} ride={ride} index={index} />
        ))}
      </div>
    )
  }

  _executeSearch = async () => {
    const { filter } = this.state
    const result = await this.props.client.query({
         query: FEED_SEARCH_QUERY,
         variables: { filter },
    })
    const allRides = result.data.allRides
    this.setState({ allRides })
  }
}

export default withApollo(Search)