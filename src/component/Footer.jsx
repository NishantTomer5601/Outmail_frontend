 "use client";
        import React, { useState } from 'react';
        import Image from 'next/image';
        import { z } from 'zod';

        export default function Footer() {
          const [email, setEmail] = useState("");
          const [error, setError] = useState("");
          const [subscribed, setSubscribed] = useState(false);
          const [modalOpen, setModalOpen] = useState(false);
          const [modalContent, setModalContent] = useState({ title: '', content: '' });
          const emailSchema = z.string().email();

          const openModal = (type) => {
            if (type === 'terms') {
              setModalContent({
                title: 'Terms and Conditions',
                content: `These are the Terms and Conditions for Outmail. By using our service, you agree to abide by all rules and policies. Outmail is not responsible for any misuse of the platform. Please read all terms carefully before proceeding.`
              });
            } else if (type === 'privacy') {
              setModalContent({
                title: 'Privacy Policy',
                content: `Outmail values your privacy. We do not share your personal information with third parties except as required for service delivery. All data is stored securely and handled according to industry standards.`
              });
            }
            setModalOpen(true);
          };

          const handleSubmit = (e) => {
            e.preventDefault();
            if (!emailSchema.safeParse(email).success) {
              setError("Please enter a valid email address.");
              return;
            }
            setError("");
            setSubscribed(true);
            setEmail("");
            setTimeout(() => {
              setSubscribed(false);
            }, 1000);
          };

          return (
            <footer className="bg-gradient-to-l from-black via-[#6c00ff] to-black text-white px-6 pt-20 pb-10 relative">
              <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2">
                {/* Left Column */}
                <div>
                  <div className="flex items-center gap-2 text-2xl font-bold mb-4">
                    <Image src="/Logo_Outmail.png" alt="Outmail Logo" width={40} height={40} />
                    <span className="text-white">Outmail</span>
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
                    Boost your job visibility 5x with Outmail. Automate personalized outreach, connect directly with recruiters, and get noticed in today’s crowded job market.
                  </p>

                  <ul className="flex flex-wrap gap-4 text-sm text-white/80">
                    <li><a href="/Aboutus" className="hover:underline">About Us</a></li>
                    <li>
                      <button
                        className="hover:underline bg-transparent text-white cursor-pointer"
                        type="button"
                        onClick={() => openModal('terms')}
                      >
                        Terms and Conditions
                      </button>
                    </li>
                    <li>
                      <button
                        className="hover:underline bg-transparent text-white cursor-pointer"
                        type="button"
                        onClick={() => openModal('privacy')}
                      >
                        Privacy Policy
                      </button>
                    </li>
                    <li><a href="/faq" className="hover:underline">FAQ</a></li>
                    <li><a href="/Contactus" className="hover:underline">Contact Us</a></li>
                  </ul>
                </div>

                {/* Right Column */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Stay Connected</h3>
                  <p className="text-sm text-white/60 mb-4">
                    Join our newsletter for job search tips, product updates, and exclusive offers from Outmail.
                  </p>

                  <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      aria-label="Email address"
                      className="px-5 py-3 rounded-full text-white w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-white placeholder:text-white border border-amber-50"
                    />
                    <button
                      type="submit"
                      className={`px-6 py-3 rounded-full font-semibold transition duration-200 relative overflow-hidden focus:outline-none
                        ${subscribed
                          ? 'animate-pop bg-gradient-to-r from-[#6c00ff] via-[#a100ff] to-[#6c00ff] text-white scale-110 shadow-lg'
                          : 'bg-white text-black hover:bg-gray-200'}
                      `}
                      disabled={subscribed}
                    >
                      {subscribed ? (
                        <span className="animate-pop">Subscribed!</span>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </form>
                  {error && (
                    <p className="text-red-400 mt-2 text-sm">{error}</p>
                  )}
                </div>
              </div>

              {/* Modal for Terms and Privacy */}
              {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 w-full max-w-lg">
                    <h2 className="text-2xl font-bold text-white mb-6">{modalContent.title}</h2>
                    <div className="text-white text-sm mb-6 whitespace-pre-line">{modalContent.content}</div>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-6 py-2 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Line */}
              <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/50">
                <p>© {new Date().getFullYear()} Outmail. All rights reserved.</p>
              </div>
            </footer>
          );
        }
