import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import { API_KEY,IMG_URL } from '../../constants/constants'

function Banner() {

  const [movie, setMovie] = useState()
  

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 20); // Generate random number between 0 and 19
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setMovie(response.data.results[randomNumber]);
      });
  }, []);
  
  return (

   
     
    <div style={{ backgroundImage: `url(${ movie?IMG_URL+movie.backdrop_path: ""})`,marginTop: "73px",backgroundSize: 'cover', 
    backgroundPosition: 'center top'}} className='banner'>
          <div className='content'>
        <h1 className='title'>{movie?movie.title:""}</h1>
              <div className='banner_buttons'>
              <button className='button'>Play</button>
              <button className='button'>Mylist</button>
              </div>       
        <h1 className='discription'>{movie?movie.overview:null}</h1>
   
          </div>

          <div className="fade_bottom"></div>
    </div>
 
  )
}

export default Banner
