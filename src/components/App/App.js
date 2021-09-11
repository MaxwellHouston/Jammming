
import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';


export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: `Max's playlist`,
      playlistTracks: [],
      //Current preview state will provide URL of the song preview to the player
      currentPreview: null,
      coverArt: null
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    //Binds the select preview method
    this.selectPreview = this.selectPreview.bind(this);
  }

  addTrack(track) {
    let playlist = this.state.playlistTracks;
    if(playlist.find(song=> song.id === track.id))
    { return; }
    playlist.push(track);
    this.setState(
      {playlistTracks: playlist}
    )
  }

  removeTrack(track) {
    let playlist = this.state.playlistTracks;
    let index = playlist.indexOf(track);
    playlist.splice(index,1);
    this.setState(
      {playlistTracks: playlist}
    )
  }

  updatePlaylistName(name) {
    this.setState(
      {playlistName: name}
    )
  }

  savePlaylist() {
    let playlist = this.state.playlistTracks;
    let trackURIs = playlist.map( track => track.uri);
    console.log(trackURIs)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(()=>{
      this.setState(
        {
          playlistName: '',
          playlistTracks: []
        }
      )  
    })
    
  }

  search(term) {
    Spotify.search(term).then((results)=>{
      this.setState(
        {searchResults: results}
      )
    })
  }
  //This method returns the value of the selected song and updates the current preview state
  selectPreview(track) {
    let previewURL = track.preview_url;
    let coverArt = track.cover;
    this.setState({
      currentPreview: previewURL,
      coverArt: coverArt
    })
  }
  //renderAudio waits for a value to be stored for the preview URL then renders the audio player
  renderAudio() {
    if(this.state.currentPreview){
      return (<AudioPlayer
        previewURL={this.state.currentPreview}
        coverArt={this.state.coverArt} />)
    }  
  }



  render(){
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar
    onSearch={this.search} />
    <div className="App-playlist">
      <SearchResults 
      searchResults={this.state.searchResults} 
      onAdd={this.addTrack}
      //passing the select preview method to the search results component 
      selectPreview={this.selectPreview} />
      <Playlist 
      playlistName={this.state.playlistName} 
      playlistTracks={this.state.playlistTracks} 
      onRemove={this.removeTrack} 
      onNameChange={this.updatePlaylistName}
      onSave={this.savePlaylist}
      />
    </div>
  {this.renderAudio()}  
  </div>
</div>
    )
  }
}
