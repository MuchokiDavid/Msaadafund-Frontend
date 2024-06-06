import React, { useEffect, useState } from 'react'
import Featured from '../campaigns/Featured'
import { prettyNumber } from '@based/pretty-number'
import BannerSlider from './BannerSlider'
import BannerCards from './BannerCards'
import Hero from './Hero'

function Banner() {
  const[allDonations,setAllDonations]= useState([])
  const [allOrganisations, setAllOrganisations] = useState([])
  const [allCampaign,setAllCampaign] = useState([])
  const[loading, setLoading] = useState(false)
  const[errors, setErrors] = useState()
  const [buttonClicked, setButtonClicked] = useState(false);//state listen to button event change 

  useEffect(() => {
    const getDonations = async () => {
      setLoading(true)
      try {
          const response = await fetch('/api/v1.0/all_donations', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const data = await response.json();
          if (response.ok) {              
              // console.log("Successful request to get donors");
              setAllDonations(data.message);
              setLoading(false);
          } else {
              setLoading(false);
              throw new Error(data);
          }
      }
      catch {
          setLoading(false);
          setErrors("Error getting donation data");
      }
  }
  getDonations();
  }, [])

  useEffect(() => {
    const getOrganisation = async () => {
      try {
        setLoading(true)
          const response = await fetch('/api/v1.0/organisations', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const data = await response.json();
          if (response.ok) {
              // console.log("Successful request to get donors");
              setAllOrganisations(data);
              setLoading(false);
          } else {
              setLoading(false);
              throw new Error(data);
          }
      }
      catch {
          setLoading(false);
          setErrors("Error getting donation data");
      }
  }
  getOrganisation();
  }, [])

  useEffect(() => {
    const getCampaigns = async () => {
      try {
          const response = await fetch('/api/v1.0/get_all_campaigns', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const data = await response.json();
          if (response.ok) {
              setLoading(true);
              // console.log("Successful request to get donors");
              setAllCampaign(data);
              setLoading(false);
          } else {
              throw new Error(data);
          }
      }
      catch {
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

  if(loading){
    // return(<div className='flex justify-center'><span className="loading loading-dots loading-lg"></span></div>)
    return (
      <div aria-label="Loading..." role="status" className="flex justify-center items-center space-x-2  min-h-screen bg-transparent">
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
  
  function getTotalAmount(donationsArray) {
    let totalAmount = 0;
    for (let donation of donationsArray) {
        totalAmount += donation.amount;
    }
    return totalAmount;
}
let totalAmount=(allDonations && getTotalAmount(allDonations))

  return (
    <div>
      <BannerSlider/>
      <div className="bg-gray-50 text-gray-600 py-20 px-4">
        <div className="max-w-screen-lg mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="max-w-xl mb-8 lg:mb-0 lg:mr-8">
            <h2 className="font-black text-3xl mb-4">Be Part of Something Bigger!</h2>
            <p className="text-base">
              Join a community dedicated to driving social change and improving lives. Whether
              you're passionate about education, healthcare, environmental conservation, or
              humanitarian aid, there's a place for you here. Start your impact journey today.
            </p>
          </div>
          <button
          onClick={() => setButtonClicked(true)} 
          className="mt-8 inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-900 focus:outline-none focus:ring focus:ring-blue-400">
            How it works
          </button>
        </div>
      </div>
      <Featured errors= {errors}/>

      <Hero/>

      <section className="bg-gray-50 text-gray-600" id="howItWorksSection">
        <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-16 lg:py-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>

            <p className="mt-4 text-gray-500">
            Welcome to Msaada, your go-to platform for making a difference in the world! Our platform connects passionate individuals with impactful organizations to drive positive change in communities across the globe. 
            Here’s how it works:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-blue-600 p-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  className="h-5 w-5"
                  height="1em"
                  width="1em"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-8.5L16 8l-3.5 9.002L11 13l-4-1.5z" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Discover Fundraisers.</h2>

                <p className="mt-1 text-sm text-gray-500">
                Browse through a wide range of fundraisers created by various organizations. 
                From humanitarian aid to environmental conservation, there’s a cause for everyone to support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-blue-600 p-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  height="1em"
                  width="1em"
                  className="h-5 w-5"
                >
                  <path d="M4 21h9.62a3.995 3.995 0 003.037-1.397l5.102-5.952a1 1 0 00-.442-1.6l-1.968-.656a3.043 3.043 0 00-2.823.503l-3.185 2.547-.617-1.235A3.98 3.98 0 009.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 00.442-.11l.003-.001.004-.002h.003l.002-.001h.004l.001-.001c.009.003.003-.001.003-.001.01 0 .002-.001.002-.001h.001l.002-.001.003-.001.002-.001.002-.001.003-.001.002-.001c.003 0 .001-.001.002-.001l.003-.002.002-.001.002-.001.003-.001.002-.001h.001l.002-.001h.001l.002-.001.002-.001c.009-.001.003-.001.003-.001l.002-.001a.915.915 0 00.11-.078l4.146-3.317c.262-.208.623-.273.94-.167l.557.186-4.133 4.823a2.029 2.029 0 01-1.52.688H4v-6zM16 2h-.017c-.163.002-1.006.039-1.983.705-.951-.648-1.774-.7-1.968-.704L12.002 2h-.004c-.801 0-1.555.313-2.119.878C9.313 3.445 9 4.198 9 5s.313 1.555.861 2.104l3.414 3.586a1.006 1.006 0 001.45-.001l3.396-3.568C18.688 6.555 19 5.802 19 5s-.313-1.555-.878-2.121A2.978 2.978 0 0016.002 2H16zm1 3c0 .267-.104.518-.311.725L14 8.55l-2.707-2.843C11.104 5.518 11 5.267 11 5s.104-.518.294-.708A.977.977 0 0111.979 4c.025.001.502.032 1.067.485.081.065.163.139.247.222l.707.707.707-.707c.084-.083.166-.157.247-.222.529-.425.976-.478 1.052-.484a.987.987 0 01.701.292c.189.189.293.44.293.707z" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Contribute</h2>

                <p className="mt-1 text-sm text-gray-500">
                Once you find a campaign that resonates with you, contribute by making a donation. 
                Every contribution, no matter how big or small, makes a difference and helps bring the campaign closer to its goal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-blue-600 p-4">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="#ffffff"
                  height="1em"
                  width="1em"
                >
                  <path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1a6.887 6.887 0 000 9.8c2.73 2.7 7.15 2.7 9.88 0 1.36-1.35 2.04-2.92 2.04-4.9h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58a8.987 8.987 0 0112.65 0L21 3v7.12M12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Stay Updated.</h2>

                <p className="mt-1 text-sm text-gray-500">
                Keep track of the progress of the campaigns you’ve supported. 
                View updates on milestones reached, funds raised, and the impact your contribution is making in the lives of others.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-blue-600 p-4">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill= '#ffffff'
                  height="1em"
                  width="1em"
                >
                  <path d="M11 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11m6-1V5l7 7-7 7v-3l4-4-4-4z" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Share and Inspire.</h2>

                <p className="mt-1 text-sm text-gray-500">
                Spread the word about campaigns you care about with your friends, family, and social networks. 
                Your enthusiasm can inspire others to join the cause and amplify the impact of the campaign.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-blue-600 p-4">
                <svg
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="#ffffff"
                  height="1em"
                  width="1em"
                >
                  <path d="M10 13H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1zm-1 6H5v-4h4zM20 3h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zm-1 6h-4V5h4zm1 7h-2v-2a1 1 0 00-2 0v2h-2a1 1 0 000 2h2v2a1 1 0 002 0v-2h2a1 1 0 000-2zM10 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM9 9H5V5h4z" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Create Your Own Campaign.</h2>

                <p className="mt-1 text-sm text-gray-500">
                Are you passionate about a particular cause? Create your own campaign and rally support from the community. 
                Whether it’s raising funds for a local charity or organizing a volunteer event, Msaada provides you with the tools to make your vision a reality.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-blue-600 p-4">
                <svg
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width={2}
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M7 12l5 5-1.5 1.5a3.536 3.536 0 11-5-5L7 12zM17 12l-5-5 1.5-1.5a3.536 3.536 0 115 5L17 12zM3 21l2.5-2.5M18.5 5.5L21 3M10 11l-2 2M13 14l-2 2" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Connect with Organizations.</h2>

                <p className="mt-1 text-sm text-gray-500">
                Organizations play a crucial role in driving change. 
                Connect with reputable organizations, learn about their initiatives, and explore partnership opportunities to collaborate on impactful projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section>
        <div className="mx-auto max-w-screen-xl px-6 py-4 sm:px-6 sm:py-2 sm:mb-4 lg:px-8">
          
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
              <img
                alt=""
                src="https://source.unsplash.com/random/1920x1080/?kenya-livelihood"
                className="absolute inset-0 h-full w-full object-cover"
                loading='lazy'
              />
            </div>

            <div className="lg:py-16">
              <article className="space-y-4 text-gray-600 sm:text-center">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold sm:text-3xl">
                Empower Your Campaigns with Msaada.
                </h2>
              </div>
                <p>
                Unlock new possibilities for your campaigns with Msaada! Our platform offers a streamlined solution to amplify your reach and impact. 
                By joining Msaada, you gain access to a vibrant community of volunteers and supporters, allowing you to expand your network and achieve your goals more effectively. 
                Sign up today to elevate your campaigns and make a lasting difference with Msaada!
                </p>
                <p className="mb-8 mt-4 px-4 leading-relaxed">Oh, and the best bit...
                      <span className="text-sky-600 font-bold">It's free!</span></p>
                      <div>
                      <a className="inline-block py-4 px-8 leading-none text-white border border-blue-600 bg-blue-600 hover:bg-transparent hover:text-gray-900 rounded shadow text-sm font-bold"
                          href="/org/signup">Sign-up for free</a>
                  </div>
              </article>
            </div>
          </div>
        </div>
      </section> */}
      <BannerCards/>

      <section className="bg-white">
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

                <dd className="text-4xl font-extrabold text-sky-800 md:text-5xl">{prettyNumber(totalAmount, 'number-short')}</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-200 px-4 py-8 text-center bg-white">
                <dt className="order-last text-lg font-medium text-gray-500">Total Organisations</dt>

                <dd className="text-4xl font-extrabold text-sky-800 md:text-5xl">{prettyNumber(allOrganisations.length, 'number-short')}</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-200 px-4 py-8 text-center bg-white">
                <dt className="order-last text-lg font-medium text-gray-500">Total Campaigns</dt>

                <dd className="text-4xl font-extrabold text-sky-800 md:text-5xl">{prettyNumber(allCampaign.length,'number-short')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* <section className="py-8 sm:py-14 lg:py-18">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="xl:flex xl:items-center xl:justify-between">
                  <h2 className="text-xl font-bold text-center text-gray-400 xl:text-left font-pj">Featured brands</h2>

                  <div className="grid items-center grid-cols-1 mt-6 gap-y-6 xl:mt-0 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-8">
                      <img className="object-contain w-auto mx-auto h-20" src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" alt="m-pesa" />
                      <img className="object-contain w-auto mx-auto h-10" src={intasendLogo} alt="intasend" />
                      <img className="object-contain w-auto mx-auto h-14" src={safLogo} alt="safaricom" />
                      {/* <img className="object-contain w-auto mx-auto h-9" src="https://cdn.rareblocks.xyz/collection/clarity/images/brands/1/logo-waverio.svg" alt="" /> 
                  </div>
              </div>
          </div>
      </section>*/}
    </div>
  )
}

export default Banner