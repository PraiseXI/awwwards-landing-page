'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function Index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);

    useEffect( () => {
      setIsActive(false)
    }, [pathname])

    useLayoutEffect( () => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => {gsap.to(button.current, {scale: 1, duration: 0.25, ease: "power1.out"})},
                onEnterBack: () => {gsap.to(button.current, {scale: 0, duration: 0.25, ease: "power1.out"},setIsActive(false))}
            }
        })
    }, [])

    const handleBackdropClick = () => {
        setIsActive(false);
    };

    return (
        <>
        <div ref={header} className={styles.header}>
            <div className={styles.logo}>
                <p className={styles.copyright}>©</p>
                <div className={styles.name}>
                    <p className={styles.shotby}>ShotbyPraise</p>
                    <p className={styles.year}>2025</p>
                </div>
            </div>
            <div className={styles.nav}>
                <Magnetic>
                    <div className={styles.el}>
                        <a href="/work">Work</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el}>
                        <a>About</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el}>
                        <a>Contact</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
            </div>
        </div>
        <div ref={button} className={styles.headerButtonContainer}>
            <Rounded onClick={() => {setIsActive(!isActive)}} className={`${styles.button}`}>
                <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
            </Rounded>
        </div>
        <AnimatePresence mode="wait">
            {isActive && (
                <>
                    <div className={styles.backdrop} onClick={handleBackdropClick} />
                    <Nav />
                </>
            )}
        </AnimatePresence>
        </>
    )
}
