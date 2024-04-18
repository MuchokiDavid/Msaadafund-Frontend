//Users authentication context

import React, { createContext, useState, useContext } from 'react';

const UserAuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loginMessage, setLoginMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 
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
            localStorage.setItem('token', data.tokens.access);
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
            localStorage.setItem('token', data.tokens.access_token);
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
    setLoginMessage("")
  };

  return (
    <UserAuthContext.Provider value={{ isLoggedIn, userLogin, logout, user, token, loginMessage, errorMessage, orgLogin }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useAuth = () => useContext(UserAuthContext);