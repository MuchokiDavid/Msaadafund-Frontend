import React from 'react'

function CallToAction() {
    const token= localStorage.getItem("token")
    const orgName= localStorage.getItem("org")
  return (
    <div>
         <div class="px-4 py-4 bg-purple-700 rounded-lg  md:py-8 md:px-8 lg:py-10 lg:px-10 xl:flex xl:items-center">
            <div class="xl:w-0 xl:flex-1">
                <h2 class="text-2xl font-extrabold leading-8 tracking-tight text-white sm:text-3xl sm:leading-9">
                    Welcome back {orgName}!
                </h2>
                <p class="max-w-3xl mt-3 text-lg leading-6 text-indigo-200">
                Your dashboard is your central hub for managing all your campaigns and fundraising activities. 
                Whether you're starting a new campaign, tracking donations, or withdrawing funds, everything you need is right here.
                </p><br/>
                <p className='text-white'>Happy fundraising!</p>
            </div>
            <div class="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
                <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <a  href={token ? "/org/dashboard/mycampaigns/active" : "/org/login"}><button class="flex items-center justify-center w-full px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-purple-500 border border-transparent rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400">
                        View Campaigns
                    </button></a>
                </div>
                <p class="mt-3 text-sm leading-5 text-indigo-200">
                    We care about the protection of your data. Your data is safe and never used for commercial purposes.
                </p>
                <p class="text-sm leading-5 text-indigo-200">
                If you have any questions or need assistance, our support team is here to help you.
                </p>
            </div>
        </div>

    </div>
  )
}

export default CallToAction