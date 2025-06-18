import quotesData from '../data/quotes.json'

export interface Quote {
  id: number
  text: string
  author: string
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const quoteService = {
  async getRandomQuote(): Promise<Quote> {
    await delay(300)
    
    const randomIndex = Math.floor(Math.random() * quotesData.quotes.length)
    return quotesData.quotes[randomIndex]
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