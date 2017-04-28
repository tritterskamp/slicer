import React from 'react';
import {connect} from 'react-redux';
import {setAppValue} from './redux-actions/app-actions.js'

class NewButton extends React.Component {

    handleNewButton() {
        setAppValue({
            outputText: null, //gets populated
            isImageReady: false, //Is triggered on upload, then the rest of the keys are populated:
            imageSrc: "/chopping-block/ap5.jpg",
            imageWidth: 0,
            imageHeight: 0,

            slices: {
                "initial": {
                    y: 0, //CANNOT DELETE THIS ONE
                    hasLink: true,
                    linkHref: "",
                    altText: "",
                }
            }
        })
    }

    render() {
        return (
            <button onClick={this.handleNewButton.bind(this)}>
                NEW
            </button>
        )
    }
}

export default connect((state, props) => {
    return {}
})(NewButton)/**
 * Created by matt on 4/27/17.
 */
