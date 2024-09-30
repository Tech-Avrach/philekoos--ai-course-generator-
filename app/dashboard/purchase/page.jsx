"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect } from 'react'
import axios from 'axios'

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

  const handlePayment = async (amount) => {
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
        name: "Your App Name",
        description: "Token Purchase",
        order_id: orderData.id, // Use the order ID from the server
        handler: (response) => {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Your Name",
          email: "email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  
  
  return (
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
             onClick={() => handlePayment(plan.price)}
              >
  ₹ {plan.price}
</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PurchasePage
