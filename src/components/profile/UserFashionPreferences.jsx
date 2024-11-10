// // src/components/profile/UserFashionPreferences.js

// import React, { useState } from 'react';

// const UserFashionPreferences = ({ initialPreferences = {}, onUpdate }) => {
//   const [preferences, setPreferences] = useState({
//     favoriteStyles: initialPreferences.favoriteStyles || '',
//     favoriteColors: initialPreferences.favoriteColors || '',
//     favoriteBrands: initialPreferences.favoriteBrands || '',
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPreferences((prevPreferences) => ({
//       ...prevPreferences,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(preferences);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setPreferences({
//       favoriteStyles: initialPreferences.favoriteStyles || '',
//       favoriteColors: initialPreferences.favoriteColors || '',
//       favoriteBrands: initialPreferences.favoriteBrands || '',
//     });
//     setIsEditing(false);
//   };

//   return (
//     <div style={{ 
//       padding: '20px', 
//       border: '1px solid #ddd', 
//       borderRadius: '8px', 
//       maxWidth: '400px', 
//       margin: '20px auto',
//       backgroundColor: '#f9f9f9'
//     }}>
//       <h3>Fashion Preferences</h3>
//       {!isEditing ? (
//         <>
//           <p><strong>Favorite Styles:</strong> {preferences.favoriteStyles || 'Not specified'}</p>
//           <p><strong>Favorite Colors:</strong> {preferences.favoriteColors || 'Not specified'}</p>
//           <p><strong>Favorite Brands:</strong> {preferences.favoriteBrands || 'Not specified'}</p>
//           <button 
//             onClick={() => setIsEditing(true)} 
//             style={{ 
//               padding: '8px 16px', 
//               backgroundColor: '#1890ff', 
//               color: '#fff', 
//               border: 'none', 
//               borderRadius: '4px', 
//               cursor: 'pointer' 
//             }}
//           >
//             Edit Preferences
//           </button>
//         </>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <label>
//             Favorite Styles:
//             <input
//               type="text"
//               name="favoriteStyles"
//               value={preferences.favoriteStyles}
//               onChange={handleChange}
//               placeholder="e.g., Casual, Formal"
//               style={{ 
//                 display: 'block', 
//                 margin: '8px 0', 
//                 padding: '8px', 
//                 width: '100%', 
//                 border: '1px solid #ccc',
//                 borderRadius: '4px' 
//               }}
//               required
//             />
//           </label>
//           <label>
//             Favorite Colors:
//             <input
//               type="text"
//               name="favoriteColors"
//               value={preferences.favoriteColors}
//               onChange={handleChange}
//               placeholder="e.g., Blue, Black"
//               style={{ 
//                 display: 'block', 
//                 margin: '8px 0', 
//                 padding: '8px', 
//                 width: '100%', 
//                 border: '1px solid #ccc',
//                 borderRadius: '4px' 
//               }}
//               required
//             />
//           </label>
//           <label>
//             Favorite Brands:
//             <input
//               type="text"
//               name="favoriteBrands"
//               value={preferences.favoriteBrands}
//               onChange={handleChange}
//               placeholder="e.g., Nike, Gucci"
//               style={{ 
//                 display: 'block', 
//                 margin: '8px 0', 
//                 padding: '8px', 
//                 width: '100%', 
//                 border: '1px solid #ccc',
//                 borderRadius: '4px' 
//               }}
//               required
//             />
//           </label>
//           <div style={{ marginTop: '10px' }}>
//             <button 
//               type="submit" 
//               style={{ 
//                 padding: '8px 16px', 
//                 backgroundColor: '#52c41a', 
//                 color: '#fff', 
//                 border: 'none', 
//                 borderRadius: '4px', 
//                 cursor: 'pointer',
//                 marginRight: '10px'
//               }}
//             >
//               Save
//             </button>
//             <button 
//               type="button" 
//               onClick={handleCancel} 
//               style={{ 
//                 padding: '8px 16px', 
//                 backgroundColor: '#f5222d', 
//                 color: '#fff', 
//                 border: 'none', 
//                 borderRadius: '4px', 
//                 cursor: 'pointer' 
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default UserFashionPreferences;
