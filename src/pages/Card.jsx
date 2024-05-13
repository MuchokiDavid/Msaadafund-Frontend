import React from 'react'

function Card({orgDetails, raisedAmount, budget, subscribe, handleSubscribe, handleUnsubscribe}) {
  return (
    <div className='bg-gray-50'>
        <div className="font-sans leading-normal tracking-normal">
            <div className="flex justify-center">
                <div className="rounded-lg profile-card w-full p-4">
                    <div className="flex justify-center mb-4">
                        <div className="border-b-2 border-gray-200 w-full">
                            <ul className="flex justify-around">
                                <li className="text-center">
                                    <p className="text-blue-500 font-semibold">Organiser</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-center mb-1">
                        <img src="https://unsplash.it/32/32" alt="Profile" className="rounded-full border-2 border-green-500 p-1"/>
                    </div>
                    <div className="text-center mb-0">
                        <h2 className="text-xl font-semibold">{orgDetails && orgDetails.orgName}</h2>
                    </div>

                    <div className="flex text-gray-700 items-center justify-center">
                        <svg className="h-5 w-5 text-gray-400 mr-1" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path className=""
                                d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        </svg>
                        {orgDetails && orgDetails.orgAddress}
                    </div>
                    {/*                     
                    <div className='mb-2'>
                        <p className="text-center text-gray-600"></p>
                    </div> */}
                    <div>
                        <progress className="progress progress-success w-full" value={raisedAmount} max={budget}></progress>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-100 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9l-5 5-5-5" />
                            </svg>
                            <p className="text-lg font-semibold mt-2">KES {raisedAmount && raisedAmount}</p>
                            <p className="text-sm text-gray-600">Total Donation</p>
                        </div>
                        <div className="text-center p-4 bg-gray-100 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M12 6h.01M12 14h.01" />
                            </svg>
                            <p className="text-lg font-semibold mt-2">{budget && budget}</p>
                            <p className="text-sm text-gray-600">Goal</p>
                        </div>
                    </div>
                    <div className="flex gap-2 px-2 my-3">  

                    {subscribe ? (
                        <button className='flex-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-800 px-4 py-2' onClick={handleUnsubscribe}>Subscribed</button>
                    ) : (
                        <button className='flex-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-800 px-4 py-2' onClick={handleSubscribe}>Subscribe</button>
                    )}

                    <a href={`/organisation/${orgDetails && orgDetails.orgName}`}
                        className="flex-1 rounded border-2 border-blue-600 font-semibold text-black px-4 py-2 hover:bg-blue-600 hover:text-white">
                        Organiser Info.
                    </a>
                </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Card