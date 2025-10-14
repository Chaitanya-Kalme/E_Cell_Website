import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 space-y-24">
        {/* Section 1: About Us */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-extrabold mb-8 text-purple-700">
              About Us
            </h1>
            <p className="text-xl text-black mb-6">
              <span className="font-bold text-purple-700">Entrepreneurship Cell (E-cell), IIT Ropar</span> is a student-driven initiative aimed at developing the culture of innovation and entrepreneurship both inside and outside the campus.
            </p>
            
            
            <p className="text-xl text-black mb-6">
              At E Cell IIT Ropar, we are open to dreamers, doers and disruptors. It is time to make things come true.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/about-us-image.png"
              alt="About Us"
              width={400}
              height={400}
              className="rounded-2xl shadow-xl border-2 border-yellow-400 object-cover bg-white"
            />
          </div>
        </div>

        {/* Section 2: Vision */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/vision-image.png"
              alt="Vision"
              width={400}
              height={250}
              className="rounded-2xl shadow-xl object-contain"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-extrabold mb-4 text-purple-700">
              Vision
            </h2>
            <p className="text-xl text-black mb-6">
              Our vision is to build a successful ecosystem where ideas can be nurtured, young minds are challenged to think big, take calculated risks and develop their visions into a venture.
            </p>
          </div>
        </div>

        {/* Section 3: Mission */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/our-mission-image.png"
              alt="Mission"
              width={400}
              height={250}
              className="rounded-2xl shadow-xl object-contain"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-extrabold mb-4 text-purple-700">
              Our Mission
            </h2>
            <p className="text-lg text-black mb-4">
              We are committed to cultivating entrepreneurial minds among the student body by preparing them with the appropriate resources, mentorship and opportunities. Whether by interactive workshops and motivational speaker sessions or by national-level contests and incubation services, E-Cell IIT Ropar serves as a catapult to aspiring entrepreneurs.
            </p>
          </div>
        </div>

        {/* Section 4: Startup Process */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <p className="text-xl text-black mb-6">
              We think entrepreneurship is not so much about founding businesses, it is about problem solving, leadership and impact. It is on this belief that we aim to create a robust community of innovators that will be able to shape the future.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/about-us-last-image.png"
              alt="Startup Process"
              width={400}
              height={250}
              className="rounded-2xl shadow-xl object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}