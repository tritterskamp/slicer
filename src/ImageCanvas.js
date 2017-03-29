import React from 'react';
import {setAppValue} from './redux-actions/app-actions.js'

class ImageCanvas extends React.Component {

  handleImageLoaded() {
    setAppValue({
      imageWidth: this.refs.img.clientWidth,
      imageHeight: this.refs.img.clientHeight,
    })
  }


  render() {
    return (
        <img alt="imgcanvas" ref="img" src={this.props.src} onLoad={this.handleImageLoaded.bind(this)} />
    )
  }
}

export default ImageCanvas;