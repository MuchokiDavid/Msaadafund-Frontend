import React from 'react'

function BannerCards() {
  return (
    <div>
        <div className="flex flex-col bg-white py-4 px-8">
            {/* <div className="flex flex-col px-20 md:px-10 md:flex-row items-center justify-center gap-6"> */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <div>
                <div className="card w-full h-80 bg-base-800 shadow image-full">
                    <figure><img className="w-full" src="https://images.unsplash.com/photo-1579208575657-c595a05383b7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Start Fundraising</h2>
                        <p>Become part of our community and make a positive impact. Sign up now to start receiving donations and support for your cause.</p>
                        <div className="card-actions justify-end">
                        <a href='/org/signup'><button className="btn btn-md mt-8 inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent focus:outline-none focus:ring focus:ring-blue-400">Sign up</button></a>
                        </div>
                    </div>
                </div>
                </div> 
                <div className="">
                <div className="card h-80 w-full bg-base-100 shadow-xl image-full">
                    <figure><img className="w-full" src="https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Become a supporter</h2>
                        <p>Take action and become an agent of change. By signing up, you gain access to a platform designed to connect you with impactful projects and organizations.</p>
                        <div className="card-actions justify-end">
                        <a href='/user/signup'><button className="btn btn-md mt-8 inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent focus:outline-none focus:ring focus:ring-blue-400">Sign up</button></a>
                        </div>
                    </div>
                </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default BannerCards