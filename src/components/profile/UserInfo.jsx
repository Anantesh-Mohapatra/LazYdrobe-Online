// // src/components/profile/UserInfo.js

// import React, { useState } from 'react';

// const UserInfo = ({ initialUserInfo = {}, onUpdate }) => {
//   const [userInfo, setUserInfo] = useState({
//     feet: initialUserInfo.feet || '',
//     inches: initialUserInfo.inches || '',
//     gender: initialUserInfo.gender || '',
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'inches') {
//       const inchesValue = parseFloat(value);
//       if (isNaN(inchesValue) || inchesValue < 0 || inchesValue >= 12) return;
//     }

//     setUserInfo((prevInfo) => ({
//       ...prevInfo,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(userInfo);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setUserInfo({
//       feet: initialUserInfo.feet || '',
//       inches: initialUserInfo.inches || '',
//       gender: initialUserInfo.gender || '',
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
//       <h3>User Information</h3>
//       {!isEditing ? (
//         <>
//           <p><strong>Height:</strong> {userInfo.feet ? `${userInfo.feet}'` : ''} {userInfo.inches ? `${userInfo.inches}"` : ''}</p>
//           <p><strong>Gender:</strong> {userInfo.gender || 'Not specified'}</p>
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
//             Edit Information
//           </button>
//         </>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <label>
//             Height:
//             <div style={{ display: 'flex', gap: '10px', margin: '8px 0' }}>
//               <input
//                 type="number"
//                 name="feet"
//                 value={userInfo.feet}
//                 onChange={handleChange}
//                 placeholder="Feet"
//                 style={{ padding: '4px', width: '60px' }}
//                 required
//               />
//               <input
//                 type="number"
//                 name="inches"
//                 value={userInfo.inches}
//                 onChange={handleChange}
//                 placeholder="Inches"
//                 step="0.1"
//                 style={{ padding: '4px', width: '60px' }}
//                 required
//               />
//             </div>
//           </label>
//           <label>
//             Gender:
//             <input
//               type="text"
//               name="gender"
//               value={userInfo.gender}
//               onChange={handleChange}
//               placeholder="e.g., Female"
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

// export default UserInfo;
