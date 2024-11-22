import React from 'react';
import bannerPhoto from '../../assets/banner_img.png';

function BannerSlider() {

  return(
    <div className="lg:min-h-[560px] bg-blue-100 px-4 sm:px-10">
      <div className="max-w-7xl w-full mx-auto py-16">
        <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
          <div>
            <h1 className="md:text-5xl text-4xl font-bold mb-6 md:!leading-[55px]">
            Empower Your Cause, Amplify Impact
            </h1>
            <p className="text-base leading-relaxed">Whether you're organizing a fundraiser or contributing to a meaningful cause, our platform is built for you. 
              For organizers, streamline your campaigns with secure, transparent tools that help you reach your funding goals. 
              For donors, Give with ease and see your impact in the community. 
              Together, we can create lasting change.</p>
            <div className="flex flex-wrap gap-y-4 gap-x-8 mt-8">
              <button
                className='bg-blue-500 hover:bg-blue-600 text-white flex items-center transition-all font-semibold rounded-md px-5 py-3'>
                  <a className='flex items-center' href='/org/signup'>
                  Get started
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] fill-current ml-2"
                  viewBox="0 0 492.004 492.004">
                  <path
                    d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                    data-original="#000000" />
                </svg></a>
              </button>
              
              <button
                className='bg-transparent border-2 border-[#333] flex items-center transition-all font-semibold rounded-md px-5 py-3'>
                <a className='flex items-center' href='/campaigns'>
                Discover Fundraisers
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] fill-current ml-2"
                  viewBox="0 0 492.004 492.004">
                  <path
                    d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                    data-original="#000000" />
                </svg></a>
              </button>
            </div>
          </div>
          <div className="max-lg:mt-12 h-full">
            <img src={bannerPhoto} alt="banner img" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default BannerSlider;
