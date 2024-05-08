import React from 'react'

function Help() {
  return (
    <div>
    <div className="text-sm breadcrumbs ml-2">
        <ul>
            <li><a href='/org/dashboard'>Dashboard</a></li>
            <li>Help Center</li>
        </ul>
    </div>
    <h1 className="font-extrabold text-2xl">Help Center</h1>
    <hr className='mb-4' />
    <div>
    <section className="py-6 sm:py-8" id='termBanner'>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 text-center sm:text-left">
                <div>
                    <h2 className="text-2xl font-bold text-white">Welcome to the Help Center.</h2>
                </div>
                <div>
                    <p className='text-white'> 
                    Below, you'll find useful information and guidance on how to navigate and utilize the various features available to you.</p>
                </div>
                
            </div>
        </div>
    </section>

    </div>
    <div className='mt-4'>
      <div role="tablist" className="tabs tabs-lifted">
    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Contributions" checked />
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <h2 className="text-xl font-semibold mb-4">Contributions</h2>
        <p className="mb-2">Here you can find information about your contributions:</p>
        <ul className="list-disc ml-6 mb-4">
        <li>Navigate to the <a href='/user/dashboard/contributions' className='text-blue-600 font-medium'>Contributions</a> page.</li>
        <li>You will be able to find your contribution History</li>
        {/* <li>Guidelines for making high-quality contributions</li> */}
        </ul>
        <p>If you need further assistance or have any questions, please don't hesitate to contact our support team.</p>
    </div>


    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Subscriptions" checked />
<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
    <p className="mb-2">In this section, you'll find Organizations you have Subscribed to:</p>
    <ul className="list-disc ml-6 mb-4">
        <li>Navigate to the <a href='/user/dashboard/subscriptions' className='text-blue-600 font-medium'>Subscriptions</a> page.</li>
        <li>You will be able to search for a specific organization.</li>
        <li>You will be able to manage your subscription preferences.</li>
    </ul>
    {/* <p>If you have any questions or need assistance with your subscription, please feel free to reach out to us.</p> */}
</div>


    
    
    
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Profile" checked />   
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    <h2 className="text-xl font-semibold mb-4">Profile</h2>
    <p className="mb-2">Here you can find information and manage your profile:</p>
    <ul className="list-disc ml-6 mb-4">
    <li>Navigate to the <a href='/user/dashboard/profile' className='text-blue-600 font-medium'>My Profile</a> page.</li>
    <li>You will find your profile details and the ability to edit your profile to match your specifications.</li>
    </ul>
    {/* <p>If you encounter any issues with your profile or need further assistance, please contact our support team for help.</p> */}
  </div>

    </div>
    </div>
    </div>

    
      )
}

export default Help