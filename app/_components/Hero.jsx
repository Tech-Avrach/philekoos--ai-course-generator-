"use client"

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'

function Hero() {

    const { user } = useUser();

    return (
        <div>
            <section className="">
                <div className="mx-auto max-w-screen-xl lg:h-[800px] px-4 py-32 lg:flex lg:items-center">
                    <div className="mx-auto max-w-3xl text-center" >
                        <div className="mx-auto max-w-xl text-center">
                            <h1 className="text-3xl font-extrabold sm:text-5xl lg:pb-5 text-primary">
                                AI Course Generator
                                <strong className="font-extrabold text-black sm:block lg:pt-5"> Custom Learning Path, Powed By AI </strong>
                            </h1>
                        </div>

                        <p className="mt-4 sm:text-xl/relaxed">
                            Unlock your full potential with our AI-powered learning course generator. Create a personalized learning course tailored to your needs.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            {
                                <Link href={user ? "/dashboard" : "/sign-in"}>
                                    <div className="w-32">
                                        <Button className="h-10 w-full">
                                            Create Course
                                        </Button>
                                    </div>
                                </Link>
                            }


                        </div>

                    </div>
                </div>
            </section >


        </div >
    )
}

export default Hero