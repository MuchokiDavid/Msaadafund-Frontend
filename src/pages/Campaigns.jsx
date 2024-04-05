import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

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

      if (status === 'Upcoming' && currentDate < new Date(campaign.startDate)) {
        return categoryMatch && searchMatch;
      }
      if (status === 'Ongoing' && currentDate >= new Date(campaign.startDate) && currentDate <= new Date(campaign.endDate)) {
        return categoryMatch && searchMatch;
      }
      if (status === 'Completed' && currentDate > new Date(campaign.endDate)) {
        return categoryMatch && searchMatch;
      }
      return false;
    });
  
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
              {status === 'Ongoing' && (
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
    navigate(`/campaign/${campaignId}`); // Corrected the route path
  };


  return (
    <div className="container mx-auto overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-4">Campaigns</h1>
      <div className="mb-4 flex flex-col sm:flex-row items-center">
        <label htmlFor="categoryFilter" className="mr-2 font-bold text-lg">Filter by Category:</label>
        <select
          id="categoryFilter"
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="border rounded-full px-4 py-2 h-10 mb-2 sm:mb-0 sm:mr-4 focus:ring focus:border-blue-100"
          style={{ minWidth: '150px' }}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search campaigns..."
            className="px-4 py-2 pr-10 border rounded-full shadow focus:outline-none focus:ring focus:border-blue-100 w-full max-w-md"
            onChange={handleSearchChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute right-3 top-3 text-gray-500 pointer-events-none"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.447 11.789l3.85 3.85a1 1 0 01-1.415 1.415l-3.85-3.85a6.5 6.5 0 111.415-1.415zM6.5 11.5a5 5 0 100-10 5 5 0 000 10z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {renderCampaignsByStatus('Upcoming')}
      {renderCampaignsByStatus('Ongoing')}
      {renderCampaignsByStatus('Completed')}
    </div>
  );
}

export default Campaigns;