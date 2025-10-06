import { LoginForm } from "@/components/auth/login-form"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">KMRL DocuMind</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Intelligent Document Management & AI Summarization Platform
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Kochi Metro Rail Limited</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
