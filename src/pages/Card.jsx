import React, { useEffect, useState } from 'react'
import profilePic from '../assets/orgProfile.png'
import { MdNotificationsActive } from "react-icons/md";
import { MdNotificationsOff } from "react-icons/md";

function Card({orgDetails, raisedAmount, budget,loading, subscribe, handleSubscribe, handleUnsubscribe, shareModal}) {
    const percentage= (raisedAmount / budget)*100
    const [buttonClicked, setButtonClicked] = useState(false);//state listen to button event change 

    useEffect(() => {
        if (buttonClicked) {
          const targetSection = document.getElementById('donationTabs');
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
        setButtonClicked(false)
      }, [buttonClicked]);
  return (
    <>
        <div className='border bg-white campaignBannerCard'>
            <div className="font-sans leading-normal tracking-normal">
                <div className="flex justify-center">
                    <div className="rounded-lg profile-card w-full p-4">
                        <div className='flex flex-row md:flex-col justify-between'>
                            <div className='flex justify-center my-4'>
                                <div className="radial-progress bg-blue-500 text-white text-2xl font-bold border-4 border-blue-500 p-6" style={{"--value":percentage}} role="progressbar">{percentage.toFixed(2)}%</div>
                            </div>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="text-center px-4 rounded-lg border">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9l-5 5-5-5" />
                                    </svg>
                                    <p className="text-lg font-semibold mt-2">KES {raisedAmount && raisedAmount}</p>
                                    <p className="text-sm text-gray-600">Total Donation</p>
                                </div>
                                <div className="text-center px-4 rounded-lg border">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M12 6h.01M12 14h.01" />
                                    </svg>
                                    <p className="text-lg font-semibold mt-2">{budget && budget}</p>
                                    <p className="text-sm text-gray-600">Goal</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3 px-2 my-3">  
                            <div>
                                <button
                                onClick={()=> setButtonClicked(true)}
                                    className="flex-1 w-full rounded bg-blue-600 text-white font-bold hover:bg-blue-800 px-4 py-3">
                                    Contribute Now
                                </button>
                            </div>

                            <div>
                                <button
                                onClick={()=> shareModal(true)}
                                    className="flex-1 w-full rounded border-2 border-blue-600 font-semibold text-black px-4 py-3 hover:bg-blue-600 hover:text-white">
                                    Share
                                </button>
                            </div>   
                        </div>                  

                    </div>
                </div>
            </div>
        </div>
        <div className='mt-4 flex flex-col-1 lg:flex-row-1 gap-3 p-4 border bg-white rounded-lg'>            
            <div className="lg:w-1/5 ">
                <div className="mr-2">
                    <img src={orgDetails && orgDetails.profileImage? orgDetails.profileImage: profilePic } alt={orgDetails && orgDetails.orgName} className="h-16 w-16 rounded-full" />
                </div>
            </div>
            <div className="lg:w-4/5">
                <div className='flex sm:flex-row lg:flex-col gap-3 justify-between lg:h-32'>
                    <div>
                        <div>
                            <a href={`/organisations/${orgDetails && orgDetails.orgName}`}><h2 className="sm:text-base lg:text-xl font-semibold hover:underline">{orgDetails && orgDetails.orgName.toUpperCase()}</h2></a>
                        </div>
                        <div className="flex my-0.5 text-sm">
                            {orgDetails && orgDetails.orgAddress}
                        </div> 
                        {orgDetails && orgDetails.website_link && orgDetails && (
                        <div className="flex text-blue-500 text-sm">
                            <a href={orgDetails && orgDetails.website_link}>Official site</a>
                        </div>  
                        )}
                    </div>

                    <div className="flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                    {/* <div className="flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"> */}
                    {subscribe ? (
                        <button type="button" className="inline-flex justify-center rounded-md border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:text-gray-800 shadow-md hover:bg-gray-50" onClick={handleUnsubscribe}>
                         <MdNotificationsOff size={23}   className="text-lg mr-2" /> {loading ?  'Unsubscribing...' :"Unsubscribe"}
                        </button>
                    ) : (
                        <button type="button" className="inline-flex justify-center rounded-md border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:text-gray-800 hover:bg-gray-50" onClick={handleSubscribe}>
                       <MdNotificationsActive size={23}  className="text-lg mr-2" />{loading ?  'Subscribing...' :"Subscribe"}
                        </button>
                    )}
                 {/* </div> */}
                 </div>
                </div>
            </div> 
        </div>        
    </>
  )
}

export default Card