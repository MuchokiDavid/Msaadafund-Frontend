import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

function DonationsChart({ allDonations }) {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF5757'];

    const token = localStorage.getItem('token');
    const [donations, setDonations] = useState([]); // Store all donors
    const [startDate, setStartDate] = useState(''); // Start date for filtering
    const [endDate, setEndDate] = useState(''); // End date for filtering

    useEffect(() => {
        setDonations(allDonations);
    }, [allDonations, token]);

    // Handle date range filtering
    const filterDonationsByDate = (donations) => {
        if (!startDate || !endDate) {
            return donations; // Return all if no date range is selected
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        return donations.filter(donation => {
            const donationDate = new Date(donation.donationDate);
            return donationDate >= start && donationDate <= end;
        });
    };

    // Aggregate donations based on method and date range
    const filteredDonations = filterDonationsByDate(donations);

    const donationMethods = filteredDonations.reduce((acc, donation) => {
        const { method, amount } = donation;
        acc[method] = (acc[method] || 0) + amount;
        return acc;
    }, {});

    const chartData = Object.keys(donationMethods).map(method => ({
        name: method,
        value: donationMethods[method],
    }));

    console.log(allDonations)

    return (
        <div>
            <h2 className='text-center text-lg font-medium mt-2'>Contributions</h2>

            <div className="date-filters grid grid-cols-1 gap-2 mt-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mx-3">
              <div>
                <label>
                    Start: 
                    <input 
                        type="date" 
                        value={startDate} 
                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-1"
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
              <PieChart width={300} height={300}>
                  <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                      paddingAngle={1}
                  >
                      {chartData.map((entry, index) => (
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

export default DonationsChart;



// import React from 'react'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

// function DonationsChart({allDonations}) {

//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF5757'];

//     const token=localStorage.getItem('token')
//     const [donations, setDonations] = useState([]) // Store all donors

//     useEffect(() => {
//         setDonations(allDonations)
//       }, [allDonations,token])

//     const donationMethods = donations.reduce((acc, donation) => {
//         const { method, amount } = donation;
//         acc[method] = (acc[method] || 0) + amount;
//         return acc;
//       }, {});
      
//     const chartData = Object.keys(donationMethods).map(method => ({
//     name: method,
//     value: donationMethods[method],
//     }));

//   return (
//     <div>
//         <h2 className='text-center text-lg font-medium mt-2'>Contributions</h2>
//          <PieChart width={300} height={300}>
//             <Pie
//                 data={chartData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 label
//                 paddingAngle={1}
//             >
//                 {chartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//         </PieChart>
//     </div>
//   )
// }

// export default DonationsChart