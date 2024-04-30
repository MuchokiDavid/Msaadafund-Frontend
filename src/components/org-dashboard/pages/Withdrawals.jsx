import React, { useState, useEffect } from 'react'
import { FaFilePdf } from "react-icons/fa";

function Withdrawals() {
    const[allWithdrawals, setAllWithdrawals]=useState([])
    const token=localStorage.getItem('token')
    const[errors,setErrors]= useState(null)
    const[search,setSearch]=useState('')
    const[filtered,setFiltered]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[itemsPerPage,setItemsPerPage]=useState(10)

    //useefect to filter all withdrawals with the search term in the search input
    useEffect(() => {
        const filteredWithdrawals = allWithdrawals.filter(withdrawal => {
            return (
                (withdrawal.running_balance && withdrawal.running_balance.toLowerCase().includes(search.toLowerCase())) ||
                (withdrawal.org_name && withdrawal.org_name.toLowerCase().includes(search.toLowerCase())) ||
                (withdrawal.campaign_name && withdrawal.campaign_name.toLowerCase().includes(search.toLowerCase())) || 
                (withdrawal.trans_type && withdrawal.trans_type.toLowerCase().includes(search.toLowerCase())) ||
                (withdrawal.transaction_account_no && withdrawal.transaction_account_no.toLowerCase().includes(search.toLowerCase()))
            );
        });
        setFiltered(filteredWithdrawals);
      
    }, [search,allWithdrawals])
    

    useEffect(()=>{
        const handleFetch= async()=>{
            await fetch('/api/v1.0/withdraw_transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.message){
                setAllWithdrawals(data.message)
                }
                if(data.error){
                    setErrors(data.error)
                }
            })
        }
        handleFetch()        
    },[token, ])

    if(!token){
        window.location.href='/'
    }

    //Pagination
    const indexOfLastItem=currentPage*itemsPerPage
    const indexOfFirstItem=indexOfLastItem-itemsPerPage
    const currentItems=filtered.slice(indexOfFirstItem,indexOfLastItem)
    const totalItems=filtered.length
    const totalPages=Math.ceil(totalItems/itemsPerPage)
    
    //Pagination handlers
    const goToPage=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
// handle pdf route
    // get route from backend
    const downloadTransactionPDF=(id)=> {
        const token = localStorage.getItem('token');
        const url = `/api/v1.0/withdraw_pdf`;
    
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/pdf',  // Specify that we expect a PDF file in the response
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to download PDF');
            }
    
            // Convert the response to a Blob (binary data) for the PDF file
            return response.blob();
        })
        .then(blob => {
            // Create a URL for the blob data
            const blobUrl = URL.createObjectURL(blob);
    
            // Create an anchor element for downloading the file
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'transactions.pdf';  // Specify the filename for the downloaded file
    
            // Append the link to the document body
            document.body.appendChild(link);
    
            // Programmatically trigger a click on the link to start the download
            link.click();
    
            // Remove the link from the DOM after the download
            document.body.removeChild(link);
    
            // Revoke the blob URL to release memory
            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            setErrors('Error downloading PDF, Please try again later');
        });
    }


  return (
    <div>
        <div className="text-sm breadcrumbs ml-2">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li><a>Withdrawals</a></li>
            </ul>
        </div>
        <div>
            <h1 className="font-extrabold text-2xl">Withdrawals</h1>
            <hr className='mb-2'/>
        </div>
        {/* div with a search input to help search data in the table and also export to pdf button on the same column*/}
        <div className='flex justify-between'>
            <div className='flex'>
                <input type="text" 
                value={search}
                onChange={(e)=>setSearch(e.target.value)} 
                placeholder='Search...' 
                className='input input-bordered w-full max-w-xs'/>
            </div>
            {/* pdf button */}
            <button title='Download Pdf' onClick={downloadTransactionPDF}>PDF<FaFilePdf size = {25} style={{ color: 'red' }}/></button>
        </div>
        <div className='text-sm text-red-500'>{errors}</div>
        <div className='overflow-scroll my-4'>
            <table className='table w-full min-w-full table-zebra text-xs overflow-x-auto'>
                <thead>
                    <tr>
                        <th className='font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>S/N</th>
                        <th className='font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Tracking id</th>
                        <th className='font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Name</th>
                        <th className='font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Campaign</th>
                        <th className='font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Account Number</th>
                        <th className='font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Transaction Type</th>
                        <th className='font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Amount</th>
                        <th className='font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Transaction Status</th>
                        <th className='font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Transaction date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((withdrawal,index)=>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{withdrawal.tracking_id}</td>
                            <td>{withdrawal.org_name}</td>
                            <td>{withdrawal.campaign_name}</td>
                            <td>{withdrawal.transaction_account_no}</td>
                            <td>{withdrawal.trans_type}</td>
                            <td>{withdrawal.amount}</td>
                            <td>{withdrawal.trans_status}</td>
                            <td>{withdrawal.transaction_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
  )
}

export default Withdrawals