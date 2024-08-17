import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../context/Utils';
// import { FaFilePdf } from "react-icons/fa";


function Transactions({allCampaigns, campaignError}) {
    const [allCampaign, setAllCampaign] = useState(allCampaigns);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(campaignError);
    const token = localStorage.getItem('token');
    const org= localStorage.getItem('org')
    const [transactions, setTransactions] = useState([])
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

     // Calculate total pages based on the number of items and items per page
     const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

     // Get paginated subset of donation items
     const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
 
     // Pagination handlers
     const goToPage = (pageNumber) => {
         setCurrentPage(pageNumber);
     };

    useEffect(() => {
      setErrors('')
      setAllCampaign(allCampaigns)
    }, [token, allCampaigns])

    useEffect(() => {
      setErrors(campaignError)
    }, [token, campaignError])

    //search data in the filtered data
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTransactions(transactions); // If no search term, show all transactions
      return;
    }
  
    const filtered = transactions && transactions.filter(transaction => {
      return (
        (transaction.running_balance && String(transaction.running_balance).toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.value && String(transaction.value).toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.trans_type && String(transaction.trans_type).toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.invoice && transaction.invoice.invoice_id && String(transaction.invoice.invoice_id).toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.invoice && transaction.invoice.account && String(transaction.invoice.account).toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  
    setFilteredTransactions(filtered);
  }, [searchTerm, transactions]);

  console.log(transactions)

  //  Fetch data from server when with a given id
  const handleFetchTransaction= async (id)=>{
    if(token){
      let url = `${apiUrl}/api/v1.0/filter_transactions/${id}`;
      setLoading(true);
      try {
        // console.log(url)
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
          });
          const data = await response.json();
          if (response.ok) {
              setLoading(false);
              console.log("Successful request to get transactions");
              setTransactions(data);
          } else {
              setLoading(false);
              throw new Error(data);
          }
      }
      catch {
        setLoading(false);
        setErrors("Error getting transactions data");
      }
    }
  }

    useEffect(() => {
      if (!allCampaign || !allCampaign.length){return}
      allCampaign.forEach(campaign => {
        if (filter === campaign.campaignName) {
          handleFetchTransaction(campaign.walletId);
        }
      });
      // eslint-disable-next-line 
    }, [token, filter, allCampaign]);

    useEffect(() => {
      if (!allCampaign && allCampaign.length===0){
        setErrors(null)
      }
    }, [allCampaign])
    

    //function to handle change in filter
    function handleFilterChange(e){
      setFilter(e.target.value)   
    }

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);
    }

    if(!token && !org){
      window.location.href('/org/login')
    }

    // if(loading){
    //   // return(<div className='flex justify-center'><span className="loading loading-dots loading-lg"></span></div>)
    //   return (
    //     <div class="flex items-center justify-center h-screen">
    //         <span className="loading loading-dots loading-lg text-blue-500"></span>
    //       </div>
    //     )
    // }   

  return (
    <div>
            <div className="text-sm breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li>
                    <li><a href='/org/dashboard/transaction'>Transactions</a></li>
                </ul>
            </div>
            <h1 className="mb-3 my-2 text-2xl font-bold leading-tight ">All Transactions</h1>
            <hr className='mb-0' />
            {errors && <p className='text-red-700'>{errors}</p>}
            {allCampaign && allCampaign.length > 0 && !errors ? 
            (<div className='mt-2 text-lg font-normal text-red-400'>Select campaign to view transactions</div>)
            :
            (null)
            }
            <form className="flex flex-col md:flex-row gap-3 mt-4 ml-2">
              <select
                  className="sm:w-full md:w-1/6 h-10 border-2 border-gray-400 focus:outline-none focus:border-sky-500 text-gray-900 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
                  placeholder="transaction type"
                  onChange={handleFilterChange}
                  value={filter}
                  >
                  <option className='lg:text-lg sm:text-sm'><span className='text-red-400'>*</span>Select campaign</option>
                  {
                      allCampaign && allCampaign.map((camp, i)=>(<option className='text-sm' key={i}>{camp.campaignName}</option>))
                  }
              
              </select>
              <div className="flex">
                  <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearchTermChange}
                      className="w-full md:w-80 px-3 h-10 rounded border-2 border-gray-500 focus:outline-none focus:border-sky-500"
                  />
              </div>              
            </form>
            {/* <div class="flex items-center space-x-4 mt-4">
              <select
                className="mb-3 h-10 px-3 py-2 border-gray-300 rounded-md bg-white border text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block sm:w-1/5 lg:w-1/4 p-2.5 "
                placeholder="transaction type"
                onChange={handleFilterChange}
                value={filter}
              >
                <option className='lg:text-lg sm:text-sm'><span className='text-red-500'>*</span>Select campaign</option>
                {
                  allCampaign && allCampaign.map((camp, i)=>(<option className='text-sm' key={i}>{camp.campaignName}</option>))
                }
                
              </select>
              <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    className="px-3 py-2 border-gray-400 rounded-md mb-4 bg-white border h-10 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block sm:w-1/5 lg:w-1/4 p-2.5 "
                /> 
            </div> */}
            <div className='flex flex-col col-span-3'>
              <div className='py-2 -my-2 overflow-x-auto sm:-mx-2 sm:px-6 lg:-mx-2 lg:px-4'>
               
                    {allCampaign && allCampaign.length > 0 && !errors ?
                    (
                      <div>
                       <div className="my-5 inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                         
                        <div className="overflow-x-auto">
                            <table className="min-w-full border table rounded-lg overflow-x-auto text-xs bg-white statTable text-left">
                              <thead className='text-gray-800 bg-gray-100'>
                                <tr>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>INVOICE</th>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>AMOUNT</th>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>STATUS</th>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>BALANCE</th>
                                  {/* <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>NARRATIVE</th> */}
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>TRANS TYPE</th>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>ACCOUNT</th>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>DATE</th>
                                  <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '></th>
                                </tr>
                              </thead>                              
                              <tbody>
                                {loading? <div className='flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>:null}
                                {paginatedTransactions && paginatedTransactions.map((item) => (
                                  <tr key={item.transaction_id}>
                                    <td>{item.transaction_id}</td>
                                    <td>{item.value}</td>
                                    <td>{item.status}</td>
                                    <td>{item.currency} {item.running_balance}</td>
                                    {/* <td>{item.narrative}</td> */}
                                    <td>{item.trans_type}</td>
                                    <td>{item.invoice ? item.invoice.account : null}</td>
                                    <td>{new Date(item.updated_at).toLocaleString()}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                        </div>
                      </div>
                      </div>   
                    )
                    :
                    (
                      <div className='grid grid-cols-1 gap-4 mt-3 px-1'>
                        <div>
                            <p className='text-red-500'>No campaign found. Create campaign to start receiving donations</p> 
                        </div>
                        <div>
                            <a href='/org/dashboard/createcampaign'><button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                                Create Campaign
                            </button></a>
                        </div>
                    </div>
                    )
                    }
                    
            </div>
            <div className="flex justify-center my-4 join grid-cols-2">
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
          </div>     
    </div>
  )
}

export default Transactions