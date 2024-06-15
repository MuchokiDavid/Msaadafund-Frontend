import React, { useEffect, useState } from 'react'

function Donations({allDonation}) {
  const [allDonations, setAllDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
//   const [errors, setErrors] = useState();
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
    setAllDonations(allDonation)
  }, [allDonation])

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
console.log(paginatedDonations)

  return (
    <div>
      <div className="text-sm breadcrumbs ml-2">
          <ul>
              <li><a href='/user/dashboard'>Dashboard</a></li>
              <li>Contributions</li>
          </ul>
      </div>
      <h1 className="mb-1 my-2 text-xl font-bold leading-tight ">Contributions</h1>
      <hr/>
      {/* {errors && <p className='text-red-700'>{errors}</p>} */}
      {allDonations && allDonations.length>0
          ?
          (
          <div>
              <div className='flex flex-col mt-1'>
                  <div className='flex justify-between pt-3'>
                      <div>
                          <input
                              type="text"
                              placeholder="Search by organisation,campaign or category "
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="border-gray-300 rounded-md bg-white border h-10 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          />
                      </div>
                  </div>
                  <div className="my-3 inline-block min-w-full overflow-scroll align-middle border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full border table rounded-lg overflow-x-auto text-xs bg-white statTable">
                          {/* head */}
                          <thead className='text-gray-800 bg-gray-100'>
                              <tr>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>ID</th>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Invoice Id</th>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Amount</th>  
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Campaign</th>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Category</th>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Start Date</th>   
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>End Date</th>  
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Organisations</th>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Donation Date</th>                    
                              </tr>
                          </thead>
                          <tbody>
                              {allDonations && paginatedDonations.map((donation, index) => {
                                  return (
                                      <tr key={donation._id}>
                                          <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-gray-900'>{index + 1}</div>
                                          </td>
                                          <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-gray-900'>{donation.invoice_id}</div>
                                          </td>
                                          <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-gray-900'>{donation.currency} {donation.amount}</div>
                                          </td>
                                          <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-gray-900'>{donation.campaign ? donation.campaign.campaignName : ""}</div>
                                          </td>
                                          <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-gray-900'>{donation.campaign ? donation.campaign.category : ""}</div>
                                          </td>
                                          <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-gray-900'>{donation.campaign ? donation.campaign.startDate : ""}</div>
                                          </td>
                                          <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-gray-900'>{donation.campaign ? donation.campaign.endDate : ""}</div>
                                          </td>
                                          <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                              <div className='text-gray-900'>{donation.campaign ? donation.campaign.organisation.orgName : ""}</div>
                                          </td>
                                          <td>
                                              <div className='text-gray-900'>{donation.donationDate}</div>
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
                  <button className="btn btn-outline btn-sm join-item" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                      Previous
                  </button>

                  {/* <div className='border border-gray-400 flex justify-center p-2 btn-outline w-fit'>{currentPage} of {totalPages}</div> */}
                  {/* Next page button */}
                  <button
                      className="btn btn-outline join-item btn-sm"
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
          <div className='grid grid-cols-1 gap-4 mt-3 px-4 py-6'>
        <div>
          <p className='text-red-500 text-xl'>No contributions to display. Make contributions to view the contributions</p> 
        </div>
      </div>
      )
     }
    </div>
  )
}

export default Donations