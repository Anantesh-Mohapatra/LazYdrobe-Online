// Mock data for users
export const users = [
    {
      user_id: 1,
      username: "johndoe",
      email: "johndoe@example.com",
      password: "hashedpassword123", 
      user_ip: "192.168.1.1",
      location: "New York, USA",
      preferences: { styles: ["casual", "formal", "sportswear"] },
      date_joined: "2024-01-15T12:34:56"
    },
    {
      user_id: 2,
      username: "janedoe",
      email: "janedoe@example.com",
      password: "hashedpassword456",
      user_ip: "192.168.1.2",
      location: "San Francisco, USA",
      preferences: { styles: ["minimalist", "vintage"] },
      date_joined: "2024-02-20T10:20:30"
    }
  ];
  
  // Mock data for wardrobe_items
  export const ecommerceItems = [
    {
      product_id: 186668741135,
      suggested_item_type: "Coats, Jackets & Vests",
      product_name: "Men's warm standing collar jacket, casual outdoor parka, street coat Winter Tact",
      price: 36.38,
      product_url: "https://www.ebay.com/itm/Mens-warm-standing-collar-jacket-casual-outdoor-parka-street-coat-Winter-Tact-/186668741135?var=694698933195",
      image_url: "https://i.ebayimg.com/thumbs/images/g/pk0AAOSw5s1m14oW/s-l140.jpg"
    },
    {
      product_id: 204999601171,
      suggested_item_type: "Coats, Jackets & Vests",
      product_name: "A New Day Women's Button Up Winter Water-Resistant Trench Coat Jacket, Tan, S",
      price: 16.99,
      product_url: "https://www.ebay.com/itm/New-Day-Womens-Button-Up-Winter-Water-Resistant-Trench-Coat-Jacket-Tan-S-/204999601171",
      image_url: "https://i.ebayimg.com/thumbs/images/g/81gAAOSw0Ctm6u0~/s-l140.jpg"
    },
    {
      product_id: 155488229926,
      suggested_item_type: "Coats, Jackets & Vests",
      product_name: "New Mens Carhartt Duck Detroit Jacket Work Coat CT103828 - Pick Size and Color",
      price: 109.95,
      product_url: "https://www.ebay.com/itm/New-Mens-Carhartt-Duck-Detroit-Jacket-Work-Coat-CT103828-Pick-Size-and-Color-/155488229926?var=457516791957",
      image_url: "https://i.ebayimg.com/thumbs/images/g/bxMAAOSwkIdkLGV3/s-l140.jpg"
    }
  ];
  
  // Mock data for wardrobe_items linking to ecommerce products
  export const wardrobeItems = [
    {
      item_id: 1,
      user_id: 1,
      product_id: 186668741135, // Links to the eCommerce product
      clothing_type: "Jacket",
      for_weather: "cold",
      color: { primary: "black", secondary: "grey" },
      size: "M",
      tags: ["outdoor", "winter"],
      image_url: "https://i.ebayimg.com/thumbs/images/g/pk0AAOSw5s1m14oW/s-l140.jpg",
      date_added: "2024-03-01T08:15:00"
    },
    {
      item_id: 2,
      user_id: 1,
      product_id: 204999601171, // Links to the eCommerce product
      clothing_type: "Coat",
      for_weather: "winter",
      color: { primary: "tan" },
      size: "S",
      tags: ["water-resistant", "trench"],
      image_url: "https://i.ebayimg.com/thumbs/images/g/81gAAOSw0Ctm6u0~/s-l140.jpg",
      date_added: "2024-03-05T09:20:30"
    },
    {
      item_id: 3,
      user_id: 1,
      product_id: 155488229926, // Links to the eCommerce product
      clothing_type: "Work Jacket",
      for_weather: "fall",
      color: { primary: "brown" },
      size: "L",
      tags: ["workwear", "durable"],
      image_url: "https://i.ebayimg.com/thumbs/images/g/bxMAAOSwkIdkLGV3/s-l140.jpg",
      date_added: "2024-03-10T10:00:00"
    }
  ];
  
  // Mock data for weather_data
  export const weatherData = [
    {
      weather_id: 1,
      date: "2024-03-10",
      location: "New York, USA",
      temp_max: 5,
      temp_min: -2,
      feels_max: 3,
      feels_min: -5,
      wind_speed: 15,
      humidity: 60,
      precipitation: 5,
      precipitation_probability: 50,
      special_condition: "snow"
    },
    {
      weather_id: 2,
      date: "2024-03-11",
      location: "San Francisco, USA",
      temp_max: 18,
      temp_min: 12,
      feels_max: 17,
      feels_min: 11,
      wind_speed: 10,
      humidity: 80,
      precipitation: 0,
      precipitation_probability: 10,
      special_condition: "clear"
    }
  ];
  
  // Mock data for outfits
  export const outfitSuggestions = [
    {
      outfit_id: 1,
      user_id: 1,
      clothings: [1, 2], // Refers to wardrobeItems by item_id
      occasion: { type: "casual", season: "winter" },
      for_weather: "cold",
      date_suggested: "2024-03-01T08:30:00",
      source_url: "https://example.com/outfit1"
    },
    {
      outfit_id: 2,
      user_id: 2,
      clothings: [2],
      occasion: { type: "formal", season: "fall" },
      for_weather: "cool",
      date_suggested: "2024-03-02T09:00:00",
      source_url: "https://example.com/outfit2"
    }
  ];
  
  // Mock data for fashion_trends
  export const fashionTrends = [
    {
      trend_id: 1,
      trend_name: "Retro Revival",
      trend_description: "Bringing back the styles of the 80s with modern touches.",
      outfits: [1, 2], // Refers to outfitSuggestions by outfit_id
      example_url: "https://example.com/trend/retro-revival",
      date_added: "2024-01-01T10:00:00"
    },
    {
      trend_id: 2,
      trend_name: "Minimalist Chic",
      trend_description: "Focus on simplicity and neutral tones.",
      outfits: [2],
      example_url: "https://example.com/trend/minimalist-chic",
      date_added: "2024-02-10T09:15:00"
    }
  ];
  