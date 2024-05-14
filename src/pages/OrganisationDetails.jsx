import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menus from '../components/reusables/Menus';
import Footer from '../components/reusables/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom'



function OrganisationDetails() {
  const { orgName} = useParams();
  const [organisationDetails, setOrganisationDetails] = useState(null);
  const [loading,setLoading]= useState(false)

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

  if(!organisationDetails){
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

  // if (!organisationDetails) {
  //   return (
  //     <div>
  //       <Menus />
  //       <div>Loading...</div>
  //       <Footer />
  //     </div>
  //   );
  // }

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
      <div className="container mx-auto">
        <div>
        <div className="hero mt-2">
          <div className="hero-overlay bg-white">
          <div className="text-black">
            <div>
              <h1 className="mb-5 text-5xl text-center font-bold">{organisationDetails && organisationDetails.orgName.toUpperCase()}</h1>
              <h2 className="text-3xl font-semibold mb-3">About us</h2>
          <p className="text-lg mb-5">{organisationDetails && organisationDetails.orgDescription}</p>
            </div>
            </div>
          </div>
        </div>
        </div>
        <h1 className="text-3xl font-semibold mt-8 mb-4">Campaigns</h1>
        <div className="mx-2 sm:mx-1 lg:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-2 md:gap-4 sm:max-w-full">
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
       
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrganisationDetails;
