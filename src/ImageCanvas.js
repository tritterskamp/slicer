import React from 'react';
import {setAppValue} from './redux-actions/app-actions.js'

class ImageCanvas extends React.Component {

  handleImageLoaded() {
    setAppValue({
      imageWidth: this.refs.img.clientWidth
    })
  }


  render() {
    return (
        <img alt="imgcanvas" ref="img" src={this.props.src} onLoad={this.handleImageLoaded.bind(this)} />
    )
  }
}

export default ImageCanvas;