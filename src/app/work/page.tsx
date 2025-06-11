"use client"

import styles from './page.module.scss'
import { projects } from '../../data';
import Card from '../../components/Card';
import { useScroll } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Lenis from '@studio-freight/lenis'

export default function WorkPage() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container
  })

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <main ref={container} className={styles.main}>
      {
        projects.map( (project, i) => {
          const targetScale = 1 - ( (projects.length - i) * 0.05);
          const rangeStep = 1 / projects.length; // Dynamic range based on number of projects
          return <Card key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * rangeStep, 1]} targetScale={targetScale}/>
        })
      }
    </main>
  );
}