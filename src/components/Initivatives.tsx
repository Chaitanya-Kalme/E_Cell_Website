import React from "react";

const initiatives = [
  {
    title: "Coding Club",
    description:
      "Eureka! Junior provides the perfect platform for young inquisitive minds to solve normal problems in the most innovative and creative way possible. It is a Business Plan Competition that...",
    button: "Know More",
    url: "https://thecodingclub.vercel.app/",
  },
  {
    title: "Softcom",
    description:
      "Eureka! is an international Business model competition for young inquisitive minds to solve real world problems.",
    button: "Know More",
    url: "https://www.iitrpr.ac.in/bost/softcom",
  },
  {
    title: "Campus Ambassador",
    description:
      "E-Cell IIT Campus Ambassador programme aims to ignite the entrepreneurial potential in students like you all around India.",
    button: "Know More",
    url: "https://thecodingclub.vercel.app/",
  },
  {
    title: "Illuminate",
    description:
      "Illuminate is a series of pre-Eureka! workshops on entrepreneurship and business model drafting.",
    button: "Know More",
    url: "https://thecodingclub.vercel.app/",
  },
  {
    title: "EnB Club",
    description:
      "The Entrepreneurship and Business Club fosters the development of innovative ideas and supports individuals in transforming ideas into actions.",
    button: "Know More",
    url: "https://thecodingclub.vercel.app/",
  },
  {
    title: "NEC",
    description:
      "Created with the vision to promote entrepreneurship amidst all the campuses in India.",
    button: "Know More",
    url: "https://thecodingclub.vercel.app/",
  },
];

const Initivatives = () => (
  <div className="py-10 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-0" style={{ color: "#6f76bfff" }}>
      OUR INITIATIVES
    </h1>
    <p className="text-lg md:text-xl max-w-2xl mx-auto my-6" style={{ color: "#222" }}>
      We at E-Cell, IIT believe that entrepreneurship is the key to India’s development. To fulfill this vision, we have conceptualized & successfully implemented various initiatives to help students, young entrepreneurs & professionals in their entrepreneurial journey.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {initiatives.map((item, idx) => (
        <div
          key={idx}
          className="bg-[#232b2b] text-white rounded-3xl border-2"
          style={{
            borderColor: "#6f76bfff",
            padding: "32px 24px",
            minHeight: 340,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
          <h2 className="font-bold text-xl md:text-2xl mb-3" style={{ color: "#6f76bfff" }}>
            {item.title}
          </h2>
          <p className="text-base mb-auto">{item.description}</p>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 bg-[#6f76bfff] text-white rounded-full px-7 py-2 font-bold text-base flex items-center gap-2 shadow"
            style={{ border: "none", textDecoration: "none" }}
          >
            {item.button} <span style={{ fontSize: 18 }}>→</span>
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Initivatives;
