import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect,useCallback } from 'react';
import InActiveCampaigns from './UpcomingCampaigns';
import { prettyNumber } from '@based/pretty-number'

function ActiveCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const currentDate = new Date();

    const fetchCampaigns = useCallback(async () => {
        try {
          setLoading(true)
          const response = await fetch(`/api/v1.0/campaigns?page=${currentPage}&category=${selectedCategory}`);
          if (!response.ok) {
            throw new Error('Failed to fetch campaigns');
          }
          const data = await response.json();
          const mergedCategories = mergeCategories(data.map(campaign => campaign.category.toLowerCase()));
          setCampaigns(data);
          setCategories(['All', ...mergedCategories]);
          const totalPagesFromHeader = Number(response.headers.get('X-Total-Pages'));
          if (totalPagesFromHeader !== null && totalPagesFromHeader !== undefined) {
            setTotalPages(Number(totalPagesFromHeader));
          }
          setLoading(false)
        } catch (error) {
          setLoading(false) 
          console.error('Error fetching data:', error);
        }
      }, [currentPage, selectedCategory]);
    
      useEffect(() => {
        fetchCampaigns();
        //use polling  for real time updates
        const intervalId = setInterval(fetchCampaigns, 1 * 60 * 60 * 1000);//Polling done here to fetch campaign
        return () => clearInterval(intervalId);
      }, [currentPage, selectedCategory, fetchCampaigns]); // Include fetchCampaigns in the dependency array
    
      const mergeCategories = (categories) => {
        const uniqueCategories = new Map();
        categories.forEach(category => {
          const lowerCaseCategory = category.toLowerCase();
          const titleCaseCategory = lowerCaseCategory.charAt(0).toUpperCase() + lowerCaseCategory.slice(1);
          uniqueCategories.set(lowerCaseCategory, titleCaseCategory);
        });
        return Array.from(uniqueCategories.values());
      };

      const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1); // Reset currentPage when category changes
      };
    
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset currentPage when search query changes
      };
    
      const goToPage = (page) => {
        setCurrentPage(page);
      };
      const filterCampaigns = () => {
        return activeCampaigns.filter(campaign => {
          const categoryMatch = selectedCategory === 'All' || campaign.category.toLowerCase() === selectedCategory.toLowerCase();
          const searchMatch = (
            campaign.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.organisation.orgName.toLowerCase().includes(searchQuery.toLowerCase())
          );
          return categoryMatch && searchMatch;
        });
      };
      
      const handleCampaign = (campaignId) => {
        setTimeout(() => {
          navigate(`/campaigns/${campaignId}`);
        }, 1000);
      };
      //Active campaigns
      const activeCampaigns = campaigns.filter(campaign => {
        const startDate = new Date(campaign.startDate);
        const endDate = new Date(campaign.endDate);
        return (startDate <= currentDate && endDate >= currentDate) || (endDate.toDateString() === currentDate.toDateString());
      });
    //Upcoming campaigns
      const upcomingCampaigns = campaigns.filter(campaign => {
        const startDate = new Date(campaign.startDate);
        return startDate > currentDate;
      });
    //Expired campaigns
      // const expiredCampaigns = campaigns.filter(campaign => {
      //   const endDate = new Date(campaign.endDate);
      //   return endDate < currentDate;
      // });

      if(loading){
        // return(<div className='flex justify-center'><span className="loading loading-dots loading-lg"></span></div>)
        return (
          <div class="flex items-center justify-center h-screen">
              <div class="relative">
                  <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                    </div>
              </div>
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

    // console.log(campaigns)
  return (
    <div className='mx-auto min-h-screen container'>
    <div className='flex items-center justify-center p-3'>
        <div className="mb-1 mt-2 flex flex-col sm:flex-row items-center">
          <div className="relative flex" data-twe-input-wrapper-init data-twe-input-group-ref>
            <label className="input input-bordered flex items-center gap-2 bg-white">
              <input type="text" className="grow" onChange={handleSearchChange} placeholder="Search active campaign..." />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
          </div>

          <select
            id="categoryFilter"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="border text-black rounded-md px-4 py-2 h-12 mb-2 sm:mb-0 sm:mr-4 focus:ring focus:border-slate-100 bg-white"
            style={{ minWidth: '150px' }}
          >
            {categories.map(category => (
              <option className='text-xs lg:text-lg xs:w-full' key={category.id} value={category}>{category}</option>
            ))}
          </select>

        </div>
      </div>
      {upcomingCampaigns && upcomingCampaigns.length>0?
        <InActiveCampaigns allCampaigns= {upcomingCampaigns}/>
        :
        null
      }
    <h1 className="text-left text-xl font-bold mb-6 mx-6 h-6 p-1">Active Fundraisers</h1>  
    <div className='mx-auto overflow-x-hidden pb-4 px-6 sm:px-2 md:px-4'>
        
        {activeCampaigns.length===0 ?
        <div className="text-xl mx-4 min-h-screen">No Active campaigns</div>
        :
        <div className="mx-2 sm:mx-1 lg:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-2 md:gap-4 sm:max-w-full">
          {filterCampaigns().map((campaign) => {
            return (
              <div key={campaign.id} className='max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden'>
                <div className="block rounded-lg shadow-sm shadow-indigo-100">
                  <img
                    alt="banner"
                    src= {campaign.banner}
                    loading='lazy'
                    className="h-56 w-full rounded-t-md object-cover"
                  />

                  <div className="mt-2 px-2 pb-4">
                    <dl>
                      <div>
                        <dt className="sr-only">Budget</dt>

                        <dd className="text-sm text-gray-500">Budget: KES {campaign.targetAmount}</dd>
                      </div>

                      <div>
                        <dt className="sr-only">Name</dt>
                        <dd className="font-medium overflow-hidden text-lg whitespace-nowrap hover:text-blue-600 hover:cursor-pointer"><p onClick={()=>handleCampaign(campaign.id)}>{campaign.campaignName}</p></dd>
                      </div>
                      <div>
                        <dt className="sr-only">Organiser</dt>
                        <dd><a href={`/organisations/${campaign.organisation.orgName}`} className='text-blue-700 whitespace-nowrap hover:text-blue-400'>{campaign.organisation.orgName}</a></dd>
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

                      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
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

                      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
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
          })}
        </div>}
        
        <div className=" flex justify-center mt-4 join grid-cols-2">
        {/* Previous page button */}
        <button className="join-item btn btn-outline btn-sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        {/* Next page button */}
        <button className="join-item btn btn-outline btn-sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>Next</button>
      </div>
    </div>
    </div>
  )
}

export default ActiveCampaigns