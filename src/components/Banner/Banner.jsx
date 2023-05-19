import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import { API_KEY,IMG_URL } from '../../constants/constants'
import YouTube from 'react-youtube'

function Banner() {

  const [movie, setMovie] = useState()
  const [urlId,setUrlId]=useState('')

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 20); // Generate random number between 0 and 19
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setMovie(response.data.results[randomNumber]);
      });
  }, []);
  

  const opts = {
    height: '450',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handletrailer = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const results = response.data.results;
  
        const officialTrailer = results.find((result) => {
          return result.name && result.name.toLowerCase().includes('official trailer');
        });
  
        if (officialTrailer) {
          console.log('Official Trailer:', officialTrailer);
          setUrlId(officialTrailer);
        } else {
          console.log('No Official Trailer found.');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log('Error: 404 Not Found');
          
        } else {
          console.log('An error occurred:', error);
          
        }
      });
  };

  return (

    <div>
     
    <div style={{ backgroundImage: `url(${ movie?IMG_URL+movie.backdrop_path: ""})`,marginTop: "73px",backgroundSize: 'cover', 
    backgroundPosition: 'center top'}} className='banner'>
          <div className='content'>
        <h1  className='title'>{movie?movie.title:""}</h1>
              <div className='banner_buttons'>
              <button className='button' onClick={()=>handletrailer(movie?movie.id:"")} >Play</button>
              <button className='button'>Mylist</button>
              </div>       
        <h1 className='discription'>{movie?movie.overview:null}</h1>
   
          </div>

      <div className="fade_bottom"></div>
    </div>

{ urlId && <YouTube videoId={urlId.key} opts={opts} /> }
</div> 
  )
}

export default Banner
