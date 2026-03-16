import { Mail, MapPinIcon } from 'lucide-react';
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <footer className="w-full bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
          {/* Left - Logo/Image */}
          <div className="mb-6 md:mb-0 md:w-1/4 flex-shrink-0">
            <img
              src="E-Cell Image.jpg"  // Change this to your logo path
              alt="Logo"
              width="150"
              height="150"
            />
            <div className='mt-2 flex gap-x-2'>
              <a href="https://www.linkedin.com/company/e-cell-iit-ropar/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className='size-7 hover:cursor-pointer' />
              </a>
              <a href="https://www.instagram.com/ecell_iitrpr/?hl=en" target="_blank" rel="noopener noreferrer">
                <FaSquareInstagram className='size-7 hover:cursor-pointer' />
              </a>




            </div>
          </div>
          {/* Right - Columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Event Links */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Event Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/events/upcoming" className="hover:underline">
                    Upcoming Events
                  </a>
                </li>
                <li>
                  <a href="/events/archive" className="hover:underline">
                    Past Events
                  </a>
                </li>
                <li>
                  <a href="/events/submit" className="hover:underline">
                    Submit Event
                  </a>
                </li>
              </ul>
            </div>
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" rel="noopener noreferrer" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" rel="noopener noreferrer" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" rel="noopener noreferrer" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/gallery" rel="noopener noreferrer" className="hover:underline">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/blogs" rel="noopener noreferrer" className="hover:underline">
                    Blogs
                  </a>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <a className="not-italic flex" href='https://maps.app.goo.gl/sxtvLWVFFpE48EmS8' target='_blank'>
                <span className='mr-2'>
                  <MapPinIcon className='bg-gray-900' />
                </span>
                Admin Block, IIT Ropar,<br />
                India,140001
              </a>
              <a className="not-italic flex mt-2" href="mailto:ecell@iitrpr.ac.in" >
                <span className='mr-2 '>
                  <Mail />
                </span>
                ecell@iitrpr.ac.in
              </a>
              <div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='text-center py-4 bg-gray-950 text-white'>
        © 2026 Copyright: E-Cell IIT Ropar
      </div>
    </div>
  );
};
