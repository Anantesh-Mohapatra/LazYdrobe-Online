// HelloUser.jsx
import React from 'react';

const HelloUser = ({ user }) => {
  console.log("User Data:", user);

  return (
    <div style={{ padding: '10px', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
      Hello, {user ? user.username : 'New User'}!
    </div>
  );
};

export default HelloUser;