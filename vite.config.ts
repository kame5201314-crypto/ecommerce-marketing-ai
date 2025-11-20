import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from 'fs'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig(() => {
  // Try to load .env file if it exists
  const envPath = path.resolve(process.cwd(), '.env')
  const envVars: Record<string, any> = {}

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8')

    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim()
        // Also set in process.env for Vite to pick up
        process.env[key] = value
        // Create define entries for import.meta.env
        envVars[`import.meta.env.${key}`] = JSON.stringify(value)
      }
    })

    console.log('📌 Loaded env vars:', Object.keys(envVars))
  }

  return {
    plugins: [react()],
    define: envVars,
  }
})
