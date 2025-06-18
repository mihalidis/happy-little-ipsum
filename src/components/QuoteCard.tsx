import styles from '../styles/QuoteCard.module.css'
import type { Quote } from '../services/quoteService'

interface QuoteCardProps {
  quote: Quote
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <div className={styles.quoteCard}>
      <p className={styles.quoteText}>"{quote.text}"</p>
      <p className={styles.quoteAuthor}>— {quote.author}</p>
    </div>
  )
}