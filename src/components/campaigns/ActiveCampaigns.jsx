import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect,useCallback } from 'react';
import Menus from '../reusables/Menus';
import Footer from '../reusables/Footer';
import moment from 'moment';
import InActiveCampaigns from './UpcomingCampaigns';

function ActiveCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const currentDate = new Date();

    const fetchCampaigns = useCallback(async () => {
        try {
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
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }, [currentPage, selectedCategory]);
    
      useEffect(() => {
        fetchCampaigns();
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
          navigate(`/campaign/${campaignId}`);
        }, 2000);
      };
      //Active campaigns
      const activeCampaigns = campaigns.filter(campaign => {
        const startDate = new Date(campaign.startDate);
        const endDate = new Date(campaign.endDate);
        return startDate <= currentDate && endDate >= currentDate;
      });
    //Upcoming campaigns
      const upcomingCampaigns = campaigns.filter(campaign => {
        const startDate = new Date(campaign.startDate);
        return startDate > currentDate;
      });
    //Expired campaigns
      const expiredCampaigns = campaigns.filter(campaign => {
        const endDate = new Date(campaign.endDate);
        return endDate < currentDate;
      });
  
      const calculateDaysLeft = (endDate) => {
        if (!endDate) return null;
        const endDateObject = new Date(endDate);
        const differenceInTime = endDateObject.getTime() - currentDate.getTime();
        if  (differenceInTime <= 0) return 0;
        else{
          return Math.ceil(differenceInTime / (1000 * 3600 * 24));
        }
      };
    // console.log(campaigns)
  return (
    <>
    <Menus/>
    <div className='flex items-center justify-center mt-4 p-4 shadow-sm'>
        <div className="mb-2 flex flex-col sm:flex-row items-center ">
          <select
            id="categoryFilter"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="border text-black rounded-md px-4 py-2 h-12 mb-2 sm:mb-0 sm:mr-4 focus:ring focus:border-blue-100 dark:bg-gray-900 dark:border dark:text-white"
            style={{ minWidth: '150px' }}
          >
            {categories.map(category => (
              <option className='text-lg' key={category} value={category}>{category}</option>
            ))}
          </select>
          <div class="relative flex" data-twe-input-wrapper-init data-twe-input-group-ref>
            <label className="input input-bordered flex items-center gap-2  dark:bg-gray-900 dark:border dark:border-gray-400">
              <input type="text" className="grow" onChange={handleSearchChange} placeholder="Search active campaign..." />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
          </div>
        </div>
      </div>
    <div className='container mx-auto overflow-x-hidden pb-4'>
        <h1 className="text-center text-2xl font-bold my-4 bg-slate-300 h-10 p-1">Active Campaigns</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {filterCampaigns().map((campaign) => {
            return (
            <div key={campaign.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="w-full rounded-t-lg h-52" src={campaign.banner} alt={campaign.campaignName} />
              <div className="px-6 py-4 flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{campaign.campaignName}</h5>
                <a href=''><p className="mb-0 text-lg font-semibold text-basemb-3 text-gray-700 dark:text-gray-400 ">{campaign.organisation.orgName}</p></a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg">{campaign.description.slice(0,80)}...</p>
                
                 <button onClick={()=> handleCampaign(campaign.id)} class="inline-flex items-center mt-0 mb-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Donate now
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
               
                <div className='grid grid-flow-col grid-col-2 divide-x divide-slate-500'>
                    <div className=' px-2'>
                        <p className="text-black text-base dark:text-white">{calculateDaysLeft(campaign.endDate) }</p>
                        <h6 className='text-md'>Days left</h6>
                    </div>
                    <div className='px-2'>
                    <h6 className='text-md ml-2'>Budget(Ksh)</h6>
                        <p className="text-black ml-2 text-base dark:text-white">{campaign.targetAmount}</p>
                    </div>
                </div>
                
              </div>
            </div>
          )
          })}
        </div>
        
        <div className=" flex justify-center my-4 join grid-cols-2">
        {/* Previous page button */}
        <button className="join-item btn btn-outline" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        {/* Next page button */}
        <button className="join-item btn btn-outline" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>Next</button>
      </div>
      <InActiveCampaigns allCampaigns= {upcomingCampaigns}/>
    </div>
    <Footer/>
    </>
  )
}

export default ActiveCampaigns