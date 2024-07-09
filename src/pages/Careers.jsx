import React from 'react'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'

function Careers() {
  return (
    <div>
      <Menus/>
      <div id='termBanner' className="carousel-item relative w-full h-56">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center align-middle px-4">
                      <h1 className="text-3xl lg:text-4xl text-white font-bold text-center">Careers</h1>
                      <div className="text-sm breadcrumbs ml-2 text-white">
                        <ul>
                            <li><a href='/'>Home</a></li> 
                            <li><a href='/careers'>Careers</a></li> 
                        </ul>
                    </div>
                  </div>
              </div>      
        </div>
      <div className='container min-h-96'>        
        <p className="mt-4 max-w-screen-md mx-auto text-gray-600 leading-loose text-justify text-xl" >Currently, there are no available openings. Please check back regularly for future opportunities.
        </p>
      </div>
      <Footer/>
    </div>
  )
}

export default Careers