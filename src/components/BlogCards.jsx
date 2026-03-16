import React from 'react'
import Link from 'next/link'

const BlogCards = ({ blog }) => {
  return (
    <Link
      href={blog.link}
      target='_blank'
      className="block w-[320px] bg-white dark:bg-gray-800 border-2 border-blue-700 dark:border-orange-200 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl"
    >
      <div className="relative w-full">
        <img
          src={blog.image}
          alt={blog.title}
          className="object-cover "
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-orange-200">
          {blog.title}
        </h3>

        <div className="flex items-center gap-2">
          <img
            src="E-Cell Image.jpg"
            alt="E-Cell Logo"
            width="40"
            height="40"
            className="rounded-full border-2 border-blue-700 dark:border-orange-200"
          />
          <span className="text-base font-medium text-blue-700 dark:text-orange-200">
            E-Cell IIT Ropar
          </span>
        </div>
      </div>
    </Link>
  )
}

export default BlogCards
