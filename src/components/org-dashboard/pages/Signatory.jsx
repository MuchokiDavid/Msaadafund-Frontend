// import { toast } from 'react-toastify';
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import { toast, Toaster } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { apiUrl } from "../../../context/Utils";
import axios from "axios";
// import { response } from 'express';

function Signatory() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const [signatories, setSignatories] = useState([]);
  const [deleting, setDeleting] = useState(null);

  // const [otp, setOtp] = useState('');

  // Useeffect to get all signatories from the database
  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line
  }, [accessToken]);

  function handleFetch() {
    setLoading(true);
    fetch(`${apiUrl}/api/v1.0/signatories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          setLoading(false);
          setSignatories([]);
          return [];
        }
        if (res.status === 200) {
          setLoading(false);
          return res.json();
        }
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setSignatories(data);
          setLoading(false);
        }
      })

      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    // .then((response) => {
    //     setSignatories(response.data);
    //     setLoading(false)
    // });
  }

  const handleClosePopup = () => {
    setShowCreateAccount(false);
    setError("");
    setLoading(false);
    setRole("");
    setEmail("");
    setDeleting(false);
  };

  if (!accessToken) {
    window.location.replace("/org/login");
    setLoading(false);
    return;
  }

  //handlesubmit function to post email and role give alerts with sweetalert
  function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      fetch(`${apiUrl}/api/v1.0/signatories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: email,
          role: role,
        }),
      })
        .then((res) => res.json())
        .catch((err) => {
          setError(err);
        })
        .then((data) => {
          if (data.message) {
            //Swal
            Swal.fire({
              title: "Success",
              text: "Signatory saved successifully",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            setLoading(false);
            setEmail("");
            setRole("");
            setShowCreateAccount(false);
            handleFetch();
          }

          if (data.error) {
            setError(data.error);
          }
        });
    } catch (error) {
      setLoading(false);
      setError("Error in saving data", error);
    }
  }

  const handleOtp = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1.0/signatory/${id}/request-otp`,
        {},
        config
      );
      // response should send the email
      // console.log(response)
      if (response.status === 200) {
        toast.success("OTP sent to email");
        return true;
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "An error occurred";
      setError(errorMsg);
      return false;
    }
  };

  const deleteSignatory = async (id) => {
    setDeleting(id);
    const otpRequest = await handleOtp(id);
    // console.log(otpRequest)
    if (!otpRequest) {
      setDeleting(null);
      return;
    } else {
      try {
        const { value: otpInput } = await Swal.fire({
          title: "Remove signatory ",
          input: "text",
          inputLabel: "Enter OTP sent to your email",
          // inputValue,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              setDeleting(false);
              return "You need to enter the OTP sent!";
            }
          },
        });

        if (otpInput) {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          };
          // Send OTP in request body
          // setDeleting(true)
          const response = await axios.delete(
            `${apiUrl}/api/v1.0/signatories/${id}`,
            {
              data: { otp: otpInput },
              ...config,
            }
          );
          if (response.status === 200) {
            // setDeleting(false)
            Swal.fire({
              title: "Success",
              text: "Signatory deleted successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            handleFetch();
          }
        }
      } catch (error) {
        const errorMsg = error.response?.data?.error || "An error occurred";
        setError(errorMsg);
      }
      setDeleting(null);
    }
  };

  // console.log(signatories)

  return (
    <div>
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <a href="/org/dashboard">Dashboard</a>
          </li>
          {/* <li><a href='/org/dashboard/accounts'>AccountAuth</a></li> */}
          <li>
            <a href="/org/dashboard/transact/signatories">Signatories</a>
          </li>
        </ul>
      </div>
      <h2 className="mb-3 text-2xl font-bold leading-tight ">Signatories</h2>
      <hr className="mb-2" />

      <div className="mx-auto w-full md:max-w-full sm:max-w-full p-6 bg-white rounded-lg border  text-white">
        <div className="mb-4">
          <button
            onClick={() => setShowCreateAccount(true)}
            className="btn btn-ghost bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            Add Signatory
          </button>

          <p className="text-gray-800">
            <span className="text-red-600">*</span>Add atleast three signatories
            for transactions approvals
          </p>
        </div>
        {loading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : null}
        {signatories && signatories.length === 0 && (
          <p className="text-red-600 mb-4">No signatories found.</p>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full border table table-sm table-auto rounded-lg overflow-x-auto text-xs bg-white statTable">
            <thead className="text-gray-800 bg-gray-100">
              <tr>
                <th className="px-4 py-3 font-medium leading-4  tracking-wider text-leftuppercase border-b border-gray-200 ">
                  S/No
                </th>
                <th className="px-4 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 ">
                  First Name
                </th>
                <th className="px-4 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 ">
                  Last Name
                </th>
                <th className="px-4 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 ">
                  Email
                </th>
                <th className="px-4 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 ">
                  Role
                </th>
                <th className="px-4 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {signatories &&
                signatories.map((signatory, index) => (
                  <tr key={signatory.id} className="text-gray-800 text-base">
                    <td className="px-4 py-1 whitespace-no-wrap border-b border-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-4 py-1 whitespace-no-wrap border-b border-gray-200">
                      {signatory.user.firstName}
                    </td>
                    <td className="px-4 py-1 whitespace-no-wrap border-b border-gray-200">
                      {signatory.user.lastName}
                    </td>
                    <td className="px-4 py-1 whitespace-no-wrap border-b border-gray-200">
                      {signatory.user.email}
                    </td>
                    <td className="px-4 py-1 whitespace-no-wrap border-b border-gray-200">
                      {signatory.role}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteSignatory(signatory.id)}
                        className="text-red-500 text-sm"
                      >
                        {deleting === signatory.id ? (
                          <span className="loading loading-dots loading-sm"></span>
                        ) : (
                          <AiOutlineDelete title="Delete Signatory" size={25} />
                        )}
                      </button>
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
          <div className="mx-auto lg:max-w-md md:max-w-full sm:max-w-full p-6 bg-white rounded-lg shadow-md text-white h-fit overflow-y-auto">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-semibold mb-4 text-slate-600 ">
                  Add Signatory
                </h1>
              </div>
              <div>
                <button
                  onClick={handleClosePopup}
                  className="hover:border rounded text-gray-800 text-2xl w-10 h-10 flex justify-center items-center"
                >
                  <IoClose />
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-center">
              <form onSubmit={handleSubmit} className="w-full" ref={formRef}>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <div>
                  <p className="text-gray-600 text-base">
                    Ensure your signatory is registered as a supporter
                  </p>
                </div>
                <div className="my-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold text-slate-600 "
                  >
                    <span className="text-red-500">*</span>E-Mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600"
                    placeholder="example@mail.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-semibold text-slate-600 "
                  >
                    <span className="text-red-500">*</span>Role
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600"
                    placeholder="e.g Manager"
                    required
                  />
                </div>
                <div>
                  {loading ? (
                    <button
                      type="button"
                      class="btn btn-md py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="mr-2 animate-spin"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                      </svg>
                      Saving
                    </button>
                  ) : (
                    <button
                      type="submit"
                      class="btn btn-md py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
                    >
                      Save
                    </button>
                  )}
                  {/* <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                    {loading ? 'Saving...' : 'Save'}
                                </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Signatory;

// //handledelete function to delete signatory from the database
// function handleDelete(id) {
//     //Sweetalert to ask user to confirm before deleting
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//         if (result.isConfirmed) {
//             try{
//                 setLoading(true)
//                 setError(null)

//                 fetch(`${apiUrl}/api/v1.0/signatories/${id}`, {
//                     method: "DELETE",
//                     headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${accessToken}`
//                     }
//                 }).then((res) => res.json())
//                 .catch((err) => { console.log(err) })
//                 .then((data) => {
//                     // console.log(data)
//                     if(data.message){
//                         //Swal
//                         Swal.fire({
//                             title: 'Success',
//                             text: data.message,
//                             icon: 'success',
//                             showConfirmButton: false,
//                             timer: 1500
//                         })
//                         handleFetch()
//                     }
//                     if (data.error) {
//                         setError(data.error)
//                     }
//                 });
//             }
//             catch(error){
//                 setLoading(false)
//                 setError('Error in deleting data', error);
//             }
//             finally{
//                 setLoading(false)
//             }
//         }
//         })

// }
