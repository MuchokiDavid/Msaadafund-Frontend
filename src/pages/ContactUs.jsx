import React from 'react'
import Menus from '../components/reusables/Menus'
import Message from '../components/services/Message'
import Footer from '../components/reusables/Footer'
import contactImage from '../assets/contact.jpg'

function ContactUs() {
  return (
    <div>
      <Menus/>
      <div id="slide3" className="carousel-item relative w-full h-56">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <img src={contactImage} alt="contact us" loading='lazy' className="w-full h-full object-cover" />
              <div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center align-middle px-4">
                      <h1 className="text-2xl lg:text-4xl text-white font-bold text-center">Contact us</h1>
                      <div className="text-sm breadcrumbs ml-2 text-white">
                        <ul>
                            <li><a href='/'>Home</a></li> 
                            <li><a href='/contact'>Contact us</a></li> 
                        </ul>
                    </div>
                  </div>
              </div>      
        </div> 
         {/* Contact Section */}
      <div className="container mx-auto my-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Message form */}
          <div className="w-full lg:w-2/3">
            <Message />
          </div>

          {/* Contact Info Cards */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {/* Phone Card */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Phone Number</h3>
              <p className="text-gray-600">+254 702 842883</p>
              <p className="text-gray-600">+254 705 960166</p>
            </div>

            {/* Email Card */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Email Address</h3>
              <p className="text-gray-600">info@msaadafund.com</p>
            </div>
          </div>
        </div>
      </div>
      {/* <Message/> */}
      <Footer/>
    </div>
  )
}

export default ContactUs