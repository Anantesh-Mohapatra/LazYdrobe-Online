// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wardrobe from './components/Wardrobe';
import OutfitSuggestions from './components/OutfitSuggestions';
import FiveDayWeather from './components/FiveDayWeather';
import HelloUser from './components/profile/HelloUser';
import UserInfo from './components/profile/UserInfo';
import UserFashionPreferences from './components/profile/UserFashionPreferences';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/wardrobe">
            <Wardrobe items={[]} /> {/* Replace with actual items */}
          </Route>
          <Route path="/outfits">
            <div>
              <FiveDayWeather />
              <OutfitSuggestions outfits={[]} /> {/* Replace with actual outfits */}
            </div>
          </Route>
          <Route path="/profile">
            <div>
              <HelloUser />
              <UserInfo />
              <UserFashionPreferences />
            </div>
          </Route>

          <Route path="/">
            <h1>Welcome to LazyDrobe!</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
