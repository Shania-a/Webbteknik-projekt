import React from 'react';

const users = localStorage.getItem("game-user");
if (users) {
  console.log(users);
} else {
  console.log(0);
}

const User = () => {
  const userString = localStorage.getItem("game-user");
  const userObject = userString ? JSON.parse(userString) : null;

    return(
      <div className="user-profile p-4 text-light">
        {userObject ? (
          <>
          <h1>{userObject.username}</h1>
          <p>Completed Games: {}</p>
          </>
        ) : (
          <p>No user yet</p>
      )} 
      </div>
        
    )

}

export default User