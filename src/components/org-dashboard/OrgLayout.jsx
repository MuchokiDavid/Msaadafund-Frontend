import React, { useEffect, useState } from 'react';
import Menubar from './Menubar';
import Profile from './pages/OrgProfile';
import Transaction from './pages/Transactions';
import { Routes, Route } from 'react-router-dom';
import OrgHome from './pages/OrgHome';
import DashboardNav from './DashboardNav';

function OrgLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const isScreenLarge = window.innerWidth >= 768;
      setIsLargeScreen(isScreenLarge);
      setIsSidebarOpen(isScreenLarge); // Set sidebar state based on screen size
      if (!isScreenLarge) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <DashboardNav toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Menubar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
        {/* {isLargeScreen && <Menubar isOpen={isSidebarOpen} />} */}
        <main className="mt-3 mx-auto md:w-3/4 overflow-y-auto md:m-3 min-h-max h-1/6">
          <Routes>
            <Route path="/" element={<OrgHome />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default OrgLayout;
