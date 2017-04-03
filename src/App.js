import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import SliceApp from './SliceApp'
import {getAuthToken} from './get-auth-token'
import {setAppValue} from './redux-actions/app-actions.js'
import LoadingToken from './LoadingToken'
import ImageUploadApp from './ImageUploadApp'

class App extends Component {

  componentWillMount() {
    //Check for (or get a new) token from Salesforce
    getAuthToken(token => {
      //Set the received token in redux state
      setAppValue({
        salesforceAuthToken: token
      })
    });
  }



  render() {

    const {
      salesforceAuthToken,
      salesforceClientKey,
      salesforceSecretKey,
      isImageReady
    } = this.props;

    if (!salesforceSecretKey || !salesforceClientKey) {
      return (
        <div>NEEDS SETUP: No Client or Secret key provided to ENV. </div>
      )
    }

    //We need Auth
    if (!salesforceAuthToken) {
      return (
        <LoadingToken />
      )
    }

    //We need to choose an image
    if (!isImageReady) {
      return (
        <ImageUploadApp />
      )
    }

    //We are ready to slice!
    return (
      <SliceApp />
    )
  }
}

export default connect((state, props) => {
  return {
    isImageReady: state.app.isImageReady,
    salesforceClientKey: state.app.salesforceClientKey,
    salesforceSecretKey: state.app.salesforceSecretKey,
    salesforceAuthToken: state.app.salesforceAuthToken
  }
})(App)