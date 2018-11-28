import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'
import { FEED_QUERY } from './RideList'
import Button from '@material-ui/core/Button';

const POST_MUTATION = gql`
  mutation PostMutation($from: String!, $to: String!, $date: String!, $max_seats: Int!) {
    createRide(
        from: $from,
         to: $to,
        date: $date, #"2018-11-20 12:40:00 UTC",
        current_seats: 0,
        max_seats: $max_seats,
        client_ids: "",
        ) {
      id
      to
      from
    }
  }
`

class CreateRide extends Component {
  state = {
    from: '',
    to: '',
    date: '',
    max_seats: ''
  }

  render() {
    const { from, to, date, max_seats } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={from}
            onChange={e => this.setState({ from: e.target.value })}
            type="text"
            placeholder="Skąd"
          />
          <input
            className="mb2"
            value={to}
            onChange={e => this.setState({ to: e.target.value })}
            type="text"
            placeholder="Dokąd"
          />
          <input
            className="mb2"
            value={date}
            onChange={e => this.setState({ date: e.target.value })}
            type="text"
            placeholder="Data"
          />
            <input
            className="mb2"
            value={max_seats}
            onChange={e => this.setState({ max_seats: parseInt(e.target.value) })}
            type="number"
            placeholder="Ilość miejsc"
          />
        </div>
        <Mutation 
            mutation={POST_MUTATION} 
            variables={{ from, to, date, max_seats }}
            onCompleted={
              () => {
                this.props.history.push('/')
                window.location.reload()
              }
            }
            update={(store, { data: { post } }) => {
              // const data = store.readQuery({ query: FEED_QUERY })
              // data.allRides.unshift(post)
              // store.writeQuery({
              //   query: FEED_QUERY,
              //   data
              // })
            }}
            >
        {postMutation =>  <Button variant="contained" onClick={postMutation} color="primary">Zapisz</Button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateRide