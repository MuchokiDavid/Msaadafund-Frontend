import React from 'react';
import { BiMoneyWithdraw } from 'react-icons/bi';
// import { FaDonate, FaHome } from 'react-icons/fa';
import { GrAtm, GrTransaction } from 'react-icons/gr';
// import { IoPersonCircle } from 'react-icons/io5';
import { MdOutlineAppRegistration, MdOutlineCampaign, MdOutlineViewCompactAlt } from 'react-icons/md';
// import { FaMoneyBillTrendUp, MdOutlineCampaign } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { MdSendToMobile } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { IoPersonCircle } from 'react-icons/io5';
import { FcApprove } from 'react-icons/fc';
import { FaDonate } from 'react-icons/fa';
import { BsBoxArrowDown } from 'react-icons/bs';

// Use the icon component dynamically
const QuickLink = ({ icon, name, to, className }) => {
    const Icon = icon;
    return (
      <Link to={to} className={`quick-link flex flex-col items-center justify-center ${className}`}>
        <Icon className="text-6xl mb-1 text-white bg-blue-400 h-10 w-10 rounded-xl p-1" />
        <p className="text-sm">{name}</p>
      </Link>
    );
};

function QuickLinks() {
    const quickLinksData = [
        // { icon: FaHome , name: 'Home' ,to:'/'},
        { icon: MdOutlineCampaign, name: 'Create',to:'/org/dashboard/createcampaign', className: 'create-campaign'}, 
        { icon: MdOutlineViewCompactAlt, name: 'Campaigns', to: '/org/dashboard/mycampaigns/active', className: 'view-campaigns' },
        { icon: FaDonate, name: 'Contributions', to: '/org/dashboard/donations', className:'view-contributions'},
        { icon: MdOutlineAppRegistration, name: 'Signatories', to: '/org/dashboard/transact/signatories', className:'view-signatories'},
        { icon: BiMoneyWithdraw, name: 'Accounts', to: '/org/dashboard/transact/accounts', className:'add-withdrawal-account'},
        { icon: GrAtm, name: 'Withdraw', to: '/org/dashboard/transact/withdraw', className:'withdraw-funds'},
        { icon: FcApprove, name: 'Approvals', to: '/org/dashboard/transact/approvals', className:'view-approvals'},
        { icon: BsBoxArrowDown, name: 'Withdrawals', to: '/org/dashboard/transact/withdrawals', className:'view-withdrawals'},
        { icon: MdSendToMobile, name: 'Pay bills', to: '/org/dashboard/transact/paybill', className:'paybills'},
        { icon: MdOutlinePayments, name: 'Buy goods', to: '/org/dashboard/transact/till', className:'buy-goods'},
        { icon: FaPhone, name: 'Buy airtime', to: '/org/dashboard/transact/buyairtime', className:'airtime'},
        { icon: GrTransaction, name: 'Transactions', to: '/org/dashboard/transaction', className:'view-transactions'},
        { icon: IoPersonCircle, name: 'Profile', to: '/org/dashboard/profile', className:'view-profile'}
    ];
  
    return (
        <div className='py-3 bg-transparent'>
            <h2 className="text-xl mb-4 view-quick">Quick Links</h2>
            <div className="grid lg:grid-cols-7 grid-cols-3 sm:grid-cols-4 gap-8 py-2">
                {quickLinksData.map((link, index) => (
                    <div className="bg-white rounded-lg shadow hover:shadow-lg p-4 border" key={index}>
                        <QuickLink icon={link.icon} name={link.name} to={link.to} className={link.className} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuickLinks;
