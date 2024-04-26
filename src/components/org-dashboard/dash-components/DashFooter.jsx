import React, { useEffect, useState } from 'react'
import Copyright from '../../reusables/Copyright';

function DashFooter() {
    const[currentYear, setCurrentYear] = useState(0);

  return (
    <div>
        <footer className="bg-emerald-800 text-white py-2 text-sm">
            <div className="ml-4">
                <div className="row">
                <div className="col-md-4 mb-4">
                    <h5 className='text-xl mb-1'>About Us</h5>
                    <p>Empowering you to receive donation smarter, faster, and more securely.</p>
                    <p>Reach out to us through <a href='mailto:msaadacontact@gmail.com' className='text-md text-blue-300'>Msaada Team</a> for any questions or feedback.</p>
                </div>
                </div>
            </div>
        </footer>
        <Copyright/>
    </div>
    
  )
}

export default DashFooter