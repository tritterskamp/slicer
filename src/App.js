import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import SliceApp from './SliceApp'
import {getAuthToken} from './get-auth-token'
import {setAppValue} from './redux-actions/app-actions.js'
import LoadingToken from './LoadingToken'

class App extends Component {

  componentWillMount() {
    //Check for (or get a new) token from Salesforce
    getAuthToken(token => {
      setAppValue({
        salesforceAuthToken: token
      })
    });
  }



  render() {

    const {
      salesforceAuthToken
    } = this.props;

    if (!salesforceAuthToken) {
      return (
        <LoadingToken />
      )
    }


    return (
      <SliceApp />
    )
  }
}

export default connect((state, props) => {
  return {
    salesforceClientKey: state.app.salesforceClientKey,
    salesforceSecretKey: state.app.salesforceSecretKey,
    salesforceAuthToken: state.app.salesforceAuthToken
  }
})(App)