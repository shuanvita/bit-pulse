import { ref } from 'vue'
import Groq from 'groq-sdk'
import { fetchKlines } from '@/shared/api/binance'

export type ForecastResult = {
  direction: 'up' | 'down'
  confidence: 'low' | 'medium' | 'high'
  summary: string
}

export function useForecast(symbol: string) {
  const forecast = ref<ForecastResult | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isOpen = ref(false)

  async function getForecast(price: number, change24h: number) {
    if (forecast.value) {
      isOpen.value = true
      return
    } // кешируем

    isLoading.value = true
    isOpen.value = true
    error.value = null

    const apiKey = import.meta.env.VITE_GROQ_API_KEY?.trim()
    if (!apiKey) {
      error.value = 'Не настроен VITE_GROQ_API_KEY для production сборки.'
      isLoading.value = false
      return
    }

    const client = new Groq({
      apiKey,
      dangerouslyAllowBrowser: true,
    })

    try {
      const klines = await fetchKlines(symbol, 14) // 14 дней для лучшего анализа

      const stream = await client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 300,
        stream: true,
        messages: [
          {
            role: 'system',
            content: `Ты — криптовалютный аналитик. Отвечай СТРОГО в формате JSON без markdown:
{
  "direction": "up" или "down",
  "confidence": "low" или "medium" или "high",
  "summary": "2-3 предложения на русском языке"
}
Используй только переданные данные. Не выдумывай.`,
          },
          {
            role: 'user',
            content: `Дай краткосрочный прогноз (1-3 дня) для ${symbol}:
- Текущая цена: $${price.toLocaleString()}
- Изменение за 24ч: ${Number(change24h) > 0 ? '+' : ''}${Number(change24h).toFixed(2)}%
- Закрытия за 14 дней (старое → новое): ${klines.map((p) => '$' + p.toLocaleString()).join(' → ')}`,
          },
        ],
      })

      let raw = ''
      for await (const chunk of stream) {
        raw += chunk.choices[0]?.delta?.content ?? ''
      }

      // Парсим JSON из ответа
      const jsonMatch = raw.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('Invalid response format')
      forecast.value = JSON.parse(jsonMatch[0]) as ForecastResult
    } catch (e: any) {
      console.error('[forecast] error:', e?.message, e?.status, e)
      error.value = `Ошибка: ${e?.message ?? 'неизвестно'}`
    } finally {
      isLoading.value = false
    }
  }

  function close() {
    isOpen.value = false
  }

  return { forecast, isLoading, error, isOpen, getForecast, close }
}
