// src//weatherIconMapping.js

import clear from '../assets/clear.png';
import Cloudy from '../assets/cloudy.png';
import rain from '../assets/raining.png';
import storm from '../assets/storm.png';
import sunny from '../assets/sunny.png';
import defaultIcon from '../assets/clear.png';


const weatherIconMapping = {
  "Clear": clear,
  "Partially cloudy": Cloudy,
  "Rain": rain,
  "Storm": storm,
  "Sunny": sunny,
  "Unknown": defaultIcon  // Fallback icon
};

export default weatherIconMapping;
