import React from 'react';

function HelpCenter() {
    const token = localStorage.getItem('token');
    const org = localStorage.getItem('org');
    if (!token && !org) {
        window.location.href = '/org/login';
    }

    return (
        <div>
            <div className="text-sm breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li>
                    <li>Help Center</li>
                </ul>
            </div>
            <h1 className="font-extrabold text-2xl">Help Center</h1>
            <hr className='mb-4' />
            <section className="py-6 sm:py-8" id='termBanner'>
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 text-center sm:text-left">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Welcome to the Help Center</h2>
                        </div>
                        <div>
                            <p className='text-white'>
                                Below, you'll find useful information and guidance on how to navigate and utilize the various features available to you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <div role="tablist" className="tabs tabs-lifted mt-2">
                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Campaigns" defaultChecked />
                    <div role="tabpanel" className="tab-content bg-white border-white rounded-box p-6">
                        <div className="collapse collapse-open bg-white">
                            <input type="radio" name="my-accordion-3" defaultChecked className='' />
                            <div className="collapse-title text-xl font-medium">
                                Creating a Campaign
                            </div>
                            <div className="collapse-content px-6">
                                <p className='mb-1'>To create a new campaign and start raising funds for your cause, follow these steps:</p>
                                <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                    <li className=''>Navigate to the <a href='/org/dashboard/createcampaign' className='text-blue-600 font-medium'>Create Campaigns</a> page.</li>
                                    <li>Fill out the form with the necessary information, including a title, description, and goal amount.</li>
                                    <li>Upload a campaign banner.</li>
                                    <li>Double-check all the details and click on the <strong>Create</strong> button to make your campaign live and start accepting donations.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="collapse collapse-open bg-white">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium">
                                Viewing Active Campaigns
                            </div>
                            <div className="collapse-content px-6">
                                <p className='mb-1'>To view and manage your active campaigns, follow these steps:</p>
                                <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                    <li>Navigate to the <a href='/org/dashboard/mycampaigns/active' className='text-blue-600 font-medium'>Active Campaigns</a> page.</li>
                                    <li>You will find all the active campaigns and their details.</li>
                                    <li>To edit campaign details, click the edit button.</li>
                                    <li>To deactivate a campaign, click on the deactivate button and confirm.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="collapse collapse-open bg-white">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium">
                                Viewing Inactive Campaigns
                            </div>
                            <div className="collapse-content px-6">
                                <p className='mb-1'>To view and activate inactive campaigns, follow these steps:</p>
                                <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                    <li>Navigate to the <a href='/org/dashboard/mycampaigns/inactive' className='text-blue-600 font-medium'>Inactive Campaigns</a> page.</li>
                                    <li>You will find a list of all the campaigns and their details.</li>
                                    <li>To activate a campaign, click on the activate button and confirm.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="collapse collapse-open bg-white">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title text-xl font-medium">
                                Campaign Transactions
                            </div>
                            <div className="collapse-content px-6">
                                <p className='mb-1'>To view your campaign transactions, follow these steps:</p>
                                <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                    <li>Navigate to the <a href='/org/dashboard/transaction' className='text-blue-600 font-medium'>My Transactions</a> page.</li>
                                    <li>To view the transactions, select the campaign you want to view transactions for.</li>
                                    <li>You will find a list of all the transactions made by you including the money in, money out, and charges for your transactions.</li>
                                    <li>You can search for transactions, transaction type, amount, and the account for the transactions.</li>
                                    <li>Some of the transaction types in the table are <strong>Payout</strong> which is the money out from donations, <strong>Sale</strong> which is the money in, and <strong>Charge</strong> which are the transaction charges.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    
                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Contributions" />
                    <div role="tabpanel" className="tab-content bg-white border-white rounded-box p-6">
                        <div className="collapse collapse-open bg-white">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title text-xl font-medium">
                                View Donations
                            </div>
                            <div className="collapse-content px-6">
                                <p className='mb-1'>To view the donations received for your campaigns, follow these steps:</p>
                                <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                    <li>Navigate to the <a href='/org/dashboard/donations' className='text-blue-600 font-medium'>My Donations</a> page.</li>
                                    <li>You will find a list of all the donations received for your campaigns.</li>
                                    <li>You can search for donations and the campaigns they belong to.</li>
                                    <li>To download your donations as a PDF, click on the <strong>PDF icon</strong>.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Transact" />
                    <div role="tabpanel" className="tab-content bg-white border-white rounded-box p-6">
                        <div className="collapse collapse-open bg-white">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title text-xl font-medium">
                                Create Withdrawal Account
                            </div>
                            <div className="collapse-content px-6">
                                <p>To create accounts where you will be making withdrawals, follow these steps:</p>
                                <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                    <li>Navigate to the <a href='/org/dashboard/transact/accounts' className='text-blue-600 font-medium'>Account</a> page.</li>
                                    <li>To create a new account, click on the <strong>Create account</strong> button and fill out the form with the necessary information.</li>
                                    <li>After successful submission, your account details will be listed on the page.</li>
                                    <li>To reset your account pin, click on the <strong>Reset pin</strong> button and fill out the form to reset the pin.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="collapse collapse-open bg-white">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium">
                                Buy Airtime
                            </div>
                            <div className="collapse-content px-6">
                                <p className='mb-1'>To buy airtime, follow these steps:</p>
                                <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                    <li>Navigate to the <a href='/org/dashboard/transact/buyairtime' className='text-blue-600 font-medium'>Buy Airtime</a> page.</li>
                                    <li>Select the campaign you wish to buy airtime for.</li>
                                    <li>Choose the account to be charged, enter the amount, and click the <strong>Buy Airtime</strong> button to purchase.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Settings" />
                    <div role="tabpanel" className="tab-content bg-white border-white rounded-box p-6">
                        <div className="collapse collapse-open bg-white">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title text-xl font-medium">
                                Profile Settings
                            </div>
                            <div className="collapse-content px-6">
                                <p>To view and update your profile settings, follow these steps:</p>
                                <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                    <li>Navigate to the <a href='/org/dashboard/settings' className='text-blue-600 font-medium'>Settings</a> page.</li>
                                    <li>You can update your email, phone number, and password on this page.</li>
                                    <li>To update your organization information, click on the <strong>Update Information</strong> button, make the necessary changes, and save.</li>
                                    <li>Ensure to double-check the information before submitting.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HelpCenter;
