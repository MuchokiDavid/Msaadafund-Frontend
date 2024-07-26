import React from 'react'
import { FaDonate, FaHome } from 'react-icons/fa';
import { IoPersonCircle } from 'react-icons/io5';
import { MdOutlineSubscriptions} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoMdHelpCircle } from 'react-icons/io';
import { GrTransaction } from "react-icons/gr";

// Use the icon component dynamically
const QuickLinks = ({ icon, name, to }) => {
    const Icon = icon;
    return (
      <Link to={to} className="quick-link flex flex-col items-center justify-center">
        <Icon className="text-6xl mb-1 text-white bg-blue-400 h-10 w-10 rounded-xl p-1" />
        <p className="text-sm">{name}</p>
      </Link>
    );
  };
  

function QuickLink() {
  const isSignatory = localStorage.getItem('isSignatory') === 'true';

    const quickLinksData = [
        { icon: FaHome , name: 'Home' ,to:'/user/dashboard'},
        { icon: FaDonate , name: 'Contributions' ,to:'/user/dashboard/contributions'},
        { icon: MdOutlineSubscriptions , name: 'Following' ,to:'/user/dashboard/subscriptions'},
        { icon: IoMdHelpCircle , name: 'Help' ,to:'/user/dashboard/help'},
        { icon: IoPersonCircle , name: 'Profile' ,to:'/user/dashboard/profile'}
      ];

      if (isSignatory) {
        quickLinksData.push({icon: GrTransaction, name: 'Approvals', to: '/user/dashboard/approvals'},);
      }

  return (
    <div className='py-3 bg-transparent'>
        <h2 className="text-xl mb-4">Quick Links</h2>
        <div className="grid lg:grid-cols-7 grid-cols-3 sm:grid-cols-4 gap-8 py-2">
        {quickLinksData.map((link, index) => (
          <a href= {link.to}><div className="bg-white rounded-lg shadow hover:shadow-lg p-4 border" key={index}>
            <QuickLinks key={index} icon={link.icon} name={link.name} to={link.to} />
          </div></a>
        ))}
      </div>
    </div>
  )
}

export default QuickLink