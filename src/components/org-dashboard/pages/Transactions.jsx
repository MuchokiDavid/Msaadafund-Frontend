import React, { useEffect, useState } from 'react'

function Transactions({allCampaigns, campaignError, handleFetching}) {
    const [allCampaign, setAllCampaign] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();
    const token = localStorage.getItem('token');
    const [transactions, setTransactions] = useState([])
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
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
      
      const filtered = transactions.filter(transaction => {
        return (
            (transaction.running_balance && transaction.running_balance.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (transaction.value && transaction.value.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (transaction.trans_type && transaction.trans_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (transaction.invoice && transaction.invoice.account && transaction.invoice.account.toLowerCase().includes(searchTerm.toLowerCase()))
          );
      });

      setFilteredTransactions(filtered);
  }, [searchTerm, transactions]);

  //  Fetch data from server when with a given id
  const handleFetchTransaction= async (id)=>{
    if(token){
      let url = `/api/v1.0/filter_transactions/${id}`;
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
              setLoading(true);
              throw new Error(data);
          }
      }
      catch {
          setErrors("Error getting donation data");
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
    }, [token, filter, allCampaign]);


    //function to handle change in filter
    function handleFilterChange(e){
      setFilter(e.target.value)
    }

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);
    }
    if (loading) {
        return <div className='sm:h-screen'><span className="loading loading-dots loading-lg"></span></div>;
    }
    
  // console.log(allCampaigns)
  // console.log(filter)
  // console.log(transactions)
  // console.log(searchTerm)
  return (
    <div>
      <div className='h-screen mx-3'>
            <div className="text-md breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Home</a></li>
                    <li><a href='/org/dashboard/transaction'>Transactions</a></li>
                </ul>
            </div>
            <h1 className="mb-3 my-2 text-2xl font-bold leading-tight ">My Transactions</h1>
            <hr className='mb-0' />
            {errors && <p className='text-red-700'>{errors}</p>}
            <div className='mt-2 text-lg font-normal'>Select campaign to view transactions</div>
            <div className='flex flex-col'>
              <div className='py-2 -my-2 overflow-x-auto sm:-mx-2 sm:px-6 lg:-mx-2 lg:px-6'>
                <div className="my-5 inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <div class="flex items-center space-x-4">
                      <select
                        className="mb-3 h-10 px-3 py-2 border-gray-300 rounded-md bg-gray-50 border text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-1/6 p-2.5 "
                        placeholder="transaction type"
                        onChange={handleFilterChange}
                        value={filter}
                      >
                        <option className='lg:text-lg sm:text-sm'>Select campaign</option>
                        {
                          allCampaign.map((camp, i)=>(<option className='lg:text-lg sm:text-sm' key={i}>{camp.campaignName}</option>))
                        }
                        
                      </select>
                      <input
                            type="text"
                            placeholder="Search... eg. Trans-type,amount & invoice acc.no."
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            className="px-3 py-2 border-gray-300 rounded-md mb-4 bg-gray-50 border h-10 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-1/4 p-2.5 "
                        />
                      </div>                 
                  
                  <div className="overflow-x-auto rounded-lg">
                    <table className="table table-md table-pin-rows table-pin-cols table-auto">
                      <thead>
                        <tr>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50'>ID</th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50'>AMOUNT</th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50'>STATUS</th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50'>RUNNING BALANCE</th>
                          {/* <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50'>NARRATIVE</th> */}
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50'>TRANSACTION TYPE</th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50'>INVOICE ACCOUNT</th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50'>UPDATED AT</th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50'></th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedTransactions && paginatedTransactions.map((item) => (
                          <tr key={item.transaction_id}>
                            <td>{item.transaction_id}</td>
                            <td>{item.value}</td>
                            <td>{item.status}</td>
                            <td>{item.running_balance}</td>
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
            
            </div>

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
            
        </div>
    </div>
  )
}

export default Transactions