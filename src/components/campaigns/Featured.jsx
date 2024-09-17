import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { prettyNumber } from '@based/pretty-number'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apiUrl,appKey } from '../../context/Utils';

function Feature() {
    const [featuredCampaign, setFeaturedCampaign] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const currentDate = new Date();
  const [buttonClicked, setButtonClicked] = useState(false);//state listen to button event change 

    useEffect(() => {
        handleFeatured()
    }, []);

    // Scroll to the section with id 'howItWorksSection' when button is clicked
  useEffect(() => {
    if (buttonClicked) {
      const targetSection = document.getElementById('campaign');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setButtonClicked(false)
  }, [buttonClicked,featuredCampaign]);

    const handleFeatured = async () => {
      setLoading(true)
        try {
            const response = await fetch(`${apiUrl}/api/v1.0/featured`, {
                headers: {
                  'X-API-KEY': appKey,
                },
                method: 'GET',
            });
            const data = await response.json();
            if (response.ok) {
                setLoading(false)
                setFeaturedCampaign(data)
            }
            
        } catch (error) {
            setLoading(false)
        }
    }
    // console.log(featuredCampaign)
    const handleCampaign = (campaignId) => {
        setTimeout(() => {
          navigate(`/campaigns/${formatSlug(campaignId)}`);
        }, 1000);
      };

    // Function to calculate total amount for donations with status "COMPLETE"
    function getTotalAmount(donationsArray) {
      let totalAmount = 0;
      if (donationsArray.length === 0) {
        return 0;
      }
      else{
        for (let donation of donationsArray) {
          // Check if the donation status is "COMPLETE"
          if (donation.status === 'COMPLETE') {
              totalAmount += donation.amount;
          }
        }
      }
      
      return totalAmount;
    }
     // Function to encode route
     function formatSlug(text) {
      return text.replace(/\s+/g, '-');
      }

    if(loading){
    return (
      <div className='container'>
        <span className="loading loading-dots loading-md"></span>
      </div>
        
        )
    }

    const calculateDaysLeft = (endDate) => {
      if (!endDate) return null;
      const endDateObject = new Date(endDate);
      const differenceInTime = endDateObject.getTime() - currentDate.getTime();
      if  (differenceInTime <= 0) return 0;
      else{
        return Math.ceil(differenceInTime / (1000 * 3600 * 24));
      }
    };

    //Slider settings(Carosel)
    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "green"}}
          onClick={onClick}
        />
      );
    }
    
    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "green"}}
          onClick={onClick}
        />
      );
    }

    var settings = {
        type: 'loop',
        dots: false,
        infinite: true,
        speed: 4000,
        slidesToShow: 4,
        slidesToScroll: 1,
        lazyLoad: true,
        swipeToSlide: true,
        initialSlide: 0,
        rewind: true,
        rewindSpeed: 1000, // Speed of the rewind transition in milliseconds
        snap: true, // Sna
        keyboard: true, 
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 1,
              autoplay: true,
              autoplaySpeed: 3000,
              nextArrow: <SampleNextArrow />,
              prevArrow: <SamplePrevArrow />
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3000,
              nextArrow: <SampleNextArrow />,
              prevArrow: <SamplePrevArrow />
            }
          }
        ]
      };


  return (
    <div className="mt-2 container mx-auto h-full rounded-lg w-full">
        <div className='mb-2'>
            <h2 className='font-bold text-2xl mx-4'>Featured Campaigns</h2>
        </div>
        <Slider {...settings}>
            {featuredCampaign && featuredCampaign.map((campaign) => {
                return (
                    <div key={campaign.id} onClick={()=>{handleCampaign(formatSlug(campaign.campaignName)); setButtonClicked(true)}} className='max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden'>
                        <div onClick={()=>{handleCampaign(formatSlug(campaign.campaignName)); setButtonClicked(true)}} className="block rounded-lg shadow-sm shadow-indigo-100">
                        <img
                            alt="banner"
                            src= {campaign.banner}
                            className="h-56 w-full rounded-t-md object-cover"
                            loading="lazy"
                        />

                        <div className="mt-2 px-2 pb-4">
                            <dl>
                            <div>
                                <dt className="sr-only">Target</dt>

                                <dd className="text-sm text-gray-500">Target: KES {campaign.targetAmount}</dd>
                            </div>

                            <div>
                                <dt className="sr-only">Name</dt>
                                <dd className="font-medium overflow-hidden text-lg text-gray-600 whitespace-nowrap hover:text-blue-600 hover:cursor-pointer">
                                <a href={`/campaigns/${formatSlug(campaign.campaignName)}`}>{campaign.campaignName}</a>
                                </dd>
                            </div>
                            <div>
                                <dt className="sr-only">Organiser</dt>
                                <dd><a href={`/organisations/${formatSlug(campaign.organisation.orgName)}`} className='text-blue-700 hover:underline whitespace-nowrap'>{campaign.organisation.orgName}</a></dd>
                                {/* <a href='#' className='text-blue-700 hover:underline text-base overflow-hidden'><dd>{campaign.organisation.orgName}</dd></a> */}
                            </div>
                            </dl>

                            <div className="mt-4 flex items-center gap-3 text-xs">
                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <svg
                                className="size-4 text-sky-700"
                                viewBox="0 0 21 21"
                                fill="currentColor"
                                height="1.5em"
                                width="1.5em"
                            >
                                <g fill="none" fillRule="evenodd">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 2.5h12a2 2 0 012 2v12a2 2 0 01-2 2h-12a2 2 0 01-2-2v-12a2 2 0 012-2zM2.5 6.5h16"
                                />
                                <g fill="currentColor" transform="translate(2 2)">
                                    <path d="M9.5 8.5 A1 1 0 0 1 8.5 9.5 A1 1 0 0 1 7.5 8.5 A1 1 0 0 1 9.5 8.5 z" />
                                    <path d="M5.5 8.5 A1 1 0 0 1 4.5 9.5 A1 1 0 0 1 3.5 8.5 A1 1 0 0 1 5.5 8.5 z" />
                                    <path d="M5.5 12.5 A1 1 0 0 1 4.5 13.5 A1 1 0 0 1 3.5 12.5 A1 1 0 0 1 5.5 12.5 z" />
                                </g>
                                </g>
                            </svg>

                                <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Days</p>

                                <p className="font-medium whitespace-nowrap">{calculateDaysLeft(campaign.endDate)} days</p>
                                </div>
                            </div>

                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-1">
                                <svg
                                className="size-4 text-sky-700"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="2em"
                                width="2em"
                                >
                                <path d="M10 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
                                </svg>

                                <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Category</p> 

                                <p className="font-medium">
                                    <span className="block">{campaign.category.split(' ')[0]}</span>
                                    {/* <span>{campaign.category.split(' ')[1]}</span> */}
                                    </p>
                                </div>
                            </div>

                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-1">
                                <svg
                                viewBox="0 0 640 512"
                                fill="currentColor"
                                className="size-4 text-sky-700"
                                height="2em"
                                width="2em"
                                >
                                <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23-174-.2c-13.3 0-24-10.7-24-24s10.7-24 24-24h174.1L535 41zM105 377l-23 23h174c13.3 0 24 10.7 24 24s-10.7 24-24 24H81.9l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64h241.9c-3.7 7.2-5.9 15.3-5.9 24 0 28.7 23.3 52 52 52h117.4c-4 17 .6 35.5 13.8 48.8 20.3 20.3 53.2 20.3 73.5 0l19.3-19.3V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24 0-28.7-23.3-52-52-52H138.6c4-17-.6-35.5-13.8-48.8-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zm384 192c-35.3 0-64 28.7-64 64h64v-64zm-224 32c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96z" />
                                </svg>

                                <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Raised</p>

                                <p className="font-medium">Kes {prettyNumber(getTotalAmount(campaign.donations), 'number-short')}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                )
                }
            )}
    </Slider>
    </div>
  )
}

export default Feature
