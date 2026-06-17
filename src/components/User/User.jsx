import React from 'react';
import CompletedLevels from '../CompletedLevels/CompletedLevels.jsx';


const User = () => {
  const userString = localStorage.getItem("game-user");
  const userObject = userString ? JSON.parse(userString) : null;

    return(
      <div className="user-profile p-4 text-light">
        {userObject ? (
          <>
          <h1>{userObject.username}</h1>
          <p>Completed Games: {userObject.completedDates.length}</p>
          <CompletedLevels completedDates={userObject.completedDates} />
          </>
        ) : (
          <p>No user yet</p>
      )} 
      </div>
        
    )

}

export default User