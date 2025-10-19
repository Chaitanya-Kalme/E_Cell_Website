'use client'
import React from 'react'
import Carousel from "@/components/ui/carousel";



function HomePageHeroSection() {
    const slideData = [
        {
            src: "Carousel_Image1.jpeg",
        },
        {
            src: "The-Startups-Keys-to-Success.png",
        },
        {
            src: "innovation image.webp",
        },
        {
            src: "qualities-of-entrepreneurs-mc-slide1.png",
        }
    ];

    return (
        <div className="w-full overflow-hidden mt-23" style={{ height: `calc(100vh - 6rem)` }}>
            <div className="relative overflow-hidden w-full h-full">
                <Carousel slides={slideData} />
            </div>
        </div>
    )
}

export default HomePageHeroSection