import React from 'react'
import Content from './Content';
import styles from './FooterSticky.module.scss';

export default function FooterSticky() {
  return (
    <div 
        className={styles.footerContainer}
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
        <div className={styles.footerWrapper}>
            <div className={styles.footerSticky}>
              <Content />
            </div>
        </div>
    </div>
  )
} 