import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Userdashboard from './Userdashboard';
import Usermenubar from './Usermenubar';
import UserHome from './pages/UserHome';
import ActiveDonations from './pages/ActiveDonations';
import PreviousDonations from './pages/PreviousDonations';
import UserProfile from './pages/UserProfile';

function UserLayout() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
      if (!window.innerWidth >= 768) {
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
      <Userdashboard toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Usermenubar isOpen={isSidebarOpen} />
        <main className="mt-3 mx-auto md:w-3/4 overflow-y-auto md:m-3 min-h-max h-1/6">
          <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/active-donations" element={<ActiveDonations />} />
            <Route path="/previous-donations" element={<PreviousDonations />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default UserLayout;
