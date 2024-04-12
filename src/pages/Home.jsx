import React from 'react'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'
import Banner from '../components/home/Banner'
import DonorGetStarted from '../components/home/DonorGetStarted'

function Home() {
  return (
    <>
      <Menus/>
      <div className="mx-auto overflow-x-hidden mt-3 h-auto">
        <Banner/>
        {/* <DonorGetStarted/> */}
      </div>      
      <Footer/>
    </>
  )
}

export default Home