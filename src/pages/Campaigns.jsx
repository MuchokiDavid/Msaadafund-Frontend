import React, { useState, useEffect } from 'react';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/v1.0/campaigns')
      .then(response => response.json())
      .then(data => {
        setCampaigns(data);
        const uniqueCategories = getUniqueCategories(data);
        setCategories(['All', ...uniqueCategories]);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getUniqueCategories = (campaignsData) => {
    const uniqueCategories = new Set();
    campaignsData.forEach(campaign => {
      uniqueCategories.add(campaign.category);
    });
    return Array.from(uniqueCategories);
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
      const categoryMatch = selectedCategory === 'All' || campaign.category === selectedCategory;
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCampaigns.map((campaign, index) => (
            <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg bg-white transition duration-300 flex flex-col">
              <img className="w-full" src={campaign.banner} alt={campaign.campaignName} />
              <div className="px-6 py-4 flex-grow">
                <div className="text-primary text-3xl mb-2">{campaign.campaignName}</div>
                <p className="text-black text-base">{campaign.description}</p>
                <p className="text-black text-base">Category: {campaign.category}</p>
                <p className="text-black text-base">Start Date: {campaign.startDate}</p>
                <p className="text-black text-base">End Date: {campaign.endDate}</p>
                <p className="text-black text-base">Target Amount: Ksh {campaign.targetAmount}</p>
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

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">Campaigns</h1>
      <div className="mb-4">
        <label htmlFor="categoryFilter" className="mr-4">Filter by Category:</label>
        <select id="categoryFilter" onChange={handleCategoryChange} value={selectedCategory} className="border rounded-lg px-8 py-1">
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search campaigns..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleSearchChange}
        />
      </div>
      {renderCampaignsByStatus('Upcoming')}
      {renderCampaignsByStatus('Ongoing')}
      {renderCampaignsByStatus('Completed')}
    </div>
  );
}

export default Campaigns;