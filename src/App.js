// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wardrobe from './components/Wardrobe';
import OutfitSuggestions from './components/OutfitSuggestions';
import FiveDayWeather from './components/FiveDayWeather';
import HelloUser from './components/profile/HelloUser';
import UserInfo from './components/profile/UserInfo';
import UserFashionPreferences from './components/profile/UserFashionPreferences';
import Login from './components/Login';
import Home from './components/Home';
import ECommerce from './components/ECommerce';

// Import mock data
import { wardrobeItems, ecommerceItems, outfitSuggestions } from './mockData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {!isLoggedIn ? (
          <Login setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <>
            <Navbar setIsLoggedIn={setIsLoggedIn} />
            <main className="main-content">
              <Switch>
                <Route path="/wardrobe">
                  <Wardrobe items={wardrobeItems} />
                </Route>
                <Route path="/shopping">
                  <ECommerce items={ecommerceItems} />
                </Route>
                <Route path="/outfits">
                  <div>
                    <FiveDayWeather />
                    <OutfitSuggestions outfits={outfitSuggestions} />
                  </div>
                </Route>
                <Route path="/profile">
                  <div className="profile-section">
                    <HelloUser />
                    <UserInfo />
                    <UserFashionPreferences />
                  </div>
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

console.log(wardrobeItems);
console.log(ecommerceItems);
console.log(outfitSuggestions);

export default App;
