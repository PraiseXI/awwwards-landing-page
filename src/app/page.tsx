"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import Landing from "../components/Landing";
import Description from "../components/Description";
import SlidingImages from "../components/SlidingImages";
import Contact from "../components/Contact";
import Project from "../components/project";
import Gallery from "../components/gallery/page";
import Lenis from "lenis";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const projects = [
    {
      title1: "The Alchemist",
      title2: "NYE",
      src: "jomor_design.jpeg",
    },
    {
      title1: "Paradise",
      title2: "Orchids",
      src: "la_grange.jpeg",
    },
    {
      title1: "Arc'teryx",
      title2: "Chalk it Up",
      src: "deux_huit_huit.jpeg",
    },
    {
      title1: "The Alchemist",
      title2: "Patron XO",
      src: "nothing_design_studio.png",
    },
    {
      title1: "HUKD GOLF",
      title2: "Out of Home",
      src: "mambo_mambo.jpeg",
    },
  ];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true, // Enable smooth scrolling on touch devices
      syncTouchLerp: 0.075, // Smooth touch lerp for mobile
      touchInertiaMultiplier: 35, // Touch inertia strength
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 600);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Gallery />
      {/* <Description /> */}
      <div className={styles.gallery}>
        <p style={{ color: "white", fontSize: "2rem" }}>Featured Work</p>
        {projects.map((project, index) => {
          return <Project key={index} project={project} />;
        })}
      </div>
      {/* <SlidingImages />
      <Contact /> */}
    </main>
  );
}
