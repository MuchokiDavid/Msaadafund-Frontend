import { all } from 'axios'
import React, { useState, useEffect } from 'react'

function Withdrawals() {
    const[allWithdrawals, setAllWithdrawals]=useState([])
    const token=localStorage.getItem('token')
    const[errors,setErrors]= useState(null)

    useEffect(()=>{
        fetch('/api/v1.0/withdraw_transactions', {
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
    </div>
  )
}

export default Withdrawals