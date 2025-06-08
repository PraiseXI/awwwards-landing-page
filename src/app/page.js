"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import Landing from "../components/Landing";
import Description from "../components/Description";
import SlidingImages from "../components/SlidingImages";
import Contact from "../components/Contact";
import Project from '../components/project';

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
      title1: "Mambo",
      title2: "Mambo",
      src: "mambo_mambo.jpeg",
    },
  ];

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 1000);
    })();
  }, []);

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <div className={styles.gallery}>
        <p>Featured Work</p>
          {
            projects.map( (project, index) => {
              return <Project key={index} project={project}/>
            })
          }
      </div>
      <SlidingImages />
      <Contact />
    </main>
  );
}
