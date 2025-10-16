import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const BlogCards = ({blog}) => {
  return (
    <Link 
      href={blog.link} 
      target='_blank'
      className="block w-[320px] bg-white dark:bg-[#3D0066] border-4 border-[#C670FF] rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl"
    >
      <div className="relative w-full pb-[75%]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4 text-[#3D0066] dark:text-white">
          {blog.title}
        </h3>
        
        <div className="flex items-center gap-2">
          <Image
            src="/E-Cell Image.jpg"
            alt="E-Cell Logo"
            width={40}
            height={40}
            className="rounded-full border-2 border-[#C670FF]"
          />
          <span className="text-base font-medium text-[#3D0066] dark:text-white">
            E-Cell IIT Ropar
          </span>
        </div>
      </div>
    </Link>
  )
}

export default BlogCards
