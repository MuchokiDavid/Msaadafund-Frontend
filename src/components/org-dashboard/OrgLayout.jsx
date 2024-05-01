import React, { useEffect, useState } from 'react';
import Menubar from './dash-components/Menubar';
import Profile from './pages/OrgProfile';
import Transaction from './pages/Transactions';
import { Routes, Route } from 'react-router-dom';
import OrgHome from './pages/OrgHome';
import DashboardNav from './dash-components/DashboardNav';
import CreateCampaign from './pages/CreateCampaign';
import DashFooter from './dash-components/DashFooter';
import Accounts from './pages/Accounts';
import Donations from './pages/Donations';
import UpdateCampaign from './pages/UpdateCampaign';
import Withdraw from './pages/Withdraw';
import BuyAirtime from './pages/BuyAirtime';
import AccountAuth from './AccountAuth';
import TransStatus from './pages/TransStatus';
import Withdrawals from './pages/Withdrawals';
import { useMediaQuery } from 'react-responsive';
import DashActiveCampaigns from './pages/DashActiveCampaigns';
import DashInactiveCampaigns from './pages/DashInactiveCampaigns';
import HelpCenter from './pages/HelpCenter';

function OrgLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  // const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const[loading,setLoading]=useState(true)
  const[campaigns,setCampaigns]=useState([])
  const[allDonations,setAllDonations]=useState()
  const[errors,setErrors]=useState()
  const token=localStorage.getItem('token');
  const orgName=localStorage.getItem('org')
  const[donors,setDonors]=useState([])

    // Use react-responsive to get screen size
    const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to update isSmallScreen state based on window width
const handleWindowSizeChange = () => {
  setIsSmallScreen(window.innerWidth <= 768); // Adjust the width threshold as needed
};

// Listen to window resize events
useEffect(() => {
  window.addEventListener('resize', handleWindowSizeChange);
  // Call it initially
  handleWindowSizeChange();
  return () => {
    window.removeEventListener('resize', handleWindowSizeChange);
  };
}, []);

const handleWallet = async (id) => {
  try {
      const response = await fetch(`/api/v1.0/campaign_wallet/${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      });
      const data = await response.json();
      if (response.ok) {
          // setLoading(false)
          return data.wallet_details;          
      }
      
  } catch (error) {
      // setLoading(true)
      console.log('Error in fetching wallet details', error);
  }
};
// console.log(wallet)

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

  //Fuction to close the sidebar when menuitem clicked
  const handleMenuItemClick = () => {
    if (isSidebarOpen && (isSmallScreen || isMediumScreen)) {
      toggleSidebar();
    }
  };

//Check if user is logged in
  if  (!token && !orgName){
    window.location.replace("/org/login")
  }

  return (
    <div className='overflow-hidden'>
      <DashboardNav toggleSidebar={toggleSidebar} />
      <div className="flex relative">
        {/* <Menubar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/> */}
        {isSidebarOpen && <Menubar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleMenuItemClick={handleMenuItemClick}/>}
        <main className={`mt-3 mx-auto w-full sm:w-screen overflow-hidden overflow-y-auto md:m-3 min-h-screen lg:h-full justify-center px-2 lg:px-6 ${isSmallScreen && isSidebarOpen ? 'blur' : ''}`} style={{ marginTop: '10px' }} id='dashboard'>
          <Routes>
            <Route path="/" element={<OrgHome allCampaigns={campaigns} allDonations={allDonations} allDonors={donors} handleMenuItemClick= {handleMenuItemClick}/>} />
            {/* route to update campaign */}
            <Route path="/campaigns/:campaignId" element={<UpdateCampaign/>} />
            <Route path="/createcampaign" element={<CreateCampaign handleFetching={handleFetch}/>} />
            <Route path="/mycampaigns/active" element={<DashActiveCampaigns allCampaigns={campaigns} campaignError={errors}/>} />
            <Route path="/mycampaigns/inactive" element={<DashInactiveCampaigns allCampaigns={campaigns} campaignError={errors}/>} />
            <Route path="/donations" element={<Donations loadingState={loading} allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors} allDonation={allDonations} allDonors={donors}/>} />
            <Route path="/transact/withdraw" element={<Withdraw allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors} handleWallet={handleWallet}/>} />
            <Route path="/transact/buyairtime" element={<BuyAirtime allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors} handleWallet={handleWallet}/>} />
            <Route path="/transact/accounts" element={<AccountAuth/>} />
            <Route path="/transact/accountset" element={<Accounts/>} />
            <Route path="/transact/transactionstatus" element={<TransStatus />} />
            <Route path="/transact/withdrawals" element={<Withdrawals/>} />
            <Route path="/transaction" element={<Transaction allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/helpcenter" element={<HelpCenter />} />
          </Routes>
        </main>
      </div>
      <DashFooter/>
    </div>
  );
}

export default OrgLayout;
