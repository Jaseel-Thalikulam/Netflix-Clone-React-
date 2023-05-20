
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Banner from './components/Banner/Banner';
import RowPost from './components/RowPost/RowPost';
import {originals,action,trending,comedyMovies,horroMovies,romance,Documentaries} from './url'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <RowPost url={originals} title='Netflix Originals'/>
      <RowPost url={trending} title='Trending' isSmall />
      <RowPost url={action} title='Action' isSmall />
      <RowPost url={romance} title='Romance Movies' isSmall />
      <RowPost url={comedyMovies} title='Comedy Movies' isSmall />
      <RowPost url={horroMovies} title='Horror Movies' isSmall />
      <RowPost url={Documentaries} title='Documentaries' isSmall />
      
    </div>
  );
}

export default App;
