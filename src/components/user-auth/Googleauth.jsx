import React, { useEffect, useState } from 'react'
import { GoogleLogin} from '@react-oauth/google';
import { useAuth } from '../../context/usersContext'
import { useNavigate } from 'react-router-dom';

function Googleauth() {
  const [loading, setLoading] = useState(false);
  const {isLoggedIn, handleSuccess, handleError} = useAuth();
  const navigate=useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      navigate('/user/dashboard')
      setLoading(false);
    }
    // eslint-disable-next-line
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
  };

export default Googleauth