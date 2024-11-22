import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import {toast,Toaster} from 'react-hot-toast'
import Menus from "../components/reusables/Menus";
import Footer from "../components/reusables/Footer";
import Slider from "react-slick";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import Swal from "sweetalert2";
import { useAuth } from "../context/usersContext";
import Card from "./Card";
import Announcement from "../components/reusables/Announcement";
// import Featured from '../components/campaigns/Featured';
import PopupGoogle from "../components/user-auth/PopupGoogle";
import { apiUrl, appKey, url } from "../context/Utils";
import { MdOutlineSendToMobile } from "react-icons/md";
import QRCode from "react-qr-code";
import Partners from "../components/home/Partners";

// Functions to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getRandomElements = (array, count) => {
  const shuffledArray = shuffleArray([...array]);
  return shuffledArray.slice(0, count);
};

function CampainDetails() {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [amount, setDonationAmount] = useState(5);
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [errors, setErrors] = useState();
  const phonePattern = /^(07|01)\d{8}$/;
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin, setLoginMessage, loginMessage, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("M-Pesa");
  const [showPassword, setShowPassword] = useState(false);
  const [cardEmail, setCardEmail] = useState("");
  const [loading, setLoading] = useState(false);

  //card states
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  // const [emailAdd, setEmailAdd]= useState('')
  const [cardCurrency, setCardCurrency] = useState("");
  const [cardAmount, setCardAmount] = useState(100);

  // const  navigate = useNavigate();
  // const currentlWebUrl= window.location.href
  const currentlWebUrl = `https://www.msaadafund.com${window.location.pathname}`; // Add link after deployment
  const [subscribe, setSubscribe] = useState(false);
  const [org_id, setOrg_id] = useState(null);
  const users = localStorage.getItem("user");
  const accessToken = localStorage.getItem("token");
  const org = localStorage.getItem("org");
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const isLargeScreen = window.innerWidth >= 1024;
  const [more, setMore] = useState(false);
  const formRef = useRef(null);
  const [donating, setDonating] = useState(false);

  const [randomDonations, setRandomDonations] = useState([]);
  const hasShuffled = useRef(false); // Use useRef to keep track of whether shuffling has been done

  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("en"); //Language change
  const [translatedCategory, setTranslatedCategory] = useState("");
  const [translatedCampName, setTranslatedCampName] = useState("");
  const [translatedStory, setTranslatedStory] = useState("");
  const [translatedGoal, setTranslatedGoal] = useState("");
  const [translatedContributions, setContributions] = useState("");
  const [translatedMpesa, setTranslatedMpesa] = useState("");
  const [translatedGlobal, setTranslatedGlobal] = useState("");
  const [submitTranslate, setSubmitTranslate] = useState("");
  const [shareTranslate, setShareTranslate] = useState("");
  const [giveTranslate, setGiveTranslate] = useState("");

  //decode route
  const decodedName = campaignId.replace(/-/g, " ");
  // to check the subscription state
  //shuffle all donations and get five donations
  const completeDonations =
    campaign &&
    campaign.donations.filter((donation) => donation.status === "COMPLETE");

  useEffect(() => {
    if (accessToken && userData) {
      setFName(userData.firstName);
      setLName(userData.lastName);
      setPhoneNo(userData.phoneNumber);
      setName(`${userData.firstName} ${userData.lastName}`);
      setCardEmail(userData.email);
    }
  }, [accessToken, userData]);

  useEffect(() => {
    const fetchCampaign = () => {
      fetch(`${apiUrl}/api/v1.0/campaign/${decodedName}`, {
        headers: {
          "X-API-KEY": appKey,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCampaign(data);
          const org_id = data.organisation.id;
          setOrg_id(org_id);
          // get user details
        })
        .catch((error) =>
          console.error("Error fetching campaign details:", error)
        );
    };

    fetchCampaign();

    // const intervalId = setInterval(fetchCampaign, 15000);//Polling done here to fetch campaign
    // return () => clearInterval(intervalId);
  }, [campaignId, decodedName]);

  // get subscription status
  useEffect(() => {
    if (users && accessToken && campaign && campaign.organisation.id) {
      const fetchSubscription = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
          const response = await axios.get(
            `${apiUrl}/api/v1.0/subscription/${campaign.organisation.id}`,
            config
          );
          if (response.status === 200) {
            // Check response status
            setSubscribe(true);
          }
          // Note: If response status is not 200, then there are no subscriptions found.
        } catch (error) {
          const errorMsg = error.response?.data?.error || "An error occurred";
          //   console.error(errorMsg);
          console.error(errorMsg);
          setSubscribe(false);
        }
      };

      fetchSubscription();
    }
  }, [campaign, users, accessToken]);

  //   useEffect(() => {
  //         if (!hasShuffled.current && completeDonations && completeDonations.length > 0) {
  //             const randomElements = getRandomElements(completeDonations, 5);
  //             setRandomDonations(randomElements);
  //             hasShuffled.current = true; // Set the ref to true after shuffling
  //         }
  //     }, [completeDonations]);
  // Handle subscription status and shuffling of donations
  useEffect(() => {
    if (campaign) {
      const completeDonations = campaign.donations.filter(
        (donation) => donation.status === "COMPLETE"
      );
      if (completeDonations.length > 0) {
        // Initialize the shuffled donations
        if (!hasShuffled.current) {
          setRandomDonations(getRandomElements(completeDonations, 5));
          hasShuffled.current = true; // Set ref to true after initial shuffle
        }

        // Set interval for continuous shuffling
        const intervalId = setInterval(() => {
          setRandomDonations(getRandomElements(completeDonations, 5));
        }, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
      }
    }
  }, [campaign]);

  //Login user in order to subscribe
  const handleLogin = async (e) => {
    e.preventDefault();
    if (org) {
      logout();
      return;
    }

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
      const response = await axios.post(
        `${apiUrl}/api/v1.0/subscription/${campaign.organisation.id}`,
        {},
        config
      );
      setLoading(false);
      if (response.status === 200) {
        Swal.fire({
          title: "Following Successful",
          text: `You will now receive updates from ${campaign.organisation.orgName} on their activities and progress. Thank you for showing your support!`,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            setSubscribe(true);
          }
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "An error occurred";
      console.error(errorMsg);
      // setSubscribe(false);
    }
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    const orgsnt = campaign.organisation.orgName;
    Swal.fire({
      title: "Unfollow?",
      text: `Are you sure you want to unfollow ${orgsnt}?`,
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
          // Await the axios.delete call
          setLoading(true);
          const response = await axios.delete(
            `${apiUrl}/api/v1.0/subscription/${org_id}`,
            config
          );
          setLoading(false);
          if (response.status === 200) {
            // Show success message
            await Swal.fire({
              title: `Unfollowed successifully`,
              text: `You have successfully unfollowed from updates from ${campaign.organisation.orgName}. If you change your mind, you can always subscribe later. Thank you for your support.`,
              icon: "success",
            });
            // Reload the page or perform any other necessary action
            // window.location.reload();
            setSubscribe(false);
          }
        } catch (error) {
          const errorMsg = error.response?.data?.error || "An error occurred";
          console.error(errorMsg);
          setSubscribe(false);
        }
      }
    });
  };

  if (!campaign) {
    return (
      <div class="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  // Make google request to translate language
  const translateText = async (text, targetLanguage) => {
    try {
      const response = await axios.post(url, {
        q: text,
        target: targetLanguage,
      });
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      return text;
    }
  };

  // Handle change of language selection from story dropdown
  const handleLanguageChange = async (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    const translated = await translateText(
      campaign.description,
      selectedLanguage
    );
    const translatedCat = await translateText(
      campaign.category,
      selectedLanguage
    );
    const translatedName = await translateText(
      campaign.campaignName,
      selectedLanguage
    );
    const storyTranslate = await translateText("Story", selectedLanguage);
    const mpesaTranslate = await translateText(
      "Contribute with M-Pesa",
      selectedLanguage
    );
    const globalTranslate = await translateText(
      "Contribute with International Methods",
      selectedLanguage
    );
    const contributionsTranslate = await translateText(
      "Contributions",
      selectedLanguage
    );
    const goalTranslate = await translateText("Target", selectedLanguage);
    setSubmitTranslate(await translateText("Contribute", selectedLanguage));
    setShareTranslate(await translateText("Share", selectedLanguage));
    setGiveTranslate(await translateText("Give Now", selectedLanguage));
    setTranslatedText(translated);
    setTranslatedCategory(translatedCat);
    setTranslatedCampName(translatedName);
    setTranslatedStory(storyTranslate);
    setTranslatedGoal(goalTranslate);
    setContributions(contributionsTranslate);
    setTranslatedMpesa(mpesaTranslate);
    setTranslatedGlobal(globalTranslate);
  };

  const handleDonateButton = (e) => {
    e.preventDefault();
    setErrors("");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    // if start date  is less than current date disable button
    // const currentDate = new Date();
    // const startDate = new Date(campaign.startDate);
    // if (currentDate < startDate) {
    //     toast.error("Campaign has not yet started");
    // } else {}
    let orgsnt = campaign.organisation.orgName;
    let donorName = name ? name : "Anonymous";
    let phoneNo = phoneNum.replace(/^0+/, "");
    let phoneNumber = "254" + phoneNo;
    if (!phoneNum.match(phonePattern)) {
      setErrors("Invalid Phone Number");
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to send Kes ${amount} to ${orgsnt}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Send!",
      }).then((result) => {
        if (result.isConfirmed) {
          setDonating(true);
          if (users && accessToken) {
            axios
              .post(
                `${apiUrl}/api/v1.0/user/donations`,
                {
                  donorName: name,
                  amount,
                  campaignId: decodedName,
                  phoneNumber,
                },
                config
              )
              .then((res) => {
                // console.log('logged in user')
                if (res.status === 200) {
                  setDonating(false);
                  Swal.fire({
                    title: res.data.message,
                    text: "Check your phone and enter M-pesa pin!",
                    icon: "success",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                } else {
                  setDonating(false);
                  Swal.fire(
                    "Error!",
                    "The donation was not successiful. Try again",
                    "error"
                  );
                }
              });
          } else {
            setDonating(true);
            axios
              .post(
                `${apiUrl}/api/v1.0/express/donations`,
                { phoneNumber, amount, donorName, campaignId: decodedName },
                {
                  headers: {
                    "X-API-KEY": appKey,
                  },
                }
              )
              .then((res) => {
                // console.log('express used')
                if (res.status === 200) {
                  setDonating(false);
                  Swal.fire({
                    title: res.data.message,
                    text: "Please check your phone and enter your M-Pesa PIN. If you don't receive a prompt, try using International methods as an alternative",
                    icon: "success",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                      formRef.current.reset();
                    }
                  });
                } else {
                  setDonating(false);
                  Swal.fire(
                    "Error!",
                    "The donation was not successiful. Try again",
                    "error"
                  );
                }

                // window.location.reload();
              })
              .catch((err) => {
                setDonating(false);
                const errorMsg =
                  err.response?.data?.error || "An error occurred";
                console.log(errorMsg);
              });
          }
        }
      });
    }
  };

  //axios to post data for donations via card
  const handleDonateCard = (e) => {
    e.preventDefault();
    setErrors("");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    // if start date  is less than current date disable button
    // const currentDate = new Date();
    // const startDate = new Date(campaign.startDate);
    // if (currentDate < startDate) {
    //     toast.error("Campaign has not yet started");
    // } else {}
    let orgsnt = campaign.organisation.orgName;
    // const international_phone_pattern= /^\d{1,4}?\d{3,14}$/
    if (!cardAmount) {
      setErrors("Please enter the amount");
    } else if (!cardCurrency) {
      setErrors("Please select a currency");
    } else {
      setErrors("");
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to send ${cardCurrency} ${cardAmount} to ${orgsnt}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Send!",
      }).then((result) => {
        if (result.isConfirmed) {
          setDonating(true);
          if (users && accessToken) {
            axios
              .post(
                `${apiUrl}/api/v1.0/logged_in_donate_card`,
                {
                  amount: cardAmount,
                  campaignId: decodedName,
                  currency: cardCurrency,
                },
                config
              )
              .then((res) => {
                if (res.status === 200) {
                  setDonating(false);
                  window.location.replace(res.data.url);
                } else {
                  setDonating(false);
                  Swal.fire(
                    "Error!",
                    "The request was not successiful. Try again",
                    "error"
                  );
                }
              });
          } else {
            setDonating(true);
            axios
              .post(
                `${apiUrl}/api/v1.0/donate_card`,
                {
                  firstName: fName,
                  lastName: lName,
                  cardEmail,
                  phoneNumber: phoneNo,
                  amount: cardAmount,
                  campaignId: decodedName,
                  currency: cardCurrency,
                },
                {
                  headers: {
                    "X-API-KEY": appKey,
                  },
                }
              )
              .then((res) => {
                // console.log(res)
                if (res.status === 200) {
                  setDonating(false);
                  window.location.replace(res.data.url);
                } else {
                  setDonating(false);
                  Swal.fire(
                    "Error!",
                    "The request was not successiful. Try again",
                    "error"
                  );
                }

                // window.location.reload();
              })
              .catch((err) => {
                setDonating(false);
                // console.log(err)
                const errorMsg =
                  err.response?.data?.error || "An error occurred";
                setErrors(errorMsg);
              });
          }
        }
      });
    }
  };

  const handleDays = () => {
    // if current date < start date  return days remaining for campaingn to start
    const currentDate = new Date();
    const startDate = new Date(campaign.startDate);
    if (currentDate < startDate) {
      // calculate days remaining
      const time = startDate.getTime() - currentDate.getTime();
      const days = Math.ceil(time / (1000 * 3600 * 24));
      return days;
    } else {
      // calculate days remaining for campaing to end
      const endDate = new Date(campaign.endDate);
      const time = endDate.getTime() - currentDate.getTime();
      const days = Math.ceil(time / (1000 * 3600 * 24));
      return days;
    }
  };

  const socialShare = () => {
    return (
      <>
        <div className="my-2">
          <p>Share this campaign</p>
        </div>
        <div className="mt-0 flex justify-evenly space-x-3">
          <WhatsappShareButton
            url={currentlWebUrl}
            title={`Join ${campaign.campaignName}'s campaign!\n\n\n By ${campaign.organisation.orgName}`}
          >
            <WhatsappIcon className="h-12 w-12 rounded-full" />
          </WhatsappShareButton>
          <FacebookShareButton
            url={currentlWebUrl}
            quote={`Join ${campaign.campaignName}'s campaign!\n\n${campaign.description}\n\n\nBy ${campaign.organisation.orgName}`}
            hashtag="#GiveForGood"
          >
            <FacebookIcon className="h-12 w-12 rounded-full" />
          </FacebookShareButton>
          <TwitterShareButton
            url={currentlWebUrl}
            title={`Join ${campaign.campaignName}'s campaign!\n\n${campaign.description}\n\n\nBy ${campaign.organisation.orgName} `}
            hashtags={[
              "Msaadafund",
              "GiveForGood",
              "msaadamashinani",
              "ChangeForGood",
            ]}
          >
            <TwitterIcon className="h-12 w-12 rounded-full" />
          </TwitterShareButton>
          <TelegramShareButton
            url={currentlWebUrl}
            title={`${campaign.campaignName}`}
          >
            <TelegramIcon className="h-12 w-12 rounded-full" />
          </TelegramShareButton>
        </div>
      </>
    );
  };

  // Function to calculate total amount for donations with status "COMPLETE"
  function getTotalAmount(donationsArray) {
    let totalAmount = 0;
    if (donationsArray.length === 0) {
      return 0;
    } else {
      for (let donation of donationsArray) {
        // Check if the donation status is "COMPLETE"
        if (donation.status === "COMPLETE") {
          totalAmount += donation.amount;
        }
      }
    }

    return totalAmount;
  }

  //Slider settings(Carosel)
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  //youtube link for embend
  const youtubeLink = campaign.youtube_link && campaign.youtube_link;
  const embedUrl = `https://www.youtube.com/embed/${youtubeLink}`;

  // to handle eye to show password
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Menus />
      <div className="w-full overflow-hidden">
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-30 backdrop-blur-sm z-40"></div>
        )}
        {showShareModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-30 backdrop-blur-sm z-40"></div>
        )}
        {!users && <Announcement showingModal={setShowModal} />}
        <div className="text-black min-h-screen p-4" id="campaign_dets">
          <div className="container mx-auto">
            {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'> */}
            <div className="flex flex-col lg:flex-row gap-1 ">
              <div className="h-full lg:w-2/3 " id="campaign">
                <div className="relative">
                  {/* banner */}
                  <Slider {...settings}>
                    <div className="h-[600px] w-full">
                      <picture className="flex justify-center items-center w-full h-full overflow-hidden">
                        <img
                          className="w-[100%] h-[100%] object-cover"
                          src={campaign.banner}
                          alt={campaign.campaignName}
                          loading="lazy"
                        />
                      </picture>
                    </div>
                    <div>
                      {campaign.youtube_link ? (
                        <div className="h-[600px] w-full aspect-w-16 aspect-h-9">
                          <iframe
                            className="w-full h-full"
                            src={embedUrl}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                          ></iframe>
                        </div>
                      ) : (
                        <div className="h-[600px] w-full">
                          <picture className="flex justify-center items-center w-full h-full overflow-hidden">
                            <img
                              src={campaign.banner}
                              alt={campaign.campaignName}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </picture>
                        </div>
                      )}
                    </div>
                  </Slider>
                </div>

                <div className="bg-white py-2 px-2 rounded-lg lg:mt-2">
                  <div className="flex flex-col lg:flex-row gap-3 ">
                    <div className="h-full">
                      <div>
                        <select
                          value={language}
                          onChange={handleLanguageChange}
                          className="my-1 p-1 bg-gray-300"
                        >
                          <option value="en">English</option>
                          <option value="sw">Swahili</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="it">Italian</option>
                          <option value="pt">Portuguese</option>
                          <option value="zh">Chinese</option>
                          <option value="ja">Japanese</option>
                          <option value="ko">Korean</option>
                          <option value="ru">Russian</option>
                          <option value="ar">Arabic</option>
                          <option value="hi">Hindi</option>
                          <option value="tr">Turkish</option>
                          <option value="vi">Vietnamese</option>
                          <option value="id">Indonesian</option>
                          <option value="ro">Romanian</option>
                          <option value="nl">Dutch</option>
                        </select>
                        {/* <h1 className="text-xl font-normal mb-2">{campaign && campaign.campaignName.charAt(0).toUpperCase() + campaign.campaignName.slice(1)}</h1>                             */}
                        <h1 className="text-xl font-normal mb-2">
                          {translatedCampName ||
                            (campaign &&
                              campaign.campaignName.charAt(0).toUpperCase()) +
                              campaign.campaignName.slice(1)}
                        </h1>
                      </div>
                      <div>
                        <p className="text-blue-600">
                          {translatedCategory ||
                            (campaign && campaign.category.toUpperCase())}
                        </p>
                      </div>
                      <div>
                        <p className=" text-red-500">{handleDays()} Days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 h-full">
                <Card
                  orgDetails={campaign.organisation}
                  raisedAmount={getTotalAmount(campaign.donations)}
                  budget={campaign.targetAmount}
                  subscribe={subscribe}
                  handleSubscribe={handleSubscribe}
                  handleUnsubscribe={handleUnsubscribe}
                  shareModal={setShowShareModal}
                  loading={loading}
                  translatedGoal={translatedGoal}
                  translatedContributions={translatedContributions}
                  shareTranslate={shareTranslate}
                  giveTranslate={giveTranslate}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-0 mt-0">
              <div className="h-full lg:w-2/3 border border-transparent mt-0 rounded-lg px-4 py-2">
                {/* <hr/> */}
                <h1 className="text-xl my-2 font-semibold w-full">
                  {translatedStory || "Story"}
                </h1>
                <div className="bg-white text-xs sm:h-52 lg:h-fit w-full">
                  <div>
                    {isLargeScreen ? (
                      <div
                        className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: translatedText || campaign.description,
                        }}
                      ></div>
                    ) : (
                      <div>
                        {more ? (
                          <div
                            className="text-sm text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: translatedText || campaign.description,
                            }}
                          ></div>
                        ) : (
                          <div
                            className="text-sm text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html:
                                (translatedText || campaign.description).slice(
                                  0,
                                  200
                                ) + "...",
                            }}
                          ></div>
                        )}
                        <button
                          className="text-blue-600 hover:underline mt-2"
                          onClick={() => setMore(!more)}
                        >
                          {more ? "Show less" : "Show more"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 h-full border border-transparent bg-white mt-0 rounded-lg">
                <hr />
                <div className="px-2 pt-2">
                  <div className="my-1 flex justify-between px-2">
                    <h1 className="text-lg font-medium">
                      {translatedContributions || "Contributions"}
                    </h1>
                    <p className="text-lg font-medium">
                      {completeDonations.length}
                    </p>
                  </div>
                  <div>
                    <div className="max-w-full mx-auto my-2">
                      <div className="bg-white rounded-lg overflow-hidden text-sm">
                        <ul className="divide-y divide-gray-200">
                          {randomDonations &&
                            randomDonations.map((donation, index) => (
                              <li
                                key={index}
                                className="p-3 flex justify-between items-center user-card even:bg-gray-100 odd:bg-white"
                              >
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full odd:bg-green-500 flex justify-center items-center text-white">
                                    {donation.donor_name
                                      ? donation.donor_name.charAt(0)
                                      : "A"}
                                  </div>
                                  {/* <img className="w-10 h-10 rounded-full" src="https://unsplash.com/photos/oh0DITWoHi4/download?force=true&w=640" alt="Christy"/> */}
                                  <span className="ml-3 font-medium text-sm">
                                    {donation.donor_name
                                      ? donation.donor_name
                                      : "Anonymous"}
                                  </span>
                                </div>
                                <span className="font-medium text-sm">
                                  {donation.currency} {donation.amount}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="container mt-6 bg-gray-100 border p-4 rounded-lg"
              id="donationTabs"
            >
              <div className="sm:hidden">
                <label htmlFor="Tab" className="sr-only">
                  Tab
                </label>
                <select
                  id="Tab"
                  className="rounded-md border border-gray-300 p-3 w-full bg-white text-black"
                  onChange={(e) => setActiveTab(e.target.value)}
                  value={activeTab}
                >
                  <option>M-Pesa</option>
                  <option>International</option>
                </select>
              </div>

              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex gap-6" aria-label="Tabs">
                    {["M-Pesa", "International"].map((tab) => (
                      <p
                        key={tab}
                        // href="#"
                        className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${
                          activeTab === tab
                            ? "border-sky-500 text-sky-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab(tab);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5"
                        ></svg>
                        {tab}
                      </p>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="p-2">
                {activeTab === "M-Pesa" && (
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {translatedMpesa || "Contribute with M-Pesa"}
                    </h2>
                    <div className="h-full rounded-lg">
                      <form
                        ref={formRef}
                        onSubmit={handleDonateButton}
                        className="w-full rounded-xl"
                      >
                        <div className="text-black">
                          {accessToken ? (
                            <p className="my-2">
                              Ensure all fields with{" "}
                              <span className="text-red-500">*</span> are filled
                            </p>
                          ) : (
                            <p className="my-2">
                              Please make sure all fields marked with{" "}
                              <span className="text-red-500">*</span> are
                              completed, or{" "}
                              <span
                                className="text-blue-700 underline cursor-pointer"
                                onClick={setShowModal}
                              >
                                click here to autofill the form and easily track
                                your contribution
                              </span>
                              .
                            </p>
                          )}
                        </div>
                        <div className="flex-col justify-center items-center">
                          <div>
                            <label className=" text-black font-medium ">
                              Personal Details
                            </label>
                            <input
                              type="text"
                              id="donor"
                              placeholder="Your Name (Optional)"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              // required
                            />
                          </div>

                          <div className="my-3">
                            <label className=" text-black font-medium ">
                              <span className="text-red-500">*</span>M-Pesa
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phoneNumber"
                              placeholder="eg 07xxxx or 011xxxx"
                              maxLength={10}
                              value={phoneNum}
                              onChange={(e) => {
                                setPhoneNum(e.target.value);
                              }}
                              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              required
                            />
                          </div>
                          <div className="flex justify-start items-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setDonationAmount(100);
                              }}
                              className="p-2 rounded-xl border border-blue-600 mr-3 hover:text-white hover:bg-blue-600"
                            >
                              100
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setDonationAmount(300);
                              }}
                              className="p-2 rounded-xl border border-blue-600 hover:text-white hover:bg-blue-600"
                            >
                              300
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setDonationAmount(500);
                              }}
                              className="p-2 rounded-xl border border-blue-600 mx-3 hover:text-white hover:bg-blue-600"
                            >
                              500
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setDonationAmount(1000);
                              }}
                              className="p-2 rounded-xl border border-blue-600 hover:text-white hover:bg-blue-600"
                            >
                              1000
                            </button>
                          </div>

                          <div className="my-3">
                            <label className=" text-black font-medium ">
                              <span className="text-red-500">*</span>Amount
                            </label>
                            <input
                              type="number"
                              id="donationAmount"
                              placeholder="Enter amount"
                              value={amount}
                              onChange={(e) =>
                                setDonationAmount(e.target.value)
                              }
                              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          {/* shows total donation amount */}
                          <p>Total Contribution: Ksh {amount}</p>
                        </div>
                        {errors && (
                          <p className="text-red-600 my-1">{errors}</p>
                        )}

                        <div className="flex justify-start my-4">
                          <div>
                            {donating ? (
                              <button
                                type="button"
                                class="btn btn-md py-2 px-4 flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded max-w-md"
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
                                loading
                              </button>
                            ) : (
                              <button
                                type="submit"
                                class="btn btn-md py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded max-w-md"
                              >
                                <MdOutlineSendToMobile className="w-5 h-5 font-medium" />
                                {submitTranslate || "Contribute"}
                              </button>
                            )}
                          </div>
                        </div>
                        {/* <div className='mt-3 flex justify-left'>
                                    <p className='text-success'>Contributions are sent directly to the creator of the campaign</p>
                                </div> */}
                      </form>
                    </div>
                  </div>
                )}
                {activeTab === "International" && (
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {translatedGlobal ||
                        "Contribute with International methods"}
                    </h2>
                    <div className="h-full rounded-lg">
                      <form
                        onSubmit={handleDonateCard}
                        className="w-full rounded-xl"
                      >
                        <div className="text-black">
                          {/* <h1 className="text-xl font-medium mt-0">Donate via Card/M-Pesa/Paybill</h1> */}

                          {accessToken ? (
                            <p className="my-2">
                              Ensure all fields with{" "}
                              <span className="text-red-500">*</span> are filled
                            </p>
                          ) : (
                            <p className="my-2">
                              Please make sure all fields marked with{" "}
                              <span className="text-red-500">*</span> are
                              completed, or{" "}
                              <span
                                className="text-blue-700 underline cursor-pointer"
                                onClick={setShowModal}
                              >
                                click here to autofill the form and easily track
                                your contribution
                              </span>
                              .
                            </p>
                          )}
                        </div>
                        <div className="flex-col justify-center items-center">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <label className=" text-black font-medium ">
                                <span className="text-red-500">*</span>First
                                name on the card
                              </label>
                              <input
                                type="text"
                                placeholder="First name"
                                value={fName}
                                id="cardName"
                                onChange={(e) => setFName(e.target.value)}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                              />
                            </div>
                            <div>
                              <label className=" text-black font-medium ">
                                <span className="text-red-500">*</span>Last name
                                on the card
                              </label>
                              <input
                                type="text"
                                placeholder="Last name"
                                value={lName}
                                id="cardName"
                                onChange={(e) => setLName(e.target.value)}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
                            <div>
                              <label className=" text-black font-medium ">
                                <span className="text-red-500">*</span>E-mail
                              </label>
                              <input
                                type="email"
                                placeholder="example@mail.com"
                                id="cardEmail"
                                value={cardEmail}
                                onChange={(e) => {
                                  setCardEmail(e.target.value);
                                }}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                              />
                            </div>
                            <div>
                              <label className=" text-black font-medium ">
                                Phone Number
                              </label>

                              <input
                                type="tel"
                                placeholder="Phone Number"
                                id="cardPhone"
                                value={phoneNo}
                                onChange={(e) => {
                                  setPhoneNo(e.target.value);
                                }}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              />
                            </div>
                          </div>

                          <div className="flex justify-start items-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setCardAmount(100);
                              }}
                              className="p-2 rounded-xl border border-blue-600 mr-3 hover:text-white hover:bg-blue-600"
                            >
                              100
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setCardAmount(300);
                              }}
                              className="p-2 rounded-xl border border-blue-600 hover:text-white hover:bg-blue-600"
                            >
                              300
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setCardAmount(500);
                              }}
                              className="p-2 rounded-xl border border-blue-600 mx-3 hover:text-white hover:bg-blue-600"
                            >
                              500
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setCardAmount(1000);
                              }}
                              className="p-2 rounded-xl border border-blue-600 hover:text-white hover:bg-blue-600"
                            >
                              1000
                            </button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
                            <div>
                              <label className=" text-black font-medium ">
                                <span className="text-red-500">*</span>Currency
                              </label>
                              <select
                                value={cardCurrency}
                                onChange={(e) =>
                                  setCardCurrency(e.target.value)
                                }
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              >
                                <option>Select currency</option>
                                <option value="KES">Kenyan Shillings</option>
                                <option value="USD">US Dollars</option>
                                <option value="EUR">Euro</option>
                                <option value="GBP">British Pounds</option>
                              </select>
                            </div>
                            <div>
                              <label className=" text-black font-medium ">
                                <span className="text-red-500">*</span>Amount
                              </label>
                              <input
                                type="number"
                                placeholder="Enter amount"
                                id="card-amount"
                                value={cardAmount}
                                onChange={(e) => setCardAmount(e.target.value)}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="my-4">
                          {/* shows total donation amount */}
                          <p>
                            Total Contribution: {cardCurrency} {cardAmount}
                          </p>
                        </div>

                        {errors && (
                          <p className="text-red-600 my-1">{errors}</p>
                        )}
                        <div className="flex justify-start my-4">
                          <div>
                            {donating ? (
                              <button
                                type="button"
                                class="btn btn-md py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded max-w-md"
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
                                loading
                              </button>
                            ) : (
                              <button
                                type="submit"
                                class="btn btn-md py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded max-w-md"
                              >
                                <MdOutlineSendToMobile className="w-5 h-5 font-medium" />
                                {submitTranslate || "Contribute"}
                              </button>
                            )}
                          </div>
                        </div>
                        {/* <div className='mt-3 flex justify-left'>
                                        <p className='text-success'>Contributions are sent directly to the creator of the campaign</p>
                                    </div> */}
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* <div className='mt-4 px-2'><Featured/></div> */}
            <Partners />

            {/* </Popup> */}
          </div>
          {/* <Toaster position = "top-center" reverseOrder={false} /> */}
        </div>
        <dialog
          open={showModal}
          onClose={() => setShowModal(false)}
          className="modal flex-row justify-center items-center text-center border"
        >
          <div className="modal-box bg-gray-50 border border-gray-300">
            <h3 className="font-bold text-2xl text-black">Log in</h3>
            {/* <div className="modal-action"> */}
            {loginMessage && <p className="text-red-500">{loginMessage}</p>}
            <form
              className="flex justify-center items-center"
              onSubmit={handleLogin}
            >
              <div className="flex-col justify-center items-center pl-4 pr-8">
                <div className="my-4">
                  <label
                    className="font-semibold my-3 text-gray-600"
                    htmlFor="password"
                  >
                    <span className="text-red-500">*</span>Username or E-Mail
                  </label>
                  <input
                    className="input input-bordered w-full bg-white text-black"
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
                    title="show password"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-14 mx-2  flex items-center mb-6"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <div className="justify-center items-center text-center">
                  <div>
                    <button
                      type="submit"
                      className="btn w-full bg-blue-600 my-4 text-white"
                    >
                      Log in
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <p>Or</p>
                  </div>
                  <div>
                    <PopupGoogle />
                  </div>
                </div>
                <p className="my-4">
                  Don't have an account?{" "}
                  <Link to="/user/signup">
                    <span className="font-medium text-primary-600 hover:underline">
                      Register
                    </span>
                  </Link>
                </p>
              </div>
            </form>
            <button
              onClick={() => {
                setShowModal(false);
                setLoginMessage("");
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            {/* </div> */}
          </div>
        </dialog>

        <dialog
          open={showShareModal}
          onClose={() => setShowShareModal(false)}
          className="modal flex-row justify-center items-center text-center p-4"
        >
          <div className="modal-box bg-gray-50 text-gray-800">
            <div className="my-4">
              <h3 className="text-xl">
                Help {campaign.organisation && campaign.organisation.orgName}{" "}
              </h3>
              <p className="text-md mt-1 mb-2">
                Share this campaign with your friends and family
              </p>
              <div className="mb-4">{socialShare()}</div>
              <p className="font-semibold my-3">Copy the link below to share</p>
              <span className="bg-blue-100 flex gap-5 items-center justify-between py-3 px-5 rounded">
                <code className="text-blue-900 text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {currentlWebUrl}
                </code>
                <CopyToClipboard
                  text={currentlWebUrl}
                  onCopy={(currentlWebUrl, result) => {
                    console.log(result);
                    setCopied(true);
                  }}
                >
                  <span
                    className="text-blue-900 hover:text-green-600 font-bold"
                    title="Copy to clipboard"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </CopyToClipboard>
              </span>
              {copied ? <span style={{ color: "red" }}>Copied.</span> : null}
              <div className="flex justify-center">
                <p className="my-1 font-semibold">Or</p>
              </div>
              <div className="flex justify-center">
                <p className="my-1">Scan the QR code below</p>
              </div>
              <div className="flex justify-center">
                <QRCode value={currentlWebUrl} className="w-24 h-24" />
              </div>
            </div>

            <button
              onClick={() => {
                setShowShareModal(false);
                setCopied(false);
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            {/* </div> */}
          </div>
        </dialog>
        <Footer />
      </div>
    </>
  );
}

export default CampainDetails;
