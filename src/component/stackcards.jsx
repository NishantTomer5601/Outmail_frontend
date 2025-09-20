'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const projects = [
  {
    title: 'Boost Your Visibility',
    description: 'Reach 3x more companies with Outmail’s automated, personalized outreach.',
    src: 'dashboard.jpg',
    link: '/dashboard.jpg',
    color: '#6c00ff',
  },
  {
    title: 'Personalize Every Email',
    description: 'Upload multiple resumes and templates to tailor your message for every company.',
    src: 'dashboard.jpg',
    link: '/dashboard.jpg',
    color: '#6c00ff',
  },
  {
    title: 'Protect Your Privacy',
    description: 'Contacts are deleted after each campaign. Your data is never shared or sold.',
    src: 'dashboard.jpg',
    link: '/dashboard.jpg',
    color: '#6c00ff',
  },
];

// Custom hook to get window dimensions[2]
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default function StackingCards() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });
  
  return (
    <ReactLenis root>
      <main ref={container}>
        <section className="text-white w-full pt-0 mt-0">
          {projects.slice(0, 3).map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project?.link}
                src={project?.src}
                title={project?.title}
                color={project?.color}
                description={project?.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

export const Card = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { width } = useWindowSize();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Responsive values based on screen width[1][13]
  const getResponsiveValues = () => {
    if (width < 640) { // Mobile
      return {
        cardWidth: '95%',
        cardHeight: '400px',
        padding: '4',
        titleSize: 'text-lg',
        textSize: 'text-xs',
        topOffset: '10px',
        layout: 'flex-col',
        textWidth: 'w-full',
        imageWidth: 'w-full',
        imageHeight: 'h-48',
        gap: 'gap-4'
      };
    } else if (width < 768) { // Small tablet
      return {
        cardWidth: '90%',
        cardHeight: '450px',
        padding: '6',
        titleSize: 'text-xl',
        textSize: 'text-sm',
        topOffset: '15px',
        layout: 'flex-col',
        textWidth: 'w-full',
        imageWidth: 'w-full',
        imageHeight: 'h-56',
        gap: 'gap-5'
      };
    } else if (width < 1024) { // Large tablet
      return {
        cardWidth: '85%',
        cardHeight: '500px',
        padding: '8',
        titleSize: 'text-xl',
        textSize: 'text-sm',
        topOffset: '20px',
        layout: 'flex-row',
        textWidth: 'w-[45%]',
        imageWidth: 'w-[55%]',
        imageHeight: 'h-full',
        gap: 'gap-6'
      };
    } else { // Desktop
      return {
        cardWidth: '70%',
        cardHeight: '500px',
        padding: '10',
        titleSize: 'text-2xl',
        textSize: 'text-sm',
        topOffset: '25px',
        layout: 'flex-row',
        textWidth: 'w-[40%]',
        imageWidth: 'w-[60%]',
        imageHeight: 'h-full',
        gap: 'gap-10'
      };
    }
  };

  const responsive = getResponsiveValues();

  return (
    <div
      ref={container}
      className="relative h-screen flex items-center justify-center sticky top-0 px-4 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-32"
    >
      {/* Gradient background only on 2nd card (i === 1) */}
      {i === 1 && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1000 }}
        />
      )}

      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * parseInt(responsive.topOffset)}px)`,
          width: responsive.cardWidth,
          height: responsive.cardHeight,
        }}
        className={`flex flex-col relative rounded-2xl p-${responsive.padding} origin-top z-10 max-w-6xl`}
      >
        <h2 className={`${responsive.titleSize} text-center font-semibold mb-4 md:mb-0`}>
          {title}
        </h2>
        
        <div className={`flex ${responsive.layout} ${responsive.gap} h-full mt-2 md:mt-5`}>
          <div className={`${responsive.textWidth} ${responsive.layout === 'flex-row' ? 'relative top-[10%]' : ''}`}>
            <p className={responsive.textSize}>{description}</p>
            <span className="flex items-center gap-2 pt-2">
              <a
                href="#"
                target="_blank"
                className="underline cursor-pointer text-xs md:text-sm"
              >
                See more
              </a>
            </span>
          </div>

          <div className={`relative ${responsive.imageWidth} ${responsive.imageHeight} rounded-lg overflow-hidden`}>
            <motion.div
              className="w-full h-full"
              style={{ scale: imageScale }}
            >
              <Image 
                fill 
                src={url} 
                alt="image" 
                className="object-cover"
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 70vw"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
