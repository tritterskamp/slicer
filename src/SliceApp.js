import React from 'react';
import {connect} from 'react-redux';

import CutBand from './CutBand'
import CutButton from './CutButton'
import NewButton from './NewButton'
import OutputTextArea from './OutputTextArea'
import Slices from './Slices'
import ImageCanvas from './ImageCanvas'

class SliceApp extends React.Component {
  render() {

    const slicesContainerStyle = {
      width: this.props.imageWidth,
      height: this.props.imageHeight
    };

    return (
      <div className="App">
        <div className="App-header">
          <h1>Slicer</h1>
          <div className="button-container">
            <CutButton />
            <NewButton />
          </div>
        </div>
          <OutputTextArea />

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
})(SliceApp)