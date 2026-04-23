import { ref } from 'vue'
import Groq from 'groq-sdk'
import { useCryptoStore } from '@/entities/cryptoCard/model/CryptoCard.store'
import { fetchKlines } from '@/shared/api/binance'

export function useAiAnalysis() {
  const analysisText = ref('')
  const isAnalyzing = ref(false)
  const error = ref<string | null>(null)

  async function analyze() {
    const { prices, activeSymbols } = useCryptoStore()
    isAnalyzing.value = true
    analysisText.value = ''
    error.value = null

    const apiKey = import.meta.env.VITE_GROQ_API_KEY?.trim()
    if (!apiKey) {
      error.value = 'Не настроен VITE_GROQ_API_KEY для production сборки.'
      isAnalyzing.value = false
      return
    }

    const client = new Groq({
      apiKey,
      dangerouslyAllowBrowser: true,
    })

    try {
      // Собираем данные по всем активным символам
      const assets = await Promise.all(
        activeSymbols.value.map(async (symbol) => {
          const klines = await fetchKlines(symbol)
          return {
            symbol,
            price: prices.value[symbol]?.price ?? 0,
            change24h: prices.value[symbol]?.change24h ?? 0,
            klines,
          }
        }),
      )

      // Строим промпт
      const prompt = assets
        .map(
          (a) => `
**${a.symbol}**
- Цена сейчас: $${a.price.toLocaleString()}
- Изменение за 24ч: ${a.change24h > 0 ? '+' : ''}${a.change24h.toFixed(2)}%
- Закрытия за 7 дней (старое → новое): ${a.klines.map((p) => '$' + p.toLocaleString()).join(' → ')}
      `,
        )
        .join('\n')

      // Стриминг ответа
      const stream = await client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        stream: true,
        messages: [
          {
            role: 'system',
            content: `Ты — криптовалютный аналитик. Отвечай на русском языке, кратко и структурированно.
Используй только переданные данные. Не выдумывай цифры.
Это технический анализ тренда, не финансовый совет.`,
          },
          {
            role: 'user',
            content: `Проанализируй мои активы и дай:
1. Тренд по каждому активу (2-3 предложения)
2. Общее настроение портфеля
3. На что обратить внимание

${prompt}`,
          },
        ],
      })

      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? ''
        analysisText.value += text
      }
    } catch (e) {
      error.value = 'Не удалось получить анализ. Проверь API ключ.'
      console.error(e)
    } finally {
      isAnalyzing.value = false
    }
  }

  return { analysisText, isAnalyzing, error, analyze }
}
