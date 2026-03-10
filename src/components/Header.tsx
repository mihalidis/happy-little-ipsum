import styles from '../styles/Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.badge}>Bob Ross Lorem Ipsum</div>
      <h1 className={styles.title}>Happy Little Ipsum</h1>
      <p className={styles.subtitle}>
        Swap boring placeholder text with the wisdom of Bob Ross.
        Generate paragraphs or quotes — then copy and use freely.
      </p>
    </header>
  )
}
