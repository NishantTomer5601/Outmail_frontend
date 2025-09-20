// components/ContactUs.jsx
"use client";
import React, { useState } from "react";
import { Phone, Clock, Twitter, Linkedin, Instagram } from "lucide-react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", { name, email, message });
    // In a real application, you would send this data to a backend API.
  };

  return (
    // Main container for the Get In Touch section
    <div className="bg-gradient-to-l from-black via-[#6c00ff] to-black flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 font-inter">
      {/* Inner container with max width and rounded corners */}
      <div className="mt-20 max-w-6xl w-full bg-white shadow-lg rounded-xl p-6 sm:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left Column: Contact Info */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Placeholder box */}
          <div className="bg-purple-200 rounded-xl h-64 w-full flex items-center justify-center text-purple-600 text-lg font-semibold">
            Placeholder for Image/Map
          </div>

          {/* Phone Number */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-purple-100 rounded-full text-purple-600">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-900 font-semibold text-lg">Phone Number</p>
              <p className="text-gray-600">+123 456 789 101</p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-purple-100 rounded-full text-purple-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-900 font-semibold text-lg">Business Hours</p>
              <p className="text-gray-600">Monday - Friday / 8AM to 5PM</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition duration-200">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition duration-200">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition duration-200">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contact Outmail Support</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Have a question about your job search, campaign, or account? Our team is here to help you get noticed and land more interviews. Fill out the form and we’ll get back to you soon!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200" 
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200" 
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                placeholder="Write your message here..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 resize-y" >
              </textarea>
            </div>

            <div className="flex justify-center">
              <button 
                type="submit" 
                className="flex justify-center w-full sm:w-auto px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;