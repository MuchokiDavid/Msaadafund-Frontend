import React from 'react'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'
import Message from '../components/services/Message'

function AboutUs() {
  return (
    <div>
      <Menus/>
      <div id="slide3" className="carousel-item relative w-full h-56">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <img src="https://source.unsplash.com/random/1920x1080/?organisation-about-us" className="w-full h-full object-cover" />
              <div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center align-middle px-4">
                      <h1 className="text-2xl lg:text-4xl text-white font-bold text-center">About us</h1>
                      <div className="text-sm breadcrumbs ml-2 text-white">
                        <ul>
                            <li><a href='/'>Home</a></li> 
                            <li><a href='/about'>About us</a></li> 
                        </ul>
                    </div>
                  </div>
              </div>      
        </div> 
      <div className="min-h-screen pb-8 px-4 sm:px-6 lg:px-8">        
      <div className="container mx-auto block ">
        <div className='flex flex-col lg:flex-row gap-3'>
          <div className='h-full lg:w-2/3'>
          <div className='bg-white border mt-6 p-4'>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
              <p className="mt-2 text-lg text-gray-600">
                At Msaada, our mission is to empower individuals and organizations to make a positive impact in their communities and beyond. We believe that generosity and positive change can be achieved only through dedicated and passionate efforts.
              </p>
            </div>
              <div className="mt-8">                
              <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
              <p className="mt-2 text-lg text-gray-600">
                We envision a world where everyone has access to the resources they need to thrive. By facilitating donations and fundraising efforts, we aim to empower individuals and organizations to make a positive impact in their communities and beyond.
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">Our Values</h3>
              <ul className="mt-2 text-lg text-gray-600 pl-6">
                <li><span className='font-semibold'>Compassion:</span> We believe in showing kindness and empathy towards others.</li>
                <li><span className='font-semibold'>Integrity:</span>  We uphold the highest standards of honesty and transparency in everything we do.</li>
                <li><span className='font-semibold'>Inclusivity:</span>  We embrace diversity and strive to create an inclusive platform for all.</li>
                <li><span className='font-semibold'>Impact:</span>  We are committed to making a meaningful difference in the world through our actions.</li>
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">How It Works</h3>
              <p className="mt-2 text-lg text-gray-600">
                Msaada works by connecting individuals, businesses, and organizations with causes they care about. Users can browse through various campaigns, fundraisers, and charitable organizations, and make donations securely through our platform. Whether it's supporting disaster relief efforts, funding education projects, or helping local community initiatives, Msaada provides a simple and effective way to make a difference.
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">Our Team</h3>
              <p className="mt-2 text-lg text-gray-600">
                Behind Msaada is a dedicated team of individuals passionate about social impact and technology. Our diverse team brings together expertise in software development, design, marketing, and community outreach to ensure that Msaada continues to grow and fulfill its mission of fostering generosity and positive change.
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
              <p className="mt-2 text-lg text-gray-600">
                Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:info@msaada.com" className="text-blue-600">info@msaada.com</a>.
              </p>
            </div>
            </div>
          </div> 
          <div className='h-full lg:w-1/3'>

            <div className='mt-6'>
              <Message/>
            </div>
            
          </div>           
        </div>        
      </div>
    </div>
      <Footer/>
    </div>
  )
}

export default AboutUs