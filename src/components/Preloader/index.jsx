'use client';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';

const fontConfigs = [
    { text: "SHOTBYPRAISE", fontFamily: "'Courier New', 'Courier', monospace", fontWeight: 400 },
    { text: "SHOTBYPRAISE", fontFamily: "'Impact', 'Arial Black', sans-serif", fontWeight: 900 },
    { text: "SHOTBYPRAISE", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive", fontWeight: 700 },
    { text: "SHOTBYPRAISE", fontFamily: "'Times New Roman', 'Times', serif", fontWeight: 300 },
    { text: "SHOTBYPRAISE", fontFamily: "'Brush Script MT', cursive", fontWeight: 400 },
    { text: "SHOTBYPRAISE", fontFamily: "'Papyrus', fantasy", fontWeight: 400 },
    { text: "SHOTBYPRAISE", fontFamily: "'Chalkduster', fantasy", fontWeight: 400 },
    { text: "SHOTBYPRAISE", fontFamily: "'American Typewriter', 'Courier New', monospace", fontWeight: 600 },
    { text: "SHOTBYPRAISE", fontFamily: "'Optima', 'Segoe UI', sans-serif", fontWeight: 800 },
    { text: "SHOTBYPRAISE", fontFamily: "'Luminari', fantasy", fontWeight: 400 },
    { text: "SHOTBYPRAISE", fontFamily: "'Marker Felt', 'Comic Sans MS', cursive", fontWeight: 400 },
    { text: "SHOTBYPRAISE", fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy", fontWeight: 400 }
]

export default function Index() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({width: 0, height:0});

    useEffect( () => {
        setDimension({width: window.innerWidth, height: window.innerHeight})
    }, [])

    useEffect( () => {
        if(index == fontConfigs.length - 1) return;
        setTimeout( () => {
            setIndex(index + 1)
        }, index == 0 ? 500 : 150)
    }, [index])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: targetPath,
            transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.2}
        }
    }

    const currentFont = fontConfigs[index];

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
            {dimension.width > 0 && 
            <>
                <motion.p 
                    variants={opacity} 
                    initial="initial" 
                    animate="enter"
                    style={{
                        fontFamily: currentFont.fontFamily,
                        fontWeight: currentFont.fontWeight
                    }}
                >
                    <span></span>{currentFont.text}
                </motion.p>
                <svg>
                    <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                </svg>
            </>
            }
        </motion.div>
    )
}
