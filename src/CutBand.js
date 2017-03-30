import React from 'react';
import makeId from './helpers/make-id.js'
import {setSliceValue} from './redux-actions/app-actions.js'

class CutBand extends React.Component {

  addSlice(e) {

    //Get position of new slice by subtracting distance from top of container from clicked Y point.
    const containerTop = Math.round( this.refs.cutband.getBoundingClientRect().top );
    const newSliceY =  e.clientY - containerTop;

    //Create new slice
    setSliceValue( makeId("slice"), {
      hasLink: true,
      linkText: "",
      altText: "",
      y: newSliceY
    })

  }

  render() {
    return (
      <div ref="cutband" className="CutBand" onDoubleClick={this.addSlice.bind(this)}>
      </div>
    )
  }
}

export default CutBand;