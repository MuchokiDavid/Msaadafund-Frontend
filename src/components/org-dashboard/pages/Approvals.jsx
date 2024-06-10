import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Approvals() {

    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    const accessToken = localStorage.getItem('token');
    const config = {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        }
    };

    useEffect(() => {
        const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
        };
        axios.get('/api/v1.0/org_awaiting_approvals', config)
        .then((res) => {
            setTransactions(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

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
            <table className="table table-compact w-full text-xs bg-white">
                <thead className='text-balance'>
                    <tr>
                    <th>Id</th>
                    <th>Recipient</th>
                    <th>Campaign Name</th>
                    <th>Transaction Type</th>
                    <th>Transaction Acc No</th>
                    <th>Acc Reference</th>
                    <th>Amount</th>
                    <th>Signatory Approvals</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-t">
                        <td>{transaction.id}</td>
                        <td>{transaction.name}</td>
                        <td >{transaction.campaign_name}</td>
                        <td>{transaction.trans_type}</td>
                        <td>{transaction.transaction_account_no}</td>
                        <td>{transaction.acc_refence}</td>
                        <td>{transaction.amount}</td>
                        <td>
                          <ul>
                            {transaction.approvals && transaction.approvals.map((approval) => (
                              <li key={approval.id}>
                                Signatory {approval.signatory_id}: {approval.approval_status ? 'Approved' : 'Pending'}
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