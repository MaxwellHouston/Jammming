
let accessToken;
const clientID = '705f6ac8bed240d4b62c51dedbc311e2';
const redirectURI ='http://localhost:3000/';

const Spotify = {

    getAccessToken() {
        if(accessToken){
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{headers: {Authorization: `Bearer ${accessToken}`}}).then((response)=>{
            if(response.ok){
                return response.json();
            }
        }).then((jsonResponse)=>{
                if(!jsonResponse){
                    return [];
                }
                return jsonResponse.tracks.items.map((track)=>({
                    name: track.name,
                    id: track.id,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri:track.uri,
                    //Added preview url to the track object for the smaple player & cover art for the player
                    preview_url: track.preview_url,
                    cover: track.album.images[1].url
                }))
        })
    },
     async savePlaylist(playlistName,playlistTracks) {
        if(!playlistName || !playlistTracks.length){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        const userIdResponse = await fetch(`https://api.spotify.com/v1/me`, {headers: headers});
        let userId = await (userIdResponse.json()).id;
        const playlistIdResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            headers: headers,
            method: 'POST',
            body: JSON.stringify(
                {name: playlistName}
            )
            });
        let playlistID = await playlistIdResponse.json().id;

        return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        uris: playlistTracks
                    })
                })
    }
}

export default Spotify;