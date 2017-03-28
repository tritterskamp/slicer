import React, { Component } from 'react';
import './App.css';
import ImageCanvas from './ImageCanvas'
import Slices from './Slices'
import {connect} from 'react-redux'

class App extends Component {

  render() {

    const slicesContainerStyle = {
      width: this.props.imageWidth
    };

    return (
      <div className="App">
        <div className="App-header">
          <h2>Slice</h2>
        </div>

        <div className="Slices-container" style={slicesContainerStyle}>
          <Slices />
          <ImageCanvas src="/chopping-block/S1-Trend-Sandals.jpg" />
        </div>

      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    imageWidth: state.app.imageWidth
  }
})(App)