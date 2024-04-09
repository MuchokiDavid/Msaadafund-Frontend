import React, { useEffect, useState } from 'react'

function DashFooter() {
    const[currentYear, setCurrentYear] = useState(0);

    useEffect(() => {
        function getYear(){
            let year = new Date().getFullYear();
            setCurrentYear(year);
        }
            getYear()
    }, [])
  return (
    <>
        <footer className="bg-gray-900 text-gray-400 py-3">
            <div className="container ml-4">
                <div className="row">
                <div className="col-md-4 mb-4">
                    <h5 className='text-xl mb-1'>About Us</h5>
                    <p>Empowering you to receive donation smarter, faster, and more securely.</p>
                    <p>Reach out to us through <a href='mailto:msaadacontact@gmail.com' className='text-md text-blue-700'>Msaada Team</a> for any questions or feedback.</p>
                </div>
                </div>
                <div className="text-center mt-2">
                <p>&copy; {currentYear} Msaada Mashinani. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </>
    
  )
}

export default DashFooter