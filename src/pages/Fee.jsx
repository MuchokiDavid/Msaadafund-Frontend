import React from 'react'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'
import PriceCards from './PriceCards'

function Fee() {
  return (
    <div>
    <Menus/>
      <div id="slide3" className="carousel-item relative w-full h-56">
          <div className="absolute inset-0 bg-blue-500 bg-opacity-50"></div>
              {/* <img src={contactImage} alt="contact us" loading='lazy' className="w-full h-full object-cover" /> */}
              <div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center align-middle px-4">
                      <h1 className="text-2xl lg:text-4xl text-gray-800 font-bold text-center my-4">Pricing plans</h1>
                      <div className='text-center'>
                        <p className="text-gray-800">
                          This pricing guide provides information about the payment charges incurred by the organisers.
                          <br/>
                          The contributor does not incur any charges.
                        </p>
                      </div>
                      <div className="text-sm breadcrumbs ml-2 text-gray-800">
                        <ul>
                            <li><a href='/'>Home</a></li> 
                            <li><a href='/fees'>Pricing</a></li> 
                        </ul>
                    </div>
                  </div>
              </div>      
        </div> 
    <div className='container mx-auto'>
      <PriceCards/>
    </div>    
    <Footer/>
    </div>
  )
}

export default Fee
