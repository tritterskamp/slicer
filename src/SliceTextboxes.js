import React from 'react';
import {setSliceValue} from './redux-actions/app-actions.js'

class SliceTextboxes extends React.Component {

  handleLinkCheckChange(e) {
    console.log(e.target.value);
    setSliceValue(this.props.id, {
      hasLink: e.target.value === "link-on"
    })
  }

  renderLinkTextbox() {
    if (this.props.hasLink) {
      return (
        <div>
          <label className="SliceTextboxes-label">Link</label>
          <input className="SliceTextboxes-textinput" />
        </div>
      )
    }
    return null;
  }

  render() {
    const style = {
      position:"absolute",
      bottom: 30,
      left: 40,
      background:"#fff",
      padding: 20,
      borderLeft: "6px solid #666"
    };

    const linkOnLabelFor = `link-on-${this.props.id}`;
    const linkOffLabelFor = `link-off-${this.props.id}`;

    return (
      <div style={style}>
        <div>
          <div className="SliceTextboxes-label">Has link?</div>

          <input id={linkOnLabelFor} value="link-on" type="radio" onChange={this.handleLinkCheckChange.bind(this)} checked={this.props.hasLink} />
          <label htmlFor={linkOnLabelFor} className="SliceTextboxes-label inline">Yes</label>

          <input id={linkOffLabelFor} value="link-off" type="radio" onChange={this.handleLinkCheckChange.bind(this)} checked={!this.props.hasLink} />
          <label htmlFor={linkOffLabelFor} className="SliceTextboxes-label inline">No</label>
        </div>

        {this.renderLinkTextbox()}

        <div>
          <label className="SliceTextboxes-label">Alt Text</label>
          <input className="SliceTextboxes-textinput" />
        </div>
      </div>
    )
  }
}

export default SliceTextboxes;