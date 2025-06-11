"use client"

import styles from './page.module.scss'
import { projects } from '../../data';
import Card from '../../components/Card';
import { useScroll } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis'

export default function WorkPage() {
  const container = useRef(null);
  const [lenis, setLenis] = useState(null);
  const { scrollYProgress } = useScroll({
    target: container
  })

  useEffect( () => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisInstance.destroy();
    }
  }, [])

  const handleCardClick = (cardIndex) => {
    if (lenis) {
      // Since each card container is 100vh and sticky, we need to scroll to the 
      // beginning of the target card's container to make it the topmost
      const targetScrollPosition = cardIndex * window.innerHeight;
      
      // Ensure we don't scroll if we're already at the target position
      const currentScroll = window.scrollY;
      const threshold = 50; // Allow small differences
      
      if (Math.abs(currentScroll - targetScrollPosition) > threshold) {
        lenis.scrollTo(targetScrollPosition, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    }
  };

  return (
    <main ref={container} className={styles.main}>
      {
        projects.map( (project, i) => {
          const targetScale = 1 - ( (projects.length - i) * 0.05);
          const rangeStep = 1 / projects.length; // Dynamic range based on number of projects
          return <Card 
            key={`p_${i}`} 
            i={i} 
            {...project} 
            progress={scrollYProgress} 
            range={[i * rangeStep, 1]} 
            targetScale={targetScale}
            onCardClick={handleCardClick}
          />
        })
      }
    </main>
  );
}