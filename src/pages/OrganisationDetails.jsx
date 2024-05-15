import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menus from '../components/reusables/Menus';
import Footer from '../components/reusables/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { FcAdvertising } from "react-icons/fc";
import { FaDonate} from 'react-icons/fa';
import { prettyNumber } from '@based/pretty-number'
import { useAuth } from '../context/usersContext';
import Swal from 'sweetalert2';
import OrgActive from '../components/campaigns/OrgActive';
import OrgInactive from '../components/campaigns/OrgInactive';


function OrganisationDetails() {
  const { orgName} = useParams();
  const [organisationDetails, setOrganisationDetails] = useState(null);
  const [loading,setLoading]= useState(false)
  const [more, setMore]= useState(false)
  const users = localStorage.getItem('user');
  const accessToken = localStorage.getItem('token');
  const org=  localStorage.getItem('org');
  const [subscribe, setSubscribe] = useState(false)
  const {userLogin, loginMessage, logout} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [username, setUserName]= useState("")
  const [password, setPassword]= useState("")
  const[errors,setErrors] = useState("")

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/v1.0/org_by_id/${orgName}`)
      .then(res => {
        setOrganisationDetails(res.data);
        setLoading(false)
        // console.log(res.data);
      })
      .catch(error => {
        setLoading(false)
        const errorMsg = error.response?.data?.error || 'An error occurred';
        console.error(errorMsg);
      });
  }, [orgName]);


  useEffect(() => {
    if (users && accessToken && organisationDetails && organisationDetails.id) {
      const fetchSubscription = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          };
          const response = await axios.get(`/api/v1.0/subscription/${organisationDetails.id}`, config);
          if (response.status === 200) { // Check response status
            setSubscribe(true);
          }
          // Note: If response status is not 200, then there are no subscriptions found.
        } catch (error) {
          const errorMsg = error.response?.data?.error || 'An error occurred';
          console.error(errorMsg);
          setSubscribe(false);
        }
      };

      fetchSubscription();
    }
  }, [organisationDetails, users, accessToken]);

  //Login user in order to subscribe
  const handleLogin = async (e) =>{
    e.preventDefault();
    await userLogin(username, password);
  }

  const handleSubscribe = async () => {
    try {
        if (org) {
            logout();
            setShowModal(true);
        }

        if (!users && !accessToken) {
            setShowModal(true);
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
            Swal.fire({
                title: 'Subscribing...',
                text: 'Please wait while we subscribe you to updates.',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 2000
            }).then(async() => {
              const response = await axios.post(`/api/v1.0/subscription/${organisationDetails.id}`, {}, config);
              if (response.status === 200) {
                Swal.fire({
                    title: "Subscription Successful",
                    text: `You have successfully subscribed to receive updates from ${organisationDetails.orgName}. Thank you for your subscription!`,
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                      setSubscribe(true);
                      window.location.reload();
                    }
                });
              }
              else{
                setErrors(response.data.error)
                Swal.fire(
                    'Error!',
                    response.data.error,
                    'error'
                )
              }
            });
        
    } catch (error) {
        const errorMsg = error.response?.data?.error || 'An error occurred';
        setErrors(errorMsg);
        // setSubscribe(false);
    }
};


        const handleUnsubscribe = async (e) => {
            e.preventDefault();
            const orgsnt = organisationDetails.orgName;
            Swal.fire({
                title: 'Unsubscribe?',
                text: `Are you sure you want to unsubscribe from ${orgsnt}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const config = {
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            }
                        };
                        // Await the axios.delete call
                        const response = await axios.delete(`/api/v1.0/subscription/${organisationDetails.id}`, config);
                        if (response.status === 200) {
                            // Show success message
                            await Swal.fire({
                                title: `Unsubscribed from ${organisationDetails.orgName} Updates`,
                                text: `You have successfully unsubscribed from updates from ${organisationDetails.orgName}. If you change your mind, you can always subscribe later. Thank you for your support.`,
                                icon: "success"
                            });
                            // Reload the page or perform any other necessary action
                            window.location.reload();
                        }
                        setSubscribe(false);
                    } catch (error) {
                        const errorMsg = error.response?.data?.error || 'An error occurred';
                        console.error(errorMsg);
                        setSubscribe(false);
                    }
                }
            });
        };

  if(!organisationDetails || loading){
    // return(<div className='flex justify-center'><span className="loading loading-dots loading-lg"></span></div>)
    return (
      <div aria-label="Loading..." role="status" className="flex justify-center items-center space-x-2  min-h-screen">
        <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
            <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
            <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
            <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
            </line>
            <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
            <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
            </line>
            <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
            <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
            <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
            </line>
        </svg>
        <span className="text-4xl font-medium text-gray-500">Loading...</span>
    </div>
            )
  }

  // Function to calculate total donations
    function getTotalDonations(campaigns) {
      let totalDonations = 0;

      campaigns.forEach(campaign => {
        campaign.donations.forEach(donation => {
          // Add donation amount to total
          totalDonations += donation.amount;
        });
      });

      return totalDonations;
    }

  return (
    <div>
      <Menus />
      <div className="text-md breadcrumbs ml-4" >
          <ul>
              <li><a href='/'>Home</a></li>
              <li><a href= '/organisations'>Organisations</a></li>
              <li><a>{organisationDetails && organisationDetails.orgName}</a></li>
          </ul>
        </div>
      <div className="container mx-auto min-h-screen">      
        <div className="flex flex-col lg:flex-row gap-3">
            <div className="h-full lg:w-1/4" id='campaign'>
              {/* -------------------------------------Profile card------------------------------------ */}
                <div className="relative rounded-lg">
                  <div
                      className="max-w-2xl mx-4  sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-0 bg-white shadow rounded-lg text-gray-900">
                      <div className="rounded-t-lg h-24 overflow-hidden">
                          <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
                      </div>
                      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                          <img className="object-cover object-center h-32" src={organisationDetails && organisationDetails.profileImage ?`${organisationDetails.profileImage}`: "https://images.unsplash.com/photo-1606327054536-e37e655d4f4a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt='Woman looking front'/>
                      </div>
                      <div className="text-center mt-2">
                          <h2 className="font-semibold">{organisationDetails && organisationDetails.orgName}</h2>
                          <p className="text-gray-500">{organisationDetails && organisationDetails.orgType}</p>
                          <div className="flex text-gray-700 items-center justify-center">
                              <svg className="h-5 w-5 text-gray-400 mr-1" fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                  <path className=""
                                      d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                              </svg>
                              {organisationDetails && organisationDetails.orgAddress}
                          </div>
                      </div>
                      <ul className="py-4 mt-0 text-gray-700 flex items-center justify-around">
                          <li className="flex flex-col items-center justify-around">
                              <FcAdvertising className='w-5 h-5'/>
                              <div>{organisationDetails && organisationDetails.campaigns.length}</div>
                          </li>
                          <li className="flex flex-col items-center justify-between">
                              <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path
                                      d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                              </svg>
                              <div>{organisationDetails && organisationDetails.subscriptions.length}</div>
                          </li>
                          <li className="flex flex-col items-center justify-around ">
                              <FaDonate className='w-4 h-4 text-blue-900'/>
                              <div>{organisationDetails && prettyNumber(getTotalDonations(organisationDetails.campaigns), 'number-short')}</div>
                          </li>
                      </ul>
                      <div className='px-2'>
                          {more ?<p>{organisationDetails && organisationDetails.orgDescription}</p> : <p>{organisationDetails && organisationDetails.orgDescription && organisationDetails.orgDescription.slice(0,100)}...</p>}
                          <button className='text-blue-600 hover:underline mt-2' onClick={()=>setMore(!more)}>{more ? "Show less" : "Show more"}</button>
                      </div>
                      <div className="p-4 border-t mt-0">
                      {subscribe ? (
                          <button className='flex-1 rounded block mx-auto bg-blue-600 text-white font-bold hover:bg-blue-800 px-4 py-2' onClick={handleUnsubscribe}>Subscribed</button>
                        ) : (
                            <button className='flex-1 rounded block mx-auto bg-blue-600 text-white font-bold hover:bg-blue-800 px-4 py-2' onClick={handleSubscribe}>Subscribe</button>
                            
                        )}
                      </div>
                  </div>
                </div>
              </div>
              <div className="h-full lg:w-3/4">
                <OrgActive organisationDetails= {organisationDetails && organisationDetails.campaigns}/>
                <OrgInactive organisationDetails= {organisationDetails && organisationDetails.campaigns}/>
                {/* -------------------------------------Cards for campaign--------------------------------------- */}
                  {/* <div className="mx-2 sm:mx-1 lg:mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-2 md:gap-4 sm:max-w-full">
                    {organisationDetails && organisationDetails.campaigns.map((campaign)=>{
                      return(
                        <Link to = {`/campaign/${campaign.id}`} key={campaign.id}>
                          <img src={campaign.banner} alt={campaign.campaignName}
                          className='rounded-lg h-80 w-80'
                          loading='lazy' />
                          <div className='mt-2 mb-2'>
                          <h2 className="text-xl font-semibold mb-2">{campaign.campaignName.toUpperCase()}</h2>
                          </div>
                        </Link>
                      )
                  })}                
              </div> */}
            </div>

      <dialog open={showModal} onClose={() => setShowModal(false)} className="modal flex-row justify-center items-center text-center">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Please Log in</h3>
            {/* <div className="modal-action"> */}
            {loginMessage&& <p className='text-red-500'>{loginMessage}</p>}
            <form className='flex justify-center items-center' onSubmit={handleLogin}>
                <div className='flex-col justify-center items-center pl-4 pr-8'>
                    <div className='my-4'>
                        <label className="font-semibold my-3" htmlFor="password">Username or E-Mail</label>
                        <input
                            className="input input-bordered w-full"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                            required
                        />
                    </div>
                    <div>
                        <label className="font-semibold mb-4" htmlFor="password"><span className='text-red-500'>*</span>Enter Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="input input-bordered w-full"
                            id="password"
                            type="password"
                            placeholder='password'
                            name="password"
                            required
                            autoComplete=''
                        />
                    </div>
                    <div>
                        <button type='submit' className="btn my-4">Log in</button>
                    </div>
                    <p className='my-4'>Don't have an account? <Link to='/user/signup'><span className='text-blue-600 hover:underline'>Register</span></Link></p>
                </div>
            </form>
            <button onClick={() => { setShowModal(false)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

            {/* </div> */}
        </div>
      </dialog>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrganisationDetails;
