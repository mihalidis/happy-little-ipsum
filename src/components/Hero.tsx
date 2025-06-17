import styles from './Hero.module.css'

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroTitle}>Happy Little Ipsum</h1>
      <p className={styles.heroSubtitle}>A site full of calm, colors, and Bob Ross wisdom.</p>
    </div>
  )
}