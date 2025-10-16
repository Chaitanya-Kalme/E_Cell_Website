'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Carousel from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import Carousel_Image1 from "@/../public/Carousel_Image1.jpeg"

function HomePageHeroSection() {
    const slideData = [
        {
            title: "Mystic Mountains",
            button: "Explore Component",
            src: "Carousel_Image1.jpeg",
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