import React, { useState, useEffect } from 'react'
import { apiUrl } from '../../../context/Utils';
import axios from 'axios';
import * as XLSX from 'xlsx';

function Withdrawals() {
    const [allWithdrawals, setAllWithdrawals] = useState([]);
    const token = localStorage.getItem('token');
    const [errors, setErrors] = useState(null);
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading]= useState(false)
    const itemsPerPage = 15;
    const [format,setFormat] = useState('');

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
        setLoading(true)
        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        };
        axios.get(`${apiUrl}/api/v1.0/withdraw_transactions`, config)
        .then((res) => {
            setLoading(false)
            setAllWithdrawals(res.data.message);
        })
        .catch((err) => {
            setLoading(false)
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

    const handleExcel = () => {
        if (!allWithdrawals || allWithdrawals.length === 0) {
          setErrors('No donations to download');
          return;
        }
      
        const headers = [
          "Tracking Id",
          "Name",
          "Campaign",
          "Account",
          "Account Reference",
          "Trans Type",
          "Amount",
          "Trans Status",
          "Completion Date"
        ];
      
        const data = allWithdrawals && allWithdrawals.map((withdrawal) => {
            return [
                withdrawal.tracking_id,
                withdrawal.org_name,
                withdrawal.campaign_name,
                withdrawal.transaction_account_no,
                withdrawal.acc_refence,
                withdrawal.trans_type,
                withdrawal.amount,
                withdrawal.trans_status,
                withdrawal.transaction_date
            ]});
      
        const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Withdrawals");
      
        XLSX.writeFile(wb, `msaaadafund_withdrawals_${new Date().toLocaleDateString()}.xlsx`);
      };

    useEffect(() => {
        if (format === 'pdf') {
            downloadTransactionPDF();
        } else if (format === 'excel') {
            handleExcel();
        }
        //eslint-disable-next-line
      }, [format]);

      console.log(allWithdrawals)

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
                <div className='mr-2 py-2'>
                    <select className='py-2 rounded' onChange={(e)=>setFormat(e.target.value)}>
                        <option>
                            Download
                        </option> 
                        <option value={"pdf"} className='text-red-600'>
                            PDF
                        </option> 
                        <option value={"excel"} className='text-green-600'>
                            Excel
                        </option> 
                    </select>
                </div>

                {/* <button title='Download Pdf' onClick={downloadTransactionPDF}>
                    PDF<FaFilePdf size={25} style={{ color: 'red' }} />
                </button> */}
            </div>
            <div className='text-sm text-red-500'>{errors}</div>
                <div>
                    <div className='overflow-scroll my-4 bg-white border rounded-lg'>
                        <table className='table table-xs bg-white'>
                            <thead className='text-gray-800 bg-gray-100 text-left uppercase'>
                                <tr className='text-gray-800 bg-gray-100'>
                                    <th className='px-2 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Tracking id</th>
                                    <th className='px-2 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Name</th>
                                    <th className='px-2 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Campaign</th>
                                    <th className='px-2 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Account</th>
                                    <th className='px-2 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Account Ref.</th>
                                    <th className='px-2 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Trans Type</th>
                                    <th className='px-2 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Amount</th>
                                    <th className='px-2 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Trans Status</th>
                                    <th className='px-2 py-3 font-medium leading-4 tracking-wider text-left uppercase border-b border-gray-200 '>Trans date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan="8" className="text-left">
                                            <span className="loading loading-dots loading-lg"></span>
                                        </td>
                                    </tr>
                                )}
                                {!loading && currentItems.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-left">
                                            No data available
                                        </td>
                                    </tr>
                                )}

                                {currentItems.map((withdrawal, index) => (
                                    <tr key={index}>
                                        <td>{withdrawal.tracking_id}</td>
                                        <td>{withdrawal.org_name}</td>
                                        <td>{withdrawal.campaign_name}</td>
                                        <td>{withdrawal.transaction_account_no}</td>
                                        <td>{withdrawal.acc_refence}</td>
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
        </div>
    )
}

export default Withdrawals;
