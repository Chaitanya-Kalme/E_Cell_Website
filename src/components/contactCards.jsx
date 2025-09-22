const ContactCard = ({ member }) => {
  return (
    <div className="rounded-md bg-purple-600 p-4 text-center text-white w-64 h-48 shadow-lg hover:scale-105 transition-transform duration-300 mx-10 my-10">
      <div className="flex justify-center rounded-full">
        <img
          src={member.image || "https://via.placeholder.com/150"}
          alt={member.name}
          className="w-24 h-24 rounded-full object-cover mb-4 group-hover:opacity-30 transition-opacity duration-300"
        />
      </div>
      <h4 className="text-xl font-semibold mt-2">{member.name}</h4>
      <p className="text-md mb-2">{member.position}</p>
    </div>
  );
};

export default ContactCard;
