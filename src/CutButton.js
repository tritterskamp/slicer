import React from 'react';
import {connect} from 'react-redux';

class CutButton extends React.Component {

  handleCutButton() {
    console.log('CUT!!!');



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
    slices: state.app.slices
  }
})(CutButton)