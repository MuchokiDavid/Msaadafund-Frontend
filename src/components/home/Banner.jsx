import React from 'react'
import Featured from './Featured'

function Banner() {
  return (
    <div>
      <div className="w-screen md:h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30">
        <img
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/1900/850"
          className="absolute top-0 left-0 min-h-full ob w-full z-0"
          alt=""
        />
        <div className="relative max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center ml-4">
          <div className="col-span-6">
            <span className="uppercase text-white text-xs font-bold sm:my-4 md:my:1 block">WE ARE HERE TO HELP</span>
            <h1 className="text-white font-extrabold md:text-5xl sm:text-4xl mb-8">Welcome to Our Community of Changemakers!</h1>
            <p className="text-stone-100 text-base">
              Join us in our mission to create a better world for all. Together, we can make a positive impact on the lives of
              those in need. Explore our platform and discover how you can contribute to meaningful causes today.
            </p>
            <a href='/campaign'><button className="sm:my-6 md:mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10">Get started</button></a>
          </div>
        </div>
        </div>
      <div className="bg-sky-950 py-20">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <div className="max-w-xl">
            <h2 className="font-black text-white text-3xl mb-4">Be Part of Something Bigger!</h2>
            <p className="text-base text-white">Join a community dedicated to driving social change and improving lives. Whether you're passionate about education, healthcare, environmental conservation, or humanitarian aid, there's a place for you here. Start your impact journey today.</p>
          </div>
          <button className="text-white uppercase py-3 text-base px-10 border border-gray-300 hover:bg-sky-500 hover:bg-opacity-10">Get started</button>
        </div>
      </div>
      <Featured/>
      <div className="py-12 relative overflow-hidden bg-white">
        <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
          <div className="w-full flex flex-col items-end pr-16">
            <h2 className="text-[#64618C] font-bold text-2xl max-w-xs text-right mb-12 mt-10">Whether you need Assistance</h2>
            <div className="h-full mt-auto overflow-hidden relative">
              <img src="https://picsum.photos/800/600" className="h-full w-full object-contain" alt=""/>
            </div>
          </div>
          <div className="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
            <div className="relative z-20 pl-12">
              <h2 className="text-[#f7d0b6] font-black text-5xl leading-snug mb-10">Make Your Mark on the World!</h2>
              <p className="text-white text-sm">
              Take the first step towards making a difference. Our platform offers you the opportunity to support various causes and organizations working tirelessly to bring about positive change. Start your journey with us today.
              </p>
              <a href='/user/signup'><button className="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10">Sign Up Now</button></a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 relative overflow-hidden bg-white">
        <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
          

          <div className="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-emerald-700 before:top-0 before:right-0">
            <div className="relative z-20 pl-12">
              <h2 className="text-white font-black text-5xl leading-snug mb-10">Join Us and Make a Difference</h2>
              <p className="text-white text-lg">
              Become part of our community and make a positive impact. Sign up now to start receiving donations and support for your cause.
              </p>
              <button className=" mt-8 text-white uppercase py-3 text-base px-10 border border-gray-300 hover:bg-sky-500 hover:bg-opacity-10"> 
              Get Involved
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col pl-16">
            <h2 className="text-[#64618C] font-bold text-2xl max-w-xs text-left mb-12 mt-10">Whether you need Assistance</h2>
            <div className="h-full mt-auto overflow-hidden relative">
              <img src="https://picsum.photos/800/600" className="h-full w-full object-contain" alt=""/>
            </div>
          </div>

        </div>
      </div>

      <div className="py-12 relative overflow-hidden bg-white">
        <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
          <div className="w-full flex flex-col items-end pr-16">
            <h2 className="text-[#64618C] font-bold text-2xl max-w-xs text-right mb-12 mt-10">Whether you need Assistance</h2>
            <div className="h-full mt-auto overflow-hidden relative">
              <img src="https://picsum.photos/800/600" className="h-full w-full object-contain" alt=""/>
            </div>
          </div>

          <div className="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
            <div className="relative z-20 pl-12">
              <h2 className="text-[#f7d0b6] font-black text-5xl leading-snug mb-10">Msaada mashinani is here <br/>to help you</h2>
              <p className="text-white text-sm">
                Purus in massa tempor nec. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Faucibus ornare suspendisse sed nisi lacus sed viverra. Diam in arcu cursus euismod quis viverra nibh cras pulvinar.
              </p>
              <button className="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10">Talk with expert</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner