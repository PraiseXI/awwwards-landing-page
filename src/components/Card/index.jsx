'use client'
import Image from 'next/image';
import styles from './style.module.scss';
import { useTransform, motion, useScroll, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const Card = ({i, title, description, src, link, color, progress, range, targetScale, onCardClick}) => {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale]);

  const handleCardClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCardClick) {
      onCardClick(i);
    }
  };

  return (
    <div 
      ref={container} 
      id={`card-${i}`}
      className={styles.cardContainer}
    >
      <motion.div 
        style={{
          backgroundColor: color, 
          scale, 
          top:`calc(-5vh + ${i * 85}px)`,
          zIndex: 100 - i
        }} 
        className={styles.card}
        onClick={handleCardClick}
        data-card-index={i}
        role="button"
        tabIndex={0}
      >
        <h2>{title}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
            <span>
              <a href={link} target="_blank" onClick={(e) => e.stopPropagation()}>See more</a>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="black"/>
              </svg>
            </span>
          </div>

          <div className={styles.imageContainer}>
            <motion.div
              className={styles.inner}
              style={{scale: imageScale}}
            >
              <Image
                fill
                src={`/images/${src}`}
                alt="image" 
              />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

// New Paginated Cards Container Component
export const PaginatedCards = ({ projects, onCardClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardsPerPage = 5;
  const totalPages = Math.ceil(projects.length / cardsPerPage);
  
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container
  });

  const getCurrentPageProjects = () => {
    const startIndex = currentPage * cardsPerPage;
    return projects.slice(startIndex, startIndex + cardsPerPage);
  };

  const handleLoadMore = async () => {
    if (currentPage < totalPages - 1 && !isTransitioning) {
      setIsTransitioning(true);
      
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleLoadPrevious = async () => {
    if (currentPage > 0 && !isTransitioning) {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const currentProjects = getCurrentPageProjects();

  return (
    <div ref={container} className={styles.paginatedContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className={styles.cardsGroup}
        >
          {currentProjects.map((project, i) => {
            const actualIndex = currentPage * cardsPerPage + i;
            const targetScale = 1 - (i * 0.05);
            const rangeStep = 1 / currentProjects.length;
            
            return (
              <Card 
                key={`p_${actualIndex}_${currentPage}`}
                i={i} 
                {...project} 
                progress={scrollYProgress} 
                range={[i * rangeStep, 1]} 
                targetScale={targetScale}
                onCardClick={onCardClick}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
      
      <div className={styles.paginationControls}>
        <div className={styles.pageInfo}>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <span className={styles.projectCount}>
            Showing {currentProjects.length} of {projects.length} projects
          </span>
        </div>
        
        <div className={styles.buttonGroup}>
          {currentPage > 0 && (
            <motion.button
              className={styles.paginationButton}
              onClick={handleLoadPrevious}
              disabled={isTransitioning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Previous
            </motion.button>
          )}
          
          {currentPage < totalPages - 1 && (
            <motion.button
              className={styles.paginationButton}
              onClick={handleLoadMore}
              disabled={isTransitioning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isTransitioning ? 'Loading...' : 'Load More →'}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card