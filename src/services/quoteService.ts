import quotesData from '../data/quotes.json'

export interface Quote {
  id: number
  text: string
  author: string
}

const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random())

export const quoteService = {
  async getRandomQuote(excludeId?: number): Promise<Quote> {
    const available = excludeId !== undefined
      ? quotesData.quotes.filter((q: Quote) => q.id !== excludeId)
      : quotesData.quotes
    if (available.length === 0) return quotesData.quotes[0]
    return available[Math.floor(Math.random() * available.length)]
  },

  async getRandomQuotes(count: number): Promise<Quote[]> {
    const shuffled = shuffle(quotesData.quotes as Quote[])
    return shuffled.slice(0, Math.min(count, shuffled.length))
  },

  async generateParagraphs(count: number): Promise<string[]> {
    // Each paragraph uses 3–5 quotes joined as flowing placeholder text
    const QUOTES_PER_PARA = 4
    const needed = count * QUOTES_PER_PARA

    // If pool is smaller than needed, repeat the pool
    const extended: Quote[] = []
    while (extended.length < needed) {
      extended.push(...shuffle(quotesData.quotes as Quote[]))
    }

    const paragraphs: string[] = []
    for (let i = 0; i < count; i++) {
      const slice = extended.slice(i * QUOTES_PER_PARA, (i + 1) * QUOTES_PER_PARA)
      paragraphs.push(slice.map(q => q.text).join(' '))
    }
    return paragraphs
  },

  async getAllQuotes(): Promise<Quote[]> {
    return quotesData.quotes as Quote[]
  },
}
