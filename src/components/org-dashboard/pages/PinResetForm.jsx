import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { apiUrl } from "../../../context/Utils";

function ResetPin({ onClose }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const pinPattern = /^[0-9]{4}$/;

  const handleSendOTP = async () => {
    try {
      await axios.post(`${apiUrl}/api/v1.0/acc_forgot_pin`, { email });
      setMessage("OTP sent to your email");
      setStep(2);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleResetPin = async () => {
    try {
      if (newPin !== confirmPin) {
        setMessage("PINs do not match");
        return;
      }
      if (!pinPattern.test(newPin)) {
        setMessage("Please ensure your PIN consists of 4 numbers");
        return;
      }

      await axios.patch(`${apiUrl}/api/v1.0/acc_reset_pin`, {
        email,
        otp,
        new_pin: newPin,
      });
      toast.success("PIN reset successfully");
      setTimeout(() => {
        window.location.href = "/org/dashboard/accounts";
      }, 2000);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleGoToLogin = () => {
    // window.location.href = '/org/dashboard/transact/accounts';
    onClose();
  };

  const handlePrevStep = () => {
    if (step === 1) {
      handleGoToLogin();
    } else {
      setStep(step - 1);
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-mdsm:p-8">
          <div className="flex justify-between mb-4 text-gray-800">
            <button
              onClick={handlePrevStep}
              className="hover:border hover:rounded-full w-6 h-6 flex justify-center items-center"
            >
              {step === 1 ? (
                <IoMdCloseCircleOutline className="w-full h-full" />
              ) : (
                <GrLinkPrevious />
              )}
            </button>
            {step < 2 && (
              <button
                className="hover:border hover:rounded-full w-6 h-6 flex justify-center items-center"
                onClick={handleNextStep}
              >
                <GrLinkNext />
              </button>
            )}
          </div>
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            {step === 1 ? "Reset Pin" : "Enter OTP and New PIN"}
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {step === 1 ? (
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  <span className="text-red-500">*</span>Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  <span className="text-red-500">*</span>OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Enter OTP"
                />
                <label
                  htmlFor="new-pin"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New PIN
                </label>
                <input
                  type="password"
                  name="new-pin"
                  id="new-pin"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  pattern={pinPattern}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="••••"
                  required=""
                />
                <label
                  htmlFor="confirm-pin"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm PIN
                </label>
                <input
                  type="password"
                  name="confirm-pin"
                  id="confirm-pin"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="••••"
                  required=""
                />
              </div>
            )}
            <button
              type="button"
              onClick={step === 1 ? handleSendOTP : handleResetPin}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {step === 1 ? "Send OTP" : "Reset PIN"}
            </button>
          </form>
          <p className="mt-2 text-sm text-center text-gray-500">{message}</p>
        </div>
      </div>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </div>
  );
}

export default ResetPin;
