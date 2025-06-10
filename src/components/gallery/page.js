'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss'
import Image from 'next/image';
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

  useEffect(() => {
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
    <div ref={gallery} className={styles.gallery}>
      <div className={styles.galleryWrapper}>
        {columnImages.map((column, index) => {
          return <div key={index} className={styles.column}>
            {column.map((src, i) => {
              return <div key={i} className={styles.imageContainer}>
                <Image 
                  src={`/images/${src}`}
                  alt="image"
                  fill={true}
                />
              </div>
            })}
          </div>
        })}
      </div>
    </div>
  )
}