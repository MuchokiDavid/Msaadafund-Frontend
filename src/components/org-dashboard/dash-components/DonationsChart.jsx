import React from 'react'
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

function DonationsChart({chartData}) {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF5757'];
  return (
    <div>
        <h2 className='text-center text-lg font-medium mt-2'>Donations Chart</h2>
         <PieChart width={300} height={300}>
            <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={75}
                fill="#8884d8"
                label
                paddingAngle={5}
            >
                {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    </div>
  )
}

export default DonationsChart