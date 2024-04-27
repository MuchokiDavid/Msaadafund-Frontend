import { all } from 'axios'
import React, { useState, useEffect } from 'react'
import { FaFilePdf } from "react-icons/fa";

function Withdrawals() {
    const[allWithdrawals, setAllWithdrawals]=useState([])
    const token=localStorage.getItem('token')
    const[errors,setErrors]= useState(null)

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
    console.log(allWithdrawals)

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
                <input type="text" placeholder='Search' className='input input-bordered w-full max-w-xs'/>
            </div>
            {/* pdf button */}
            <button title='Download Pdf '>PDF<FaFilePdf size = {25} style={{ color: 'red' }}/></button>
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
                    {allWithdrawals.map((withdrawal,index)=>(
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
    </div>
  )
}

export default Withdrawals