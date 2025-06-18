import styles from '../styles/Header.module.css'


export default function MainContent() {
  return (
    <div className={styles.mainContent}>
      <h1 className={styles.mainTitle}>Happy Little Ipsum</h1>
      <p className={styles.mainSubtitle}>A site full of calm, colors, and Bob Ross wisdom.</p>
    </div>
  )
} 