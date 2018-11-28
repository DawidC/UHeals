// import React, { Component } from 'react';
// // import logo from '../logo.svg';
// // import './../Styles/App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           {/* <img src={logo} className="App-logo" alt="logo" /> */}
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react'
import RideList from './RideList'
import CreateRide from './CreateRide'
import Login from './Login'
import Header from './Header'
import { Switch, Route } from 'react-router-dom'
import Search from './Search'

class App extends Component {
  // render() {
  //   return <RideList />
  // }
  render() {
    return (
      <div className="center">
        <Header />
        <div className="ph3 pv1">
        <div className="container">
          <Switch>
            <Route exact path="/" component={RideList} />
            <Route exact path="/create" component={CreateRide} />
            <Route exact path="/login" component={Login} />
            <Route exact path='/search' component={Search} />
          </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default App