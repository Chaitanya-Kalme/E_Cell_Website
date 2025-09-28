'use client';

import React from "react";
import { useContext } from "react";
import { dataContext } from "@/context/dataContext";
import BlogCards from "../../components/BlogCards";

const Blogs = () => {
  const { blogs } = useContext(dataContext);
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-24 gap-y-8 justify-items-center items-start">
          {blogs.map((blog, index) => (
            <BlogCards key={index} blog={blog} />
          ))}
        </div>  
      </div>
    </div>
  );
};

export default Blogs;
