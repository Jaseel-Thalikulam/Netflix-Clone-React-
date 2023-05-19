import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { IMG_URL, API_KEY} from '../../constants/constants'
import YouTube from 'react-youtube'
import { HttpStatusCode } from 'axios'
function RowPost(props) {

  const [movies, setMovies] = useState([])
  const [urlId,setUrlId]=useState('')

  useEffect(() => {
    
    axios.get(props.url).then(response => {
     
      setMovies(response.data.results)
    }).catch(err => {
      // alert('Error 401 unauthorized access ')
    })
    
    return () => {
      
    }
  }, [])
  

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
          return result.name && result.name.toLowerCase().includes('official');
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
    <div className='row'>
          <h2>{props.title}</h2>
      <div className="posters">
        
        {movies.map((obj) => 
               
          <img onClick={()=>handletrailer(obj.id)} className={props.isSmall?'smallposter':'posterImg'} src={`${IMG_URL+obj.backdrop_path}`} alt="poster" />
           
        )}

      </div>

      

     { urlId && <YouTube videoId={urlId.key} opts={opts} /> }
    </div>
  )
}

export default RowPost
