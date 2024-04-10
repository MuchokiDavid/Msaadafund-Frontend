import React, { useEffect, useState } from 'react';
import Menubar from './Menubar';
import Profile from './pages/OrgProfile';
import Transaction from './pages/Transactions';
import { Routes, Route } from 'react-router-dom';
import OrgHome from './pages/OrgHome';
import DashboardNav from './DashboardNav';
import CreateCampaign from './pages/CreateCampaign';
import { useAuth } from '../../context/usersContext';
import DashFooter from './dash-components/DashFooter';
import CampaignCard from './dash-components/CampaignCard';
import Donations from './pages/Donations';

function OrgLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const { user, isLoggedIn } = useAuth();
  const token=localStorage.getItem('token');

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const isScreenLarge = window.innerWidth >= 810;
      setIsLargeScreen(isScreenLarge);
      setIsSidebarOpen(isScreenLarge); 
      if (!isScreenLarge) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if  (!token){
    window.location.replace("/org/login")
  }

  return (
    <div>
      <DashboardNav toggleSidebar={toggleSidebar} />
      <div className="flex dark:bg-gray-900">
        <Menubar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
        {/* {isLargeScreen && <Menubar isOpen={isSidebarOpen} />} */}
        <main className="mt-3 mx-auto md:w-3/4 overflow-y-auto md:m-3 min-h-max h-screen ">
          <Routes>
            <Route path="/" element={<OrgHome />} />
            <Route path="/createcampaign" element={<CreateCampaign/>} />
            <Route path="/campaigns" element={<CampaignCard/>} />
            <Route path="/donations" element={<Donations/>} />
            <Route path="/accounts" element={<CreateCampaign/>} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
      <DashFooter/>
    </div>
  );
}

export default OrgLayout;
