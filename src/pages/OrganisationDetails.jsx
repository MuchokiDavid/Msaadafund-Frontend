// import { FaFacebook } from 'react-icons/fa';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menus from "../components/reusables/Menus";
import Footer from "../components/reusables/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaDonate } from "react-icons/fa";
import { LuUserPlus } from "react-icons/lu";
import { prettyNumber } from "@based/pretty-number";
import { useAuth } from "../context/usersContext";
import Swal from "sweetalert2";
import OrgActive from "../components/campaigns/OrgActive";
import Profile from "./PublicOrgProfile";
import { FaGlobe } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineCampaign } from "react-icons/md";
import PopupGoogle from "../components/user-auth/PopupGoogle";
import { apiUrl, appKey } from "../context/Utils";
import orgImage from "../../src/assets/orgProfile.png";

function OrganisationDetails() {
  const { orgid } = useParams();
  const [organisationDetails, setOrganisationDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const users = localStorage.getItem("user");
  const accessToken = localStorage.getItem("token");
  const org = localStorage.getItem("org");
  const [subscribe, setSubscribe] = useState(false);
  const { userLogin, loginMessage, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const decodedName = orgid.replace(/-/g, " ");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/api/v1.0/org_by_id/${decodedName}`, {
        headers: {
          "X-API-KEY": appKey,
        },
      })
      .then((res) => {
        setOrganisationDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorMsg = error.response?.data?.error || "An error occurred";
        console.error(errorMsg);
      });
  }, [orgid, decodedName]);

  useEffect(() => {
    if (users && accessToken && organisationDetails && organisationDetails.id) {
      const fetchSubscription = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
          const response = await axios.get(
            `${apiUrl}/api/v1.0/subscription/${organisationDetails.id}`,
            config
          );
          if (response.status === 200) {
            // Check response status
            setSubscribe(true);
          }
          // Note: If response status is not 200, then there are no subscriptions found.
        } catch (error) {
          const errorMsg = error.response?.data?.error || "An error occurred";
          console.error(errorMsg);
          setSubscribe(false);
        }
      };

      fetchSubscription();
    }
  }, [organisationDetails, users, accessToken]);

  //Login user in order to subscribe
  const handleLogin = async (e) => {
    e.preventDefault();
    await userLogin(username, password);
  };

  const handleSubscribe = async () => {
    try {
      if (org) {
        logout();
        setShowModal(true);
        return;
      }

      if (!users && !accessToken) {
        setShowModal(true);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      setLoading(true);
      // Await the axios.post call
      const response = await axios.post(
        `${apiUrl}/api/v1.0/subscription/${organisationDetails.id}`,
        {},
        config
      );
      setLoading(false);
      if (response.status === 200) {
        Swal.fire({
          title: "Following Successful",
          text: `You will now receive updates from ${organisationDetails.orgName} on their activities and progress. Thank you for showing your support!`,
          icon: "success",
        });
        setSubscribe(true);
      }
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.error || "An error occurred";
      setErrors(errorMsg);
    }
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Unfollow?",
      text: `Are you sure you want to unfollow ${organisationDetails.orgName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };

          setLoading(true);
          const response = await axios.delete(
            `${apiUrl}/api/v1.0/subscription/${organisationDetails.id}`,
            config
          );
          setLoading(false);
          if (response.status === 200) {
            Swal.fire({
              title: `Unfollowed successifully`,
              text: `You have successfully unfollowed from updates from ${organisationDetails.orgName}. If you change your mind, you can always subscribe later. Thank you for your support.`,
              icon: "success",
            });
            setSubscribe(false);
          }
        } catch (error) {
          setLoading(false);
          const errorMsg = error.response?.data?.error || "An error occurred";
          console.error(errorMsg);
          setSubscribe(false);
        }
      }
    });
  };

  if (!organisationDetails) {
    return (
      <div class="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  // Function to calculate total donations with status "COMPLETE"
  function getTotalDonations(campaigns) {
    let totalDonations = 0;

    campaigns.forEach((campaign) => {
      campaign.donations.forEach((donation) => {
        // Check if the donation status is "COMPLETE"
        if (donation.status === "COMPLETE") {
          totalDonations += donation.amount;
        }
      });
    });

    return totalDonations;
  }

  // console.log(organisationDetails)

  // to show password visibility
  const handlePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Menus />
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-30 backdrop-blur-sm z-40"></div>
      )}
      <div className="mt-0">
        <Profile
          orgName={organisationDetails && organisationDetails.orgName}
          orgType={organisationDetails && organisationDetails.orgType}
          // orgWebsite={organisationDetails && organisationDetails.orgWebsite}
          orgEmail={organisationDetails && organisationDetails.orgEmail}
          orgPhone={organisationDetails && organisationDetails.orgPhone}
          subscribe={subscribe}
          handleSubscribe={handleSubscribe}
          handleUnsubscribe={handleUnsubscribe}
          loading={loading}
          errors={errors}
          profileImage={
            organisationDetails && organisationDetails.profileImage
              ? `${organisationDetails.profileImage}`
              : `${orgImage}`
          }
        />
      </div>

      <div className="mx-auto min-h-screen container">
        <div className="flex flex-col lg:flex-row gap-6 justify-center lg:justify-start">
          <div className="h-full lg:w-1/4">
            {/* -------------------------------------Profile card------------------------------------ */}
            <div className="relative rounded-lg shadow-lg p-4 bg-white mr-1 ">
              <div className="text-left lg:mt-4">
                <div className="text-gray-700 space-y-4">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    </svg>
                    {organisationDetails?.orgAddress}
                  </div>
                  <div className="flex items-center">
                    <MdOutlineCampaign
                      title="Campaign"
                      className="w-5 h-5 mr-2 text-gray-400"
                    />
                    {organisationDetails?.campaigns.length}{" "}
                    {organisationDetails?.campaigns.length < 2
                      ? "Campaign"
                      : "Campaigns"}
                  </div>
                  <div className="flex items-center">
                    <LuUserPlus
                      title="Campaign"
                      className="w-5 h-5 mr-2 text-gray-400"
                    />
                    {organisationDetails?.subscriptions.length}{" "}
                    {organisationDetails?.subscriptions.length <= 1
                      ? "Follower"
                      : "Followers"}
                  </div>
                  <div className="flex items-center">
                    <FaDonate
                      title="Campaign"
                      className="w-5 h-5 mr-2 text-gray-400"
                    />
                    Ksh.{" "}
                    {organisationDetails &&
                      prettyNumber(
                        getTotalDonations(organisationDetails.campaigns),
                        "number-short"
                      )}
                  </div>
                  {organisationDetails?.youtube_link && (
                    <div className="flex items-center">
                      <a
                        href={organisationDetails?.youtube_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:underline"
                      >
                        <FaYoutube
                          size={22}
                          className="w-5 h-5 mr-2 text-red-500"
                        />
                        <span>Youtube</span>
                      </a>
                    </div>
                  )}
                  {organisationDetails?.website_link && (
                    <div className="flex items-center">
                      <a
                        href={organisationDetails?.website_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center  hover:underline"
                      >
                        <FaGlobe
                          size={20}
                          className="w-5 h-5 mr-2 text-blue-600"
                        />
                        <span>Our Website</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="px-2 pb-4 mt-6">
                <p>
                  {organisationDetails?.orgDescription
                    ? more
                      ? organisationDetails.orgDescription
                      : `${organisationDetails.orgDescription.slice(0, 100)}...`
                    : ""}
                </p>
                <button
                  className="text-blue-600 hover:underline mt-2"
                  onClick={() => setMore(!more)}
                >
                  {more ? "Show less" : "Show more"}
                </button>
              </div>
            </div>
          </div>
          <div className="h-full lg:w-4/5">
            <OrgActive organisationDetails={organisationDetails?.campaigns} />
          </div>

          <dialog
            open={showModal}
            onClose={() => setShowModal(false)}
            className="modal flex-row justify-center items-center text-center"
          >
            <div className="modal-box bg-gray-50 text-gray-800 border border-gray-300">
              <h3 className="font-bold text-lg">Please Log in</h3>
              {/* <div className="modal-action"> */}
              {loginMessage && <p className="text-red-500">{loginMessage}</p>}
              <form
                className="flex justify-center items-center"
                onSubmit={handleLogin}
              >
                <div className="flex-col justify-center items-center pl-4 pr-8">
                  <div className="my-4">
                    <label className="font-semibold my-3" htmlFor="password">
                      Username or E-Mail
                    </label>
                    <input
                      className="input input-bordered w-full bg-white text-gray-800"
                      placeholder="Username or E-Mail"
                      onChange={(e) => setUserName(e.target.value)}
                      value={username}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold mb-4" htmlFor="password">
                      <span className="text-red-500">*</span>Enter Password
                    </label>
                    <div></div>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="input input-bordered w-full bg-white text-gray-800"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      name="password"
                      required
                      autoComplete=""
                    />
                    <button
                      onClick={handlePasswordVisibility}
                      className="absolute inset-y-1 right-14 mx-2 flex items-center mb-6"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn bg-blue-600 my-4 text-white w-full"
                    >
                      Log in
                    </button>
                    <div className="flex justify-center">
                      <p>Or</p>
                    </div>
                    <PopupGoogle />
                  </div>
                  <p className="my-4">
                    Don't have an account?{" "}
                    <Link to="/user/signup">
                      <span className=" text-blue-600 hover:underline">
                        Register
                      </span>
                    </Link>
                  </p>
                </div>
              </form>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>

              {/* </div> */}
            </div>
          </dialog>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrganisationDetails;
