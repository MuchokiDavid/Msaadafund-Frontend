import React, { useEffect, useState } from 'react'

function Donations({allCampaigns, campaignError}) {
    const[allDonations, setAllDonations] = useState([]);
    const  [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true)
    const [errors,setErrors]=useState(campaignError)
    const [campaigns, setCampaigns] = useState(allCampaigns)
    const [donors, setDonors] = useState([])

    const token=localStorage.getItem('token');

    useEffect(() => {
      const getDonations= async()=>{
        try{
            const response = await fetch('/api/v1.0/org_donations', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                setLoading(false)
                console.log("Successful request to get donors");
                setAllDonations(data);
            } else {
                setLoading(true)
                throw new Error(data);
            }
        }
        catch{
            setErrors("Error getting donation data")
        }
      }
      getDonations();
    }, [token])

    useEffect(() => {
        const getDonors= async()=>{
            try{
                const response = await fetch('/api/v1.0/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setLoading(false)
                    console.log("Successful request to get campaigns");
                    setDonors(data);
                } else {
                    setLoading(true)
                    throw new Error(data);
                }
            }
            catch{
                setErrors("Error getting donation data")
            }
          }
          getDonors();
      
    }, [allDonations, token])

    useEffect(() => {
        setCampaigns(allCampaigns)
    }, [allCampaigns])
    
    
    
    if (!token){
        window.location='/org/login';
    }
    if(loading){
        <div><span className="loading loading-dots loading-lg"></span></div>
    }
    console.log(allDonations)
    // console.log(donors)
    // console.log(campaigns)

  return (
    <div>
        <div className="text-md breadcrumbs ml-2">
            <ul>
                <li><a href='/org/dashboard'>Home</a></li> 
                <li><a href='/org/dashboard/donations'>Donations</a></li> 
            </ul>
        </div>
        <h1 className="mb-3 my-2 text-2xl font-bold leading-tight ">My Donations</h1>
        <hr className='mb-0'/>
        {errors && <p className='text-red-700'>{errors}</p>}
        <div className="overflow-x-auto ml-3">
            <table className="table table-zebra mt-3">
                {/* head */}
                <thead>
                <tr>
                    <th>Campaign</th>
                    <th>Donor</th>
                    <th>Amount</th>
                    <th>Donation Date</th>
                </tr>
                </thead>
                <tbody>
            {allDonations&&allDonations.map((donation)=>{
                // Find the user object corresponding to the donation's userId
                const user = donors.find(user => user.id === donation.userId);
                const firstName = user ? user.firstName: donation.userId;
                const lastName = user ? user.lastName : '';

                //Get campaign name from campaigns using donation campaign id
                const campaign = campaigns.find(campaign => campaign.id === donation.campaignId);
                const campaignTitle = campaign ? campaign.campaignName : donation.campaignId;

                return(
                    <tr className="dark:text-gray-200" key={donation._id}>
                        <th>{campaignTitle}</th>
                        <td>{firstName} {lastName}</td>
                        <td>{donation.amount}</td>
                        <td>{donation.donationDate}</td>
                    </tr>
                )
            })}
            </tbody>
            {/* <div className=" flex justify-center mb-4 join grid-cols-2">
            {/* Previous page button 
            <button className="join-item btn btn-outline" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            {/* Next page button
            <button className="join-item btn btn-outline" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button> 
            </div>*/}
        </table>
        </div>
    </div>
  )
}

export default Donations