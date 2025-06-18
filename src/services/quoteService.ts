import quotesData from '../data/quotes.json'

export interface Quote {
  id: number
  text: string
  author: string
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const quoteService = {
  async getRandomQuote(excludeId?: number): Promise<Quote> {
    await delay(300)
    const availableQuotes = excludeId !== undefined
      ? quotesData.quotes.filter((q: Quote) => q.id !== excludeId)
      : quotesData.quotes;
    // Eğer sadece bir quote kaldıysa, onu döndür
    if (availableQuotes.length === 0) {
      return quotesData.quotes[0];
    }
    const randomIndex = Math.floor(Math.random() * availableQuotes.length)
    return availableQuotes[randomIndex]
  },

  async getRandomQuotes(count: number): Promise<Quote[]> {
    await delay(300)
    
    const shuffled = [...quotesData.quotes].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  },

  async getAllQuotes(): Promise<Quote[]> {
    await delay(200)
    return quotesData.quotes
  }
} 