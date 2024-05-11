import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'
import { Link } from 'react-router-dom'

function Organisation() {
    // get all organisations 
    const [organisation,setOrganisation]= useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12)

    useEffect(()=>{
        axios.get('/api/v1.0/organisations')
        .then((res)=>{
            setOrganisation(res.data)
        })
        .catch((err)=>{
            const errorMsg = err.response?.data?.error || 'An error occurred';
            console.error(errorMsg);    
        })
    },[])

    const totalPages =  Math.ceil(organisation.length/itemsPerPage)
    const paginateOrganisations = organisation.slice((currentPage-1) * itemsPerPage,currentPage*itemsPerPage)

    const goToPage = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }


  
    
  return (
    <div>
        <Menus/>
        <div className="mx-2 sm:mx-1 lg:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-2 md:gap-4 sm:max-w-full">
        {paginateOrganisations.map((org)=>{
            return(
            <Link to={`/organisation/${org.orgName}`} key={org.id}>
            <div className="group relative block mt-12 sm:mt-16 lg:mt-20 bg-black">
        <img
            alt=""
            src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            loading='lazy'
        />

        <div className="relative p-4 sm:p-6 lg:p-8 h-[400px] overflow-hidden ">
            <p className="text-md font-medium uppercase tracking-widest text-blue-500">Organisation</p>

            <p className="text-xl font-bold text-white sm:text-2xl">{org.orgName}</p>

            <div
                className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
            >
                <p className="text-md text-white"> {org.orgDescription} </p>        
            </div>
        </div>
        </div>
        </Link>

         )})}
       
        </div>

        <div className="flex justify-center mb-4 mt-4 join grid-cols-2">
                        {/* Previous page button */}
                        <button className="btn btn-outline join-item" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>

                        <button className="btn btn-outline join-item" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                        </button>
                    </div>
        <Footer/>

        </div>




  )
}

export default Organisation