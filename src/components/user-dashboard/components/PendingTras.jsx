import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FcApprove } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";


function PendingTras() {
  const [transactions, setTransactions] = useState([]);
  
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
    axios.get('/api/v1.0/pending_transactions', config)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleApproval = (transactionId, campaignName) => {
    axios.post('/api/v1.0/approve_transaction', {
      transaction_id: transactionId,
      approval_status: true,
      campaign_name: campaignName
    }, config)
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Transaction approved successfully",
          icon: "success",
          confirmButtonText: "OK",
        })
        .then(()=>{
          window.location.reload()
        })
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || 'An error occurred';
        Swal.fire({
          title: "Error!",
          text: errorMsg,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error(errorMsg);
      });
  };

  const handleReject = (transactionId) => {
    axios.patch(`/api/v1.0/reject_approval/${transactionId}`, {}, config)
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Transaction rejected successfully",
          icon: "success",
          confirmButtonText: "OK",
        })
        .then(()=>{
          window.location.reload()
        })
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'An error occurred';
        Swal.fire({
          title: "Error!",
          text: errorMsg,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error(errorMsg);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="text-sm breadcrumbs mb-4">
        <ul className="flex space-x-2">
          <li><a href='/user/dashboard' className="text-blue-600 hover:underline">Dashboard</a></li>
          <li>Approvals</li>
        </ul>
      </div>
      <h1 className="text-2xl font-bold mb-4">Pending Approvals</h1>
      {transactions && transactions.length === 0 && <p className="text-gray-600">No pending transactions found.</p>}
      <div className="overflow-x-auto">
        <table className="table table-sm rounded-md text-xs bg-white">
          <thead className='text-balance'>
            <tr className="bg-gray-200 text-gray-600">
              <th>Id</th>
              <th>Recipient</th>
              <th>Campaign Name</th>
              <th>Transaction Type</th>
              <th>Transaction Acc No</th>
              <th>Acc Reference</th>
              <th>Amount</th>
              <th>Signatory Approvals</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
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
                        {approval.signatory.firstname}: {approval.approval_status ? 'Approved' : 'Pending'}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => handleApproval(transaction.id, transaction.campaign_name)}
                  >
                    <FcApprove className='h-5 w-5'/>
                  </button>
                </td>
                <td>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleReject(transaction.id)}
                  >
                    <FcDisapprove className='w-5 h-5'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PendingTras;
