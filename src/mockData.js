// src/mockData.js

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
    date_added: "2024-03-01T08:15:00",
    product_name: "Calvin Klein Wool Coat",
    price: 16.95,
    product_url: "https://www.ebay.com/itm/Calvin-Klein-Wool-Coat-Womens-6-/156460922232"
  },
  {
    item_id: 2,
    user_id: 1,
    product_id: 204999601171,
    clothing_type: "Coat",
    for_weather: "winter",
    color: { primary: "tan" },
    size: "S",
    tags: ["water-resistant", "trench"],
    image_url: "https://i.ebayimg.com/thumbs/images/g/81gAAOSw0Ctm6u0~/s-l140.jpg",
    date_added: "2024-03-05T09:20:30",
    product_name: "Women's Casual Thicken Wool Blend Stand Collar",
    price: 37.99,
    product_url: "https://www.ebay.com/itm/Womens-Casual-Thicken-Wool-Blend-Stand-Collar-Single-Breasted-Pea-Coat-CHARTOU-/395047190185"
  },
  {
    item_id: 3,
    user_id: 1,
    product_id: 155488229926,
    clothing_type: "Work Jacket",
    for_weather: "fall",
    color: { primary: "brown" },
    size: "L",
    tags: ["workwear", "durable"],
    image_url: "https://i.ebayimg.com/thumbs/images/g/bxMAAOSwkIdkLGV3/s-l140.jpg",
    date_added: "2024-03-10T10:00:00",
    product_name: "Mens Heavy Weight MA-1 Flight Bomber Jacket",
    price: 34.99,
    product_url: "https://www.ebay.com/itm/Mens-Heavy-Weight-MA-1-Flight-Bomber-Jacket-Full-Zip-Outerwear-Coat-Colors-NWT-/172875575111"
  }
  // Add more items as needed
];

// Mock data for outfits
export const outfitSuggestions = [
  {
    outfit_id: 1,
    user_id: 1,
    clothings: [
      {
        item_id: 1,
        clothing_type: "Jacket",
        image_url: "https://i.ebayimg.com/thumbs/images/g/pk0AAOSw5s1m14oW/s-l140.jpg",
        product_name: "Calvin Klein Wool Coat",
        price: 16.95,
        product_url: "https://www.ebay.com/itm/Calvin-Klein-Wool-Coat-Womens-6-/156460922232"
      },
      {
        item_id: 2,
        clothing_type: "Coat",
        image_url: "https://i.ebayimg.com/thumbs/images/g/81gAAOSw0Ctm6u0~/s-l140.jpg",
        product_name: "Women's Casual Thicken Wool Blend Stand Collar",
        price: 37.99,
        product_url: "https://www.ebay.com/itm/Womens-Casual-Thicken-Wool-Blend-Stand-Collar-Single-Breasted-Pea-Coat-CHARTOU-/395047190185"
      }
    ],
    occasion: { type: "Casual", season: "Winter" },
    for_weather: "Cold"
  },
  {
    outfit_id: 2,
    user_id: 1,
    clothings: [
      {
        item_id: 3,
        clothing_type: "Work Jacket",
        image_url: "https://i.ebayimg.com/thumbs/images/g/bxMAAOSwkIdkLGV3/s-l140.jpg",
        product_name: "Mens Heavy Weight MA-1 Flight Bomber Jacket",
        price: 34.99,
        product_url: "https://www.ebay.com/itm/Mens-Heavy-Weight-MA-1-Flight-Bomber-Jacket-Full-Zip-Outerwear-Coat-Colors-NWT-/172875575111"
      }
    ],
    occasion: { type: "Formal", season: "Fall" },
    for_weather: "Cool"
  }
  // Add more outfits as needed
];
