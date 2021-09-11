# Feature Request: Audio Sample

## September 10th 2021

## OBJECTIVE
To provide an audio player that plays a short sample of the selected track.
## BACKGROUND 
When constructing a playlist you want the songs included to fit a certain mood or genre. Capturing that feeling can be hard just by browsing through song titles. That is why I propose adding a playback feature to the Jammming app. Before adding a song to your playlist there would be an option to preview the song. Selecting preview will bring up an audio player and play a 30 sec sample of the song as well as display any album cover art. This way you can really decide if the song fits the vibe of your playlist.
## TECHNICAL DESIGN

### New Button: Preview Button
The first step is to create a new button for the Track component that only renders on tracks in the SearchResults list. Using a Ternary Operator to read the {.isRemoval} prop will decide if the button should be added or not. This button will also have an onClick prop that uses the {.selectPreview} method described in the next section.

### New Method: .SelectPreview()
To make this method work we will first need to add two new states to the App component, {.currentPreview} and {.coverArt}. These states will hold the links to the song preview and cover art. The goal of the {.selectPreview} method is to update the two new states in the App component with the required information from the selected song. This method is then passed down to the SearchResults component, then to the TrackList component, and finally to the Track component, where it is passed track information in the selectPreview method of the Track component. The great part about this new feature is that we don’t need to make any additional requests to the Spotify API. All we need to do is pull out {.preview_url} and {.album.images} from the returned JSON object and add them to the object we pass into the App component as a track.




### New Component: AudioPlayer
Now that we have the info we need, We can create a new component called AudioPlayer that will display the audio playback and album art. First in the App component we will use a method called {.renderAudio} to check if there is a value stored in the {.currentPreview} state and if so, render the AudioPlayer component. This way the player only renders if the user has clicked the preview button on one of the songs. As props we will pass down the {.currentPreview} and {.coverArt} states. The render for this component will return an <image> element and an <audio> element wrapped in a <div>. The source for the image will be {this.props.coverArt} and the source for the audio element will be {this.props.previewURL}. The last step is to style the AudioPlayer component to match the rest of the app.



## CAVEATS
This approach of using the song previews was preferred to the other option of having the link to view the whole song in Spotify. Each track comes with that link in the JSON object but sending the user to another page is time consuming and detracts from our web app. Although the full song is available there, only a sample is required for the user  to catch the mood of the song and decide if it fits their playlist.

