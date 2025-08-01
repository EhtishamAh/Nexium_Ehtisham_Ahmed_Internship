// In components/footer.tsx
import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t py-4">
      <div className="container mx-auto flex items-center justify-center gap-4 px-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Made by Ehtisham Ahmed
        </p>
        <a
          href="https://github.com/EhtishamAh/Nexium_Ehtisham_Ahmed_Internship" // <-- REPLACE WITH YOUR GITHUB URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </a>
      </div>
    </footer>
  )
}