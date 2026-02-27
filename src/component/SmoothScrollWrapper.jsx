'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export default function SmoothScrollWrapper({ children }) {
  const scrollRef = useRef(null);
  const pathname = usePathname();

  // Skip Locomotive on app routes that manage their own scroll
  const isAppRoute =
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/student') ||
    pathname?.startsWith('/auth');

  useEffect(() => {
    if (isAppRoute || !scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.08,
    });

    return () => {
      scroll.destroy();
    };
  }, [isAppRoute]);

  if (isAppRoute) {
    return <>{children}</>;
  }

  return (
    <div id="smooth-wrapper" ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
}
