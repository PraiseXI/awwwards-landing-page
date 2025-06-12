import React from 'react'
import Content from './Content';
import styles from './style.module.scss';

export default function Footer() {
  return (
    <div 
      className={styles.footerContainer}
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className={styles.footerFixed}>
        <Content />
      </div>
    </div>
  )
} 