import React, { useEffect, useState } from 'react';
import Menubar from './Menubar';
import Profile from './pages/OrgProfile';
import Transaction from './pages/Transactions';
import { Routes, Route } from 'react-router-dom';
import OrgHome from './pages/OrgHome';
import DashboardNav from './dash-components/DashboardNav';
import CreateCampaign from './pages/CreateCampaign';
import { useAuth } from '../../context/usersContext';
import DashFooter from './dash-components/DashFooter';
import CampaignCard from './dash-components/CampaignCard';
import Accounts from './pages/Accounts';
import Donations from './pages/Donations';

function OrgLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const { user, isLoggedIn } = useAuth();
  const[loading,setLoading]=useState(true)
  const[campaigns,setCampaigns]=useState([])
  const[errors,setErrors]=useState()
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

  useEffect(() => {
      handleFetch();
      const intervalId = setInterval(handleFetch, 7000); // Poll every 5 seconds
      return () => clearInterval(intervalId);
  }, [token]);
  
  const handleFetch = async () => {
    try {
        const response = await fetch('/api/v1.0/org_all_campaigns', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (response.ok) {
            setLoading(false)
            console.log("Successful request to get campaigns");
            setCampaigns(data.campaigns);
        } else {
            setLoading(true)
            throw new Error(data);
        }
    } catch (error) {
        setLoading(true)
        setErrors('Error in fetching campaigns', error);
    }
};


  if  (!token){
    window.location.replace("/org/login")
  }

  return (
    <div>
      <DashboardNav toggleSidebar={toggleSidebar} />
      <div className="flex dark:bg-gray-900">
        <Menubar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
        {/* {isLargeScreen && <Menubar isOpen={isSidebarOpen} />} */}
        <main className="mt-3 mx-auto w-5/6 overflow-y-auto md:m-3 min-h-max sm:h-fit sm:w-screen lg:h-auto justify-center">
          <Routes>
            <Route path="/" element={<OrgHome />} />
            <Route path="/createcampaign" element={<CreateCampaign handleFetching={handleFetch}/>} />
            <Route path="/campaigns" element={<CampaignCard allCampaigns={campaigns} campaignError={errors}/>} />
            <Route path="/donations" element={<Donations allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors}/>} />
            <Route path="/accounts" element={<Accounts/>} />
            <Route path="/transaction" element={<Transaction allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors}/>} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
      <DashFooter/>
    </div>
  );
}

export default OrgLayout;
