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

  return (
    <div>
      <UserNav toggleSidebar={toggleSidebar} />
      <div className="flex">
      {isSidebarOpen && <Usermenubar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleMenuItemClick= {handleMenuItemClick}/>}
        <main className="mt-3 mx-auto md:w-3/4 overflow-y-auto md:m-3 min-h-max h-1/6">
          <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/contributions" element={<Donations />} />
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
