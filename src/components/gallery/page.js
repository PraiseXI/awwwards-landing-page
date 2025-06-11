'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss'
import Image from 'next/image';
// Lenis is handled globally in the main page
import { useTransform, useScroll, motion } from 'framer-motion';

const images = [
  "Paradise-28.jpg",
  "Paradise-29.jpg",
  "Paradise-30.jpg",
  "Paradise-31.jpg",
  "Paradise-32.jpg",
  "Paradise-33.jpg",
  "Paradise-34.jpg",
  "Paradise-35.jpg",
  "Paradise-36.jpg",
  "Paradise-37.jpg",
  "Paradise-38.jpg",
  "Paradise-39.jpg",
]

export default function Gallery() {
  
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({width:0, height:0});
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images immediately when component mounts (synchronized with preloader)
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = `/images/${src}`;
        });
      });

      try {
        await Promise.all(imagePromises);
        // Add a small delay to sync with preloader animation timing
        setTimeout(() => {
          setImagesLoaded(true);
        }, 200); // This matches the delay from anim.js opacity animation
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true); // Still show images even if some fail to preload
      }
    };

    preloadImages();
  }, []);

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
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimension({width, height})
      setIsMobile(width <= 768); // Set mobile breakpoint
    }

    window.addEventListener("resize", resize)
    resize();

    return () => {
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
            imagesLoaded={imagesLoaded}
          />
        ))}
      </div>
      <div className={styles.spacer}></div>
    </main>
  )
}

const Column = ({images, y, columnIndex, isMobile, imagesLoaded}) => {
  return (
    <motion.div 
      className={`${styles.column} ${styles[`column${columnIndex + 1}`]}`}
      style={{y}}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: imagesLoaded ? 1 : 0,
        transition: { 
          duration: 0.8, 
          ease: [0.76, 0, 0.24, 1],
          delay: 0.2 + (columnIndex * 0.1) // Stagger animation for each column
        }
      }}
      >
      {
        images.map( (src, i) => {
          return <div key={i} className={styles.imageContainer}>
            <Image 
              src={`/images/${src}`}
              alt='image'
              fill
              priority={i < 3} // Prioritize first few images in each column
            />
          </div>
        })
      }
    </motion.div>
  )
}