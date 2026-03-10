import { useState } from 'react'
import styles from '../styles/QuoteCard.module.css'

interface QuoteCardProps {
  text: string
  mode: 'paragraphs' | 'quotes'
}

export default function QuoteCard({ text, mode }: QuoteCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`${styles.card} ${mode === 'quotes' ? styles.quoteMode : ''}`}>
      <p className={styles.text}>{text}</p>
      <button
        className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
        onClick={handleCopy}
        aria-label="Copy to clipboard"
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )
}
