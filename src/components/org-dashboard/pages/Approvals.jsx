import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../context/Utils';

function Approvals() {

    const [transactions, setTransactions] = useState([]);
  
    const accessToken = localStorage.getItem('token');

    useEffect(() => {
        const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
        };
        axios.get(`${apiUrl}/api/v1.0/org_awaiting_approvals`, config)
        .then((res) => {
            setTransactions(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [accessToken]);

    // console.log(transactions)

  return (
    <div>
        <div className="text-sm breadcrumbs ml-2">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li><a href='/org/dashboard/transact/approvals'>Pending approvals</a></li>
            </ul>
        </div>
        <h1 className="mb-1 my-2 text-2xl font-bold leading-tight ">Pending Approvals</h1>
        <hr/>
        <div className="overflow-x-auto">
            <table className="table table-xs text-xs bg-white">
                <thead className='text-balance text-gray-800 bg-gray-100'>
                    <tr>
                    <th className='px-3 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Id</th>
                    <th className='px-3 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Recipient</th>
                    <th className='px-3 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Campaign</th>
                    <th className='px-3 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Trans. Type</th>
                    <th className='px-3 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Trans. Acc No</th>
                    <th className='px-3 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Acc. Ref</th>
                    <th className='px-3 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Amount</th>
                    <th className='px-3 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Approvals</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-t">
                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>{transaction.id}</td>
                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>{transaction.name}</td>
                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 ' >{transaction.campaign_name}</td>
                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>{transaction.trans_type}</td>
                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>{transaction.transaction_account_no}</td>
                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>{transaction.acc_refence}</td>
                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>{transaction.amount}</td>
                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>
                          <ul>
                            {transaction.approvals && transaction.approvals.map((approval) => (
                              <li key={approval.id}>
                                {/* signatory name */}
                                {approval && approval.signatory && approval.signatory.firstname}: {approval && approval.approval_status ? 'Approved' : 'Pending'} 
                              </li>
                            ))}
                          </ul>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Approvals