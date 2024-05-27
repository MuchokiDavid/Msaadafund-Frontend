import React from 'react'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'
import Banner from '../components/home/Banner'
import Announcement from '../components/reusables/Announcement'

function Home() {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  return (
    <>
      {!token && !user && <Announcement/>}
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