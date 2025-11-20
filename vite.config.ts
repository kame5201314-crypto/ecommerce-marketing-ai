import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  // Debug: Print environment variables during build
  console.log('🔍 Build Environment:', mode)
  console.log('📌 VITE_OPENAI_API_KEY from env:', env.VITE_OPENAI_API_KEY ? `${env.VITE_OPENAI_API_KEY.substring(0, 20)}...` : 'undefined')
  console.log('📌 VITE_OPENAI_API_KEY from process.env:', process.env.VITE_OPENAI_API_KEY ? `${process.env.VITE_OPENAI_API_KEY.substring(0, 20)}...` : 'undefined')
  console.log('📌 VITE_AI_MODEL:', env.VITE_AI_MODEL || process.env.VITE_AI_MODEL || 'not set')

  const apiKey = env.VITE_OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || ''
  const aiModel = env.VITE_AI_MODEL || process.env.VITE_AI_MODEL || 'gpt-3.5-turbo'

  console.log('✅ Using API Key:', apiKey ? `${apiKey.substring(0, 20)}...` : 'NONE')
  console.log('✅ Using AI Model:', aiModel)

  return {
    plugins: [react()],
    define: {
      // Explicitly define environment variables for Vercel builds
      'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(apiKey),
      'import.meta.env.VITE_AI_MODEL': JSON.stringify(aiModel),
      'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(env.VITE_OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY || ''),
    },
  }
})
