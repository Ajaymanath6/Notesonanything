import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onAuthSuccess?.()
    }, 1500)
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    
    // Simulate Google OAuth
    setTimeout(() => {
      setIsLoading(false)
      onAuthSuccess?.()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8fafc' }}>
      {/* Centered Auth Form */}
      <div className="w-full max-w-md mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8"
          style={{ 
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <img 
              src={`${import.meta.env.BASE_URL || '/'}logo.svg`}
              alt="NOA Logo" 
              className="w-10 h-10"
            />
            <span
              className="text-xl font-bold"
              style={{ color: '#000000' }}
            >
              NOA
            </span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1f2937' }}>
              {isLogin ? 'Welcome back' : 'Get started'}
            </h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>
              {isLogin 
                ? 'Sign in to your account to continue' 
                : 'Create your account to start organizing your thoughts'
              }
            </p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 border rounded-lg mb-6 transition-all duration-200 hover:bg-gray-50"
            style={{ 
              borderColor: '#e5e7eb',
              backgroundColor: 'white',
              color: '#374151'
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium">
              {isLoading ? 'Connecting...' : `Continue with Google`}
            </span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: '#e5e7eb' }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span 
                className="px-4 bg-white"
                style={{ color: '#6b7280' }}
              >
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#374151' }}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                    style={{ color: '#9ca3af' }}
                  />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none transition-all duration-200"
                    style={{ 
                      border: '1px solid #e5e7eb',
                      backgroundColor: 'white',
                      color: '#1f2937'
                    }}
                    onFocus={(e) => e.target.style.border = '1px solid #372804'}
                    onBlur={(e) => e.target.style.border = '1px solid #e5e7eb'}
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#374151' }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                  style={{ color: '#9ca3af' }}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none transition-all duration-200"
                  style={{ 
                    border: '1px solid #e5e7eb',
                    backgroundColor: 'white',
                    color: '#1f2937'
                  }}
                  onFocus={(e) => e.target.style.border = '1px solid #372804'}
                  onBlur={(e) => e.target.style.border = '1px solid #e5e7eb'}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#374151' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                  style={{ color: '#9ca3af' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none transition-all duration-200"
                  style={{ 
                    border: '1px solid #e5e7eb',
                    backgroundColor: 'white',
                    color: '#1f2937'
                  }}
                  onFocus={(e) => e.target.style.border = '1px solid #372804'}
                  onBlur={(e) => e.target.style.border = '1px solid #e5e7eb'}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" style={{ color: '#9ca3af' }} />
                  ) : (
                    <Eye className="h-5 w-5" style={{ color: '#9ca3af' }} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50"
              style={{
                backgroundColor: '#000000',
                color: '#ffffff'
              }}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm hover:underline transition-colors duration-200"
              style={{ color: '#6b7280' }}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: '#9ca3af' }}>
              By continuing, you agree to our{' '}
              <a href="#" className="hover:underline" style={{ color: '#000000' }}>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="hover:underline" style={{ color: '#000000' }}>
                Privacy Policy
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Auth
