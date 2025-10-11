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
import ProfileCard, {
    Carousel2,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel3"
import {speakers} from "../context/speakers"
import {testimonialData} from "../context/testimonialData"



function HomePageDetailsSection() {
    
    const { ref, inView } = useInView({ triggerOnce: true });
    return (
        <div className='w-full'>
            <h1 className='text-center font-bold text-gray-800 text-3xl pt-3'>About E-Cell</h1>
            <p className='text-center max-w-3xl mx-auto text-xl pt-3'>"E-Cell helps the hustling startups and young professionals via dynamic workshops, thought-provoking speaker sessions, high-stakes business plan competitions, and numerous other game-changing initiatives throughout the year to create a crucible for innovation. We stand as pillars of support for budding entrepreneurs, providing them with personalized guidance from experienced mentors, crucial funding opportunities, and a robust network that can change the course of their journey forever!"</p>
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
            <h1 className='text-center font-bold text-gray-800 text-3xl pt-3'>Inspirational Speakers</h1>
            <p className='text-center max-w-4xl mx-auto text-xl pt-3'>Discover the influential speakers who have shared their wisdom and insights at E-Cell events, enriching the entrepreneurial spirit.</p>
            <div>
                <Carousel2 className="relative w-full max-w-4xl mx-auto" opts={{ loop: true }}>
                    <CarouselPrevious />
                    <CarouselNext />

                    <CarouselContent>
                        {speakers.map(({ imageSrc, name, position }, index) => (
                            <CarouselItem key={index} className="max-w-xs px-2">
                                <ProfileCard imageSrc={imageSrc} name={name} position={position} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel2>
            </div>
            <h1 className='text-center font-bold text-gray-800 text-3xl pt-3'>Testimonial</h1>
            <div className='text-center justify-center flex mb-3 mt-4'>
                <div className="relative overflow-hidden w-3/4 max-h-screen">
                    <Carousel slides={testimonialData} />
                </div>
            </div>

        </div>
    )
}

export default HomePageDetailsSection