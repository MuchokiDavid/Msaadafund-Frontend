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
  const[loading,setLoading]=useState(true)
  const[campaigns,setCampaigns]=useState([])
  const[allDonations,setAllDonations]=useState()
  const[errors,setErrors]=useState()
  const token=localStorage.getItem('token');
  const[donors,setDonors]=useState([])

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
//Get all donations to a logged in organisation
  useEffect(() => {
      const getDonations = async () => {
          try {
              const response = await fetch('/api/v1.0/org_donations', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  },
              });
              const data = await response.json();
              if (response.ok) {
                  setLoading(true);
                  // console.log("Successful request to get donors");
                  setAllDonations(data);
                  setLoading(false);
              } else {
                  throw new Error(data);
              }
          }
          catch {
              setErrors("Error getting donation data");
          }
      }
      getDonations();
  }, [token]);

//Get donors to this organisation
  useEffect(() => {
    const getDonors = async () => {
        try {
            const response = await fetch('/api/v1.0/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                setLoading(false);
                console.log("Successful request to get campaigns");
                setDonors(data);
            } else {
                setLoading(true);
                throw new Error(data);
            }
        }
        catch {
            setErrors("Error getting donation data");
        }
    }
    getDonors();

  }, [allDonations, token]);

  // console.log(donors)

  useEffect(() => {
      handleFetch();
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
            // console.log("Successful request to get campaigns");
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
      <div className="flex">
        <Menubar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
        {/* {isLargeScreen && <Menubar isOpen={isSidebarOpen} />} */}
        <main className="mt-3 mx-auto w-5/6 overflow-y-auto md:m-3 min-h-max sm:h-fit sm:w-screen lg:h-auto justify-center" style={{ marginTop: '10px' }}>
          <Routes>
            <Route path="/" element={<OrgHome allCampaigns={campaigns} allDonations={allDonations} allDonors={donors}/>} />
            <Route path="/createcampaign" element={<CreateCampaign handleFetching={handleFetch}/>} />
            <Route path="/campaigns" element={<CampaignCard allCampaigns={campaigns} campaignError={errors}/>} />
            <Route path="/donations" element={<Donations allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors} allDonation={allDonations} allDonors={donors}/>} />
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
