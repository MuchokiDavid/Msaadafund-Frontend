//Users authentication context

import React, { createContext, useState, useContext,useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { apiUrl } from './Utils';

const UserAuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loginMessage, setLoginMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [orgLoading, setOrgLoading] = useState(false);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshtoken'));

  // useeffect to setRefreshToken
  useEffect(() => {
    setRefreshToken(localStorage.getItem('refreshtoken'));
  }, [setRefreshToken]);


  useEffect(() => {
    if (token && refreshToken) {
      const expirationTime = 2 * 60 * 60 * 1000; // 2 hour
      const timeout = setTimeout(() => {
        refreshAccessToken();
      }, expirationTime - 5 * 60 * 1000); // Refresh 5 minutes before expiration

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, refreshToken]);

  // Refresh token function
  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1.0/auth/refresh`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${refreshToken}`,
        },
      });
      const data = await response.json();

      if (data.access_token) {
        setToken(data.access_token);
        onReceiveToken(data.access_token);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  };

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
    setUserLoading(true)
    fetch(`${apiUrl}/api/v1.0/auth/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => r.json())
      .catch((err)=>{
        setErrorMessage(err);
        setUserLoading(false);
      })
      .then((data) => {
          if (data.message){
            setIsLoggedIn(true);
            setUser(data.user);
            setToken(data.tokens.access); 
            onReceiveToken(data.tokens.access);
            localStorage.setItem('refreshtoken', data.tokens.refresh); //refresh token
            localStorage.setItem('userData', JSON.stringify(data.user))
            localStorage.setItem('user', data.user.username);
            localStorage.setItem('isSignatory', data.is_signatory);
            setLoginMessage(data.message);
            setErrorMessage(""); 
            setUserLoading(false)
          }
          if(data.error){
            setUserLoading(false)
            setLoginMessage(data.error)
          }
          
        });
  };

  
  // Log in with google account function
  const handleSuccess = async (credentialResponse) => {

    const token = credentialResponse.credential;
    setLoading(true)

    try {
      // Validate the token by calling your backend first
      const response = await axios.post(`${apiUrl}/api/v1.0/auth/user/google-login`, {
        token: token,
      });
      // console.log('Login Success:', response);     

      if (response.status===200){
        const jwtToken = response.data.access_token;
         localStorage.setItem('token', jwtToken);
        setIsLoggedIn(true);
        setUser(response.data.user);
        setToken(response.data.access_token);
        onReceiveToken(response.data.access_token);
        localStorage.setItem('refreshtoken', response.data.refresh); //refresh token
        localStorage.setItem('userData', JSON.stringify(response.data.user))
        localStorage.setItem('user', response.data.user.username);
        localStorage.setItem('isSignatory', response.data.is_signatory);
        setLoginMessage(response.data.message);
        setErrorMessage("");
        setLoading(false)
      }
      if(response.status!==200){
        setLoginMessage(response.data.error)
        setLoading(false)
      }
     
      
    } catch (err) {
      console.error('Request Failed:', err);
      setLoading(false)
    }
  };

  // Handle if login to google not successiful
  const handleError = () => {
    setLoginMessage('Login Failed');
  };

  const orgLogin = async(email, password) => {
    // console.log(email)
    setOrgLoading(true)
    await fetch(`${apiUrl}/api/v1.0/auth/organisation/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json())
      .catch((err)=>{
        setErrorMessage(err);
        setOrgLoading(false);
      })
      .then((data) => {
          if (data.message){
            setIsLoggedIn(true);
            setUser(data.organisation);
            setToken(data.tokens.access_token); 
            onReceiveToken(data.tokens.access_token);
            localStorage.setItem('refreshtoken', data.tokens.refresh_token); //refresh token
            localStorage.setItem('org', data.organisation.orgName);
            setLoginMessage(data.message);
            setErrorMessage(""); 
            setOrgLoading(false);
          }
          if(data.error){
            setLoginMessage(data.error)
            setOrgLoading(false)
          }
          
        });
    } 


  const logout = () => {
    googleLogout();
    setIsLoggedIn(false);
    setUser(null);
    setToken(null); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('userData');
    localStorage.removeItem('org'); 
    localStorage.removeItem('user'); 
    localStorage.removeItem('isSignatory'); 
    setLoginMessage("")
    setErrorMessage("")
  };

  return (
    <UserAuthContext.Provider value={{ 
      isLoggedIn, 
      userLogin, 
      logout, 
      user, 
      token, 
      loginMessage, 
      errorMessage, 
      orgLogin, 
      setLoginMessage, 
      handleSuccess, 
      handleError, 
      loading,
      userLoading,
      orgLoading 
      }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useAuth = () => useContext(UserAuthContext);