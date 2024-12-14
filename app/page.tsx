'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { improvePrompt } from './actions'
import { Sparkles, ArrowRight, Github } from 'lucide-react'

export default function PromptImprover() {
  const [input, setInput] = useState('')
  const [improvedPrompt, setImprovedPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await improvePrompt(input)
      setImprovedPrompt(result)
    } catch (error) {
      console.error('Error improving prompt:', error)
      setImprovedPrompt('Oops! Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl font-bold text-white">
              <Sparkles className="h-8 w-8 text-yellow-300" />
              Prompt Polisher
            </CardTitle>
            <CardDescription className="text-lg text-white/80">
              Transform your ideas into dazzling AI-ready prompts!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Type your question or idea here in conversational English..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px] bg-white/20 border-white/30 text-white placeholder:text-white/50 text-lg resize-none"
              />
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
              >
                {isLoading ? (
                  'Polishing...'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Polish My Prompt
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>

            {improvedPrompt && (
              <div className="mt-8 bg-white/30 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Your Polished Prompt:
                </h3>
                <p className="text-white/90 whitespace-pre-wrap text-lg">
                  {improvedPrompt}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <footer className="mt-4 flex justify-center">
          <a
            href="https://github.com/lame-o"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>lame-o</span>
          </a>
        </footer>
      </div>
    </main>
  )
}
