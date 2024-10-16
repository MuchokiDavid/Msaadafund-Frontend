import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import { FaEdit } from "react-icons/fa";
import { TbDeviceDesktopCancel } from "react-icons/tb";
import { apiUrl } from '../../../context/Utils';
import { IoShareSocialSharp } from "react-icons/io5";
import { 
    FacebookShareButton,FacebookIcon, 
    WhatsappShareButton,WhatsappIcon,
    TwitterShareButton, TwitterIcon,
    TelegramShareButton,TelegramIcon
} from 'react-share';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QRCode from 'react-qr-code';

function DashActiveCampaigns({ allCampaigns, campaignError }) {
    const [campaigns, setCampaigns] = useState(allCampaigns);
    const token = localStorage.getItem('token');
    const orgUser = localStorage.getItem('org')
    const [walletDetails, setWalletDetails] = useState(null);
    // const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(campaignError);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied]= useState(false)
    const [currentlWebUrl, setCurrentlWebUrl]= useState(null)
    const [campaign,setCampaign]= useState({})

    useEffect(() => {
        setCampaigns(allCampaigns)
    }, [allCampaigns])


    //Filter campaign with the search term to search category, campaign name, amount from campaigns
    useEffect(() => {
        const filtered = campaigns && campaigns.filter((campaign) => {
            return (
                (campaign.campaignName && campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (campaign.category && campaign.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (campaign.targetAmount && campaign.targetAmount.toString().includes(searchTerm)) ||
                (campaign.description && campaign.description.toString().includes(searchTerm))
                // (campaign.amountRemaining && campaign.amountRemaining.toString().includes(searchTerm))

            )
        });
        setFilteredCampaigns(filtered);
    }, [searchTerm, campaigns])

    //paginate filtered campaign
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

    //Function to handle pagination
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const navigate = useNavigate()


    useEffect(() => {
        setCampaigns(allCampaigns)
    }, [allCampaigns])

    useEffect(() => {
        setErrors(campaignError)
    }, [campaignError])

    useEffect(() => {
        campaigns && campaigns.forEach(item => handleWallet(item.id));
        // eslint-disable-next-line 
    }, [campaigns, token]);

    const handleWallet = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/api/v1.0/campaign_wallet/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                // setLoading(false)
                setWalletDetails(prevState => ({
                    ...prevState,
                    [id]: data.wallet_details
                }));
            }

        } catch (error) {
            // setLoading(true)
            console.log('Error in fetching wallet details', error);
        }
    };
    // console.log(campaigns)
    
    //Check token and org in localstorage and redirect to login page if not present
    if (!token && !orgUser) {
        window.location.replace("/org/login")
    }

    const handleEditButton = (campaignId) => {
        navigate(`/org/dashboard/campaigns/${campaignId}`)
    }
    const handleDeleteButton = async (campaignId) => {
        try {
            const accessToken = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
            Swal.fire({
                title: 'Are you sure?',
                text: "You will be able to activate this campaign!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, deactivate!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`${apiUrl}/api/v1.0/deletecampaign/${campaignId}`, config)
                        .then((res) => {
                            
                                // console.log(res)
                                if (res.status === 200) {
                                    Swal.fire({
                                        title: "Deactivated!",
                                        text: res.data.message,
                                        icon: "success"
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload();
                                        }
                                    });
                                }
                                else {
                                    Swal.fire(
                                        'Error!',
                                        'The campaign did not deactivate',
                                        'error'
                                    )
                                }

                                // window.location.reload();
                            
                        })
                        .catch((err) => {
                            const errorMsg = err.response?.data?.error || 'An error occurred';
                            setErrors(errorMsg);
                        })

                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    // Function to encode route
    function formatSlug(text) {
        return text.replace(/\s+/g, '-');
    }


    // console.log(currentlWebUrl)
    return (
        <div className='h-screen lg:h-fit'>
            <div className="text-sm breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li>
                    <li><a href='/org/dashboard/mycampaigns/active'>Active Fundraisers</a></li>
                </ul>
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight ">Active Fundraisers</h2>
            <hr className='mb-4' />
            {/* {errors&& <p className='text-red-700'>{errors}</p>} */}

            {/* <a href='/org/dashboard/createcampaign' className='text-blue-700 mb-4 text-lg hover:underline'>Add campaign+</a> */}
            {/* <div className='flex justify-between py-1'> */}
            <div className='grid grid-cols-1 md:grid-cols-2 my-3'>
                <div className='flex justify-start gap-3'>
                    <div>
                        <a href='/org/dashboard/createcampaign'><button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                            Create Fundraisers
                        </button></a>
                    </div>
                    <div>
                        <a href='/org/dashboard/mycampaigns/inactive'><button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                            Inactive Fundraisers
                        </button></a>
                    </div>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-gray-300 rounded-md bg-white border h-11 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-3/4 p-2.5"
                    />
                </div>
            </div>
            {errors  && <p className='text-red-700'>{errors}</p>}
            {/* <div>
                        <button title='Download Pdf ' onClick={downloadDonationsPDF}>PDF<FaFilePdf size = {25} style={{ color: 'red' }}/></button>
                    </div> */}
            {allCampaigns.length > 0 && paginatedCampaigns.length > 0
                ?
                (<>
                    <div className="my-1 inline-block w-full overflow-scroll align-middle border-b border-gray-200 sm:rounded-lg border">
                        <table className="table table-xs bg-white">
                            {/* head */}
                            <thead className='text-gray-800 bg-gray-100 text-left'>
                                <tr>
                                    {/* <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>ID</th> */}
                                    <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Campaign Name</th>
                                    <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Category</th>
                                    <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Start Date</th>
                                    <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>End Date</th>
                                    <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Budget</th>
                                    <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Balance</th>
                                    <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Share</th>
                                    <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Edit</th>
                                    <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Deactivate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCampaigns && paginatedCampaigns.map((item) => {
                                    return (
                                        <tr key={item.id} className='even:bg-blue-50'>
                                            {/* <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>{item.id}</td> */}
                                            <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200'>{item.campaignName}</td>
                                            <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200'>{item.category}</td>
                                            <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200'>{item.startDate}</td>
                                            <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200'>{item.endDate}</td>
                                            <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200'>{item.targetAmount}</td>
                                            <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200'>{walletDetails && walletDetails[item.id]?.available_balance}</td>
                                            <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200'><button onClick={() => {setShowShareModal(true); setCampaign(item); setCurrentlWebUrl(`https://www.msaadafund.com/campaigns/${formatSlug(item.campaignName)}`)}} className='bg-green-600 hover:bg-green-700 text-lg text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'><IoShareSocialSharp /></button></td>
                                            <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200'><button onClick={() => handleEditButton(item.id)} className='bg-blue-600 hover:bg-blue-700 text-lg text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline ml-2 w-full sm:w-auto'><FaEdit /></button></td>
                                            <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200'><button onClick={() => handleDeleteButton(item.id)} className='bg-red-600 hover:bg-red-700 text-lg text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline'><TbDeviceDesktopCancel /></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center my-4 join grid-cols-2">
                        {/* Previous page button */}
                        <button className="btn btn-outline h-5 join-item btn-sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>

                        {/* <div className='border border-gray-400 flex justify-center p-2 btn-outline w-fit'>{currentPage} of {totalPages}</div> */}
                        {/* Next page button */}
                        <button
                            className="btn btn-outline join-item btn-sm"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>)
                :
                (
                    <div className='grid grid-cols-1 gap-4 mt-3 px-1'>
                        <div>
                            <p className='text-red-500'>No active campaigns to display. Create campaign to start receiving contributions</p>
                        </div>
                    </div>
                )
            }
            {/* <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:max-w-full"> */}

            <dialog open={showShareModal} onClose={() => setShowShareModal(false)} className="modal flex-row justify-center items-center text-center p-4">
                <div className="modal-box bg-gray-50 text-gray-800">
                    <div className='my-4'>
                        <h3 className='text-xl'>Help {campaign && campaign.organisation && campaign.organisation.orgName} </h3>
                        <p className='text-md mt-1 mb-2'>Share this campaign with your friends and family</p>
                        <div className='mb-4'>
                            {/* {socialShare(campaign)} */}
                            <div>
                                <div className='my-2'>
                                    <p>Share this campaign</p>
                                </div>
                                <div className='mt-0 flex justify-evenly space-x-3'>
                                    <WhatsappShareButton
                                    url={currentlWebUrl}
                                    title={`Join ${campaign.campaignName}'s campaign!\n\n\n By ${campaign && campaign.organisation &&  campaign.organisation.orgName}`}
                                    >
                                        <WhatsappIcon className='h-12 w-12 rounded-full'/>
                                    </WhatsappShareButton>
                                    <FacebookShareButton
                                    url={currentlWebUrl}
                                    quote={`Join ${campaign && campaign.campaignName}'s campaign!\n\n${campaign && campaign.organisation &&  campaign.description}\n\n\nBy ${campaign && campaign.organisation &&  campaign.organisation.orgName}`}
                                    hashtag='#GiveForGood'
                                    >
                                        <FacebookIcon className='h-12 w-12 rounded-full'/>
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                    url={currentlWebUrl}
                                    title={`Join ${campaign && campaign.campaignName}'s campaign!\n\n${campaign && campaign.description}\n\n\nBy ${campaign && campaign.organisation &&  campaign.organisation.orgName} `}
                                    hashtags={['Msaadafund','GiveForGood','msaadamashinani','ChangeForGood']}
                                    >
                                        <TwitterIcon className='h-12 w-12 rounded-full'/>
                                    </TwitterShareButton>
                                    <TelegramShareButton
                                    url={currentlWebUrl}
                                    title={`${campaign && campaign.organisation && campaign.campaignName}`}
                                    >
                                        <TelegramIcon className='h-12 w-12 rounded-full'/>
                                    </TelegramShareButton>

                                </div>
                            </div>
                        </div>                    
                        <p className="font-semibold my-3">Copy the link below to share</p>
                        <span className="bg-blue-100 flex gap-5 items-center justify-between py-3 px-5 rounded">
                            <code className="text-blue-900 text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                                {currentlWebUrl}
                            </code>
                            <CopyToClipboard text={currentlWebUrl} onCopy={(currentlWebUrl, result) => {console.log(result);  setCopied(true);}}>
                                <span className="text-blue-900 hover:text-green-600 font-bold" title='Copy to clipboard'> 
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                                            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                                    </svg>
                                </span>
                            </CopyToClipboard>                        
                        </span>
                        {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                        <div className='flex justify-center'>
                            <p className='my-1 font-semibold'>Or</p>
                        </div>
                        <div className='flex justify-center'>
                            <p className='my-1'>Scan the QR code below</p>
                        </div>
                        <div className='flex justify-center'>
                            {currentlWebUrl && <QRCode value={currentlWebUrl} className='w-24 h-24'/>}
                        </div>
                    </div>
                    
                    <button onClick={() => { setShowShareModal(false); setCopied(false)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </div>
            </dialog>
        
        </div>
    );
}

export default DashActiveCampaigns;
