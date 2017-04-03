import React from 'react';
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
      console.log(droppedFiles);

      let ajaxData = new FormData($form.get(0));
      let $input = window.$('#js-file-input');
      if (droppedFiles) {
        window.$.each( droppedFiles, function(i, file) {
          ajaxData.append( "theFile", file );
        });
      }

      console.log(ajaxData)


      console.log('posting')
      window.$.ajax({
        url: 'http://localhost:4000/uploadImage',
        type: 'POST',
        data: ajaxData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
          console.log('SUCCESS', data)
        },
        error: function(data) {
          // Log the error, show an alert, whatever works for you
          console.warn('ERROR', data)
        }
      });



    });
  }


  render() {
    const draggingClass = this.state.isDraggingOver ? "is-dragging-over" : "";
    return (
      <form className={`ImageUploadApp ${draggingClass}`} encType="multipart/form-data">
        <div>
          <input type="file" name="file" id="js-file-input"/>
          <label className="drop-box" htmlFor="file">
            <strong>Choose a file</strong>
            <span> or drag it here</span>.
          </label>
          <button type="submit">Upload</button>
        </div>
      </form>
    )
  }
}

export default ImageUploadApp;