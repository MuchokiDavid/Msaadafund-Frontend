import React, { useState } from 'react';
import Menus from './Menus';
import Footer from './Footer';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`collapse join-item border border-base-300 ${isOpen ? 'collapse-open' : 'collapse-closed'}`}>
      <div className="collapse-title text-xl font-medium flex justify-between items-center" onClick={toggleAccordion}>
        <span>{title}</span>
        <button className="text-2xl font-bold">{isOpen ? '-' : '+'}</button>
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

function Faq() {
  const faqItems = [
    {
      title: 'How do I create an account on Msaada Fund?',
      content: ['Visit our landing page and click on "Sign Up." Follow the prompts to enter your details and verify your email. Once completed, you can start creating or supporting campaigns.'],
    },
    {
      title: 'What payment methods are supported?',
      content: ['Msaada Fund supports various payment methods, including M-Pesa, credit/debit cards, Bitcoin, and Cash App. Transactions are securely processed through the IntaSend checkout system.'],
    },
    {
      title: 'How can I withdraw funds from my campaign?',
      content: ['Organizations can withdraw funds directly from their campaign wallets. The withdrawal process requires signatory approval to ensure secure fund management.'],
    },
    {
      title: 'Can I track my donations?',
      content: ['Yes, the donor dashboard provides a detailed overview of your contributions, including transaction history and the impact of your donations on the campaigns you support.'],
    },
    {
      title: 'Is there a fee for transactions?',
      content: [
        'IntaSend charges a 3% for M-Pesa, 3.5% for local cards, and 4.5% for intenational cards, Bitcoin and Cash App transactions. The maximum transaction fee is Sh 400. Additionally, there is a 4% platform fee on the total amount raised.The remaining funds go directly to the organization.',
        'For example, if a campaign raises a total of 100,000 Kenyan shillings:',
        '- 400 shillings will be deducted as the transaction fee',
        '- 4,000 shillings will be deducted as the platform fee',
        '- 93,600 shillings will go to the organization.'
      ],
    },
    {
      title: 'How can my campaign get featured on Msaada Fund?',
      content: [
        'To get your campaign featured, a fee is required. This fee helps cover the costs of promoting and highlighting your campaign to a broader audience.'
      ],
    },
    {
      title: 'What are the benefits for organizations using Msaada Fund?',
      content: ['Organizations benefit from a user-friendly platform that simplifies fundraising, secure and efficient payment processing, and tools for managing and tracking campaign funds.'],
    },
    {
      title: 'How secure is Msaada Fund?',
      content: ['Security is a top priority. Msaada Fund utilizes advanced encryption and secure payment gateways provided by IntaSend to protect all transactions and user information.'],
    },
    {
      title: 'How do I contact support?',
      content: ['You can reach our support team via the "Contact Us" section on our website. We are here to help with any questions or issues you may encounter.'],
    },
  
  ];

  return (
    <div>
      <Menus />
      <section id='termBanner' className="relative mt-0.5 text-white mb-2 ">
        <div className="relative mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl  font-extrabold sm:text-5xl">Frequently Asked Questions</h1>
            <p className="mt-4 sm:mt-8 text-lg sm:text-xl">
              Here are some of the most common questions we get from our customers.
            </p>
          </div>
        </div>
      </section>
      <div className='container mx-auto my-2 '>
        <div className="join join-vertical w-full">
          {faqItems.map((item, index) => (
            <AccordionItem className="text-xl" key={index} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Faq;
