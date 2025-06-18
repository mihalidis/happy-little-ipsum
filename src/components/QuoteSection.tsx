import { useState } from 'react'
import styles from '../styles/QuoteSection.module.css'
import QuoteCard from './QuoteCard'
import { quoteService } from '../services/quoteService'
import type { Quote } from '../services/quoteService'

export default function QuoteSection() {
  const [showQuotes, setShowQuotes] = useState(false)
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (!showQuotes) {
      setShowQuotes(true)
    }
    
    setIsLoading(true)
    try {
      const quote = await quoteService.getRandomQuote()
      setCurrentQuote(quote)
    } catch (error) {
      console.error('Error fetching quote:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.quoteContainer}>
      {
        showQuotes && currentQuote ? <div className={styles.quoteCardContainer}>
          <QuoteCard quote={currentQuote} />
        </div> : null
      }
      <button 
        onClick={handleClick} 
        className={`${styles.mainButton} ${showQuotes ? styles.slideDown : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : (showQuotes ? 'Another happy little quote' : 'Make it a happy accident')}
      </button>
    </div>
  )
} 