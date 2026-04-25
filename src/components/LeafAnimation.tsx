'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, useVelocity } from 'framer-motion';

const LEAF_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23e76f51" stroke="%23d65a3d" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;

const TREE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" fill="%232d1b11" opacity="0.6"><path d="M100 300 C90 250, 80 200, 95 150 C110 100, 80 80, 70 50 C60 20, 80 10, 90 20 C100 30, 110 60, 105 100 C110 80, 130 50, 140 30 C150 10, 170 20, 160 40 C150 60, 120 100, 110 140 C120 180, 110 250, 100 300 Z"/></svg>`;

// Helper component for scroll-based leaves
function ScrollLeaf({ leaf, smoothProgress }: { leaf: any, smoothProgress: MotionValue<number> }) {
  const scrollVelocity = useVelocity(smoothProgress);
  
  // Create a blur effect based on velocity
  const blur = useTransform(
    scrollVelocity,
    [-1, 0, 1],
    [8, 0, 8]
  );

  const yPos = useTransform(
    smoothProgress,
    [0, 1],
    [`-20vh`, `${150 * leaf.speed}vh`]
  );

  const xPos = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [`${leaf.x}vw`, `${leaf.x + leaf.sway}vw`, `${leaf.x - leaf.sway}vw`]
  );

  const rotatePos = useTransform(
    smoothProgress,
    [0, 1],
    [`${leaf.rotation}deg`, `${leaf.rotation + 360 * leaf.speed}deg`]
  );

  return (
    <motion.div
      className="absolute w-8 h-8 opacity-70 drop-shadow-md"
      style={{
        backgroundImage: `url('${LEAF_SVG}')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        x: xPos,
        y: yPos,
        rotate: rotatePos,
        scale: leaf.scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    />
  );
}

// Helper component for continuous leaves
function ContinuousLeaf({ index }: { index: number }) {
  return (
    <motion.div
      className="absolute w-6 h-6 opacity-40"
      style={{
        backgroundImage: `url('${LEAF_SVG}')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        left: `${(index * 17) % 100}vw`,
        top: `-10vh`,
      }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, (index % 2 === 0 ? 50 : -50), 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 10 + ((index * 3) % 10),
        repeat: Infinity,
        ease: "linear",
        delay: (index * 2) % 10,
      }}
    />
  );
}

export default function LeafAnimation() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  
  // Track scroll progress at the parent level
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Generate deterministic leaves to avoid hydration mismatch
  const leaves = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: (i * 13) % 100, // Pseudo-random distribution 0-100vw
    yOffset: (i * 27) % 100, // Offset
    scale: 0.5 + ((i * 7) % 10) / 10, // 0.5 to 1.4
    rotation: (i * 45) % 360,
    speed: 1 + ((i * 3) % 5), // Scroll speed multiplier
    sway: (i % 2 === 0 ? 1 : -1) * (10 + ((i * 5) % 20)), // Horizontal sway
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Abstract Autumn Tree on the right */}
      <motion.div 
        className="absolute top-0 right-[-5vw] w-[30vw] md:w-[20vw] h-[60vh] opacity-30"
        style={{ 
          backgroundImage: `url('${TREE_SVG}')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top right'
        }}
      />

      {/* Abstract Autumn Tree on the left */}
      <motion.div 
        className="absolute top-[20vh] left-[-5vw] w-[25vw] md:w-[15vw] h-[50vh] opacity-20 transform scale-x-[-1]"
        style={{ 
          backgroundImage: `url('${TREE_SVG}')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top right'
        }}
      />

      {/* Falling Leaves tied to scroll */}
      {leaves.map((leaf) => (
        <ScrollLeaf key={leaf.id} leaf={leaf} smoothProgress={smoothProgress} />
      ))}

      {/* Continuous falling leaves (not tied to scroll) */}
      {Array.from({ length: 10 }).map((_, i) => (
        <ContinuousLeaf key={`continuous-${i}`} index={i} />
      ))}
    </div>
  );
}
