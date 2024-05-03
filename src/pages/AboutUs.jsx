import React from 'react'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'

function AboutUs() {
  return (
    <div>
      <Menus/>
      <div class="relative flex-1 px-3 py-10 lg:px-8" id='termBanner'>
        <div class="mx-auto text-center">
          <h2 class="text-center text-3xl font-bold leading-tight text-white md:text-4xl">About Us</h2>
          <p className="mt-4 text-white">Msaada is a donation platform dedicated to making a difference in the world. Our mission is to connect people who want to help with those in need, creating a community of generosity and support.</p>
        </div>
      </div>
      <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <section class="text-gray-700 body-font">
          <div class="flex justify-center mt-10 text-4xl font-regular">
            Why Us?
          </div>
          <div class="px-5 py-12 mx-auto">
            <div class="flex flex-wrap text-center justify-center">
              <div class="p-4 md:w-1/4 sm:w-1/2">
                <div class="px-4 py-6 transform transition duration-500 hover:scale-110">
                  <div class="flex justify-center">
                    <img src="https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp" class="w-32 mb-3"/>
                  </div>
                  <h2 class="title-font font-regular text-2xl text-gray-900">Fast System</h2>
                </div>
              </div>

              <div class="p-4 md:w-1/4 sm:w-1/2">
                <div class="px-4 py-6 transform transition duration-500 hover:scale-110">
                  <div class="flex justify-center">
                    <img src="https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp" class="w-32 mb-3"/>
                  </div>
                  <h2 class="title-font font-regular text-2xl text-gray-900">Reasonable Rates</h2>
                </div>
              </div>

              <div class="p-4 md:w-1/4 sm:w-1/2">
                <div class="px-4 py-6 transform transition duration-500 hover:scale-110">
                  <div class="flex justify-center">
                    <img src="https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp" class="w-32 mb-3"/>
                  </div>
                  <h2 class="title-font font-regular text-2xl text-gray-900">Instant Donation</h2>
                </div>
              </div>

              <div class="p-4 md:w-1/4 sm:w-1/2">
                <div class="px-4 py-6 transform transition duration-500 hover:scale-110">
                  <div class="flex justify-center">
                    <img src="https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp" class="w-32 mb-3"/>
                  </div>
                  <h2 class="title-font font-regular text-2xl text-gray-900">Expertise in Industry</h2>
                </div>
              </div>

            </div>
          </div>
        </section>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
          <p className="mt-2 text-lg text-gray-600">
            We envision a world where everyone has access to the resources they need to thrive. By facilitating donations and fundraising efforts, we aim to empower individuals and organizations to make a positive impact in their communities and beyond.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Our Values</h3>
          <ul className="mt-2 text-lg text-gray-600 list-disc pl-6">
            <li>Compassion: We believe in showing kindness and empathy towards others.</li>
            <li>Integrity: We uphold the highest standards of honesty and transparency in everything we do.</li>
            <li>Inclusivity: We embrace diversity and strive to create an inclusive platform for all.</li>
            <li>Impact: We are committed to making a meaningful difference in the world through our actions.</li>
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
      <Footer/>
    </div>
  )
}

export default AboutUs