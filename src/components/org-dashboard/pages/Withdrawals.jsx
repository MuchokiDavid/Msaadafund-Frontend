import React, { useState, useEffect } from 'react'
import { FaFilePdf } from "react-icons/fa";
import { apiUrl } from '../../../context/Utils';
import axios from 'axios';

function Withdrawals() {
    const [allWithdrawals, setAllWithdrawals] = useState([]);
    const token = localStorage.getItem('token');
    const [errors, setErrors] = useState(null);
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    //useEffect to filter all withdrawals with the search term in the search input
    useEffect(() => {
        const filteredWithdrawals = allWithdrawals && allWithdrawals.filter(withdrawal => {
            return (
                (withdrawal.running_balance && withdrawal.running_balance.toLowerCase().includes(search.toLowerCase())) ||
                (withdrawal.org_name && withdrawal.org_name.toLowerCase().includes(search.toLowerCase())) ||
                (withdrawal.campaign_name && withdrawal.campaign_name.toLowerCase().includes(search.toLowerCase())) || 
                (withdrawal.trans_type && withdrawal.trans_type.toLowerCase().includes(search.toLowerCase())) ||
                (withdrawal.transaction_account_no && withdrawal.transaction_account_no.toLowerCase().includes(search.toLowerCase()))
            );
        });
        setFiltered(filteredWithdrawals);
      
    }, [search, allWithdrawals, setAllWithdrawals]);

    useEffect(() => {
        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        };
        axios.get(`${apiUrl}/api/v1.0/withdraw_transactions`, config)
        .then((res) => {
            setAllWithdrawals(res.data.message);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [token]);

    if (!token) {
        window.location.href = '/';
    }

    //Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    //Pagination handlers
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // handle pdf route
    const downloadTransactionPDF = (id) => {
        const token = localStorage.getItem('token');
        const url = `${apiUrl}/api/v1.0/withdraw_pdf`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/pdf',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to download PDF');
            }

            return response.blob();
        })
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'transactions.pdf';

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            setErrors('Error downloading PDF, Please try again later');
        });
    };

    return (
        <div>
            <div className="text-sm breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li>
                    <li><a href='/org/dashboard/transact/withdrawals'>Withdrawals</a></li>
                </ul>
            </div>
            <div>
                <h1 className="font-extrabold text-2xl">Withdrawals</h1>
                <hr className='mb-2' />
            </div>
            <div className='flex justify-between'>
                <div className='flex'>
                    <input type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder='Search...' 
                        className='input input-bordered w-full max-w-xs bg-white' 
                    />
                </div>
                <button title='Download Pdf' onClick={downloadTransactionPDF}>
                    PDF<FaFilePdf size={25} style={{ color: 'red' }} />
                </button>
            </div>
            <div className='text-sm text-red-500'>{errors}</div>
            {allWithdrawals && allWithdrawals.length === 0 ? (
                <div className='grid grid-cols-1 gap-4 mt-3 px-4'>
                    <div>
                        <p className='text-red-500'>No withdrawals to display.</p>
                    </div>
                    <div>
                        <a href='/org/dashboard/createcampaign'>
                            <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                                Create Campaign
                            </button>
                        </a>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='overflow-scroll my-4 bg-white border rounded-lg'>
                        <table className='table w-full min-w-full text-xs overflow-x-auto text-left'>
                            <thead className='text-gray-800 bg-gray-100 text-left uppercase'>
                                <tr className='text-gray-800 bg-gray-100'>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Tracking id</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Name</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Campaign</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Account No</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Trans Type</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Amount</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Trans Status</th>
                                    <th className='px-6 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Trans date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((withdrawal, index) => (
                                    <tr key={index}>
                                        <td>{withdrawal.tracking_id}</td>
                                        <td>{withdrawal.org_name}</td>
                                        <td>{withdrawal.campaign_name}</td>
                                        <td>{withdrawal.transaction_account_no}</td>
                                        <td>{withdrawal.trans_type}</td>
                                        <td>KES {withdrawal.amount}</td>
                                        <td>{withdrawal.trans_status}</td>
                                        <td>{withdrawal.transaction_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center my-4 join grid-cols-2">
                        <button className="btn btn-outline join-item  btn-sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button
                            className="btn btn-outline join-item btn-sm"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Withdrawals;
