import React from 'react';
import {connect} from 'react-redux';
import {modelsFromObject} from './helpers/models-from-object.js'
import {getDistanceModelsFromSlices} from './get-distance-models-from-slices'
import {launchNewBrowserTab, getMarkupOutput} from './get-output.js'

class CutButton extends React.Component {

  handleCutButton() {
    console.log('CUT!!!');

    const {imageHeight, slices} = this.props;

    let request = new Request('http://localhost:4000/cut', {
      method: 'POST',
      body: JSON.stringify({
        srcImg: this.props.imageSrc,
        sliceYs: getDistanceModelsFromSlices(imageHeight, slices)
      })
    });
    fetch(request).then(response => {
      return response.json(); //baggage of Request
    }).then(response => {
      const result = response.data;
      console.log(result);

      //Sample response: [ {sliceId:"a", publishedUrl: "/a/s/asdasd.jpg"} ]
      //So we can map the new image back to the slice.

      //Get the markup and put in a new browser tab
      launchNewBrowserTab(
        getMarkupOutput(result)
      );
    })

  }

  render() {
    return (
      <button onClick={this.handleCutButton.bind(this)}>
        CUT!
      </button>
    )
  }
}

export default connect((state, props) => {
  return {
    imageSrc: state.app.imageSrc,
    slices: state.app.slices,
    imageHeight: state.app.imageHeight,
  }
})(CutButton)