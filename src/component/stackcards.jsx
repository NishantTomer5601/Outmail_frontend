'use client';
import { useTransform, motion, useScroll } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const projects = [
  {
    title: 'Smart Automated Cold Outreach',
    description: 'Send personalised emails to the right recruiters at scale — powered by live hiring signals, funding data, and smart company targeting.',
    src: 'dashboard_landingPage.png',
    link: '/dashboard_landingPage.png',
    color: '#6c00ff',
  },
  {
    title: 'Curated Job Openings',
    description: 'Browse roles ranked by Outmail Priority Score — surfaced by hiring urgency, funding signals, and company momentum.',
    src: 'JobOpenings.png',
    link: '/JobOpenings.png',
    color: '#6c00ff',
  },
  {
    title: 'Expert Mentorship',
    description: 'Book live sessions with professionals and alumni — real guidance from people who\'ve navigated the path you\'re on.',
    src: 'Mentorship.png',
    link: '/Mentorship.png',
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

  useEffect(() => {
    let isSnapping = false;
    const COOLDOWN = 750; // ms cooldown between snaps
    const DELTA_THRESHOLD = 15; // ignore tiny trackpad micro-movements

    const handleWheel = (e) => {
      const section = container.current;
      if (!section) return;

      // Only intercept wheel events while the stacking section spans the viewport midpoint
      const rect = section.getBoundingClientRect();
      const inZone =
        rect.top < window.innerHeight * 0.5 &&
        rect.bottom > window.innerHeight * 0.5;
      if (!inZone) return;

      // Ignore tiny trackpad drift
      if (Math.abs(e.deltaY) < DELTA_THRESHOLD) return;

      // While animating to a snap point, eat the event
      if (isSnapping) {
        e.preventDefault();
        return;
      }

      // Calculate snap points: each card occupies exactly one viewport height
      const sectionTop = window.scrollY + rect.top;
      const snapPoints = projects.map((_, i) => sectionTop + i * window.innerHeight);
      const currentScrollY = window.scrollY;

      let targetSnap;
      if (e.deltaY > 0) {
        // Scrolling down — snap to the next card
        targetSnap = snapPoints.find((p) => p > currentScrollY + 50);
        if (targetSnap === undefined) return; // past all cards, let scroll through normally
      } else {
        // Scrolling up — snap to the previous card
        const prevPoints = snapPoints.filter((p) => p < currentScrollY - 50);
        if (prevPoints.length === 0) return; // before first card, let scroll through normally
        targetSnap = prevPoints[prevPoints.length - 1];
      }

      e.preventDefault();
      isSnapping = true;
      window.scrollTo({ top: targetSnap, behavior: 'smooth' });
      setTimeout(() => {
        isSnapping = false;
      }, COOLDOWN);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
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

  // const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]); // zoom-out effect — commented out for now
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
      className="relative h-screen flex items-center justify-center sticky top-0 px-4"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * parseInt(responsive.topOffset)}px)`,
          width: responsive.cardWidth,
          height: responsive.cardHeight,
        }}
        className="relative rounded-2xl origin-top z-10 max-w-6xl overflow-hidden border border-purple-500/30"
      >
        {/* Full-bleed screenshot — static for now, zoom-out effect commented out */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            fill
            src={url}
            alt={title}
            className="object-cover object-top"
            sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 70vw"
          />
        </div>

        {/* Dark gradient overlay — strong at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10 z-10" />

        {/* Text overlay — bottom of card */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 flex items-end justify-between gap-6">
          <div className="flex-1">
            {/* Badge */}
            <span className="inline-block text-[10px] uppercase tracking-[3px] bg-[#6c00ff]/60 border border-white/20 text-white/80 px-3 py-1 rounded-full mb-3">
              {`0${i + 1}`}
            </span>
            <h2 className={`${responsive.titleSize} font-bold text-white mb-2 leading-tight`}>
              {title}
            </h2>
            <p className={`${responsive.textSize} text-white/65 leading-relaxed max-w-lg`}>
              {description}
            </p>
          </div>
          {/* Arrow CTA */}
          <div className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white text-lg flex-shrink-0 self-end">
            →
          </div>
        </div>
      </motion.div>
    </div>
  );
};
