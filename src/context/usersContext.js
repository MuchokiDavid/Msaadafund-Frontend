//Users authentication context

import React, { createContext, useState, useContext,useEffect } from 'react';

const UserAuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loginMessage, setLoginMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const users=localStorage.getItem('user')
  const org = localStorage.getItem('org') 

  useEffect(() => {
    if (token && users) {
      const deleteTokenAfterTime = setTimeout(() => {
        logout(); 
      }, 23 * 60 * 60 * 1000); // 24hr
      return () => clearTimeout(deleteTokenAfterTime);
    } else if (token && org) {
      const deleteTokenAfterTime = setTimeout(() => {
        logout(); // Logout after 1 hour
      }, 1 * 60 * 60 * 1000); // 1 hour
      return () => clearTimeout(deleteTokenAfterTime);
    }
  }, [token,users,org]);
  


  // Store the token in localStorage
  const storeToken = (token) => {
    localStorage.setItem('token', token);
  };

  // Call this function when you receive a new token
  const onReceiveToken = (token) => {
    storeToken(token);
    // startTokenExpirationCheck();
  };
 
  const userLogin = (username, password) => {
    fetch("/api/v1.0/auth/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => r.json())
      .catch((err)=>console.log(err))
      .then((data) => {
          if (data.message){
            setIsLoggedIn(true);
            setUser(data.user);
            setToken(data.tokens.access); 
            onReceiveToken(data.tokens.access);
            // localStorage.setItem('token', data.tokens.access);
            localStorage.setItem('userData', JSON.stringify(data.user))
            localStorage.setItem('user', data.user.username);
            localStorage.setItem('isSignatory', data.is_signatory);
            setLoginMessage(data.message);
            setErrorMessage(""); 
          }
          if(data.error){
            setLoginMessage(data.error)
          }
          
        });
  };

  

  const orgLogin = async(email, password) => {
    // console.log(email)
    await fetch("/api/v1.0/auth/organisation/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json())
      .catch((err)=>console.log(err))
      .then((data) => {
          if (data.message){
            setIsLoggedIn(true);
            setUser(data.organisation);
            setToken(data.tokens.access_token); 
            onReceiveToken(data.tokens.access_token);
            localStorage.setItem('org', data.organisation.orgName);
            setLoginMessage(data.message);
            setErrorMessage(""); 
          }
          if(data.error){
            setLoginMessage(data.error)
          }
          
        });
    } 


  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('userData');
    localStorage.removeItem('org'); 
    localStorage.removeItem('user'); 
    setLoginMessage("")
  };

  return (
    <UserAuthContext.Provider value={{ isLoggedIn, userLogin, logout, user, token, loginMessage, errorMessage, orgLogin, setLoginMessage }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useAuth = () => useContext(UserAuthContext);