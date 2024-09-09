import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../../context/Utils';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF5757'];

function WithdrawalsChart() {
    const [allWithdrawals, setAllWithdrawals] = useState([]);
    const token = localStorage.getItem('token');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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

    // Handle date range filtering
    const filterTransactionsByDate = (transactions) => {
        if (!startDate || !endDate) {
            return transactions; // Return all if no date range is selected
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= start && transactionDate <= end;
        });
    };

    // Filter successful transactions and aggregate by trans_type
    const successfulTransactions = filterTransactionsByDate(
        allWithdrawals.filter(transaction => transaction.trans_status === "Successful")
    );

    const aggregatedData = successfulTransactions.reduce((acc, transaction) => {
        const existing = acc.find(item => item.trans_type === transaction.trans_type);
        if (existing) {
            existing.amount += transaction.amount;
        } else {
            acc.push({ trans_type: transaction.trans_type, amount: transaction.amount });
        }
        return acc;
    }, []);

    if (!token) {
        window.location.href = '/';
    }

    return (
        <div>
            <h2 className='text-center text-lg font-medium mt-2'>Spending</h2>
            <div className="date-filters grid grid-cols-1 gap-2 mt-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mx-3">
                <div>
                    <label>
                        Start: 
                        <input 
                            type="date" 
                            value={startDate} 
                            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-1 mr-2"
                            onChange={(e) => setStartDate(e.target.value)} 
                        />
                    </label>
                </div>
                 
                 <div>
                    <label>
                        End:
                        <input 
                            type="date" 
                            value={endDate} 
                            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-1"
                            onChange={(e) => setEndDate(e.target.value)} 
                        />
                    </label>
                 </div>
                
            </div>
            <div className='flex justify-center items-center'>
                    {allWithdrawals.length === 0 && <p className='text-center text-lg font-medium mt-2'>No Withdrawals</p>}
                    <PieChart width={300} height={300}>
                        <Pie
                            data={aggregatedData}
                            dataKey="amount"
                            nameKey="trans_type"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                            paddingAngle={1} // Adds padding between slices
                        >
                            {aggregatedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />                     
                        <Legend />
                    </PieChart>
            </div>
            
        </div>
    );
}

export default WithdrawalsChart;

// Bar graph
// import React, { useState, useEffect } from 'react'
// import { apiUrl } from '../../../context/Utils';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// function WithdrawalsChart() {
//     const [allWithdrawals, setAllWithdrawals] = useState([]);
//     const token = localStorage.getItem('token');
//     const [errors, setErrors] = useState(null);
//     const [loading, setLoading]= useState(false)

//     useEffect(() => {
//         setLoading(true)
//         const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         }
//         };
//         axios.get(`${apiUrl}/api/v1.0/withdraw_transactions`, config)
//         .then((res) => {
//             setLoading(false)
//             setAllWithdrawals(res.data.message);
//         })
//         .catch((err) => {
//             setLoading(false)
//             console.log(err);
//         });
//     }, [token]);

//     // Filter successful transactions and aggregate by trans_type
//     const successfulTransactions = allWithdrawals.filter(
//         transaction => transaction.trans_status === "Successful"
//     );

//     const aggregatedData = successfulTransactions.reduce((acc, transaction) => {
//         const existing = acc.find(item => item.trans_type === transaction.trans_type);
//         if (existing) {
//             existing.amount += transaction.amount;
//         } else {
//             acc.push({ trans_type: transaction.trans_type, amount: transaction.amount });
//         }
//         return acc;
//     }, []);

//     if (!token) {
//         window.location.href = '/';
//     }

//     console.log(allWithdrawals)

//   return (
//     <div>
//         <ResponsiveContainer width="100%" height={300}>
//       <BarChart
//         data={aggregatedData}
//         margin={{
//           top: 20,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="trans_type" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="amount" fill="#8884d8" />
//       </BarChart>
//     </ResponsiveContainer>
//     </div>
//   )
// }

// export default WithdrawalsChart