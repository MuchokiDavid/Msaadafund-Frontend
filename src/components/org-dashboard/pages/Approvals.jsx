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

    console.log(transactions)

  return (
    <div>
        Approvals
    </div>
  )
}

export default Approvals