import React from 'react';
import {setSliceValue} from './redux-actions/app-actions.js'
import SliceTextboxes from './SliceTextboxes'

class Slice extends React.Component {

  componentDidMount() {
    //Focus on my input when mounting
    this.refs.yInput.focus();
  }

  handleChange() {
    setSliceValue(this.props.id, {
      y: parseInt(this.refs.yInput.value, 10)
    })
  }

  render() {
    const {model} = this.props;
    const style = {
      position: "absolute",
      left: 0,
      top: model.y,
      right: 0,
      height: 1,
      borderTop: "1px solid cyan"
    };

    const handleStyle = {
      position:"absolute",
      right: -60,
      transform: "translateY(-50%)"
    };

    return (
      <div style={style}>
        <div style={handleStyle}>
          <input
            ref="yInput"
            style={{width:50}}
            type="number"
            value={model.y}
            onChange={this.handleChange.bind(this)}
          />

          <SliceTextboxes
            id={this.props.id}
            hasLink={model.hasLink || false}
            linkHref={model.linkHref || ""}
            altText={model.altText || ""}
          />

        </div>
      </div>
    )
  }
}

Slice.defaultProps = {
  y: 0
};

export default Slice;