import React, { useState } from "react";
import { apiUrl } from "../../../context/Utils";

function TransStatus() {
  const [statusResponse, setStatusResponse] = useState(null);
  const [trackingId, setTrackingId] = useState(null);
  const [errors, setErrors] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    try {
      setLoading(true);
      setErrors(null);
      fetch(`${apiUrl}/api/v1.0/check_transaction_status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tracking_id: trackingId,
        }),
      })
        .then((res) => res.json())
        .catch((err) => {
          setLoading(false);
          setErrors(err);
        })
        .then((data) => {
          if (data.status) {
            setLoading(false);
            setStatusResponse(data.status);
          }
          if (data.error) {
            setLoading(false);
            setErrors(data.error);
          }
        });
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };
  // console.log(statusResponse)

  return (
    <div>
      <div className="text-sm breadcrumbs ml-2">
        <ul>
          <li>
            <a href="/org/dashboard">Dashboard</a>
          </li>
          <li>Transaction Status</li>
        </ul>
      </div>
      <h1 className="font-extrabold text-2xl">Transaction Status</h1>
      <hr className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 border rounded-lg">
        <div>
          <p className="text-gray-700 text-lg">Track your transaction status</p>
          <div className="form-control w-full max-w-xs mt-2">
            <label className="label">
              <span className="label-text font-medium">
                Enter your Tracking ID
              </span>
            </label>
            <input
              type="text"
              placeholder="1f2378ab-xxxx-xxxx-xxxxx"
              className="input input-bordered w-full max-w-xs bg-gray-50"
              onChange={(e) => setTrackingId(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              className="flex items-center justify-center px-6 py-2 border border-blue-600 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-transparent hover:text-gray-900"
              onClick={handleFetch}
            >
              {loading ? "Checking" : "Check Status"}
            </button>
          </div>
          {errors && <p className="text-red-600 text-base mt-1">{errors}</p>}
        </div>
        <div>
          <h2 className="font-bold text-xl">Instructions</h2>
          <ul className="list-disc list-inside text-sm">
            <li>
              Ensure that the tracking id is valid, you can copy the tracking id
              from{" "}
              <a
                href="/org/dashboard/transact/withdrawals"
                className="text-blue-800 font-medium hover:underline"
              >
                here
              </a>
              .
            </li>
            <li>
              Double-check the tracking you wish to check status and make sure
              it is valid
            </li>
          </ul>
        </div>
      </div>

      <div className=" bg-white border rounded-lg p-4 mt-2">
        <h2 className="font-bold text-xl mt-8">Details</h2>
        <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm mt-4">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Tracking Id</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {statusResponse && statusResponse ? (
                  statusResponse.tracking_id
                ) : (
                  <p>..................</p>
                )}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Transaction Id</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {statusResponse && statusResponse.transactions ? (
                  statusResponse.transactions[0].transaction_id
                ) : (
                  <p>..................</p>
                )}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Transaction status</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {statusResponse && statusResponse.transactions ? (
                  statusResponse.transactions[0].status
                ) : (
                  <p>..................</p>
                )}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Provider</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {statusResponse && statusResponse.transactions ? (
                  statusResponse.transactions[0].provider
                ) : (
                  <p>..................</p>
                )}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Name</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {statusResponse && statusResponse.transactions ? (
                  statusResponse.transactions[0].name
                ) : (
                  <p>..................</p>
                )}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Amount</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {statusResponse && statusResponse.transactions ? (
                  statusResponse.transactions[0].amount
                ) : (
                  <p>..................</p>
                )}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Account</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {statusResponse && statusResponse.transactions ? (
                  statusResponse.transactions[0].account
                ) : (
                  <p>..................</p>
                )}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Batch Status</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {statusResponse && statusResponse ? (
                  statusResponse.status
                ) : (
                  <p>..................</p>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default TransStatus;
