import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

function Subscriptions({allSubscriptions}) {
    const[subscriptions,setSubscriptions]=useState([])
    const token=localStorage.getItem('token')
    const user=localStorage.getItem('user')
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

     // Calculate total pages based on the number of items and items per page
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);

      // Get paginated subset of donation items
      const paginatedSubscriptions = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      
      // Pagination handlers
      const goToPage = (pageNumber) => {
          setCurrentPage(pageNumber);
      };


    useEffect(() => {
      setSubscriptions(allSubscriptions)
    }, [allSubscriptions])

    useEffect(() => {
      const filtered = subscriptions.filter((item) => {
        // Extract orgName from the organization object
        const orgName = item.organisation ? item.organisation.orgName : "";
        // Convert orgName to lowercase for case-insensitive comparison
        const orgNameLower = orgName.toLowerCase();
        // Convert the search term to lowercase for case-insensitive comparison
        const searchTermLower = searchTerm.toLowerCase();
        // Check if the orgName contains the search term
        return orgNameLower.includes(searchTermLower);
      });
    
      setFilteredData(filtered);
    }, [subscriptions, searchTerm]);
    
    
    //function to unsubscribe from an organisation
    const unsubscribe=(id)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: `You are about to unsubscribe!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Unsubscribe!'
      }).then((result) => {
          if (result.isConfirmed) {
              try {
                  const config = {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  };
                  const response = axios.delete(`/api/v1.0/subscription/${id}`, config);
                  if(response.status===200){   
                      Swal.fire({
                          title: `Unsubscribed from orgname Updates`,
                          text: `You have successfully unsubscribed from updates from orgname. If you change your mind, you can always subscribe later. Thank you for your support.`,
                          icon: "success"
                      }).then((result)=>{
                          if(result.isConfirmed){
                              window.location.reload();
                          }
                      });                                                           
                  }
                  // setSubscribe(false);
              } catch (error) {
                  const errorMsg = error.response?.data?.error || 'An error occurred';
                  console.error(errorMsg);
                  // setSubscribe(false);
              }
          }
      });
    }
    // console.log(subscriptions)

  return (
    <div>
      <div className="text-sm breadcrumbs ml-2">
          <ul>
              <li><a href='/user/dashboard'>Dashboard</a></li>
              <li>Subscriptions</li>
          </ul>
      </div>
      <h1 className="mb-1 my-2 text-xl font-bold leading-tight ">Subscriptions</h1>
      <hr/>
      {subscriptions && subscriptions.length>0
        ?
        (
          <div className="flex flex-col mt-1">
            <div className="flex justify-between pt-3">
                <div>
                    <input type="text" placeholder='Search organisation...' 
                    className='border border-gray-300 rounded-md px-2 py-1 w-full'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-4 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full table-zebra text-sm overflow-x-auto">
                            <thead className="border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                                        ID
                                        </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                                        Organisation
                                        </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                                        Address
                                        </th> 
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                                        Action
                                        </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paginatedSubscriptions.map((subscription,index)=>{
                                        return(
                                            <tr key={index} className="border-b">
                                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                    {index+1}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                    {subscription.organisation.orgName}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                    {subscription.organisation.orgAddress}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                    <button onClick={()=>unsubscribe(subscription._id)} className='bg-red-500 px-3 py-1 rounded-md text-white'>Unsubscribe</button>
                                                </td>
                                            </tr>
                                        )
                                    })

                                }
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
        </div>
        )
        :
        (
          <div className="flex justify-center items-center mt-4">
            <div className="text-xl text-red-500">No Subscriptions Yet</div>
          </div>
        )
      }
      
    </div>
  )
}

export default Subscriptions