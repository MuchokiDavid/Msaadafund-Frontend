import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    const accessToken = localStorage.getItem('token');
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
    <div className="container mx-auto p-4">
      <div className="text-sm breadcrumbs mb-4">
        <ul className="flex space-x-2">
          <li><a href='/user/dashboard' className="text-blue-600 hover:underline">Dashboard</a></li>
          <li>Approvals</li>
        </ul>
      </div>
      <h1 className="text-2xl font-bold mb-4">Pending Approvals</h1>
      {transactions && transactions.length === 0 && <p className="text-gray-600">No pending transactions found.</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              <th className="py-3 px-4 uppercase font-semibold text-sm">Transaction Id</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Recipient</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Campaign Name</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Transaction Type</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Transaction Acc No</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Acc Reference</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Amount</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Signatory Approvals</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Approve</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Reject</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-t">
                <td className="py-3 px-4">{transaction.id}</td>
                <td className="py-3 px-4">{transaction.name}</td>
                <td className="py-3 px-4">{transaction.campaign_name}</td>
                <td className="py-3 px-4">{transaction.trans_type}</td>
                <td className="py-3 px-4">{transaction.transaction_account_no}</td>
                <td className="py-3 px-4">{transaction.acc_refence}</td>
                <td className="py-3 px-4">{transaction.amount}</td>
                <td className="py-3 px-4">
                  <ul>
                    {transaction.approvals.map((approval) => (
                      <li key={approval.id}>
                        Signatory {approval.signatory_id}: {approval.approval_status ? 'Approved' : 'Pending'}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => handleApproval(transaction.id, transaction.campaign_name)}
                  >
                    Approve
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleReject(transaction.id)}
                  >
                    Reject
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
