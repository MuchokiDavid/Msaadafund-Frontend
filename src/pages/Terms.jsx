import React from 'react';
import Menus from '../components/reusables/Menus';
import Footer from '../components/reusables/Footer';

function Terms() {
  return (
    <>
    <Menus/>
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Terms and Conditions</h2>
      <p className="mb-4">Welcome to Msaada! These terms and conditions outline the rules and regulations for the use of Msaada's website and donation platform (hereinafter referred to as "Msaada"). By accessing or using Msaada in any manner, including but not limited to visiting or browsing the website, you agree to be bound by these terms and conditions.</p>
      
      <h3 className="text-2xl font-bold mb-2">1. Acceptance of Terms</h3>
      <p className="mb-4">By accessing this website and using our donation platform, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
      
      <h3 className="text-2xl font-bold mb-2">2. Donation Policy</h3>
      <p className="mb-4">All donations made through Msaada are voluntary and non-refundable. Msaada does not guarantee the success of any fundraising campaigns or the use of donations by campaign organizers. While we strive to ensure the legitimacy of campaigns, we cannot verify the accuracy of all information provided by campaign organizers. Donors are encouraged to conduct their own research before making donations.</p>
      
      <h3 className="text-2xl font-bold mb-2">3. User Conduct</h3>
      <p className="mb-4">When using our website and donation platform, you agree to comply with all applicable laws and regulations. You must not engage in any unlawful or prohibited activities, including but not limited to fraud, hacking, or spamming. You are solely responsible for your interactions with other users of Msaada.</p>
      
      <h3 className="text-2xl font-bold mb-2">4. Privacy Policy</h3>
      <p className="mb-4">Your use of Msaada is also subject to our Privacy Policy, which outlines how we collect, use, and disclose information about our users. By using our platform, you consent to the terms of our Privacy Policy. We are committed to protecting your privacy and personal information. Please review our Privacy Policy for more information.</p>
      
      <h3 className="text-2xl font-bold mb-2">5. Intellectual Property</h3>
      <p className="mb-4">All content on Msaada, including text, graphics, logos, and images, is the property of Msaada or its licensors and is protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content from our platform without prior written permission. Unauthorized use of our content may result in legal action.</p>
      
      <h3 className="text-2xl font-bold mb-2">6. Limitation of Liability</h3>
      <p className="mb-4">Msaada and its affiliates will not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of our website and donation platform. In no event shall Msaada be liable for any damages resulting from the use or inability to use Msaada, including but not limited to loss of profits, data, or goodwill.</p>
      
      <h3 className="text-2xl font-bold mb-2">7. Changes to Terms</h3>
      <p className="mb-4">Msaada reserves the right to update or modify these terms and conditions at any time without prior notice. It is your responsibility to review these terms periodically for changes. Your continued use of our platform after any modifications indicates your acceptance of the updated terms.</p>
      
      <h3 className="text-2xl font-bold mb-2">8. Contact Us</h3>
      <p className="mb-4">If you have any questions or concerns about these terms and conditions, please contact us at <a className='text-blue-600 hover:underline' href="mailto:contact@msaada.com">msaadacontact@gmail.com</a>.</p>
      
      <p className="mb-4 text-sm">Last Updated: May 3, 2024</p>
    </div>
    <Footer/>
    </>
  );
}

export default Terms;
