import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { apiUrl } from '../../../context/Utils';

function Subscriptions({ allSubscriptions }) {
    const [subscriptions, setSubscriptions] = useState(allSubscriptions);
    const token = localStorage.getItem('token');
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    useEffect(() => {
        setSubscriptions(allSubscriptions);
    }, [allSubscriptions]);

    useEffect(() => {
        const filtered = subscriptions.filter((item) => {
            const orgName = item.organisation ? item.organisation.orgName : "";
            const orgNameLower = orgName.toLowerCase();
            const searchTermLower = searchTerm.toLowerCase();
            return orgNameLower.includes(searchTermLower);
        });
        setFilteredData(filtered);
    }, [subscriptions, searchTerm]);

    const unsubscribe = async (id,nameOrg) => {
        // Optimistic UI update
        const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== id);
        setSubscriptions(updatedSubscriptions);
        setFilteredData(updatedSubscriptions);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.delete(`${apiUrl}/api/v1.0/subscription/${id}`, config);
            if (response.status === 200) {
                Swal.fire({
                    title: `Unfollow ${nameOrg}`,
                    text: `You have successfully unfollowed ${nameOrg}. If you change your mind, you can always follow later. Thank you for your support.`,
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload()
                    }
                })
            }
            window.location.reload()
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'An error occurred';
            console.error(errorMsg);
            // Revert the optimistic update if unsubscription fails
            setSubscriptions([...subscriptions]);
            setFilteredData([...subscriptions]);
            Swal.fire({
                title: 'Error!',
                text: errorMsg,
                icon: 'error'
            });
        }
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedSubscriptions = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const goToPage = (pageNumber) => setCurrentPage(pageNumber);

    const debouncedSearch = debounce((value) => {
        setSearchTerm(value);
    }, 300);

    return (
        <div>
            <div className="text-sm breadcrumbs ml-2">
                <ul>
                    <li><a href='/user/dashboard'>Dashboard</a></li>
                    <li>Following</li>
                </ul>
            </div>
            <h1 className="mb-1 my-2 text-xl font-bold leading-tight ">Following</h1>
            <hr />
            {subscriptions && subscriptions.length > 0
                ? (
                    <div className="flex flex-col mt-1">
                        <div className="flex justify-between pt-3">
                            <div>
                                <input type="text" placeholder='Search organisation...'
                                    className='border border-gray-300 rounded-md px-2 py-1 w-full'
                                    onChange={(e) => debouncedSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-4 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full border table table-zebra table-xs rounded-lg overflow-x-auto text-sm bg-white statTable">
                                        <thead className="border-b text-gray-800 bg-gray-100">
                                            <tr>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-2 text-left">ID</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-2 text-left">Organisation</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-2 text-left">Address</th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-2 text-left">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                paginatedSubscriptions.map((subscription, index) => (
                                                    <tr key={index} className="border-b">
                                                        <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                            {index + 1}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                            {subscription.organisation.orgName}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                            {subscription.organisation.orgAddress}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                            <button onClick={() => unsubscribe(subscription.organisation.id,subscription.organisation.orgName)} className='bg-red-500 px-3 py-1 rounded-md text-white'>Unfollow</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {totalPages > 1 && (
                                <div className="flex justify-center mb-4 join grid-cols-2">
                                    <button className="btn btn-outline join-item" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                                        Previous
                                    </button>
                                    <button
                                        className="btn btn-outline join-item"
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center mt-4">
                        <div className="text-xl text-red-500">No Subscriptions Yet</div>
                    </div>
                )
            }
        </div>
    );
}

export default Subscriptions;
