import React from 'react'

function Card({orgDetails, raisedAmount, budget, subscribe, handleSubscribe, handleUnsubscribe}) {
  return (
    <div>
        <div className="font-sans leading-normal tracking-normal">
            <div className="flex justify-center">
                <div className="bg-white rounded-lg profile-card w-full p-4">
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
                    <div className='mb-2'>

                        <p className="text-center text-gray-600">{orgDetails && orgDetails.orgAddress}</p>
                    </div>
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
                    <div className='flex justify-center my-3'>
                        {subscribe ? (
                            <button className='bg-blue-600 border hover:bg-transparent hover:border-blue-600 border-blue-600 hover:text-black text-white font-bold py-2 px-4 rounded w-full' onClick={handleUnsubscribe}>Subscribed</button>
                        ) : (
                            <button className='bg-blue-600 border hover:bg-transparent hover:border-blue-600 border-blue-600 hover:text-black text-white font-bold py-2 px-4 rounded w-full' onClick={handleSubscribe}>Subscribe</button>
                        )}

                    </div>
                    {/* <div className="flex justify-center my-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Subscribe</button>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card