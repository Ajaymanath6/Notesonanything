import { motion } from 'framer-motion'
import { useState } from 'react'

const NOALogo = ({ className = "h-8 w-8" }) => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return (
    <img src={`${baseUrl}logo.svg`} alt="NOA Logo" className={className} />
  );
};

const Upgrade = ({ onNavigate }) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      console.log('Email submitted:', email)
      // Handle submission logic here
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff' }}>
      <div className="flex-1 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          minWidth: '780px',
          minHeight: '416px',
          background: `
            radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0),
            radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.12) 0%, transparent 50%),
            linear-gradient(166deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4)),
            linear-gradient(135deg, rgba(236, 253, 245, 0.8) 0%, rgba(209, 250, 229, 0.6) 100%)
          `,
          backgroundSize: '24px 24px, auto, auto, auto, auto',
          border: '1px solid rgba(16, 185, 129, 0.1)',
          borderRadius: '20px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '780px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '64px 24px 32px',
          display: 'flex',
          position: 'relative'
        }}
      >
        {/* Content */}
        <div className="text-center w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {!isSubmitted ? (
              <>
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full border-2 border-green-500 text-green-700 font-medium text-sm mb-4">
                  Early Invite
                </div>

                {/* 2-line Heading */}
                <h1
                  className="font-bold mb-4"
                  style={{ 
                    color: '#1e293b', 
                    fontFamily: 'Lato, sans-serif', 
                    lineHeight: '1.2',
                    fontSize: '44px'
                  }}
                >
                  <div>Get Early Access</div>
                  <div>to NOA Extension</div>
                </h1>

                {/* 2-line Subheading */}
                <p
                  className="mb-8"
                  style={{ 
                    color: '#64748b', 
                    lineHeight: '1.6',
                    fontSize: '16px'
                  }}
                >
                  <div>Be among the first to pin comments directly on live websites</div>
                  <div>and transform vague conversations into crystal-clear action.</div>
                </p>

                {/* Email Input and Submit Button - Side by Side */}
                <form onSubmit={handleSubmit} className="flex items-center gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 focus:outline-none"
                    style={{ 
                      color: '#1e293b',
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      height: '48px',
                      marginBottom: 0,
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '20px',
                      transition: 'color .2s, box-shadow .2s',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                    placeholder="Email address..."
                    required
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="whitespace-nowrap disabled:opacity-50 font-semibold"
                    style={{
                      color: '#ffffff',
                      background: 'linear-gradient(180deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 1) 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      height: '48px',
                      marginBottom: 0,
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      paddingLeft: '24px',
                      paddingRight: '24px',
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: '20px',
                      transition: 'all .2s',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.2) inset',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = 'linear-gradient(180deg, rgba(20, 200, 140, 1) 0%, rgba(5, 150, 105, 1) 100%)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15) inset, 0 1px 0 rgba(255, 255, 255, 0.3) inset'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = 'linear-gradient(180deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 1) 100%)'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.2) inset'
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <span>Join Waitlist</span>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div
                  className="inline-flex items-center px-6 py-4 rounded-2xl"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <span
                    className="text-base font-medium"
                    style={{ color: '#1e293b' }}
                  >
                    Thanks Legend! Welcome to our Waitlist! 🍈
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Logo */}
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center space-x-3">
                <NOALogo className="h-8 w-8" />
                <div className="text-lg font-bold text-gray-900">NOA</div>
              </div>
              <p className="text-sm text-gray-600">
                Contextual notes for digital collaboration
              </p>
            </div>
            
            {/* Links */}
            <div className="flex items-center space-x-8 text-sm">
              <button
                onClick={() => onNavigate?.('privacy-policy')}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate?.('terms-of-service')}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Upgrade

