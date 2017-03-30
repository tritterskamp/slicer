import React from 'react';

class SliceTextboxes extends React.Component {
  render() {

    const style = {
      position:"absolute",
      bottom: 30,
      left: 40,
      background:"#fff",
      padding: 20,
      borderLeft: "6px solid #666"
    };

    return (
      <div style={style}>
        <label>Has link?</label>
        
        <label>Link Text</label>
        <input />
        <label>Alt Text</label>
        <input />
      </div>
    )
  }
}

export default SliceTextboxes;