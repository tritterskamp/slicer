import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import ImageCanvas from './ImageCanvas'
import Slices from './Slices'
import CutBand from './CutBand'
import CutButton from './CutButton'

class App extends Component {

  render() {

    const slicesContainerStyle = {
      width: this.props.imageWidth,
      height: this.props.imageHeight
    };

    return (
      <div className="App">
        <div className="App-header">
          <h2>Slice</h2>
          <CutButton />
        </div>

        <div className="Slices-container" style={slicesContainerStyle}>
          <CutBand />
          <Slices />
          <ImageCanvas src={this.props.imageSrc} />
        </div>

      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    imageSrc: state.app.imageSrc,
    imageWidth: state.app.imageWidth,
    imageHeight: state.app.imageHeight,
  }
})(App)