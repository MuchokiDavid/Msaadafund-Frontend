import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'
// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {appKey, apiUrl} from '../context/Utils'

function Organisation() {
    // get all organisations 
    const [organisation,setOrganisation]= useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12)
    const navigate = useNavigate()

    // useEffect(()=>{
    //     axios.get('/api/v1.0/organisations')
    //     .then((res)=>{            
    //         setOrganisation(res.data)
    //     })
    //     .catch((err)=>{
    //         const errorMsg = err.response?.data?.error || 'An error occurred';
    //         console.error(errorMsg);    
    //     })
    // },[])

    useEffect(() => {
        axios.get(`${apiUrl}/api/v1.0/organisations`, {
            headers: {
                'X-API-KEY': appKey,
            }
        })
        .then((res) => {            
            setOrganisation(res.data);
        })
        .catch((err) => {
            const errorMsg = err.response?.data?.message || 'An error occurred';
            console.error(errorMsg);    
        });
    }, []);

     // Function to encode route
    function formatSlug(text) {
    return text.replace(/\s+/g, '-');
    }

    const totalPages =  Math.ceil(organisation.length/itemsPerPage)
    const paginateOrganisations = organisation.slice((currentPage-1) * itemsPerPage,currentPage*itemsPerPage)

    const goToPage = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    const handleNavigate = (orgid)=>{
        navigate(`/organisations/${formatSlug(orgid)}`)
    }

    
  return (
    <div>
        <Menus/>
        {/* <div className="text-md breadcrumbs ml-4" >
          <ul>
              <li><a href='/'>Home</a></li>
              <li>Organisations</li>
          </ul>
        </div> */}
        <div className='mx-auto min-h-screen container'>
        <div className="text-2xl font-medium text-left mt-4">Organisers</div>
        <div className="mx-2 sm:mx-1 lg:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-2 md:gap-4 sm:max-w-full rounded-xl">
            {paginateOrganisations.map((org)=>{
                return(
                // <Link to={`/organisations/${org.id}`} key={org.id}>
                <div key={org.id} onClick={()=>handleNavigate(org.orgName)}>
                    <div className="group relative block mt-8 sm:mt-10 lg:mt-12 bg-black rounded-xl overflow-hidden">
                        <img
                            alt="org logo"
                            src={org && org.profileImage ? `${org.profileImage}` : "https://images.unsplash.com/photo-1606327054536-e37e655d4f4a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                            loading='lazy'
                        />

                        <div className="relative p-4 sm:p-6 lg:p-8 h-[350px]">
                            <p className="text-md font-medium uppercase tracking-widest text-blue-500">Organisation</p>

                            <p className="text-xl font-bold text-white sm:text-2xl">{org.orgName}</p>

                            <div
                                className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                            >
                                <p className="text-md text-white"> {org.orgDescription} </p>        
                            </div>
                        </div>
                    </div>
                    </div>
                // </Link>

            )
        })}
       
        </div>
        </div>

        <div className="flex justify-center my-4 join grid-cols-2">
            {/* Previous page button */}
            <button className="btn btn-outline join-item btn-sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>

            <button className="btn btn-outline join-item btn-sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
            </button>
        </div>
        <Footer/>

        </div>




  )
}

export default Organisation