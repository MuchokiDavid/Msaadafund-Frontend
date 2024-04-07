import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Menus from '../components/reusables/Menus';
import Footer from '../components/reusables/Footer';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/v1.0/campaigns')
      .then(response => response.json())
      .then(data => {
        const mergedCategories = mergeCategories(data.map(campaign => campaign.category.toLowerCase()));
        setCampaigns(data);
        setCategories(['All', ...mergedCategories]);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterCampaigns = (status) => {
    const currentDate = new Date();
    return campaigns.filter(campaign => {
      const categoryMatch = selectedCategory === 'All' || campaign.category.toLowerCase() === selectedCategory.toLowerCase();
      const searchMatch = campaign.campaignName.toLowerCase().includes(searchQuery.toLowerCase());

      if (status === 'Upcoming campaigns' && currentDate < new Date(campaign.startDate)) {
        return categoryMatch && searchMatch;
      }
      if (status === 'Ongoing campaigns' && currentDate >= new Date(campaign.startDate) && currentDate <= new Date(campaign.endDate)) {
        return categoryMatch && searchMatch;
      }
      if (status === 'Completed campaigns' && currentDate > new Date(campaign.endDate)) {
        return categoryMatch && searchMatch;
      }
      return false;
    });
  };

  const handleSearch = () => {
    // Assuming you want to filter based on the current selected category
    const filteredCampaigns = filterCampaigns(selectedCategory);
    // Perform any action with the filtered campaigns
    console.log(filteredCampaigns);
  };

  const renderCampaignsByStatus = (status) => {
    const filteredCampaigns = filterCampaigns(status);

    return (
      <div key={status} className="mb-8">
        <h2 className="text-2xl font-bold mb-2">{status}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="max-w-xs rounded overflow-hidden shadow-lg bg-white transition duration-300 flex flex-col">
              <img className="w-full" src={campaign.banner} alt={campaign.campaignName} />
              <div className="px-6 py-4 flex-grow">
                <div className="text-primary text-3xl mb-2">{campaign.campaignName}</div>
                <p className="text-black text-base">{campaign.description}</p>
                <p className="text-black text-base">Category: {campaign.category}</p>
                <p className="text-black text-base">Start Date: {campaign.startDate}</p>
                <p className="text-black text-base">End Date: {campaign.endDate}</p>
                <p className="text-black text-base">Target Amount: Ksh {campaign.targetAmount}</p>
                <button onClick={()=> handleCampaign(campaign.id)}>More Details</button>
              </div>
              {status === 'Ongoing campaigns' && (
                <div className="px-6 pb-4">
                  <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                    Donate
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleCampaign = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <>
    <Menus/>
    <div className='flex items-center justify-center mt-6 p-4 shadow-lg'>
        <div className="mb-4 flex flex-col sm:flex-row items-center">
          {/* <label htmlFor="categoryFilter" className="mr-2 font-bold text-lg">Filter by Category:</label> */}
          <select
            id="categoryFilter"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="border bg-slate-200 text-black rounded-md px-4 py-2 h-10 mb-2 sm:mb-0 sm:mr-4 focus:ring focus:border-blue-100"
            style={{ minWidth: '150px' }}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <div class="relative flex" data-twe-input-wrapper-init data-twe-input-group-ref>
            <input
              type="search"
              className="peer block min-h-[auto] w-full h-10 rounded border-1 bg-slate-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-gray-500 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Search campaign..."
              onChange={handleSearchChange}
              aria-label="Search campaign..."
              id="exampleFormControlInput"
              aria-describedby="basic-addon1"
            />
            <label
              for="exampleFormControlInput"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
              >Search
            </label>
            <button
              className="relative z-[2] border bg-blue-600 -ms-0.5 flex items-center rounded-e bg-primary px-5  text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              type="button"
              id="button-addon1"
              onClick={handleSearch}
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              <span class="[&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    <div className="container mx-auto overflow-x-hidden mt-3">
      {/* <h1 className="text-4xl font-bold mb-4 mt-4">Campaigns</h1> */}
      {renderCampaignsByStatus('Upcoming campaigns')}
      {renderCampaignsByStatus('Ongoing campaigns')}
      {renderCampaignsByStatus('Completed campaigns')}
    </div>
    <Footer/>
    </>
  );
}

export default Campaigns;
