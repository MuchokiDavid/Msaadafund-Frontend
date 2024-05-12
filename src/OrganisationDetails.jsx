import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menus from './components/reusables/Menus';
import Footer from './components/reusables/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom'



function OrganisationDetails() {
  const { orgName, id } = useParams();
  const [organisationDetails, setOrganisationDetails] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1.0/org_by_id/${orgName}/${id}`)
      .then(res => {
        setOrganisationDetails(res.data);
        console.log(res.data);
      })
      .catch(error => {
        const errorMsg = error.response?.data?.error || 'An error occurred';
        console.error(errorMsg);
      });
  }, [orgName, id]);

  if (!organisationDetails) {
    return (
      <div>
        <Menus />
        <div>Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Menus />
      <div className="container mx-auto">
        <div>
        <div className="hero mt-2">
          <div className="hero-overlay bg-white">
          <div className="text-black">
            <div>
              <h1 className="mb-5 text-5xl text-center font-bold">{organisationDetails.orgName.toUpperCase()}</h1>
              <h2 className="text-3xl font-semibold mb-3">About us</h2>
          <p className="text-lg mb-5">{organisationDetails.orgDescription}</p>
            </div>
            </div>
          </div>
        </div>
        </div>
        <h1 className="text-3xl font-semibold mt-8 mb-4">Campaigns</h1>
        <div className="mx-2 sm:mx-1 lg:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-2 md:gap-4 sm:max-w-full">
          {organisationDetails.campaigns.map((campaign)=>{
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
