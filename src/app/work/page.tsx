"use client"

import styles from './page.module.scss'
import { projects } from '../../data';
import { PaginatedCards } from '../../components/Card';
import { useRef, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis'

export default function WorkPage() {
  const container = useRef(null);
  const [lenis, setLenis] = useState(null);

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
      // Since we're now using pagination, we need to adjust the scroll behavior
      // to work with the current visible cards
      const targetScrollPosition = cardIndex * window.innerHeight;
      
      const currentScroll = window.scrollY;
      const threshold = 50;
      
      if (Math.abs(currentScroll - targetScrollPosition) > threshold) {
        lenis.scrollTo(targetScrollPosition, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    }
  };

  const handleCollapseClick = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main ref={container} className={styles.main}>
      <PaginatedCards 
        projects={projects}
        onCardClick={handleCardClick}
      />
      
      <button 
        className={styles.collapseButton}
        onClick={handleCollapseClick}
        aria-label="Collapse to top"
        title="Go back to top"
      >
        ↑ Collapse
      </button>
    </main>
  );
}