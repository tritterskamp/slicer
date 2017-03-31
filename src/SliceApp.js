import React from 'react';
import {connect} from 'react-redux';

import CutBand from './CutBand'
import CutButton from './CutButton'
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
          <CutButton />
          <OutputTextArea />
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
})(SliceApp)