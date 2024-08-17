import React, { useEffect, useState } from 'react';
import Menubar from './dash-components/Menubar';
import Profile from './pages/OrgProfile';
import Transaction from './pages/Transactions';
import { Routes, Route } from 'react-router-dom';
import OrgHome from './pages/OrgHome';
import DashboardNav from './dash-components/DashboardNav';
import CreateCampaign from './pages/CreateCampaign';
// import DashFooter from './dash-components/DashFooter';
import Accounts from './pages/Accounts';
import Donations from './pages/Donations';
import UpdateCampaign from './pages/UpdateCampaign';
import Withdraw from './pages/Withdraw';
import BuyAirtime from './pages/BuyAirtime';
// import AccountAuth from './AccountAuth';
import TransStatus from './pages/TransStatus';
import Withdrawals from './pages/Withdrawals';
import { useMediaQuery } from 'react-responsive';
import DashActiveCampaigns from './pages/DashActiveCampaigns';
import DashInactiveCampaigns from './pages/DashInactiveCampaigns';
import HelpCenter from './pages/HelpCenter';
import Paybill from './pages/Paybill';
import Till from './pages/Till';
import DashFooter from './dash-components/DashFooter';
import Signatory from './pages/Signatory';
// import Navigation from './dash-components/Navigation';
import Approvals from './pages/Approvals';
import { apiUrl,appKey} from '../../context/Utils';

function OrgLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  // const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [allBanks, setAllBanks] = useState([])
  const[loading,setLoading]=useState(false)
  const[campaigns,setCampaigns]=useState([])
  const[allDonations,setAllDonations]=useState([])
  const[errors,setErrors]=useState()
  const[donationErrors,setDonationErrors]=useState()
  const token=localStorage.getItem('token');
  const orgName=localStorage.getItem('org')
  const [subscriptions, setSubscriptions]= useState([])
  const[donors,setDonors]=useState([])
  const user = localStorage.getItem('user')
  // eslint-disable-next-line 
  const regexPattern = /^(?:https?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\\w\-\\s])([\w\-]{11})(?=[^\\w\-]|$)(?![?=&+%\\w]*(?:['"][^<>]*>|<\/a>))[?=&+%\\w]*/i; 
 

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

// Useeffect to GET subscriptions
useEffect(() => {
  const getSubscriptions = async () => {
      try {
          setLoading(true)
          const response = await fetch(`${apiUrl}/api/v1.0/org_subscription`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
          });
          const data = await response.json();
          if (response.ok) {
            setSubscriptions(data.message);
            setLoading(false)              
          } else {
              setLoading(false)
              throw new Error(data);
          }
      }
      catch {
        setLoading(false)
        // console.error("Error getting subscriptions");
      }
  }

  getSubscriptions();
}, [token])

// console.log(subscriptions)

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
      const response = await fetch(`${apiUrl}/api/v1.0/campaign_wallet/${id}`, {
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
      // console.log('Error in fetching wallet details', error);
  }
};
// console.log(wallet)

//Get all banks
useEffect(() => {
  fetchBanks()
  // eslint-disable-next-line 
}, [token])


  const fetchBanks = async () => {
      try {
          const response = await fetch(`${apiUrl}/api/v1.0/all_banks`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
          });
          const data = await response.json();
          if (response.ok) {
              setLoading(false)
              setAllBanks(data);
          } else {
              setLoading(true)
              throw new Error(data);
          }
      } catch (error) {
          setLoading(true)
          setErrors('Error in fetching accounts', error);
      }
  }


//Get all donations to a logged in organisation to send to dashboard components
  useEffect(() => {
      const getDonations = async () => {
          try {
              const response = await fetch(`${apiUrl}/api/v1.0/org_donations`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  },
              });
              const data = await response.json();
              if (response.ok) {
                // console.log(data)
                if(data.message){
                  setDonationErrors('')
                  setLoading(false);
                  // console.log("Successful request to get donors");
                  setAllDonations(data.message);
                  setLoading(false);
                }
                else if(data.error){
                  setDonationErrors(data.error)
                  setLoading(false)
                }
                  
              } else {
                  throw new Error(data);
              }
          }
          catch {
            // console.error("Error getting donation data");
          }
      }
      getDonations();
  }, [token]);

