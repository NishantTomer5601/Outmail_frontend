import React from 'react';


export default function WhyOutMail() {
  return (
    <div className="bg-white">
      {/* Key Benefits Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-sm font-medium text-purple-500">Why OutMail?</h1>
        <h2 className="text-3xl font-semibold mt-2 tracking-tighter">Key Benefits for Job Seekers</h2>
        <p className="mt-2 text-gray-500">OutMail is designed to help you get noticed, save time, and land more interviews.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-black text-white p-6 rounded-2xl shadow flex flex-col items-center">
            <span className="text-3xl mb-2">✅</span>
            <h3 className="text-xl font-semibold mb-2">Reach 3x More Companies</h3>
            <p>Automate your outreach and connect with more recruiters in less time.</p>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow flex flex-col items-center">
            <span className="text-3xl mb-2">✅</span>
            <h3 className="text-xl font-semibold mb-2">Personalized Campaigns</h3>
            <p>Send tailored emails with multiple resumes and templates—no more generic messages.</p>
          </div>
          <div className="bg-black text-white p-6 rounded-2xl shadow flex flex-col items-center">
            <span className="text-3xl mb-2">✅</span>
            <h3 className="text-xl font-semibold mb-2">Privacy & Safety</h3>
            <p>Your Gmail is protected, sending is throttled, and contacts are deleted after each campaign.</p>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow flex flex-col items-center">
            <span className="text-3xl mb-2">✅</span>
            <h3 className="text-xl font-semibold mb-2">Boost Interview Chances</h3>
            <p>Get your profile in front of more recruiters and increase your odds of landing interviews.</p>
          </div>
          <div className="bg-black text-white p-6 rounded-2xl shadow flex flex-col items-center">
            <span className="text-3xl mb-2">✅</span>
            <h3 className="text-xl font-semibold mb-2">Save Time</h3>
            <p>Automate repetitive outreach so you can focus on preparing for interviews.</p>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow flex flex-col items-center">
            <span className="text-3xl mb-2">✅</span>
            <h3 className="text-xl font-semibold mb-2">Data Security</h3>
            <p>Tokens are encrypted and your data is never shared or sold.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-purple-600 to-purple-800 text-white text-center">
        <h3 className="text-sm">How OutMail Works</h3>
        <h2 className="text-3xl font-semibold mt-2">Get Started in Four Simple Steps</h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div>
            <h4 className="font-semibold">1. Connect Gmail</h4>
            <p className="text-sm text-purple-100">Securely connect your Gmail via OAuth.</p>
          </div>
          <div>
            <h4 className="font-semibold">2. Upload & Personalize</h4>
            <p className="text-sm text-purple-100">Add resumes and templates for tailored outreach.</p>
          </div>
          <div>
            <h4 className="font-semibold">3. Target Companies</h4>
            <p className="text-sm text-purple-100">Pick from our database or upload your own CSV.</p>
          </div>
          <div>
            <h4 className="font-semibold">4. Launch Campaign</h4>
            <p className="text-sm text-purple-100">Schedule, send, and track your results—safely and easily.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
