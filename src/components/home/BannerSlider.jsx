import React,{useRef} from 'react';
import bannerPhoto from '../../assets/banner.jpg';
import '@splidejs/react-splide/css/core';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';

function BannerSlider() {
    const splideRef = useRef(null)
  const options = {
    type: 'loop',
    autoplay: true,
    interval: 5000, // 5 seconds
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: false,
    arrows: false, // Disable default arrows
    pagination: false, // Disable pagination
  };

  //   const handlePrev = () => {
  //   if (splideRef.current) {
  //     splideRef.current.splide.go('<');
  //   }
  // };

  // const handleNext = () => {
  //   if (splideRef.current) {
  //     splideRef.current.splide.go('>');
  //   }
  // };



  const images = [
    {
      url: bannerPhoto,
      heading: "Welcome to Our Community of Changemakers!",
      text: "Join us in our mission to create a better world for all. Together, we can make a positive impact on the lives of those in need. Explore our platform and discover how you can contribute to meaningful causes today.",
      buttonText: "Get started",
      buttonLink: "/campaigns"
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9uYXRlfGVufDB8fDB8fHww",
      heading: "Make a Difference Today!",
      text: "Your contribution can change lives. Support a cause that matters to you and help those in need.",
      buttonText: "Create Campaign",
      buttonLink: "/org/login"
    },
    {
      url: "https://images.unsplash.com/photo-1504439158909-5a2f08876082?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Support Meaningful Causes!",
      text: "Join hands with charitable organizations and make a positive impact in the world. Every donation counts.",
      buttonText: "Explore",
      buttonLink: "/campaigns"
    },
    {
      url: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Be the Change!",
      text: "Your small act of kindness can create ripple effects of change. Start today and inspire others to do the same.",
      buttonText: "Become a volunteer",
      buttonLink: "/user/signup"
    }
  ];

  return (
    <div className="carousel w-full">
      <Splide options={options} hasTrack={false} ref={splideRef} aria-label="banner Images">
        <SplideTrack>
          {images.map((image, index) => (
            <SplideSlide key={index}>
              <div className="carousel-item relative w-full h-screen">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <img src={image.url} className="w-full h-full object-cover" alt={`slide-${index} loading="lazy"`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center align-middle px-4">
                  <h1 className="text-2xl lg:text-4xl text-white font-bold text-center">{image.heading}</h1>
                  <p className="text-lg lg:text-xl text-white mt-4 text-center">{image.text}</p>
                  <a href={image.buttonLink}>
                    <button className="btn btn-outline sm:my-6 rounded-lg md:mt-8 text-white uppercase py-3 text-base font-light px-8 border border-blue-600 hover:bg-blue-600 hover:bg-opacity-9">
                      {image.buttonText}
                    </button>
                  </a>
                </div>
                {/* <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ">
                  <button onClick={handlePrev} className="btn btn-circle ">❮</button>
                  <button onClick={handleNext} className="btn btn-circle">❯</button>
                </div> */}
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  );
}

export default BannerSlider;
