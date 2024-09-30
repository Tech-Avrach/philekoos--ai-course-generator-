"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'

import { useUser } from '@clerk/nextjs'
import MailNotSentPopUp from './components/MailNotSentPopUp'
import MailSentPopUp from './components/MailSentPopUp'
import LoadingPopUp from './components/LoadingPopUp'
import { UserTokenContext } from '@/app/_context/UserTokenContext'

function PurchasePage() {
  const plans = [
    {
      "name": "Starter Pack",
      "price": 10,
      "tokens": 1,
      "description": "Try it out with just one token. Great for a quick start!"
    },
    {
      "name": "Saver Bundle",
      "price": 80,
      "tokens": 10,
      "description": "Get more for less! Perfect if you need a few extra tokens."
    },
    {
      "name": "Big Deal Pack",
      "price": 150,
      "tokens": 20,
      "description": "The best value! Grab 20 tokens and save big."
    }
  ]

  const { user } = useUser();

  const { userToken, updateUserToken } = useContext(UserTokenContext)

  const [loading, setLoading] = useState(false);

  const [mailSendPopup, setMailSendPopup] = useState(false);

  const [mailNotSendPopup, setMailNotSendPopup] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    // Dynamically add Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleMailSend = async (amount, token, transId) => {

    setLoading(true);

    let newToken = userToken + token;

    let receiverName = user?.fullName;

    let receiverEmail = user?.primaryEmailAddress?.emailAddress;

    updateUserToken(newToken, receiverEmail, receiverName);


    const res = await axios.post('/api/payment-sucess-mail', { amount, token, receiverName, receiverEmail, transId })
    console.log("res", res)

    if (res.status === 200) {
      setLoading(false);
      setMailSendPopup(true);
      setButtonDisabled(false);
    } else {
      setLoading(false);
      setMailNotSendPopup(true);
      setButtonDisabled(false);
    }
  }

  const handlePayment = async (amount, token) => {

    setButtonDisabled(true);

    let receiverName = user?.fullName;

    let receiverEmail = user?.primaryEmailAddress?.emailAddress;

    

    try {
      // Create an order from the server using Axios
      const orderResponse = await axios.post('/api/create-order', { amount });
      const orderData = orderResponse.data;

      console.log("orderData", orderData)

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "Philekoos",
        description: "Token Purchase",
        order_id: orderData.id, // Use the order ID from the server
        handler: (response) => {
          // alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          handleMailSend(amount,token, response?.razorpay_payment_id)
        },
        prefill: {
          name: receiverName,
          email: receiverEmail,
          contact: "9999999999",
        },
        theme: {
          color: "#302ECB",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };



  return (

    <>

    <MailNotSentPopUp mailNotSendPopup={mailNotSendPopup} setMailNotSendPopup={setMailNotSendPopup} />

    <MailSentPopUp mailSendPopup={mailSendPopup} setMailSendPopup={setMailSendPopup} email={user?.primaryEmailAddress?.emailAddress}/>

    <LoadingPopUp loading={loading} setLoading={setLoading} />


    <div className="flex flex-col items-center p-6 min-h-screen">
      <div className="flex justify-center items-center w-full mb-8">
        <div className="flex gap-2 items-center justify-center px-3 py-1 border border-primary rounded-lg">
          <Image src="/token.webp" alt="token" width={25} height={25} />
          <h1 className="text-primary font-bold">= 1 Course</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl px-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col items-center border border-gray-200 hover:shadow-xl transition duration-200 ease-in-out"
          >
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-primary">{plan.name}</h2>

            <div className="flex justify-center items-center mb-2 md:mb-4">
              <Image src="/token.webp" alt="token" width={40} height={40} />
              <span className="ml-2 text-xl md:text-2xl font-bold text-gray-700">{plan.tokens}</span>
            </div>

            <p className="text-gray-600 text-center mb-3 md:mb-4 text-sm md:text-base">{plan.description}</p>

            <Button className="min-w-24 w-full md:w-auto"
              onClick={() => handlePayment(plan.price, plan.tokens)}
              disabled={buttonDisabled}
            >
              ₹ {plan.price}
            </Button>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default PurchasePage
