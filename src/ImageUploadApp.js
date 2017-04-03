import React from 'react';
import {setAppValue} from './redux-actions/app-actions.js'
import './ImageUploadApp.css'


class ImageUploadApp extends React.Component {

  constructor() {
    super();
    this.state = {
      isDraggingOver: false
    }
  }

  componentDidMount() {
    let $form = window.$('form.ImageUploadApp');
    let droppedFiles = null;
    let self = this;
    $form.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
    }).on('dragover dragenter', function () {

      //Mouse is dragging over
      self.setState({isDraggingOver: true});

    }).on('dragleave dragend drop', function () {

      //Mouse is has stopped dragging over
      self.setState({isDraggingOver: false});

    }).on('drop', function (e) {
      droppedFiles = e.originalEvent.dataTransfer.files;
      let ajaxData = new FormData($form.get(0));
      if (droppedFiles) {
        window.$.each( droppedFiles, function(i, file) {
          ajaxData.append( "theFile", file );
        });
      }

      window.$.ajax({
        url: 'http://localhost:4000/uploadImage',
        type: 'POST',
        data: ajaxData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function(res) {
          console.log('SUCCESS', res.data);
          self.handleSuccessfulUpload(res.data);
        },
        error: function(data) {
          // Log the error, show an alert, whatever works for you
          console.warn('ERROR', data)
        }
      });



    });
  }

  handleSuccessfulUpload(imgData) {
    const browserReadySrc = imgData.path.replace("public", "");
    setAppValue({
      isImageReady: true,
      imageSrc: browserReadySrc
    })
  }


  render() {
    const draggingClass = this.state.isDraggingOver ? "is-dragging-over" : "";
    return (
      <form className={`ImageUploadApp ${draggingClass}`} encType="multipart/form-data">
        <div>
          <input type="file" name="file" id="js-file-input" style={{display:"none"}}/>
          <label className="drop-box" htmlFor="file">
            <span>Drag an image here!</span>
          </label>
        </div>
      </form>
    )
  }
}

export default ImageUploadApp;