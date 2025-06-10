'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import { useTransform, useScroll, motion } from 'framer-motion';

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
]

export default function Gallery() {
  
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({width:0, height:0});
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  
  const { height } = dimension;
  
  // Calculate transforms without conditional hook calls
  const y = useTransform(scrollYProgress, [0, 1], [
    isMobile ? -height * 0.6 : 0,
    isMobile ? height * 1.5 * 0.8 : height * 2
  ]);
  
  const y2 = useTransform(scrollYProgress, [0, 1], [
    isMobile ? -height * 0.4 : 0,
    isMobile ? height * 2.0 * 0.8 : height * 3.3
  ]);
  
  const y3 = useTransform(scrollYProgress, [0, 1], [
    isMobile ? -height * 0.6 : 0,
    isMobile ? height * 1.0 * 0.8 : height * 1.25
  ]);
  
  const y4 = useTransform(scrollYProgress, [0, 1], [
    isMobile ? -height * 0.20 : 0,
    isMobile ? height * 1.8 * 0.8 : height * 3
  ]);

  useEffect( () => {
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for smoother stop
      smooth: true,
      smoothTouch: false, // Disable smooth scrolling on touch devices to prevent conflicts
    })

    // Add a small delay to prevent jitter on scroll stop
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Optional: Add any cleanup here if needed
      }, 100);
    };

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimension({width, height})
      setIsMobile(width <= 768); // Set mobile breakpoint
    }

    // Listen for scroll events
    lenis.on('scroll', handleScroll);
    
    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      clearTimeout(scrollTimeout);
      lenis.destroy(); // Properly destroy Lenis instance
      window.removeEventListener("resize", resize);
    }
  }, [])

  // Organize images for mobile (2 columns) vs desktop (4 columns)
  const getColumnImages = () => {
    if (isMobile) {
      return [
        [images[0], images[2], images[4], images[6], images[8], images[10]], // Column 1
        [images[1], images[3], images[5], images[7], images[9], images[11]], // Column 2
      ];
    } else {
      return [
        [images[0], images[1], images[2]], // Column 1
        [images[3], images[4], images[5]], // Column 2
        [images[6], images[7], images[8]], // Column 3
        [images[9], images[10], images[11]], // Column 4
      ];
    }
  };

  const columnImages = getColumnImages();
  const transforms = isMobile ? [y, y2] : [y, y2, y3, y4];

  return (
    <main className={styles.main}>
      <div className={styles.spacer}></div>
      <div ref={gallery} className={`${styles.gallery} ${isMobile ? styles.mobile : ''}`}>
        {columnImages.map((images, index) => (
          <Column 
            key={index}
            images={images} 
            y={transforms[index]}
            columnIndex={index}
            isMobile={isMobile}
          />
        ))}
      </div>
      <div className={styles.spacer}></div>
    </main>
  )
}

const Column = ({images, y, columnIndex, isMobile}) => {
  return (
    <motion.div 
      className={`${styles.column} ${styles[`column${columnIndex + 1}`]}`}
      style={{y}}
      >
      {
        images.map( (src, i) => {
          return <div key={i} className={styles.imageContainer}>
            <Image 
              src={`/images/${src}`}
              alt='image'
              fill
            />
          </div>
        })
      }
    </motion.div>
  )
}