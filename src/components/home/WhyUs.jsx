import React from 'react'

function WhyUs() {
  return (
    <div>
        <section className="bg-white text-gray-700 py-12" id="whyUsSection">
            <div className="px-4 sm:px-6 lg:px-16">
                <div className="max-w-xl mx-auto text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">Why MsaadaFund?</h2>
                <p className="mt-4 text-gray-500">
                    Discover why MsaadaFund stands out as your go-to platform for impactful giving and fundraising.
                </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                
                <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
                    <div className="mb-4 p-3 bg-green-600 rounded-full">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" stroke-width={2} className="h-8 w-8">
                        <path d="M12 20c5.52 0 10-4.48 10-10S17.52 0 12 0 2 4.48 2 10s4.48 10 10 10zM12 4v8h4" />
                    </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Transparency</h3>
                    <p className="mt-2 text-gray-500">
                    We provide clear and detailed reports on how funds are used, ensuring that your contributions make a real difference.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
                    <div className="mb-4 p-3 bg-green-600 rounded-full">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" stroke-width={2} className="h-8 w-8">
                        <path d="M8 14h8v4H8zm0-6h8v4H8zm-4 8h16v4H4zm0-6h16v4H4z" />
                    </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Diverse Payment Options</h3>
                    <p className="mt-2 text-gray-500">
                    We support various payment methods including M-Pesa, card payments, bitcoin, and CashApp to make contributions easy and accessible.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
                    <div className="mb-4 p-3 bg-green-600 rounded-full">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" stroke-width={2} className="h-8 w-8">
                        <path d="M17 10.5V21l-5-2.5L7 21V10.5L12 8l5 2.5z" />
                    </svg>
                    </div>
                    <h3 className="text-lg font-semibold">User-Friendly Experience</h3>
                    <p className="mt-2 text-gray-500">
                    Our platform is designed with simplicity in mind, ensuring a smooth experience for both donors and fundraisers.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
                    <div className="mb-4 p-3 bg-green-600 rounded-full">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" stroke-width={2} className="h-8 w-8">
                        <path d="M10 13H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1zm-1 6H5v-4h4zM20 3h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zm-1 6h-4V5h4zm1 7h-2v-2a1 1 0 00-2 0v2h-2a1 1 0 000 2h2v2a1 1 0 002 0v-2h2a1 1 0 000-2zM10 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM9 9H5V5h4z" />
                    </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Diverse Funds Spending</h3>
                    <p className="mt-2 text-gray-500">
                    Utilize funds flexibly—buy airtime, pay bills, purchase goods, or withdraw to your bank account or M-Pesa number.
                    </p>
                </div>

                </div>
            </div>
        </section>

    </div>
  )
}

export default WhyUs