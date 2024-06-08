import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { IoClose } from "react-icons/io5";
// import {toast, Toaster} from 'react-hot-toast';
import { AiOutlineDelete } from "react-icons/ai";

function Signatory() {
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [email, setEmail]= useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const accessToken= localStorage.getItem('token');
    const [error, setError] = useState(null);
    const formRef = useRef(null);
    const [signatories, setSignatories] = useState([]);

    // Useeffect to get all signatories from the database
    useEffect(() => {
        
        handleFetch()
        
    }, [accessToken])

    function handleFetch(){
        fetch('/api/v1.0/signatories', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then ((res) => {
            if (res.status === 404) {
                setSignatories([])
                return [];
            }
            return res.json();
        })
        .then((data) => {
            if(data.error){
                setError(data.error)
            }
            else{
                setSignatories(data);                
            }
        })

        .catch((err) => { console.log(err) })
        // .then((response) => {
        //     setSignatories(response.data);
        //     setLoading(false)
        // });
    }
    

    const handleClosePopup = () => {
        setShowCreateAccount(false);
        setError('');
    };

    if (!accessToken) {
        window.location.replace('/org/login')
        setLoading(false);
        return;
    }

    //handlesubmit function to post email and role give alerts with sweetalert
    function handleSubmit(e) {
        e.preventDefault();
        try{
            setLoading(true)
            setError(null)
            fetch('/api/v1.0/signatories', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    email: email,
                    role: role
                })
            }).then((res) => res.json())
            .catch((err) => { console.log(err) })
            .then((data) => {
                if(data.message){                  
                    //Swal
                    Swal.fire({
                        title: 'Success',
                        text: 'Signatory saved successifully',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }) 
                    handleFetch()
                    setLoading(false)
                    setEmail('')
                    setRole('')
                    formRef.current.reset();                  
                }
                if (data.error) {
                    setError(data.error)
                } 
            });
        }
        catch(error){
            setLoading(false)
            setError('Error in saving data', error);
        }
        // finally{
        //     handleFetch()
        //     setLoading(false)
        //     setEmail('')
        //     setRole('')
            
        // }
    }    

    //handledelete function to delete signatory from the database
    function handleDelete(id) {
        //Sweetalert to ask user to confirm before deleting
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                try{
                    setLoading(true)
                    setError(null)

                    fetch(`/api/v1.0/signatories/${id}`, {                
                        method: "DELETE",
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                        }
                    }).then((res) => res.json())
                    .catch((err) => { console.log(err) })
                    .then((data) => {
                        console.log(data)
                        if(data.message){
                            //Swal
                            Swal.fire({
                                title: 'Success',
                                text: data.message,
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500                                
                            })
                            handleFetch()
                        }
                        if (data.error) {
                            setError(data.error)
                        }
                    });
                }
                catch(error){
                    setLoading(false)
                    setError('Error in deleting data', error);
                }
                finally{
                    setLoading(false)
                }
            }
            })
        
    }

    // console.log(signatories)

  return (
    <div>
        <div className="text-sm breadcrumbs mb-4">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                {/* <li><a href='/org/dashboard/accounts'>AccountAuth</a></li> */}
                <li><a href='/org/dashboard/transact/signatories'>Signatories</a></li>
            </ul>
        </div>
        <h2 className="mb-3 text-2xl font-bold leading-tight ">Signatories</h2>
        <hr className='mb-2'/>

        <div className='mx-auto w-full md:max-w-full sm:max-w-full p-6 bg-white rounded-lg border  text-white'>
            <div>
                <button onClick={() => setShowCreateAccount(true)} className='btn btn-ghost bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                    Add Signatory
                </button>
            </div>
            {signatories && signatories.length === 0 && <p className="text-red-600 mb-4">No signatories found.</p>}
            <div className='overflow-x-auto'>
                <table className='min-w-full border table rounded-lg overflow-x-auto text-xs bg-white statTable'>
                    <thead className='text-gray-800 bg-gray-100 text-base'>
                        <tr>
                        <th className='px-6 py-3 font-medium leading-4  tracking-wider text-leftuppercase border-b border-gray-200 '>S/No</th>
                            <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>First Name</th>
                            <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Last Name</th>
                            <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Email</th>
                            <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Role</th>
                            <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {signatories && signatories.map((signatory, index) => (
                            <tr key={signatory.id} className='text-gray-800 text-base'>
                                <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'>{index+1}</td>
                                <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'>{signatory.user.firstName}</td>
                                <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'>{signatory.user.lastName}</td>
                                <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'>{signatory.user.email}</td>
                                <td className='px-4 py-1 whitespace-no-wrap border-b border-gray-200'>{signatory.role}</td>
                                <td>
                                    <button onClick={() => handleDelete(signatory.id)} className='text-red-500'><AiOutlineDelete title='Delete Signatory' size={35} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {showCreateAccount && (
            // Create Account Popup JSX
            <div className="create-account-popup fixed top-0 left-0 w-full min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 py-4">
                <div className='mx-auto lg:max-w-md md:max-w-full sm:max-w-full p-6 bg-white rounded-lg shadow-md text-white h-fit overflow-y-auto'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-semibold mb-4 text-slate-600 '>Add Signatory</h1>
                        </div>
                        <div>
                            <button onClick={handleClosePopup}  className='hover:border rounded text-gray-800 text-2xl w-10 h-10 flex justify-center items-center'><IoClose/></button>
                        </div>
                    </div>
                    
                    <div className='mb-6 flex items-center justify-center'>
                        <form onSubmit={handleSubmit} className='w-full' ref={formRef}>
                        {error && <p className='text-red-500 mt-4'>{error}</p>}
                            <div>
                                <p className='text-gray-600 text-base'>Ensure your signatory is registered as a supporter</p>
                            </div>
                            <div className='my-4'>
                                <label htmlFor='email' className='block mb-2 text-sm font-semibold text-slate-600 '><span className='text-red-500'>*</span>E-Mail</label>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600' placeholder='example@mail.com' required />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='role' className='block mb-2 text-sm font-semibold text-slate-600 '><span className='text-red-500'>*</span>Role</label>
                                <input type='text' value={role} onChange={(e) => setRole(e.target.value)} className='block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600' placeholder='e.g Manager' required />
                            </div>
                            <div>
                                <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
        {/*<Toaster position='top-center' reverseOrder={false} />*/}
    </div>
  )
}

export default Signatory