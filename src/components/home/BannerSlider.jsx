import React,{useRef} from 'react';
// import bannerPhoto from '../../assets/banner.jpg';
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
      url: "https://img.freepik.com/free-photo/front-view-box-with-donated-food_23-2148613254.jpg?w=740&t=st=1720521150~exp=1720521750~hmac=d7cfea93944e287864857538430cc6b607694cc86f9d29b13d1ff7698f6ee6d9",
      heading: "Welcome to Impactful Giving!",
      text: "Join us to make a difference. Discover how you can support important causes and start creating positive change today.",
      buttonText: "Create Campaign",
      buttonLink: "/org/login"
    },
    {
      url: "https://images.unsplash.com/photo-1476873282730-9018f17bdf4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Make a Difference Now!",
      text: "Transform lives with your support. Create a campaign or back one that speaks to you and make an impact.",      
      buttonText: "Get Started",
      buttonLink: "/campaigns"
    },
    {
      url: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Support What Matters!",
      text: "Explore campaigns and support causes that resonate with you. Your donations can drive real change.",
      buttonText: "Explore Campaigns",
      buttonLink: "/campaigns"
    },
    {
      url: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Be a Change-Maker!",
      text: "Start making a difference today. Volunteer or support a campaign to inspire others and spark change.",
      buttonText: "Become a Volunteer",
      buttonLink: "/user/signup"
    }
  ];
  return (
    <div className="carousel w-full">
      <Splide options={options} hasTrack={false} ref={splideRef} aria-label="banner Images">
        <SplideTrack>
          {images.map((image, index) => (
            <SplideSlide key={index}>
              <div className="carousel-item relative w-full h-[600px]">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <img src={image.url} className="w-full h-full object-cover" alt={`slide-${index} loading="lazy"`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center align-middle px-4">
                  <h1 className="text-2xl lg:text-4xl text-white font-bold text-center">{image.heading}</h1>
                  <p className="text-md lg:text-lg text-white mt-4 text-center">{image.text}</p>
                  <a href={image.buttonLink}>
                    <button className="btn btn-base btn-outline sm:my-6 rounded-full md:mt-8 text-white uppercase py-3 text-base font-light px-8 border border-blue-600 hover:bg-blue-600 hover:text-white hover:bg-opacity-9">
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
