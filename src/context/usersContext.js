//Users authentication context

import React, { createContext, useState, useContext } from 'react';

const UserAuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Store the token in localStorage
  const storeToken = (token) => {
    localStorage.setItem('token', token);
  };

  // Retrieve the token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Remove the token from localStorage
  const removeToken = () => {
    localStorage.removeItem('token');
  };

  // Check if the token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;

    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = tokenData.exp * 1000; // Convert to milliseconds

    return Date.now() > expirationTime;
  };

  // Function to handle token expiration
  const handleTokenExpiration = () => {
    const token = getToken();

    if (isTokenExpired(token)) {
        removeToken();
    }
  };

  // Set up a timer to check for token expiration periodically
  const startTokenExpirationCheck = () => {
    setInterval(handleTokenExpiration, 60000); // Check every minute
  };

  // Call this function when you receive a new token
  const onReceiveToken = (token) => {
    storeToken(token);
    startTokenExpirationCheck();
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
            localStorage.setItem('user', data.user.username);
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
            // localStorage.setItem('token', data.tokens.access_token);
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
    localStorage.removeItem('org'); 
    localStorage.removeItem('user'); 
    setLoginMessage("")
  };

  return (
    <UserAuthContext.Provider value={{ isLoggedIn, userLogin, logout, user, token, loginMessage, errorMessage, orgLogin }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useAuth = () => useContext(UserAuthContext);