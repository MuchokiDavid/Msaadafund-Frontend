import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Usermenubar from './components/Usermenubar';
import UserHome from './pages/UserHome';
import UserProfile from './pages/UserProfile';
import { useMediaQuery } from 'react-responsive'; 
import Donations from './pages/Donations';
import Subscriptions from './pages/Subscriptions';
import Help from './pages/Help';
import Footer from './components/UserFooter';
import UserNav from './components/UserNav';


function UserLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const [loading,setLoading]=useState(false)
  const [campaigns,setCampaigns]=useState([])
  const [errors,setErrors]= useState(null)
  const [allDonations, setAllDonations] = useState([]);

  const token= localStorage.getItem('token')
  const userName=localStorage.getItem('user')



  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     const isScreenLarge = window.innerWidth >= 768;
  //     setIsLargeScreen(isScreenLarge);
  //     setIsSidebarOpen(isScreenLarge); 
  //     if (!isScreenLarge) {
  //       setIsSidebarOpen(false);
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // Listen to window resize events
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    // Call it initially
    handleWindowSizeChange();
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  // Function to update isSmallScreen state based on window width
  const handleWindowSizeChange = () => {
    setIsSmallScreen(window.innerWidth <= 768); // Adjust the width threshold as needed
  };

  //Fuction to close the sidebar when menuitem clicked
  const handleMenuItemClick = () => {
    if (isSidebarOpen && (isSmallScreen || isMediumScreen)) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  //Fetch all campaigns
  const handleFetch = async () => {
    try {
        const response = await fetch('/api/v1.0/get_all_campaigns', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if (response.ok) {
          // console.log(data)
          if(data){
            setLoading(false)
            // console.log("Successful request to get campaigns");
            setCampaigns(data);
          }
          else if(data.error){
            // console.log(data)
            setLoading(false)
            setErrors(data.error)
          }
            
        } else {
            setLoading(true)
            throw new Error(data);
        }
    } catch (error) {
        setLoading(true)
        console.error('Error in fetching campaigns, ensure you have created campaign', error);
    }
  };

  useEffect(() => {
    const getDonations = async () => {
        // setLoading(true)
        try {
            const response = await fetch('/api/v1.0/user/donations', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                if(data){
                  console.log(data)
                   console.log("Successful request to get user donations");
                    setAllDonations(data);
                    setLoading(false); 
                }
                if(data.error){
                    setLoading(false);
                    console.log(data.error)
                    setErrors(data.error);
                }
                
            }
        }
        catch {
            setErrors("No donations found")
        }
    }
    getDonations();
  }, [token, userName]);
  // console.log(campaigns)

  if(!token && !userName){
    window.location.replace('/user/login')
  }


  return (
    <div>
      <UserNav toggleSidebar={toggleSidebar} />
      <div className="flex">
      {isSidebarOpen && <Usermenubar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleMenuItemClick= {handleMenuItemClick}/>}
        {/* <main className="mt-3 mx-auto md:w-3/4 overflow-y-auto md:m-3 min-h-max h-1/6"> */}
        <main className={`mt-3 mx-auto w-full sm:w-screen overflow-hidden overflow-y-auto md:m-3 min-h-screen lg:h-full justify-center px-2 lg:px-6`} style={{ marginTop: '10px' }} id='userdashboard'>
          <Routes>
            <Route path="/" element={<UserHome allDonations={allDonations}/>} />
            <Route path="/contributions" element={<Donations allDonation={allDonations}/>} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </div>
      <Footer/>
    </div>
  );
}

export default UserLayout;
