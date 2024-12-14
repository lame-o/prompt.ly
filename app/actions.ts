'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function improvePrompt(input: string) {
  if (!input.trim()) {
    throw new Error('Please provide a prompt to improve')
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert at crafting effective prompts for AI language models. Your task is to take the user's input and transform it into a clear, specific, and effective prompt that will generate better responses from AI models.

Follow these guidelines when improving the prompt:
1. Make it specific and detailed
2. Add relevant context and constraints
3. Break down complex requests into clear steps
4. Use clear and precise language
5. Include any necessary parameters or preferences
6. Maintain the original intent and core idea
7. Format the output in a way that's easy for AI to process

Respond ONLY with the improved prompt. Do not include any explanations or additional text.`
        },
        {
          role: "user",
          content: input
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    return completion.choices[0]?.message?.content || 'Failed to generate an improved prompt'
  } catch (error) {
    console.error('Error improving prompt:', error)
    throw new Error('Failed to improve the prompt. Please try again.')
  }
}
