'use client'
import { Lightbulb } from 'lucide-react';
import React from 'react'
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import light_bulb_image from "../../public/light_bulb_image.png"
import { PiStudentLight } from "react-icons/pi";
import { Card, CardContent } from "@/components/ui/card"
import Carousel from './ui/carousel2';
import {
    Carousel2,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    ProfileCard,
} from "@/components/ui/carousel3"
import { speakers } from "../context/speakers"
import { testimonialData } from "../context/testimonialData"



function HomePageDetailsSection() {

    const { ref, inView } = useInView({ triggerOnce: true });
    return (
        <div className='w-full py-7'>
            <h1 className='text-center font-bold text-3xl pt-3 text-gray-800 dark:text-white'>About E-Cell</h1>
            <p className='text-center max-w-3xl mx-auto text-xl py-7'>"E-Cell empowers emerging startups and ambitious young professionals through dynamic workshops, inspiring speaker sessions, high-stakes business plan competitions, and a range of transformative initiatives held year-round. We serve as a catalyst for innovation—offering personalized mentorship from seasoned experts, access to vital funding opportunities, and a powerful network that can redefine the entrepreneurial journey. As steadfast allies of aspiring entrepreneurs, we’re committed to turning bold ideas into impactful ventures."</p>
            <div ref={ref} className="text-center my-5 bg-gray-800 text-white">
                <h2 className="text-3xl font-bold mb-3 text-white pt-4">Our Achievements</h2>
                <div className="flex justify-center space-x-20 text-xl pb-5">
                    <div>
                        <div className="bg-gray-800 flex justify-center items-center">
                            <Image src={light_bulb_image} alt="Light Bulb" width={200} height={200} />
                        </div>
                        {inView && <CountUp end={100} duration={2} />}
                        +
                        <p>Startups Supported</p>
                    </div>
                    <div>
                        <div className="bg-gray-800 flex justify-center items-center">
                            <PiStudentLight size={110} />
                        </div>
                        {inView && <CountUp end={5000} duration={3} />}
                        +
                        <p>Students Reached</p>
                    </div>
                </div>
            </div>
            <h1 className='text-center font-bold text-gray-800 text-3xl pt-3 dark:text-white'>Inspirational Speakers</h1>
            <p className='text-center max-w-4xl mx-auto text-xl pt-3'>Discover the influential speakers who have shared their wisdom and insights at E-Cell events, enriching the entrepreneurial spirit.</p>
            <div className="w-full px-2 sm:px-4">
                <Carousel2 className="relative w-full max-w-4xl mx-auto" opts={{ loop: true }}>
                    <CarouselPrevious />
                    <CarouselNext />
                    <CarouselContent>
                        {speakers.map(({ imageSrc, name, position }, index) => (
                            <CarouselItem key={index}>
                                <ProfileCard imageSrc={imageSrc} name={name} position={position} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel2>
            </div>
            <h1 className='text-center font-bold text-gray-800 text-3xl pt-3 dark:text-white'>Testimonial</h1>
            <div className='text-center justify-center flex pb-4 mt-4'>
                <div className="relative overflow-hidden w-3/4 max-h-screen">
                    <Carousel slides={testimonialData} />
                </div>
            </div>

        </div>
    )
}

export default HomePageDetailsSection