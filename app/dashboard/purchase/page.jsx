import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function PurchasePage() {
  const plans = [
    {
      "name": "Starter Pack",
      "price": "$1",
      "tokens": 1,
      "description": "Try it out with just one token. Great for a quick start!"
    },
    {
      "name": "Saver Bundle",
      "price": "$8",
      "tokens": 10,
      "description": "Get more for less! Perfect if you need a few extra tokens."
    },
    {
      "name": "Big Deal Pack",
      "price": "$15",
      "tokens": 20,
      "description": "The best value! Grab 20 tokens and save big."
    }
  ]
  
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
            
            <Button className="min-w-24 w-full md:w-auto">
              {plan.price}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PurchasePage
