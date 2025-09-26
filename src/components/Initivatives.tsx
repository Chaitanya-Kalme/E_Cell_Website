






import React from "react";

const initiatives = [
  {
    title: "Eureka! Junior",
    description:
      "Eureka! Junior provides the perfect platform for young inquisitive minds to solve normal problems in the most innovative and creative way possible. It is a Business Plan Competition that...",
    button: "Know More",
  },
  {
    title: "Eureka!",
    description:
      "Eureka! is an international Business model competition for young inquisitive minds to solve real world problems.",
    button: "Know More",
  },
  {
    title: "Campus Ambassador",
    description:
      "E-Cell IIT Campus Ambassador programme aims to ignite the entrepreneurial potential in students like you all around India.",
    button: "Know More",
  },
  {
    title: "Illuminate",
    description:
      "Illuminate is a series of pre-Eureka! workshops on entrepreneurship and business model drafting.",
    button: "Know More",
  },
  {
    title: "EnB Club",
    description:
      "The Entrepreneurship and Business Club fosters the development of innovative ideas and supports individuals in transforming ideas into actions.",
    button: "Know More",
  },
  {
    title: "NEC",
    description:
      "Created with the vision to promote entrepreneurship amidst all the campuses in India.",
    button: "Know More",
  },
];

const Initivatives = () => (
  <div style={{ padding: "40px 0", textAlign: "center" }}>
    <h1 style={{ color: "#6f76bfff", fontWeight: 700, fontSize: "3rem", marginBottom: 0 }}>
      OUR INITIATIVES
    </h1>
    <p style={{ fontSize: "1.3rem", maxWidth: 800, margin: "20px auto 40px", color: "#222" }}>
      We at E-Cell, IIT  believe that entrepreneurship is the key to India’s development. To fulfill this vision, we have conceptualized & successfully implemented various initiatives to help students, young entrepreneurs & professionals in their entrepreneurial journey.
    </p>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "32px",
        justifyItems: "center",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {initiatives.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: "#232b2b",
            color: "#fff",
            borderRadius: "24px",
            border: "2px solid #6f76bfff",
            padding: "32px 24px",
            maxWidth: 340,
            minHeight: 340,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Example logo placeholder */}
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
          <h2 style={{ color: "#6f76bfff", fontWeight: 700, fontSize: "1.5rem", margin: "0 0 12px" }}>
            {item.title}
          </h2>
          <p style={{ fontSize: "1rem", marginBottom: "auto" }}>{item.description}</p>
          <button
            style={{
              marginTop: 24,
              background: "#6f76bfff",
              color: "#fff",
              border: "none",
              borderRadius: 24,
              padding: "10px 28px",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {item.button} <span style={{ fontSize: 18 }}>→</span>
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Initivatives;
