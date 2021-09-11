import React from "react";
import './AudioPlayer.css';

export class AudioPlayer extends React.Component {

    render(){
        return(
            <div className='audio-container'>
                <img src={this.props.coverArt} alt='' />
                <audio id='audio' src={this.props.previewURL} controls></audio>
            </div>
        )
    }
}