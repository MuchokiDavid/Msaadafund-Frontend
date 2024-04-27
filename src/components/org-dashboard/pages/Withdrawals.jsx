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
    <div>Withdrawals</div>
  )
}

export default Withdrawals