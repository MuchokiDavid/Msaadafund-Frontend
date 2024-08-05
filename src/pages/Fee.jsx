import React from 'react'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'

function Fee() {
  return (
    <div>
    <Menus/>
    <div className='container mx-auto'>
        <div className='text-center my-12 mx-4'>
        <h1 className="text-3xl font-bold">MsaadaFund Pricing Guide</h1>
        <p className="text-gray-600">
          This pricing guide provides information about the payment collection process and the different payment options available to donors.
        </p>
        </div>


        <div className="mx-10">
        <section className="mb-8">
        <h2 className="underline underline-offset-2 text-2xl font-semibold mb-4">MsaadaFund Fee</h2>
        <p className="mb-4">
        The MsaadaFund platform fee is a fixed 4% of the donation amount. This fee helps cover the costs of maintaining and improving the platform and ensures the security of the donations        </p>
        <p>In the case of a KES 1000 donation, the platform fee would amount to KES 40. </p>      
      </section>
      <section className="mb-8">
        <h2 className="underline underline-offset-2 text-2xl font-semibold mb-4">Payment Processing Fee</h2>
        <p className="mb-4">
            The payment processing fee is a variable fee based on the payment method used. It helps cover the costs of processing the payment.
        </p>
        <ul className="list-disc list-inside">
            <li className="mb-2">
            <strong>M-Pesa:</strong> Free
            </li>
            <li className="mb-2">
            <strong>Local Card (Visa and Mastercard):</strong> Free
            </li>
            <li>
            <strong>International Card (Visa and Mastercard):</strong> Free
            </li>
        </ul>
        </section>
        <section className="mb-8">
            <h2 className="underline underline-offset-2 text-2xl font-semibold mb-4">Withdrawal Fee</h2>
            <p className="mb-4">
                MsaadaFund provides various methods to withdraw the funds raised.
            </p>
            <ul className="list-disc list-inside">
                <ul className='mb-2'>
                <strong>Buy Airtime:</strong> Free
                </ul>
                <ul className='mb-2'>
                <strong>Transfer to mobile money:</strong> 1.5% of the transaction amount (minimum cost is KES 10, maximum cost is KES 50)
                </ul>
                <ul className='mb-2'>
                <strong>Withdraw to Bank Accounts in Kenya:</strong>
                </ul>
                <ul className="list-disc list-inside ml-5">
                    <li>0 - 10,000: KES 100</li>
                    <li>10,001 - 50,000: KES 150</li>
                    <li>50,001 - 100,000: KES 200</li>
                    <li>100,001 - 500,000: KES 400</li>
                    <li>500,001 - 999,999: KES 500</li>
                </ul>
                <ul className='mt-2'>
                <strong>Transferring Funds to M-Pesa Till:</strong> 
                </ul>
                <ul className="list-disc list-inside ml-5">
                    <li>KES 20 (flat fee) for amounts below KES 10,000</li>
                    <li>KES 40 (flat fee) for amounts above KES 10,000</li>
                </ul>
                <ul className='mt-2'>
                <strong>Transferring Funds to M-Pesa Paybill:</strong>
                <ul className="list-disc list-inside ml-5">
                    <li>0 - 1,000: KES 30</li>
                    <li>1,001 - 3,500: KES 50</li>
                    <li>3,501 - 5,000: KES 70</li>
                    <li>5,001 - 10,000: KES 80</li>
                    <li>10,001 - 30,000: KES 100</li>
                    <li>30,001 - 45,000: KES 130</li>
                    <li>45,001 - 150,000: KES 150</li>
                </ul>
                </ul>
            </ul>
            </section>

      </div>      
    </div>
    <Footer/>
    </div>
  )
}

export default Fee
