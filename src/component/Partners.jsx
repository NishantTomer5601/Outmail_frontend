"use client";

import {
  BrandGoogle,
  BrandFacebook,
  BrandGithub,
  BrandLinkedin,
  BrandApple,
  BrandAmazon,
  BrandYoutube,
  BrandTwitter,
} from "tabler-icons-react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export default function Partners() {
  const icons = [
    <BrandGoogle size={48} />,
    <BrandFacebook size={48} />,
    <BrandGithub size={48} />,
    <BrandLinkedin size={48} />,
    <BrandApple size={48} />,
    <BrandAmazon size={48} />,
    <BrandYoutube size={48} />,
    <BrandTwitter size={48} />,
  ];

  return (
    <div className=" w-full overflow-hidden py-10 bg-black bg-gradient-to-l from-black via-[#6c00ff] to-black ">
      <h2 className="text-2xl font-bold text-white text-center mb-20 mt-10">
        Trusted by Job Seekers Connecting with Top Companies
      </h2>


      <div className="flex animate-scroll whitespace-nowrap gap-12 text-white px-4 ">
        {icons.map((Icon, index) => (
          <div
            key={index}
            className="flex items-center justify-center hover:text-[#630dff] transition duration-100"
          >
            {Icon}
          </div>
        ))}
        {icons.map((Icon, index) => (
          <div
            key={`copy-${index}`}
            className="flex items-center justify-center hover:text-[#AD46FF] transition duration-300"
          >
            {Icon}
          </div>
        ))}
        {icons.map((Icon, index) => (
          <div
            key={`copy-${index}`}
            className="flex items-center justify-center hover:text-[#AD46FF] transition duration-300"
          >
            {Icon}
          </div>
        ))}
        {icons.map((Icon, index) => (
          <div
            key={`copy-${index}`}
            className="flex items-center justify-center hover:text-[#AD46FF] transition duration-300"
          >
            {Icon}
          </div>
        ))}
        {icons.map((Icon, index) => (
          <div
            key={`copy-${index}`}
            className="flex items-center justify-center hover:text-[#AD46FF] transition duration-300"
          >
            {Icon}
          </div>
        ))}
        {icons.map((Icon, index) => (
          <div
            key={`copy-${index}`}
            className="flex items-center justify-center hover:text-[#AD46FF] transition duration-300"
          >
            {Icon}
          </div>
        ))}
        {icons.map((Icon, index) => (
          <div
            key={`copy-${index}`}
            className="flex items-center justify-center hover:text-[#AD46FF] transition duration-300"
          >
            {Icon}
          </div>
        ))}
      </div>
    </div>
  );
}
