import React from 'react'
import styles from './style.module.scss'

export default function Content() {
  return (
    <div className={styles.content}>
      <div className={styles.body}>
        <div className={styles.section}>
          <div className={styles.nav}>
            <h3>Navigation</h3>
            <div className={styles.links}>
              <a href="/">Home</a>
              <a href="/work">Work</a>
              <a href="/portfolio">Portfolio</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
          
          <div className={styles.nav}>
            <h3>Services</h3>
            <div className={styles.links}>
              <a href="#">Photography</a>
              <a href="#">Direction</a>
              <a href="#">Creative Consulting</a>
              <a href="#">Brand Imagery</a>
            </div>
          </div>
          
          <div className={styles.nav}>
            <h3>Connect</h3>
            <div className={styles.links}>
              <a href="#" target="_blank">Instagram</a>
              <a href="#" target="_blank">LinkedIn</a>
              <a href="#" target="_blank">Behance</a>
              <a href="mailto:hello@praise.com">Email</a>
            </div>
          </div>
        </div>
        
        <div className={styles.footer}>
          <div className={styles.brand}>
            <h1>Praise</h1>
            <p>Photographer & Director</p>
          </div>
          <div className={styles.copyright}>
            <p>© 2024 Praise. All rights reserved.</p>
            <p>Crafting visual stories that inspire.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 