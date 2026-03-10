import { useState } from 'react'
import styles from '../styles/QuoteSection.module.css'
import QuoteCard from './QuoteCard'
import { quoteService } from '../services/quoteService'

type Mode = 'paragraphs' | 'quotes'

export default function QuoteSection() {
  const [mode, setMode] = useState<Mode>('paragraphs')
  const [count, setCount] = useState(3)
  const [blocks, setBlocks] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [copiedAll, setCopiedAll] = useState(false)

  const generate = async (modeOverride?: Mode, countOverride?: number) => {
    const activeMode = modeOverride ?? mode
    const activeCount = countOverride ?? count
    setIsLoading(true)
    try {
      if (activeMode === 'quotes') {
        const quotes = await quoteService.getRandomQuotes(activeCount)
        setBlocks(quotes.map(q => `"${q.text}" — ${q.author}`))
      } else {
        const paragraphs = await quoteService.generateParagraphs(activeCount)
        setBlocks(paragraphs)
      }
    } catch (error) {
      console.error('Error generating content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = (newMode: Mode) => {
    const clampedCount = newMode === 'paragraphs' ? Math.min(count, 8) : count
    setMode(newMode)
    if (clampedCount !== count) setCount(clampedCount)
    if (blocks.length > 0) generate(newMode, clampedCount)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(blocks.join('\n\n'))
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  const maxCount = mode === 'paragraphs' ? 8 : 20

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeBtn} ${mode === 'paragraphs' ? styles.modeActive : ''}`}
            onClick={() => switchMode('paragraphs')}
          >
            Paragraphs
          </button>
          <button
            className={`${styles.modeBtn} ${mode === 'quotes' ? styles.modeActive : ''}`}
            onClick={() => switchMode('quotes')}
          >
            Quotes
          </button>
        </div>

        <div className={styles.counter}>
          <button
            className={styles.counterBtn}
            onClick={() => setCount(c => Math.max(1, c - 1))}
            aria-label="Decrease"
          >
            −
          </button>
          <span className={styles.counterValue}>{count}</span>
          <button
            className={styles.counterBtn}
            onClick={() => setCount(c => Math.min(maxCount, c + 1))}
            aria-label="Increase"
          >
            +
          </button>
        </div>

        <button
          className={styles.generateBtn}
          onClick={() => generate()}
          disabled={isLoading}
        >
          {isLoading ? 'Painting...' : blocks.length > 0 ? 'Regenerate' : 'Generate'}
        </button>
      </div>

      {blocks.length > 0 && (
        <div className={styles.output}>
          <div className={styles.outputHeader}>
            <span className={styles.outputLabel}>
              {count} {mode === 'paragraphs' ? 'paragraph' : 'quote'}{count !== 1 ? 's' : ''}
            </span>
            <button className={styles.copyAllBtn} onClick={copyAll}>
              {copiedAll ? '✓ Copied!' : 'Copy All'}
            </button>
          </div>
          <div className={styles.blocks}>
            {blocks.map((text, i) => (
              <QuoteCard key={i} text={text} mode={mode} />
            ))}
          </div>
        </div>
      )}

      {blocks.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎨</div>
          <p>Choose your settings and hit <strong>Generate</strong> to start painting with words.</p>
        </div>
      )}
    </div>
  )
}
