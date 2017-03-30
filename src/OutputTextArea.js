import React from 'react';
import {connect} from 'react-redux';

class OutputTextArea extends React.Component {
  render() {

    if (!this.props.outputText) {
      return null
    }

    const style = {
      display: "block",
      fontFamily: "monospace",
      width: this.props.imageWidth,
      height: 300,
      fontSize: 16,
      marginBottom: 20,
      background: "#222",
      color: "lime"
    };

    return (
      <textarea style={style} autoFocus={true}>
        {this.props.outputText}
      </textarea>
    )
  }
}

export default connect((state, props) => {
  return {
    imageWidth: state.app.imageWidth,
    outputText: state.app.outputText
  }
})(OutputTextArea)