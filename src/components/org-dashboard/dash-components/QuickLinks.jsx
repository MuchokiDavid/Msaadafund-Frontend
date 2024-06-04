import React from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi';
// import { FaDonate, FaHome } from 'react-icons/fa';
import { GrAtm, GrTransaction } from 'react-icons/gr';
// import { IoPersonCircle } from 'react-icons/io5';
import { MdOutlineAppRegistration, MdOutlineCampaign, MdOutlineViewCompactAlt } from 'react-icons/md';
// import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { MdSendToMobile } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";

// Use the icon component dynamically
const QuickLink = ({ icon, name, to }) => {
    const Icon = icon;
    return (
      <Link to={to} className="quick-link flex flex-col items-center justify-center">
        <Icon className="text-6xl mb-1 text-white bg-blue-400 h-10 w-10 rounded-xl p-1" />
        <p className="text-sm">{name}</p>
      </Link>
    );
  };

function QuickLinks() {
    const quickLinksData = [
        // { icon: FaHome , name: 'Home' ,to:'/'},
        // { icon: MdOutlineCampaign, name: 'Create',to:'/org/dashboard/createcampaign' }, 
        { icon: MdOutlineViewCompactAlt, name: 'Campaigns',to:'/org/dashboard/mycampaigns/active' },
        { icon: MdOutlineAppRegistration , name: 'Signatories',to:'/org/dashboard/transact/signatories' },
        { icon: BiMoneyWithdraw , name: 'Accounts' ,to:'/org/dashboard/transact/accounts'},
        { icon: GrAtm , name: 'Withdraw' ,to:'/org/dashboard/transact/withdraw'},
        { icon: MdSendToMobile , name: 'Pay Bills' ,to:'/org/dashboard/transact/paybill'},
        { icon: MdOutlinePayments , name: 'Buy Goods' ,to:'/org/dashboard/transact/till'},
        { icon: FaPhone , name: 'Buy Airtime' ,to:'/org/dashboard/transact/buyairtime'},
        // { icon: GrTransaction , name: 'Transactions',to:'/org/dashboard/transaction' },
        // { icon: IoPersonCircle , name: 'Profile' ,to:'/org/dashboard/profile'}
      ];
  return (
    <div className='py-3 bg-transparent'>
        <h2 className="text-xl mb-4">Quick Links</h2>
        <div className="grid lg:grid-cols-7 grid-cols-3 sm:grid-cols-4 gap-8 py-2">
        {quickLinksData.map((link, index) => (
          //Eclose each link in a card
          <a href={link.to}><div className="bg-white rounded-lg shadow hover:shadow-lg p-4 border" key={index}>
            <QuickLink icon={link.icon} name={link.name} to={link.to} />
          </div></a>
        ))}
      </div>
    </div>
  )
}

export default QuickLinks