import React from "react";
import  {Track} from '../Track/Track.js';
import './TrackList.css';



export class TrackList extends React.Component{

    render() {

        let tracks = this.props.tracks.map((track) => {
           return <Track 
            key={track.id} 
            track={track} 
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval} 
            selectPreview={this.props.selectPreview} />
        })

        return(
            <div className="TrackList">
                {tracks}
            </div>
        )
    }
}