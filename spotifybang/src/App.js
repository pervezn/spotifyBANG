import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Credentials } from './Credentials';
import DropDown from './DropDown';

function App() {
  const [token, setToken] = useState('')
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
  const spotify = Credentials()

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
        // console.log(tokenResponse.data.access_token);
        setToken(tokenResponse.data.access_token);

        axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
        })
        .then (genreResponse => {        
          setGenres({
            selectedGenre: genres.selectedGenre,
            listOfGenresFromAPI: genreResponse.data.categories.items
          })
        });
      }
    )
  },[genres.selectedGenre, spotify.ClientId, spotify.ClientSecret])
  
  console.log(genres)



  return (
    <div className="App">
      <DropDown genres={genres} />
    </div>
  );
}

export default App;
