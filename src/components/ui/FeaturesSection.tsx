import React from "react";

export default function FeaturesSection() {
  return (
    <div className="container mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100">
        <h3 className="text-xl font-bold mb-3 text-purple-700">
          Innovation
        </h3>
        <p className="text-black">
          Fostering creative thinking and innovative solutions to real-world problems.
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-200">
        <h3 className="text-xl font-bold mb-3 text-yellow-400">
          Networking
        </h3>
        <p className="text-black">
          Building connections with entrepreneurs and industry experts.
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100">
        <h3 className="text-xl font-bold mb-3 text-purple-700">
          Growth
        </h3>
        <p className="text-black">
          Providing resources and mentorship for entrepreneurial development.
        </p>
      </div>
    </div>
  );
}