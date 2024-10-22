import React, { useEffect, useState } from 'react'
import Featured from '../campaigns/Featured'
// import { prettyNumber } from '@based/pretty-number'
import BannerSlider from './BannerSlider'
import BannerCards from './BannerCards'
import joinus from '../../assets/joinus.jpg'
import WhyUs from './WhyUs'
import { apiUrl,appKey } from '../../context/Utils'
import Partners from './Partners'
// import logo from '../../assets/applogo.png'

function Banner() {
  // eslint-disable-next-line
  const[allDonations,setAllDonations]= useState([])
 // eslint-disable-next-line 
  const [allOrganisations, setAllOrganisations] = useState([])
  // eslint-disable-next-line
  const [allCampaign,setAllCampaign] = useState([])
  // eslint-disable-next-line
  const[errors, setErrors] = useState()
  const [buttonClicked, setButtonClicked] = useState(false);//state listen to button event change 
  const [loading, setLoading] = useState(false);
  const [featuredCampaign, setFeaturedCampaign] = useState(null)

  useEffect(() => {
    const getDonations = async () => {
      setLoading(true)
      try {
          const response = await fetch(`${apiUrl}/api/v1.0/all_donations`, {
              method: 'GET',
              headers: {
                  'X-API-KEY': appKey,
                  'Content-Type': 'application/json',
              },
          });
          const data = await response.json();
          if (response.ok) {              
              // console.log("Successful request to get donors");
              setLoading(false)
              setAllDonations(data.message);
          } else {
              setLoading(false)
              setErrors("Error getting donation data");
              throw new Error(data);
          }
      }
      catch {
          setLoading(false)
          setErrors("Error getting donation data");
      }
  }
  getDonations();
  }, [])

  useEffect(() => {
    const getOrganisation = async () => {
      setLoading(true)
      try {
          const response = await fetch(`${apiUrl}/api/v1.0/organisations`, {
              method: 'GET',
              headers: {
                  'X-API-KEY': appKey,
                  'Content-Type': 'application/json',
              },
          });
          const data = await response.json();
          if (response.ok) {
              // console.log("Successful request to get donors");
              setLoading(false)
              setAllOrganisations(data);
          } else {
              setLoading(false)
              setErrors("Error getting donation data");
              throw new Error(data);
          }
      }
      catch {
          setLoading(false)
          setErrors("Error getting donation data");
      }      
  }
  getOrganisation();
  }, [])

  useEffect(() => {
    const getCampaigns = async () => {
      setLoading(true)
      try {
          const response = await fetch(`${apiUrl}/api/v1.0/get_all_campaigns`, {
              method: 'GET',
              headers: {
                  'X-API-KEY': appKey,
                  'Content-Type': 'application/json',
              },
          });
          const data = await response.json();
          if (response.ok) {
              // console.log("Successful request to get donors");
              setLoading(false)
              setAllCampaign(data);
          } else {
              setLoading(false)
              setErrors("Error getting donation data");
              throw new Error(data);
          }
      }
      catch {
          setLoading(false)
          setErrors("Error getting donation data");
      }
  }
  getCampaigns();
  }, [])

// Scroll to the section with id 'howItWorksSection' when button is clicked
  useEffect(() => {
    if (buttonClicked) {
      const targetSection = document.getElementById('howItWorksSection');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setButtonClicked(false)
  }, [buttonClicked]);

  useEffect(() => {
      handleFeatured()
  }, []);

  const handleFeatured = async () => {
    setLoading(true)
      try {
          const response = await fetch(`${apiUrl}/api/v1.0/featured`, {
              headers: {
                'X-API-KEY': appKey,
              },
              method: 'GET',
          });
          const data = await response.json();
          if (response.ok) {
              setLoading(false)
              setFeaturedCampaign(data)
          }
          
      } catch (error) {
          setLoading(false)
      }
  }
  
  // eslint-disable-next-line
  function getTotalAmount(donationsArray) {
    let totalAmount = 0;
    
    if (donationsArray.length === 0) {
      return 0;
    }
  else{
      for (let donation of donationsArray) {
          totalAmount += donation.amount;
      }
  }
    return totalAmount;
}

// let totalAmount=allDonations && getTotalAmount(allDonations)

if (loading) {
  return (
    <div class="flex items-center justify-center h-screen">
      {/* Logo image */}
      {/* <p><img src={logo} alt="Logo" className="w-[150px] h-[50px]" /></p><br/> */}
      <span className="loading loading-spinner loading-lg text-blue-500"></span>
    </div>
  )
}


  return (
    <div className='text-gray-900'>
      <BannerSlider/>
      <WhyUs/>

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 sm:py-2 lg:px-8 lg:py-2">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full bg-white">
              <img
                alt=""
                src={joinus}
                className="absolute inset-0 h-full w-full object-cover"
                loading='lazy'
              />
            </div>

            <div className="lg:py-20">
              <h2 className="text-3xl font-bold sm:text-4xl">Join Us and Make a Difference</h2>

              <p className="mt-4 text-gray-600">
              MsaadaFund is designed for effortless use on any device—whether you're on your phone, tablet, or laptop. 
              Enjoy a smooth and intuitive experience as you explore, support, and share campaigns. 
              Our platform makes it easy to contribute to causes you care about, anytime and anywhere. 
              </p>
                <a
                href="/campaigns"
                className="mt-8 rounded inline-block border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
              >
                Get Started
              </a>
              
            </div>
          </div>
        </div>
      </section>

      <div className='px-2'>
        <Featured errors= {errors} featuredCampaigns={featuredCampaign}/>
      </div>
      

      <section className="bg-white text-gray-800" id="howItWorksSection">
        <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-16 lg:py-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-gray-500">
              MsaadaFund is designed to make your impact easy and rewarding. Connect with causes you care about and contribute to their success. Here’s how it works:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-green-600 p-4">
                <svg viewBox="0 0 24 24" fill="#ffffff" className="h-5 w-5" height="1em" width="1em">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-8.5L16 8l-3.5 9.002L11 13l-4-1.5z" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-bold">Discover Fundraisers</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Explore a diverse array of fundraising campaigns from organizations. Find a cause that speaks to you and get involved.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-green-600 p-4">
                <svg viewBox="0 0 24 24" fill="#ffffff" className="h-5 w-5" height="1em" width="1em">
                  <path d="M4 21h9.62a3.995 3.995 0 003.037-1.397l5.102-5.952a1 1 0 00-.442-1.6l-1.968-.656a3.043 3.043 0 00-2.823.503l-3.185 2.547-.617-1.235A3.98 3.98 0 009.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 00.442-.11l.003-.001.004-.002h.003l.002-.001h.004l.001-.001c.009.003.003-.001.003-.001.01 0 .002-.001.002-.001h.001l.002-.001.003-.001.002-.001.002-.001.003-.001.002-.001c.003 0 .001-.001.002-.001l.003-.002.002-.001.002-.001.003-.001.002-.001h.001l.002-.001h.001l.002-.001.002-.001c.009-.001.003-.001.003-.001l.002-.001a.915.915 0 00.11-.078l4.146-3.317c.262-.208.623-.273.94-.167l.557.186-4.133 4.823a2.029 2.029 0 01-1.52.688H4v-6zM16 2h-.017c-.163.002-1.006.039-1.983.705-.951-.648-1.774-.7-1.968-.704L12.002 2h-.004c-.801 0-1.555.313-2.119.878C9.313 3.445 9 4.198 9 5s.313 1.555.861 2.104l3.414 3.586a1.006 1.006 0 001.45-.001l3.396-3.568C18.688 6.555 19 5.802 19 5s-.313-1.555-.878-2.121A2.978 2.978 0 0016.002 2H16zm1 3c0 .267-.104.518-.311.725L14 8.55l-2.707-2.843C11.104 5.518 11 5.267 11 5s.104-.518.294-.708A.977.977 0 0111.979 4c.025.001.502.032 1.067.485.081.065.163.139.247.222l.707.707.707-.707c.084-.083.166-.157.247-.222.529-.425.976-.478 1.052-.484a.987.987 0 01.701.292c.189.189.293.44.293.707z" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-bold">Contribute</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Make your contribution to the campaign that inspires you. Every contribution, big or small, helps us reach our goals and make a significant impact.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-green-600 p-4">
                <svg viewBox="0 0 24 24" fill="#ffffff" className="h-5 w-5" height="1em" width="1em">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M11 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11m6-1V5l7 7-7 7v-3l4-4-4-4z" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-bold">Share and Inspire</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Amplify the reach of the campaigns by sharing them with your network. Your advocacy can motivate others to join and support the causes you believe in.
                </p>
              </div>
            </div>


            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-green-600 p-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" stroke-width={2} className="h-5 w-5">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M7 12l5 5-1.5 1.5a3.536 3.536 0 11-5-5L7 12zM17 12l-5-5 1.5-1.5a3.536 3.536 0 115 5L17 12zM3 21l2.5-2.5M18.5 5.5L21 3M10 11l-2 2M13 14l-2 2" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-bold">Create Your Own Fundraiser</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Have a cause you’re passionate about? Start your own campaign with MsaadaFund. Use our tools to set up, promote, and manage your campaign and engage the community.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-green-600 p-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" stroke-width={2} className="h-5 w-5">
                  <path d="M10 13H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1zm-1 6H5v-4h4zM20 3h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zm-1 6h-4V5h4zm1 7h-2v-2a1 1 0 00-2 0v2h-2a1 1 0 000 2h2v2a1 1 0 002 0v-2h2a1 1 0 000-2zM10 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM9 9H5V5h4z" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-bold">Connect with Organizations</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Build relationships with organizations driving meaningful change. Explore their initiatives and collaborate to enhance the impact of your contributions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-green-600 p-4">
                <svg viewBox="0 0 24 24" fill="#ffffff" className="h-5 w-5" height="1em" width="1em">
                  <path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1a6.887 6.887 0 000 9.8c2.73 2.7 7.15 2.7 9.88 0 1.36-1.35 2.04-2.92 2.04-4.9h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58a8.987 8.987 0 0112.65 0L21 3v7.12M12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-bold">Stay Updated</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Follow the progress of the campaigns you support. Receive updates on key milestones, fund usage, and the positive changes your contribution is driving.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <BannerCards/>
      <Partners/>

      {/* <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Numbers</h2>

            <p className="mt-4 text-gray-500 sm:text-xl">
            Become part of our community and make a positive impact. 
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col rounded-lg border border-gray-200 px-4 py-8 text-center bg-white">
                <dt className="order-last text-lg font-medium text-gray-400">Total Contributions</dt>

                <dd className="text-4xl font-extrabold text-gray-700 md:text-5xl">{prettyNumber(totalAmount, 'number-short')}</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-200 px-4 py-8 text-center bg-white">
                <dt className="order-last text-lg font-medium text-gray-500">Total Organisations</dt>

                <dd className="text-4xl font-extrabold text-gray-700 md:text-5xl">{prettyNumber(allOrganisations.length, 'number-short')}</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-200 px-4 py-8 text-center bg-white">
                <dt className="order-last text-lg font-medium text-gray-500">Total Campaigns</dt>

                <dd className="text-4xl font-extrabold text-gray-700 md:text-5xl">{prettyNumber(allCampaign.length,'number-short')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default Banner