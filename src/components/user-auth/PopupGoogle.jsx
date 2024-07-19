import React, { useEffect, useState } from 'react'
import { GoogleLogin} from '@react-oauth/google';
import { useAuth } from '../../context/usersContext'

function PopupGoogle() {
    const [loading, setLoading] = useState(false);
    const {isLoggedIn, handleSuccess, handleError} = useAuth();
  
    useEffect(() => {
        if (isLoggedIn) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      }, [isLoggedIn]);
  
    if (loading){
      return (
        <div><p>Loading..</p></div>
      )
    }
  
      return (      
          <div>
              <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleError}
                  scope="profile email"
              />
          </div>
      );
}

export default PopupGoogle