import React from 'react'
import Footer from '../components/reusables/Footer'
import Menus from '../components/reusables/Menus'

function Policy() {
  return (
    <div>
      <Menus/>
      <div class="relative flex-1 px-3 py-10 lg:px-8" id='termBanner'>
      <div class="mx-auto text-center">
        <h2 class="text-center text-3xl font-bold leading-tight text-white md:text-4xl">Privacy Policy</h2>
        <p className="mt-4 text-white">This privacy policy sets out how our website uses and protects any information that you give us when you use
                this
                website.</p>
      </div>
    </div>
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
            
            <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>

            <p className="mb-4">
                We may collect the following information:
            </p>

            <ul className="list-disc list-inside mb-4">
                <li><span className='font-semibold'>Personal Information: </span>We may collect personal information such as your name, email address, and phone number when you voluntarily provide it to us.</li>
                <li><span className='font-semibold'>Usage Information: </span>We may collect information about your use of the App, such as the features you use, the pages you visit, and the actions you take within the App.</li>
                <li>Demographic information</li>
                <li><span className='font-semibold'>Device Information:</span> We may collect information about your device, including its hardware model, operating system version, unique device identifiers, and mobile network information.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-2">How We Use the Information</h2>

            <p className="mb-4">
                We require this information to understand your needs and provide you with a better service, and in
                particular
                for
                the following reasons:
            </p>

            <ul className="list-disc list-inside mb-4">
                <li>Internal record keeping</li>
                <li>To provide, maintain, and improve the App.</li>
                <li>Sending promotional emails about new products, special offers, or other information which we think you
                    may
                    find
                    interesting</li>
                <li>From time to time, we may also use your information to contact you for market research purposes. We may
                    contact
                    you by email, phone, or mail. We may use the information to customize the website according to your
                    interests.</li>
                    <li>To detect, prevent, and address technical issues and security vulnerabilities.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-2">Security</h2>

            <p className="mb-4">
                We are committed to ensuring that your information is secure. In order to prevent unauthorized access or
                disclosure,
                we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the
                information we collect online.
            </p>

            <h2 className="text-2xl font-bold mb-2">Cookies</h2>

            <p className="mb-4">
                A cookie is a small file that asks permission to be placed on your computer's hard drive. Once you agree,
                the
                file
                is added, and the cookie helps analyze web traffic or lets you know when you visit a particular site.
                Cookies
                allow
                web applications to respond to you as an individual. The web application can tailor its operations to your
                needs,
                likes, and dislikes by gathering and remembering information about your preferences.
            </p>

            <p className="mb-4">
                Overall, cookies help us provide you with a better website by enabling us to monitor which pages you find
                useful
                and which you do not. A cookie in no way gives us access to your computer or any information about you,
                other
                than
                the data you choose to share with us.
            </p>

            <h2 className="text-2xl font-bold mb-2">Links to Other Websites</h2>

            <p className="mb-4">
                Our website may contain links to other websites of interest. However, once you have used these links to
                leave
                our
                site, you should note that we do not have any control over that other website. Therefore, we cannot be
                responsible
                for the protection and privacy of any information which you provide whilst visiting such sites and such
                sites
                are
                not governed by this privacy statement. You should exercise caution and look at the privacy statement
                applicable
                to
                the website in question.
            </p>

            <h2 className="text-2xl font-bold mb-2">Controlling Your Personal Information</h2>

            <p className="mb-4">
                You may choose to restrict the collection or use of your personal information in the following ways:
            </p>

            <ul className="list-disc list-inside mb-4">
                <li>If you have previously agreed to us using your personal information for direct marketing purposes, you
                    may
                    change your mind at any time by writing to or emailing us at msaadacontact@gmail.com</li>
                <li>We will not sell, distribute, or lease your personal information to third parties unless we have your
                    permission
                    or are required by law to do so. We may use your personal information to send you promotional
                    information
                    about
                    third parties which we think you may find interesting if you tell us that you wish this to happen.</li>
                <li>You may request details of personal information which we hold about you. If you would like a copy of the
                    information held on you, please write to <a className='text-blue-600 hover:underline' href="mailto:contact@msaada.com">msaadacontact@gmail.com</a>.
                </li>
                <li>If you believe that any information we are holding on you is incorrect or incomplete, please write to or
                    email
                    us as soon as possible at the above address. We will promptly correct any information found to be
                    incorrect.
                </li>
            </ul>

            <h2 className="text-2xl font-bold mb-2">Changes to This Privacy Policy</h2>

            <p className="mb-4">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page. We encourage you to review this Privacy Policy periodically for changes.
            </p>

            <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
            <p className="mb-4">If you have any questions or concerns about these terms and conditions, please contact us at <a className='text-blue-600 hover:underline' href="mailto:contact@msaada.com">msaadacontact@gmail.com</a>.</p>
            
            <p className="mb-4 text-sm">Last Updated: May 3, 2024</p>
        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Policy