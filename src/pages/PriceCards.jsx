import React, { useState } from 'react';

function PriceCards() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Mobile Payments", "International Payments", "Disbursements"];
  const pricingData = [
    {
      title: "Mobile Payments",
      price: "3%",
      features: [
        "Access funds immediately",
        "M-Pesa STK push",
        "No maintenance fee",
        "Transaction reports",
        "No complex paperwork required",
        "Payments notification",
        "Fraud management",
        "Customer support",
      ],
    },
    {
      title: "International Payments",
      cards: [
        {
          title: "Local Cards",
          price: "3.5%",
          features: [
            "Supports both Visa and MasterCard",
            "No maintenance fee",
            "Invoicing",
            "2 Days Payout period",
            "Payments notification",
            "Transaction reports",
            "Fraud management",
            "3DS2 support (CBK Requirement)",
            "Customer support",
          ],
        },
        {
          title: "International Payments",
          price: "4.5%",          
          features: [
            "Multi-currency settlements",
            "Visa, MasterCard, Cash App, Apple Pay, and Pesalink",
            "No maintenance fee",
            "Invoicing",
            "2-3 Days Payout period",
            "Payments notification",
            "Transaction reports",
            "Fraud management",
            "Customer support",
          ],
        },
      ],
    },
    {
      title: "Disbursements",
      price: "1.5%",
      features: [
        "Minimum charge KES 10, capped at KES 100",
        "Unlimited beneficiaries/phone numbers",
        "Multiple providers (M-Pesa, Airtel, Orange Money, Equitel)",
        "No maintenance fee",
        "Instant Payout",
        "Transaction reports",
        "Payments notification",
        "Managed service",
        "Flexible liquidity plan",
        "Customer support",
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* Responsive Tab Navigation */}
      <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 mb-8">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 sm:px-6 font-semibold border-b-2 ${
              activeTab === index
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600"
            } hover:text-blue-600 w-full sm:w-auto text-center`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="p-4 bg-white rounded-lg">
        {activeTab !== 1 ? (
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              {pricingData[activeTab].title}
            </h2>
            <p className="text-4xl font-semibold text-center text-blue-600 mb-4">
              {pricingData[activeTab].price}
            </p>
            <p className="text-gray-700 text-center">per transaction</p>
            <hr className="my-4" />
            <ul className="text-center space-y-2">
              {pricingData[activeTab].features.map((feature, index) => (
                <li key={index} className="text-gray-700 text-left flex justify-center">
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center">
              <a href='/org/signup' className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
                Get Started
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pricingData[1].cards.map((card, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">
                  {card.title}
                </h2>
                <p className="text-4xl font-semibold text-center mb-4 text-blue-600">
                  {card.price}
                </p>
                <p className="text-gray-700 text-center">per transaction</p>
                <hr className="my-4" />
                <ul className="text-center space-y-2">
                  {card.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-center">
                  <a href='/org/signup' className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PriceCards;
