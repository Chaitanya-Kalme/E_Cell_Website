const ContactCard = ({ member }) => {
  return (
    <div className="relative group">
      <div className="bg-blue-100 rounded-lg shadow-lg p-6 m-4 w-64 h-48 flex flex-col items-center justify-center transition-all duration-300 group-hover:backdrop-blur-sm group-hover:bg-opacity-20">
        <img 
          src={member.image || "https://via.placeholder.com/150"} 
          alt={member.name} 
          className="w-24 h-24 rounded-full object-cover mb-4 group-hover:opacity-30 transition-opacity duration-300"
        />
        <h3 className="text-xl font-semibold text-blue-900 mb-2 group-hover:opacity-30 transition-opacity duration-300">{member.name}</h3>
        <p className="text-blue-700 group-hover:opacity-30 transition-opacity duration-300">{member.post}</p>
      </div>
      
      {/* Overlay that appears on hover */}
      <div className="absolute inset-0 m-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm bg-black/30">
        <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
        <p className="text-gray-200 mb-6">{member.post}</p>
        <div className="flex space-x-6">
          {member.email && (
            <a 
              href={`mailto:${member.email}`}
              className="text-white hover:text-blue-200 transition-colors duration-200"
              title="Send Email"
            >
              <img 
                src="/gmail.png" 
                alt="Email"
                className="h-8 w-8"
              />
            </a>
          )}
          {member.linkedIn && (
            <a 
              href={member.linkedIn} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-blue-200 transition-colors duration-200"
              title="View LinkedIn Profile"
            >
              <img 
                src="/linkedin.png" 
                alt="LinkedIn"
                className="h-8 w-8"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
