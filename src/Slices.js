import React from 'react';
import Slice from './Slice'
import {connect} from 'react-redux'
import {modelsFromObject} from './helpers/models-from-object'


class Slices extends React.Component {

  render() {

    const style = {
      position: "absolute",
      left: 0, right: 0, //Stretch to fill container
      top: 0, bottom: 0,
    };

    return (
      <div style={style}>
        {
          this.props.slices.map((model, i) => <Slice key={i} id={model._id} y={model.y} />)
        }
      </div>
    )
  }
}



export default connect((state, props) => {
  return {
    slices: modelsFromObject(state.app.slices)
  }
})(Slices)