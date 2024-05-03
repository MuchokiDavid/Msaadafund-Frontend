import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Featured from '../campaigns/Featured'
import { prettyNumber } from '@based/pretty-number'

function Banner() {
  const navigate = useNavigate()
  const[allDonations,setAllDonations]= useState([])
  const [allOrganisations, setAllOrganisations] = useState([])
  const [allCampaign,setAllCampaign] = useState([])
  const[loading, setLoading] = useState(true)
  const[errors, setErrors] = useState()
  const [buttonClicked, setButtonClicked] = useState(false);//state listen to button event change 

  useEffect(() => {
    const getDonations = async () => {
      try {
          const response = await fetch('/api/v1.0/all_donations', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const data = await response.json();
          if (response.ok) {
              setLoading(true);
              // console.log("Successful request to get donors");
              setAllDonations(data.message);
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
  }, [])

  useEffect(() => {
    const getOrganisation = async () => {
      try {
          const response = await fetch('/api/v1.0/organisations', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const data = await response.json();
          if (response.ok) {
              setLoading(true);
              // console.log("Successful request to get donors");
              setAllOrganisations(data);
              setLoading(false);
          } else {
              throw new Error(data);
          }
      }
      catch {
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
        <div className="relative h-screen w-full">
          <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/1900/850" alt="Background Image" className="object-cover object-center w-full h-full" loading='lazy' />
          {/* <img src="" alt="Background Image" className="absolute inset-0 w-full h-full object-cover filter blur-sm"> */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center align-middle px-4">
              <h1 className="text-2xl lg:text-5xl text-white font-bold text-center">Welcome to Our Community of Changemakers!</h1>
              <p className="text-lg lg:text-xl text-white mt-4 text-center">Join us in our mission to create a better world for all. Together, we can make a positive impact on the lives of those in need.<br/> Explore our platform and discover how you can contribute to meaningful causes today.</p>
              <a href='/campaign'><button className="sm:my-6 rounded-lg md:mt-8 text-white uppercase py-4 text-base font-light px-10 border border-blue-600 hover:bg-blue-600 hover:bg-opacity-9">Get started</button></a>
          </div>
      </div>
      <div className="bg-sky-950 py-20 px-4">
        <div className="max-w-screen-lg mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="max-w-xl mb-8 lg:mb-0 lg:mr-8">
            <h2 className="font-black text-white text-3xl mb-4">Be Part of Something Bigger!</h2>
            <p className="text-base text-white">
              Join a community dedicated to driving social change and improving lives. Whether
              you're passionate about education, healthcare, environmental conservation, or
              humanitarian aid, there's a place for you here. Start your impact journey today.
            </p>
          </div>
          <button
          onClick={() => setButtonClicked(true)} 
          className="text-white rounded-lg uppercase py-3 text-base px-10 border border-blue-600 hover:bg-blue-600 hover:bg-opacity-4">
            How it works
          </button>
        </div>
      </div>
      <Featured/>

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4 sm:text-center">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <img
                alt=""
                src='https://loremflickr.com/g/600/400/kenya'
                // src="https://img.freepik.com/free-vector/computer-online-charity-donation_24877-54452.jpg?w=740&t=st=1712950950~exp=1712951550~hmac=ba081d24a1f69dd7a1f062eb668522865498adce912871ae865e4200f98620d9"
                className="absolute inset-0 h-full w-full object-cover"
                loading='lazy'
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">Join Us and Make a Difference</h2>

              <p className="mt-4 text-gray-600">
              Welcome to Msaada – your gateway to making a difference! Discover a seamless platform where you can effortlessly support diverse campaigns by various organizations. 
              Whether it's lending a helping hand, spreading awareness, or contributing resources, Msaada empowers you to be a catalyst for positive change. 
              Join us in creating a better tomorrow, one campaign at a time.
              </p>
              {/* <div class="flex justify-center"> */}
                <a
                href="/campaign"
                className="mt-8 inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
              >
                Get Started Today
              </a>
              
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sky-950 text-white" id="howItWorksSection">
        <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-16 lg:py-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>

            <p className="mt-4 text-gray-300">
            Welcome to Msaada, your go-to platform for making a difference in the world! Our platform connects passionate individuals with impactful organizations to drive positive change in communities across the globe. 
            Here’s how it works:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-blue-600 p-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  height="1em"
                  width="1em"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-8.5L16 8l-3.5 9.002L11 13l-4-1.5z" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Discover Campaigns.</h2>

                <p className="mt-1 text-sm text-gray-300">
                Browse through a wide range of campaigns created by various organizations. 
                From humanitarian aid to environmental conservation, there’s a cause for everyone to support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-blue-600 p-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  className="h-5 w-5"
                >
                  <path d="M4 21h9.62a3.995 3.995 0 003.037-1.397l5.102-5.952a1 1 0 00-.442-1.6l-1.968-.656a3.043 3.043 0 00-2.823.503l-3.185 2.547-.617-1.235A3.98 3.98 0 009.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 00.442-.11l.003-.001.004-.002h.003l.002-.001h.004l.001-.001c.009.003.003-.001.003-.001.01 0 .002-.001.002-.001h.001l.002-.001.003-.001.002-.001.002-.001.003-.001.002-.001c.003 0 .001-.001.002-.001l.003-.002.002-.001.002-.001.003-.001.002-.001h.001l.002-.001h.001l.002-.001.002-.001c.009-.001.003-.001.003-.001l.002-.001a.915.915 0 00.11-.078l4.146-3.317c.262-.208.623-.273.94-.167l.557.186-4.133 4.823a2.029 2.029 0 01-1.52.688H4v-6zM16 2h-.017c-.163.002-1.006.039-1.983.705-.951-.648-1.774-.7-1.968-.704L12.002 2h-.004c-.801 0-1.555.313-2.119.878C9.313 3.445 9 4.198 9 5s.313 1.555.861 2.104l3.414 3.586a1.006 1.006 0 001.45-.001l3.396-3.568C18.688 6.555 19 5.802 19 5s-.313-1.555-.878-2.121A2.978 2.978 0 0016.002 2H16zm1 3c0 .267-.104.518-.311.725L14 8.55l-2.707-2.843C11.104 5.518 11 5.267 11 5s.104-.518.294-.708A.977.977 0 0111.979 4c.025.001.502.032 1.067.485.081.065.163.139.247.222l.707.707.707-.707c.084-.083.166-.157.247-.222.529-.425.976-.478 1.052-.484a.987.987 0 01.701.292c.189.189.293.44.293.707z" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Contribute</h2>

                <p className="mt-1 text-sm text-gray-300">
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
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1a6.887 6.887 0 000 9.8c2.73 2.7 7.15 2.7 9.88 0 1.36-1.35 2.04-2.92 2.04-4.9h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58a8.987 8.987 0 0112.65 0L21 3v7.12M12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Stay Updated.</h2>

                <p className="mt-1 text-sm text-gray-300">
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
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M11 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11m6-1V5l7 7-7 7v-3l4-4-4-4z" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Share and Inspire.</h2>

                <p className="mt-1 text-sm text-gray-300">
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
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M10 13H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1zm-1 6H5v-4h4zM20 3h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zm-1 6h-4V5h4zm1 7h-2v-2a1 1 0 00-2 0v2h-2a1 1 0 000 2h2v2a1 1 0 002 0v-2h2a1 1 0 000-2zM10 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM9 9H5V5h4z" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Create Your Own Campaign.</h2>

                <p className="mt-1 text-sm text-gray-300">
                Are you passionate about a particular cause? Create your own campaign and rally support from the community. 
                Whether it’s raising funds for a local charity or organizing a volunteer event, Msaada provides you with the tools to make your vision a reality.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-blue-600 p-4">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M7 12l5 5-1.5 1.5a3.536 3.536 0 11-5-5L7 12zM17 12l-5-5 1.5-1.5a3.536 3.536 0 115 5L17 12zM3 21l2.5-2.5M18.5 5.5L21 3M10 11l-2 2M13 14l-2 2" />
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Connect with Organizations.</h2>

                <p className="mt-1 text-sm text-gray-300">
                Organizations play a crucial role in driving change. 
                Connect with reputable organizations, learn about their initiatives, and explore partnership opportunities to collaborate on impactful projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* 
      <section className="bg-sky-950 text-white">
        <div className="mx-auto px-4 py-16 lg:flex h-fit lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl"
            >
              Empower change
            </h1>

            <p className="mx-2 mt-4 sm:text-md/relaxed">
            Discover the power of collective action. 
            At Msaada, we believe in the strength of community and the impact we can create together. 
            Join us in our mission to empower change, support worthy causes, and make a positive difference in the world. 
            Together, we can achieve remarkable things.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/campaign"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section> */}

      <section>
        <div className="mx-auto max-w-screen-xl px-6 py-4 sm:px-6 sm:py-2 sm:mb-4 lg:px-8">
          
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
              <img
                alt=""
                src="https://loremflickr.com/g/600/400/nairobi"
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
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Trusted by many</h2>

            <p className="mt-4 text-gray-500 sm:text-xl">
            Become part of our community and make a positive impact. 
            Sign up now to start receiving donations and support for your cause.
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col rounded-lg border border-gray-200 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-400">Total Contributions</dt>

                <dd className="text-4xl font-extrabold text-sky-800 md:text-5xl">{prettyNumber(totalAmount, 'number-short')}</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-200 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total Organisations</dt>

                <dd className="text-4xl font-extrabold text-sky-800 md:text-5xl">{prettyNumber(allOrganisations.length, 'number-short')}</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-200 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total Campaigns</dt>

                <dd className="text-4xl font-extrabold text-sky-800 md:text-5xl">{prettyNumber(allCampaign.length,'number-short')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 sm:py-14 lg:py-18">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="xl:flex xl:items-center xl:justify-between">
                  <h2 className="text-xl font-bold text-center text-gray-400 xl:text-left font-pj">Our partner brands</h2>

                  <div className="grid items-center grid-cols-1 mt-10 gap-y-6 xl:mt-0 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-8">
                      <img className="object-contain w-auto mx-auto h-9" src="https://cdn.rareblocks.xyz/collection/clarity/images/brands/1/logo-vertex.svg" alt="" />
                      <img className="object-contain w-auto mx-auto h-9" src="https://cdn.rareblocks.xyz/collection/clarity/images/brands/1/logo-squarestone.svg" alt="" />
                      <img className="object-contain w-auto mx-auto h-9" src="https://cdn.rareblocks.xyz/collection/clarity/images/brands/1/logo-martino.svg" alt="" />
                      <img className="object-contain w-auto mx-auto h-9" src="https://cdn.rareblocks.xyz/collection/clarity/images/brands/1/logo-waverio.svg" alt="" />
                  </div>
              </div>
          </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            What people say about us
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  alt=""
                  src="https://w7.pngwing.com/pngs/524/676/png-transparent-computer-icons-user-my-account-icon-cdr-eps-rim-thumbnail.png"
                  className="size-14 rounded-full object-cover"
                />

                <div>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>

                  <p className="mt-0.5 text-lg font-medium text-gray-900">Jane</p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
              Using Msaada Donation App has made giving back to my community so much easier. 
              I love how simple it is to find causes I care about and make a difference with just a few taps on my phone. 
              Thank you for creating such a user-friendly platform!
              </p>
            </blockquote>

            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  alt=""
                  src="https://w7.pngwing.com/pngs/524/676/png-transparent-computer-icons-user-my-account-icon-cdr-eps-rim-thumbnail.png"
                  className="size-14 rounded-full object-cover"
                />

                <div>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>

                  <p className="mt-0.5 text-lg font-medium text-gray-900">David</p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
              Msaada Donation App has become an integral part of my charitable giving. 
              The ability to track my donations, receive updates on impact, and discover new causes to support has made my philanthropic efforts more meaningful and impactful. 
              I highly recommend it to anyone looking to make a difference.
              </p>
            </blockquote>

            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  alt=""
                  src="https://w7.pngwing.com/pngs/524/676/png-transparent-computer-icons-user-my-account-icon-cdr-eps-rim-thumbnail.png"
                  className="size-14 rounded-full object-cover"
                />

                <div>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>

                  <p className="mt-0.5 text-lg font-medium text-gray-900">Kelvin</p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
              I've tried several donation apps in the past, but none compare to Msaada. 
              The interface is intuitive, the selection of charities is vast, and the transparency in how my donations are utilized is commendable. 
              It's reassuring to know that my contributions are truly making a difference.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      
    </div>
  )
}

export default Banner