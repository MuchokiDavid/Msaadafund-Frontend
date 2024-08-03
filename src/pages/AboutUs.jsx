import React from 'react';
import Menus from '../components/reusables/Menus';
import Footer from '../components/reusables/Footer';
import Message from '../components/services/Message';

function AboutUs() {
  const token= localStorage.getItem('token')
  const org = localStorage.getItem('org')

  return (
    <div>
      <Menus />
      <div id="slide3" className="carousel-item relative w-full h-56">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <img
          src="https://images.unsplash.com/photo-1622037022630-9fd9c076e565?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-full object-cover"
          alt="About us"
        />
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
        <div className="container mx-auto block">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="h-full lg:w-2/3">
              <div className="bg-white border border-transparent mt-6 p-6 rounded-lg shadow-sm">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
                  <p className="mt-2 text-lg text-gray-600">
                    At MsaadaFund, our mission is to empower individuals and organizations to make a positive impact in their communities and beyond. We believe that generosity and positive change can be achieved only through dedicated and passionate efforts.
                  </p>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900">Our Vision</h3>
                  <p className="mt-2 text-lg text-gray-600">
                    We envision a world where everyone has access to the resources they need to thrive. By facilitating donations and fundraising efforts, we aim to empower individuals and organizations to make a positive impact in their communities and beyond.
                  </p>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900">Our Values</h3>
                  <ul className="mt-2 text-lg text-gray-600 list-disc pl-6 space-y-2">
                    <li><span className='font-semibold'>Compassion:</span> We believe in showing kindness and empathy towards others.</li>
                    <li><span className='font-semibold'>Integrity:</span> We uphold the highest standards of honesty and transparency in everything we do.</li>
                    <li><span className='font-semibold'>Inclusivity:</span> We embrace diversity and strive to create an inclusive platform for all.</li>
                    <li><span className='font-semibold'>Impact:</span> We are committed to making a meaningful difference in the world through our actions.</li>
                  </ul>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900">How It Works</h3>
                  <p className="mt-2 text-lg text-gray-600">
                    MsaadaFund works by connecting individuals, businesses, and organizations with causes they care about. Users can browse through various campaigns, fundraisers, and charitable organizations, and make donations securely through our platform. Whether it's supporting disaster relief efforts, funding education projects, or helping local community initiatives, MsaadaFund provides a simple and effective way to make a difference.
                  </p>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900">Our Team</h3>
                  <p className="mt-2 text-lg text-gray-600">
                    Behind MsaadaFund is a dedicated team of individuals passionate about social impact and technology. Our diverse team brings together expertise in software development, design, marketing, and community outreach to ensure that MsaadaFund continues to grow and fulfill its mission of fostering generosity and positive change.
                  </p>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900">Contact Us</h3>
                  <p className="mt-2 text-lg text-gray-600">
                    Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:info@MsaadaFundfund.com"className="text-blue-600">info@msaaadafund.com</a>.
                  </p>
                </div>
                <div>
                  <a href={token && org ? "/org/dashboard": "/org/login"} class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300">Create campaign</a>
                </div>
              </div>
            </div>
            <div className="h-full lg:w-1/3">
              <div className="mt-6 bg-white border  p-6 rounded-lg shadow-sm">
                <Message />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
