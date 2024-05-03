import React from 'react'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'
import Banner from '../components/home/Banner'

function Home() {
  return (
    <>
      <Menus/>
      <div className="mx-auto overflow-x-hidden h-fit" id='home'>
        <Banner/>
        {/* <DonorGetStarted/> */}
      </div>      
      <Footer/>
    </>
  )
}

export default Home