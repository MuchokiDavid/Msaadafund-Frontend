import React from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FaDonate, FaHome } from 'react-icons/fa';
import { GrTransaction } from 'react-icons/gr';
import { IoPersonCircle } from 'react-icons/io5';
import { MdOutlineCampaign, MdOutlineViewCompactAlt } from 'react-icons/md';
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { Link } from 'react-router-dom';


// Use the icon component dynamically
const QuickLink = ({ icon, name, to }) => {
    const Icon = icon;
    return (
      <Link to={to} className="quick-link flex flex-col items-center justify-center">
        <Icon className="text-6xl mb-1 text-white bg-blue-400 h-10 w-10 rounded-xl p-1 hover:bg-blue-600" />
        <p className="text-sm">{name}</p>
      </Link>
    );
  };

function QuickLinks() {
    const quickLinksData = [
        { icon: FaHome , name: 'Home' ,to:'/'},
        { icon: MdOutlineCampaign, name: 'Add',to:'/org/dashboard/createcampaign' }, 
        { icon: MdOutlineViewCompactAlt, name: 'Campaigns',to:'/org/dashboard/campaigns' },
        { icon: FaDonate , name: 'Donations',to:'/org/dashboard/donations' },
        { icon: FaMoneyBillTrendUp , name: 'Withdraw' ,to:'/org/dashboard/transact/withdraw'},
        { icon: FaPhone , name: 'Buy Airtime' ,to:'/org/dashboard/transact/buyairtime'},
        { icon: GrTransaction , name: 'Transactions',to:'/org/dashboard/transaction' },
        { icon: BiMoneyWithdraw , name: 'Accounts' ,to:'/org/dashboard/accounts'},
        { icon: IoPersonCircle , name: 'Profile' ,to:'/org/dashboard/profile'}
        // { icon: IconName3, name: 'Log out' },
      ];
  return (
    <div className='p-3 bg-transaparent'>
        <h2 className="text-xl mb-4">Quick Links</h2>
        <div className="grid lg:grid-cols-7 grid-cols-3 sm:grid-cols-4 gap-8 py-2">
        {quickLinksData.map((link, index) => (
          <QuickLink key={index} icon={link.icon} name={link.name} to={link.to} />
        ))}
      </div>
    </div>
  )
}

export default QuickLinks