"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    testimonial: "I sent over 40 applications on LinkedIn and Naukri — zero replies. A friend suggested Outmail. Within 10 days of running my first cold outreach campaign, I had 4 interview calls. The hiring signal targeting is genuinely insane.",
    by: "Arjun Mehta, 4th Year CSE, BITS Pilani",
    imgSrc: "https://i.pravatar.cc/150?img=11",
  },
  {
    testimonial: "The job feed on Outmail is nothing like any job board I've used. It tells you which companies are actively hiring based on funding and headcount data — not just whatever they posted publicly. I found my internship through a company that hadn't even posted the role yet.",
    by: "Priya Nair, 3rd Year, IIT Bombay",
    imgSrc: "https://i.pravatar.cc/150?img=21",
  },
  {
    testimonial: "I had a mentorship session with a product manager from a Series B startup through Outmail. In one hour I got more actionable advice than months of reading blogs. She helped me reframe my entire resume and intro email. Got a PPO two months later.",
    by: "Rohan Sharma, Final Year MBA, IIM Indore",
    imgSrc: "https://i.pravatar.cc/150?img=33",
  },
  {
    testimonial: "What I love is that the cold emails don't feel spammy. Outmail personalises each one with context about the company — their recent funding, what role you're targeting. Recruiters actually reply because it feels like you did your homework.",
    by: "Sneha Iyer, 3rd Year ECE, NIT Trichy",
    imgSrc: "https://i.pravatar.cc/150?img=47",
  },
  {
    testimonial: "Our placement cell piloted Outmail for our batch and the results were honestly surprising. Students who had zero responses from portals started getting recruiter replies within the first week. The analytics dashboard made it easy to track who was reaching out and how campaigns were performing.",
    by: "Karan Verma, Placement Coordinator, VIT Vellore",
    imgSrc: "https://i.pravatar.cc/150?img=57",
  },
  {
    testimonial: "I used the job intelligence feature to filter companies by growth stage and sector. Instead of blindly applying everywhere, I shortlisted 15 high-momentum companies and ran a focused campaign. Converted 3 of them into interviews. Quality over quantity — finally.",
    by: "Ananya Kapoor, 4th Year CS, IIIT Hyderabad",
    imgSrc: "https://i.pravatar.cc/150?img=25",
  },
];

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border p-8 transition-all duration-500 ease-in-out overflow-hidden",
        isCenter
          ? "z-10 bg-[#5C1ED9] border-purple-400"
          : "z-0 bg-white border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(108,0,255,0.5)" : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(",")[0]}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        style={{ boxShadow: "3px 3px 0px hsl(var(--background))" }}
      />
      <h3
        className={cn(
          "text-sm sm:text-base font-medium leading-relaxed line-clamp-6",
          isCenter ? "text-white" : "text-gray-800"
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-xs italic",
          isCenter ? "text-white/70" : "text-gray-500"
        )}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(
    testimonials.map((t) => ({ ...t, tempId: Math.random() }))
  );

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-muted/30" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-60">
  <button
    onClick={() => handleMove(-1)}
    className="flex h-14 w-14 items-center justify-center text-2xl bg-background border-2 border-border text-[#6c00ff] rounded-full transition hover:bg-gray-300"
    aria-label="Previous testimonial"
  >
    <ChevronLeft />
  </button>
  <button
    onClick={() => handleMove(1)}
    className="flex h-14 w-14 items-center justify-center text-2xl bg-background border-2 border-border text-[#6c00ff] rounded-full transition hover:bg-gray-300"
    aria-label="Next testimonial"
  >
    <ChevronRight />
  </button>
</div>

    </div>
  );
};

export default StaggerTestimonials;
