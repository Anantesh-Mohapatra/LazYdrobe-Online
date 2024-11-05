// Home.js
import React from 'react';
import '../App.css';
import './styling/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home">
        <h1>Welcome To LazYdrobe</h1>
        <hr class="rounded"></hr>
        <p className="intro-text">
          Trouble picking outfits for the upcoming days?<br/>
          Too much clothes to keep track of?<br/>
          Look no further. Our revolutionary app is here to assist you in keeping up with fashion trends and weather. <br/>
          <br/>
          Simply upload items in your wardrobe so that we can suggest future outfits based on the weather conditions and the current fashion trend for you while providing clothing suggestions to fill in the gaps in your wardrobe.
        </p>
      </div>
    </div>
  );
};

export default Home;
