import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'
import { useNavigate } from 'react-router-dom'
import { appKey, apiUrl } from '../context/Utils'
import orgImage from '../../src/assets/orgProfile.png'

function Organisation() {
    // State management
    const [organisation, setOrganisation] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(12);
    const [searchWord, setSearchWord] = useState("");  // Initialize searchWord as string
    const navigate = useNavigate();

    // Fetch organizations from API
    useEffect(() => {
        setLoading(true);
        axios.get(`${apiUrl}/api/v1.0/organisations`, {
            headers: {
                'X-API-KEY': appKey,
            }
        })
        .then((res) => {          
            setLoading(false);  
            setOrganisation(res.data);
        })
        .catch((err) => {
            setLoading(false);
            const errorMsg = err.response?.data?.message || 'An error occurred';
            console.error(errorMsg);    
        });
    }, []);

    // Function to encode route
    function formatSlug(text) {
        return text.replace(/\s+/g, '-');
    }

    // Filter organizations based on the searchWord
    const filteredOrganisations = organisation.filter((org) =>
        org.orgName.toLowerCase().includes(searchWord.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredOrganisations.length / itemsPerPage);
    const paginateOrganisations = filteredOrganisations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleNavigate = (orgid) => {
        navigate(`/organisations/${formatSlug(orgid)}`);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
            </div>
        );
    }

    return (
        <div>
            <Menus/>
            <div className='mx-auto min-h-screen container'>
                <div className="text-2xl font-medium text-left mt-4">Organisers</div>

                {/* Search Input */}
                <div className="flex justify-right items-center mt-4">
                    <div className="relative">
                        <input
                            type="text"
                            className="bg-gray-100 h-10 text-gray-800 px-5 pr-10 rounded-full text-sm focus:outline-none transition-all duration-300 ease-in-out w-12 focus:w-64"
                            placeholder="Search..."
                            value={searchWord}
                            onChange={e => setSearchWord(e.target.value)}
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Organization Cards */}
                <div className="mx-2 sm:mx-1 lg:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-2 md:gap-4 sm:max-w-full rounded-xl">
                    {paginateOrganisations.map((org) => {
                        return (
                            <div key={org.id} onClick={() => handleNavigate(org.orgName)}>
                                <div className="group relative block mt-8 sm:mt-10 lg:mt-12 bg-black rounded-xl overflow-hidden">
                                    <img
                                        alt="org logo"
                                        src={org && org.profileImage ? `${org.profileImage}` : `${orgImage}`}
                                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                        loading='lazy'
                                    />
                                    <div className="relative p-4 sm:p-6 lg:p-8 h-[350px]">
                                        <p className="text-md font-medium uppercase tracking-widest text-blue-500">Organisation</p>
                                        <p className="text-xl font-bold text-white sm:text-2xl">{org.orgName}</p>
                                        <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                            <p className="text-md text-white"> {org.orgDescription} </p>        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center my-4 join grid-cols-2">
                <button className="btn btn-outline join-item btn-sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button className="btn btn-outline join-item btn-sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            <Footer/>
        </div>
    );
}

export default Organisation;