import React from 'react'

function HelpCenter() {
    const token=localStorage.getItem('token')
    const org=localStorage.getItem('org')
    if(!token && !org){
        window.location.href='/org/login'
    }

  return (
    <div>
        <div className="text-sm breadcrumbs ml-2 ">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li>Help Center</li>
            </ul>
        </div>
        <h1 className="font-extrabold text-2xl">Help Center</h1>
        <hr className='mb-4' />
        <div>
        <section className="py-6 sm:py-8" id='termBanner'>
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 text-center sm:text-left">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Welcome to the Help Center.</h2>
                    </div>
                    <div>
                        <p className='text-white'> 
                        Below, you'll find useful information and guidance on how to navigate and utilize the various features available to you.</p>
                    </div>
                    
                </div>
            </div>
        </section>

        </div>
        <div>
            

            <div role="tablist" className="tabs tabs-lifted mt-2">
                <input type="radio" name="my_tabs_2" role="tab" className="tab " aria-label="Campaigns" checked/>
                <div role="tabpanel" className="tab-content bg-white border-white rounded-box p-6">
                    <div className="collapse collapse-open bg-white">
                        <input type="radio" name="my-accordion-3" defaultChecked className=''/> 
                        <div className="collapse-title text-xl font-medium">
                            Creating a Campaign
                        </div>
                        <div className="collapse-content px-6"> 
                            <p className='mb-1'>To create a new campaign and start raising funds for your cause, follow these steps:</p>
                            <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                <li className=''>Navigate to the <a href='/org/dashboard/createcampaign' className='text-blue-600 font-medium'>Create Campaigns</a> page.</li>
                                <li>Fill out the form with the necessary information, including a title, description, and goal amount. etc.</li>
                                <li>Upload a campaign banner</li>
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
                                <li>You will find all the active campaigns and their details</li>
                                <li>To edit campaign details click the edit button</li>
                                <li>To deactivate a campaign, click on the deactivate button and confirm</li>
                            </ol>
                        </div>
                    </div>
                    <div className="collapse collapse-open bg-white">
                        <input type="radio" name="my-accordion-3" /> 
                        <div className="collapse-title text-xl font-medium">
                        Viewing Inctive Campaigns
                        </div>
                        <div className="collapse-content px-6"> 
                            <p className='mb-1'>To view and activate inactive campaigns, follow these steps:</p>
                            <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                <li>Navigate to the <a href='/org/dashboard/mycampaigns/inactive' className='text-blue-600 font-medium'>Inactive Campaigns</a> page.</li>
                                <li>You will find a list of all the campaigns and their details</li>
                                <li>To activate a campaign, click on acivate button and confirm.</li>
                            </ol>
                        </div>
                    </div>
                    <div className="collapse collapse-open bg-white">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            Campign Transactions
                        </div>
                        <div className="collapse-content px-6">
                            <p className='mb-1'>To view your campaign transactions, you can follow these steps:</p>
                            <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                <li>Navigate to the <a href='/org/dashboard/transaction' className='text-blue-600 font-medium'>My Transactions</a> page.</li>
                                <li>To view the transactions, select the campaign you want to view transactions</li>
                                <li>You will find a list of all the transactions made by you including the money in, money out and charges for your transactions.</li>
                                <li>You can search for transactions, transaction type, amount and the account for the transactions.</li>
                                <li>Some of the transaction type in the table are <strong>Payout</strong> which is the money out from donations <strong>Sale</strong> which is the money in and <strong>Charge</strong> which are the transaction charges</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Contributions" checked/>
                <div role="tabpanel" className="tab-content bg-white border-white rounded-box p-6">
                <div className="collapse collapse-open bg-white">
                        <input type="radio" name="my-accordion-3" defaultChecked /> 
                        <div className="collapse-title text-xl font-medium">
                            View Donations
                        </div>
                        <div className="collapse-content px-6"> 
                            <p className='mb-1'>To view the donations received for your campaigns, you can follow these steps:</p>
                            <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                <li>Navigate to the <a href='/org/dashboard/donations' className='text-blue-600 font-medium'>My Donations</a> page.</li>
                                <li>You will find a list of all the donations received for your campaigns.</li>
                                <li>You can search for donations and the campaigns to whom the campaign belongs to.</li>
                                <li>To download your donations to PDF click on the <strong>PDF icon</strong></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Transact" checked/>
                <div role="tabpanel" className="tab-content bg-white border-white rounded-box p-6">
                <div className="collapse collapse-open bg-white">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            Create withdrawal account
                        </div>
                        <div className="collapse-content px-6">
                            <p>To create accounts where you will be making withdrawals, follow these steps:</p>
                            <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                <li>Navigate to the <a href='/org/dashboard/transact/accounts' className='text-blue-600 font-medium'>Account</a> page.</li>
                                <li>To create a new account, click on the <strong>Create account</strong> button and fill out the form with the necessary information.</li>
                                <li>After successfull submission your account details will be listed on the page</li>
                                <li>To reset your account pin, click on the <strong>Reset pin</strong> button and fill out the form to reset the pin</li>
                            </ol>
                        </div>
                    </div>
                    <div className="collapse collapse-open bg-white">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            Buy Airtime
                        </div>
                        <div className="collapse-content px-6">
                            <p className='mb-1'>To buy airtime, you can follow these steps:</p>
                            <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                <li>Navigate to the <a href='/org/dashboard/transact/buyairtime' className='text-blue-600 font-medium'>Buy Airtime</a> page.</li>
                                <li>To buy airtime, select the campaign you wish to buy airtime from. You will be able to see the campaign available balance</li>
                                <li> Enter the name and phone number of the recipient you want to buy airtime for.</li>
                                <li>Enter the amount you want to buy and click on the <strong>Buy</strong> button</li>
                                <li>The buy button will initialize the transaction which requires <strong>3</strong> signatories to be completed </li>
                                <li>If you have not set your signatories, navigate to <a href='/org/dashboard/transact/signatories' className='text-blue-600 font-medium'>Signatories</a> page and add them</li>
                            </ol>
                        </div>
                    </div>
                    <div className="collapse collapse-open bg-white">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            Withdraw
                        </div>
                        <div className="collapse-content px-6">
                            <p className='mb-1'>To withdraw money, you can follow these steps:</p>
                            <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                <li>Navigate to the <a href='/org/dashboard/transact/withdraw' className='text-blue-600 font-medium'>Withdraw</a> page.</li>
                                <li>To withdraw money, select the campaign you wish to withdraw from. You will be able to see the campaign available balance</li>
                                <li>Select your provider. That is M-Pesa or Bank</li>
                                <li>Select your account you wish to withdraw to. Ensure your account is registered. Register your account <a href='/org/dashboard/transact/accounts' className='text-blue-600 font-medium'>here</a></li>
                                <li>Enter the amount you want to withdraw and click on the <strong>Withdraw</strong> button</li>
                                <li>A popup will appear where you will enter the account pin and click on the <strong>Withdraw</strong> button </li>
                                <li>This will initialize the transaction which requires <strong>3</strong> signatories to be completed </li>
                                <li>If you have not set your signatories, navigate to <a href='/org/dashboard/transact/signatories' className='text-blue-600 font-medium'>Signatories</a> page and add them</li>
                            </ol>
                        </div>
                    </div>
                    <div className="collapse collapse-open bg-white">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            Withdrawals
                        </div>
                        <div className="collapse-content px-6">
                            <p className='mb-1'>To view your withdrawals, you can follow these steps:</p>
                            <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                <li>Navigate to the <a href='/org/dashboard/transact/withdrawals' className='text-blue-600 font-medium'>Withdrawals</a> page.</li>
                                <li>You will find a list of all the money out.</li>
                                <li>You can search for withdrawals, transaction type, amount and the account for the withdrawals.</li>
                                <li>Some of the transaction type in the table are <strong>Buy airtime</strong>, <strong>Withdraw to M-Pesa</strong> which is the money withdrawn to M-Pesa and <strong>Withdraw to Bank</strong> which is the money withdrawn to bank</li>
                                <li>To download your withdrawals to PDF click on the <strong>PDF icon</strong></li>
                            </ol>
                        </div>
                    </div>
                    <div className="collapse collapse-open bg-white">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            Transaction status
                        </div>
                        <div className="collapse-content px-6">
                            <p>To check the progress and status of your transaction, follow these steps:</p>
                            <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                <li>Navigate to the <a href='/org/dashboard/transact/withdrawals' className='text-blue-600 font-medium'>Withdrawals</a> page.</li>
                                <li>Copy the tracking id of the transaction you wish to check status</li>
                                <li>Navigate to the <a href='/org/dashboard/transact/transactionstatus' className='text-blue-600 font-medium'>Check status</a> page.</li>
                                <li>Enter the tracking id of the transaction you wish to check status</li>
                                <li>Click on the <strong>Check Status</strong> button</li>
                                <li>The status of the transaction will be displayed</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Profile"/>
                <div role="tabpanel" className="tab-content bg-white border-white rounded-box p-6">
                    <div className="collapse collapse-open bg-white">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">
                            View Profile
                        </div>
                        <div className="collapse-content px-6">
                            <p className='mb-1'>To view your profile, you can follow these steps:</p>
                            <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                <li>Navigate to the <a href='/org/dashboard/profile' className='text-blue-600 font-medium'>My Profile</a> page.</li>
                                <li>You will find your profile details and the ability to edit your profile to match your specifications.</li>
                            </ol>
                        </div>
                    </div>
                    <div className="collapse collapse-open bg-white">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">
                            Log out
                        </div>
                        <div className="collapse-content px-6">
                            <p className='mb-1'>To logout of your account, you can follow these steps:</p>
                            <ol type="lower-roman" style={{ listStyleType: 'lower-roman' }}>
                                <li>On the menubar, click on the profile and click log out</li>
                                <li>You can also log out on the sidebar. Click logout</li>
                                <li>Make sure you logout of you account to ensure security of your account</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HelpCenter