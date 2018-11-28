import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!, $pesel: String!, $role: String!,
  $phonenumber: String) {
    createUser(
        name: $name,
        pesel: $pesel,
        role: $role,
        phonenumber: $phonenumber,
        authProvider:{
            email: {
                email: $email, 
                password: $password
            }
        }
    ) {
    #  token
    id
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(
       # email: $email, password: $password
       email: {
        email: $email,
        password: $password
     }
    ) {
       
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
    pesel: '',
    role: '',
    phonenumber: ''
  }

  render() {
    const { login, email, password, name, pesel, role, phonenumber } = this.state
    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <div className="w-100">
            <input
              className="w-100"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Imie i nazwisko"
            />
            <input
              className="w-100"
              value={pesel}
              onChange={e => this.setState({ pesel: e.target.value })}
              type="text"
              placeholder="PESEL"
            />
            <input
              className="w-100"
              value={role}
              onChange={e => this.setState({ role: e.target.value })}
              type="text"
              placeholder="ID Roli"
            />
            <input
              className="w-100"
              value={phonenumber}
              onChange={e => this.setState({ phonenumber: e.target.value })}
              type="text"
              placeholder="Numer telefonu"
            />
            </div>
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Adres Email"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Hasło"
          />
        </div>
        <div className="flex mt3">
        <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name, pesel, role,phonenumber }}
            onCompleted={data => this._confirm(data)}
        >
            {mutation => (
            <Button variant="contained" color="primary" onClick={mutation}>
                {login ? 'Zaloguj' : 'Stwórz konto'}
            </Button>
            )}
        </Mutation>
          <Button variant="contained" color="primary"
            //className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'Załóż konto'
              : 'Masz już konto?'}
          </Button>
        </div>
      </div>
    )
  }

  _confirm = async data => {
    if(this.state.login){
        const token  =  data.signinUser.token
        this._saveUserData(token)
        console.log('token from login', token)
        this.props.history.push(`/`)
    } else {
       this.props.history.push(`/login`)
       this.setState({ login: true })
    }
  }
  

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login