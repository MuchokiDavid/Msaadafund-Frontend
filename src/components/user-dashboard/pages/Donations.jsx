import React, { useEffect, useState } from 'react'
import moment from 'moment';

function Donations() {
  const [allDonations, setAllDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [filteredDonations, setFilteredDonations] = useState([]);

  const token = localStorage.getItem('token');
  const userName= localStorage.getItem('user');

  // Calculate total pages based on the number of items and items per page
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

  // Get paginated subset of donation items
  const paginatedDonations = filteredDonations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  // Pagination handlers
  const goToPage = (pageNumber) => {
      setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getDonations = async () => {
        // setLoading(true)
        try {
            const response = await fetch('/api/v1.0/user/donations', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                if(data){
                  console.log(data)
                   console.log("Successful request to get user donations");
                    setAllDonations(data);
                    setLoading(false); 
                }
                if(data.error){
                    setLoading(false);
                    console.log(data.error)
                    setErrors(data.error);
                }
                
            }
        }
        catch {
            setErrors("No donations found")
        }
    }
    getDonations();
  }, [token, userName]);

  //filter donations with searchterm
  useEffect(() => {
    const filtered = allDonations.filter((donation) => {
      // Extracting relevant fields for comparison
      const campaignTitle = donation.campaign ? donation.campaign.campaignName : "";
      const organizationName = donation.campaign ? donation.campaign.organisation.orgName : "";
      const campaignCategory = donation.campaign ? donation.campaign.category : "";

      // Converting fields to lowercase for case-insensitive comparison
      const campaignTitleLower = campaignTitle.toLowerCase();
      const organizationNameLower = organizationName.toLowerCase();
      const campaignCategoryLower = campaignCategory.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      // Checking if any of the fields contain the search term
      return (
        campaignTitleLower.includes(searchTermLower) ||
        organizationNameLower.includes(searchTermLower) ||
        campaignCategoryLower.includes(searchTermLower)
      );
    });

    setFilteredDonations(filtered);
  }, [allDonations, searchTerm]);

  if (!token && !userName){
    window.location.href = '/user/login';
  }

// console.log(allDonations)

  return (
    <div>
      <div className="text-sm breadcrumbs ml-2">
          <ul>
              <li><a href='/user/dashboard'>Dashboard</a></li>
              <li>Contributions</li>
          </ul>
      </div>
      <h1 className="mb-1 my-2 text-2xl font-bold leading-tight ">Contributions</h1>
      <hr/>
      {errors && <p className='text-red-700'>{errors}</p>}
      {allDonations && allDonations.length>0
          ?
          (
          <div>
              <div className='flex flex-col mt-1'>
                  <div className='flex justify-between pt-3'>
                      <div>
                          <input
                              type="text"
                              placeholder="Search by organisation, category or campaign"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="border-gray-300 rounded-md bg-gray-50 border h-11 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          />
                      </div>
                  </div>
                  <div className="my-3 inline-block min-w-full overflow-scroll align-middle border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full table-zebra text-xs overflow-x-auto">
                          {/* head */}
                          <thead>
                              <tr>
                                  <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>ID</th>
                                  <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Invoice Id</th>
                                  <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Amount</th>  
                                  <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Campaign</th>
                                  <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Category</th>
                                  <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Start Date</th>   
                                  <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>End Date</th>  
                                  <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Organisations</th>
                                  <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Donation Date</th>
                                  <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Invoice Id</th>                        
                              </tr>
                          </thead>
                          <tbody>
                              {paginatedDonations.map((donation, index) => {
                                  return (
                                      <tr key={donation._id}>
                                          <td className='px-6 py-4 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-sm text-gray-900'>{index + 1}</div>
                                          </td>
                                          <td className='px-6 py-4 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-sm text-gray-900'>{donation.invoice_id}</div>
                                          </td>
                                          <td className='px-6 py-4 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-sm text-gray-900'>{donation.amount}</div>
                                          </td>
                                          <td className='px-6 py-4 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-sm text-gray-900'>{donation.campaign ? donation.campaign.campaignName : ""}</div>
                                          </td>
                                          <td className='px-6 py-4 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-sm text-gray-900'>{donation.campaign ? donation.campaign.category : ""}</div>
                                          </td>
                                          <td className='px-6 py-4 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-sm text-gray-900'>{donation.campaign ? donation.campaign.startDate : ""}</div>
                                          </td>
                                          <td className='px-6 py-4 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-sm text-gray-900'>{donation.campaign ? donation.campaign.endDate : ""}</div>
                                          </td>
                                          <td className='px-6 py-4 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-sm text-gray-900'>{donation.campaign ? donation.campaign.organisation.orgName : ""}</div>
                                          </td>
                                          <td>
                                              <div className='text-sm text-gray-900'>{donation.donationDate}</div>
                                          </td>
                                      </tr>
                                  );
                              })}
                          </tbody>
                      </table>
                  </div>
              </div>
              {totalPages && totalPages>1
              ?
              <div className="flex justify-center mb-4 join grid-cols-2">
                  {/* Previous page button */}
                  <button className="btn btn-outline join-item" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                      Previous
                  </button>

                  {/* <div className='border border-gray-400 flex justify-center p-2 btn-outline w-fit'>{currentPage} of {totalPages}</div> */}
                  {/* Next page button */}
                  <button
                      className="btn btn-outline join-item"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                  >
                      Next
                  </button>
              </div>
              :
              null
              }
              
          </div>
      )
      :
      (
          <div className='grid grid-cols-1 gap-4 mt-3 px-4'>
        <div>
          <p className='text-red-500'>No contributions to display. Make contributions to view the contributions</p> 
        </div>
      </div>
      )
     }
    </div>
  )
}

export default Donations