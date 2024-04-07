import React, {useState, useEffect} from 'react'

function UserProfile() {
  const [user, setUser] = useState({})

  //  useEffect (() => {
  //   fetch(`/api/v1.0/usersdata`, 
  //     {method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json"}
  //   }
  // );
  // const data = await.response.json();
  // setUser(data);
  // console.log(data)
  //  }
  // )
  
  return (
    <>
      <h1>UserProfile (username)</h1>
      <h2>Profile picture</h2>
      <h2>Account Settings</h2>
      <h4>Edit username</h4>
      <h4>change password</h4>
      <h4>delete account</h4>
    </>
  )
}

export default UserProfile