//Get donors to this organisation
  useEffect(() => {
    const getDonors = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1.0/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-API-KEY': appKey,
                  },
            });
            const data = await response.json();
            if (response.ok) {
                setLoading(false);
                // console.log("Successful request to get campaigns");
                setDonors(data);
            } else {
                setLoading(true);
                throw new Error(data);
            }
        }
        catch {
            // console.error("Error getting donors data");
        }
    }
    getDonors();

  }, [allDonations, token]);

  // console.log(donors)

  useEffect(() => {
      handleFetch();
      // eslint-disable-next-line 
  }, [token]);
  
  const handleFetch = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/v1.0/org_all_campaigns`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (response.ok) {
          // console.log(data)
          if(data.campaigns){
            setLoading(false)
            // console.log("Successful request to get campaigns");
            setCampaigns(data.campaigns);
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
        // console.error('Error in fetching campaigns, ensure you have created campaign', error);
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
  if (user){   
    window.location.replace("/unauthorized")
    return null
  }

  // Get a valid youtube link
  function getValidYoutubeVideoId(youtubeUrl) {
    if (!youtubeUrl || youtubeUrl.trim() === "") {
        return "";
    }
    youtubeUrl = youtubeUrl.trim();
    let validYoutubeVideoId = "";        
    const regexMatcher = youtubeUrl.match(regexPattern);
    if (regexMatcher) {
        validYoutubeVideoId = regexMatcher[1];
    }
    return validYoutubeVideoId;
}

  return (
    <div className="flex relative h-screen overflow-hidden">
      {isSidebarOpen && <Menubar handleMenuItemClick={handleMenuItemClick} toggleSidebar={toggleSidebar} />}
      <div className='w-full sm:w-screen bg-slate-50'>
        <DashboardNav toggleSidebar={toggleSidebar} allCampaigns={campaigns} handleMenuItemClick= {handleMenuItemClick}/>
        <main className="flex-1 my-3 text-gray-800 mx-auto overflow-y-auto md:m-3 h-screen justify-center px-2 lg:px-6" style={{ marginTop: '10px' }} id='dashboard' onClick={handleMenuItemClick}>
          <Routes>
            <Route path="/" element={<OrgHome allCampaigns={campaigns} allDonations={allDonations} allDonors={donors} handleMenuItemClick={handleMenuItemClick} subscriptions={subscriptions}/>} />
            <Route path="/campaigns/:campaignId" element={<UpdateCampaign getValidYoutubeVideoId={getValidYoutubeVideoId} />} />
            <Route path="/createcampaign" element={<CreateCampaign handleFetching={handleFetch} getValidYoutubeVideoId={getValidYoutubeVideoId} />} />
            <Route path="/mycampaigns/active" element={<DashActiveCampaigns allCampaigns={campaigns} campaignError={errors} />} />
            <Route path="/mycampaigns/inactive" element={<DashInactiveCampaigns allCampaigns={campaigns} campaignError={errors} />} />
            <Route path="/donations" element={<Donations loadingState={loading} allCampaigns={campaigns} handleFetching={handleFetch} campaignError={donationErrors} allDonors={donors} />} />
            <Route path="/transact/withdraw" element={<Withdraw allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors} handleWallet={handleWallet} />} />
            <Route path="/transact/paybill" element={<Paybill allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors} handleWallet={handleWallet} banks= {allBanks}/>} />
            <Route path="/transact/till" element={<Till allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors} handleWallet={handleWallet} />} />
            <Route path="/transact/buyairtime" element={<BuyAirtime allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors} handleWallet={handleWallet} />} />
            <Route path="/transact/signatories" element={<Signatory allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors} handleWallet={handleWallet} />} />
            <Route path="/transact/approvals" element={<Approvals allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors} handleWallet={handleWallet} />} />
            {/* <Route path="/transact/accounts" element={<AccountAuth/>} />
            <Route path="/transact/accountset" element={<Accounts/>} /> */}
            <Route path="/transact/accounts" element={<Accounts banks= {allBanks} fetchBank= {fetchBanks}/>} />
            <Route path="/transact/transactionstatus" element={<TransStatus />} />
            <Route path="/transact/withdrawals" element={<Withdrawals />} />
            <Route path="/transaction" element={<Transaction allCampaigns={campaigns} handleFetching={handleFetch} campaignError={errors} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/helpcenter" element={<HelpCenter />} />
          </Routes>    
          <div className='my-4 flex justify-start'>
              <DashFooter/>
            </div>
            {/* <Navigation/> */}
        </main>  
        
      </div> 
           
    </div>
  );
}

export default OrgLayout;
