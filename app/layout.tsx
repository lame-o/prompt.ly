import './globals.css'

export const metadata = {
  title: 'Prompt Polisher',
  description: 'Transform your ideas into dazzling AI-ready prompts!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        {children}
      </body>
    </html>
  )
}
