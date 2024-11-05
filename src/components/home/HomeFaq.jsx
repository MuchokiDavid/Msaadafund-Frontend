import React, { useState } from "react";

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`collapse join-item border border-gray-100 ${
        isOpen ? "collapse-open" : "collapse-closed"
      }`}
    >
      <div
        className="collapse-title text-xl font-medium flex justify-between items-center"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <button className="text-2xl font-bold">{isOpen ? "-" : "+"}</button>
      </div>
      {isOpen && (
        <div className="collapse-content">
          {content.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
};

function HomeFaq() {
  const faqItems = [
    {
      title: "How do I create an account on Msaada Fund?",
      content: [
        'Visit our landing page and click on "Sign Up." Follow the prompts to enter your details and verify your email. Once completed, you can start creating or supporting campaigns.',
      ],
    },
    {
      title: "What payment methods are supported?",
      content: [
        "Msaada Fund supports various payment methods, including M-Pesa, credit/debit cards, Pesalink, Apple pay, Bitcoin and Cash App. Transactions are securely processed through the IntaSend checkout system.",
      ],
    },
    {
      title: "What are the ways to spend funds on MsaadaFund?",
      content: [
        "MsaadaFund offers several methods for spending funds to ensure flexibility and convenience for organisers:",
        "1. **Pay Bills**: You can use the funds to pay utility bills such as electricity, water, or internet.",
        "2. **Pay to Till Number**: Funds can be used to make payments to specific till numbers for various services or purchases.",
        "3. **Withdraw to M-Pesa**: You can withdraw funds directly to an M-Pesa account for easy access and use.",
        "4. **Withdraw to Bank Account**: Funds can also be transferred to bank account, providing a more traditional banking option.",
        "5. **Buy Airtime**: You can purchase airtime for mobile phones to stay connected.",
      ],
    },
    {
      title: "How can I withdraw funds from my campaign?",
      content: [
        "Organizations can withdraw funds directly from their campaign wallets. The withdrawal process requires signatory approval to ensure secure fund management.",
      ],
    },
    {
      title: "Can I track my donations?",
      content: [
        "Yes, the donor dashboard provides a detailed overview of your contributions, including transaction history and the impact of your donations on the campaigns you support.",
      ],
    },
    {
      title: "Is there a fee for transactions?",
      content: [
        "IntaSend charges a 3% for M-Pesa, 3.5% for local cards, and 4.5% for intenational transactions. The maximum transaction fee is Sh 400. Additionally, there is a 4% platform fee on the amount donated.The remaining funds go directly to the organization.",
        "For example, if a campaign raises a total of 1,000 Kenyan shillings:",
        "- 30 shillings will be deducted as the transaction fee",
        "- 40 shillings will be deducted as the platform fee",
        "- 930 shillings will go to the organization.",
      ],
    },
    {
      title: "How can my campaign get featured on Msaada Fund?",
      content: [
        "To get your campaign featured, a fee is required. This fee helps cover the costs of promoting and highlighting your campaign to a broader audience.",
      ],
    },
    {
      title: "What are the benefits for organizations using Msaada Fund?",
      content: [
        "Organizations benefit from a user-friendly platform that simplifies fundraising, secure and efficient payment processing, and tools for managing and tracking campaign funds.",
      ],
    },
    {
      title: "How secure is Msaada Fund?",
      content: [
        "Security is a top priority. Msaada Fund utilizes advanced encryption and secure payment gateways provided by IntaSend to protect all transactions and user information.",
      ],
    },
    {
      title: "How do I contact support?",
      content: [
        'You can reach our support team via the "Contact Us" page on our website. We are here to help with any questions or issues you may encounter.',
      ],
    },
  ];

  return (
    <div className="min-w-full">
      <div className="mx-4 my-6 sm:mx-6 sm:my-8 lg:mx-16 lg:my-12">
        <div className="md:text-center max-w-2xl mx-auto">
          <h2 className="md:text-4xl text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="my-4">
            Explore common questions and find answers to help you make the most
            out of our services. If you don't see your question here, feel free
            to contact us for assistance.
          </p>
        </div>
        <div className="join join-vertical w-full ">
          {faqItems.map((item, index) => (
            <AccordionItem
              className="text-xl"
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeFaq;
