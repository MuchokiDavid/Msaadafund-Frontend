import React from 'react'
import { FaDonate, FaHome } from 'react-icons/fa';
import { IoPersonCircle } from 'react-icons/io5';
import { MdOutlineSubscriptions} from 'react-icons/md';
import { GrTransaction } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { IoMdHelpCircle } from 'react-icons/io';


// Use the icon component dynamically
const QuickLinks = ({ icon, name, to }) => {
    const Icon = icon;
    return (
      <Link to={to} className="quick-link flex flex-col items-center justify-center">
        <Icon className="text-6xl mb-1 text-white bg-blue-400 h-10 w-10 rounded-xl p-1 hover:bg-blue-600" />
        <p className="text-sm">{name}</p>
      </Link>
    );
  };

function QuickLink() {
    const quickLinksData = [
        { icon: FaHome , name: 'Home' ,to:'/user/dashboard'},
        { icon: FaDonate , name: 'Contributions' ,to:'/user/dashboard/contributions'},
        { icon: MdOutlineSubscriptions , name: 'Subscripions' ,to:'/user/dashboard/subscriptions'},
        {icon: GrTransaction, name: 'Transactions', to: '/user/dashboard/transactions'},
        { icon: IoMdHelpCircle , name: 'Help' ,to:'/user/dashboard/help'},
        { icon: IoPersonCircle , name: 'Profile' ,to:'/user/dashboard/profile'}
      ];
  return (
    <div className='p-3 bg-transaparent'>
        <h2 className="text-xl mb-4">Quick Links</h2>
        <div className="grid lg:grid-cols-7 grid-cols-3 sm:grid-cols-4 gap-8 py-2">
        {quickLinksData.map((link, index) => (
          <QuickLinks key={index} icon={link.icon} name={link.name} to={link.to} />
        ))}
      </div>
    </div>
  )
}

export default QuickLink