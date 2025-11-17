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
          padding: '64px 24px 64px',
          display: 'flex',
          position: 'relative'
        }}
      >
        {/* Top Left Badge */}
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '-12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            borderTopRightRadius: '20px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRight: '2px solid rgba(16, 185, 129, 0.6)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 10
          }}
        >
          <svg width="18" height="18" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.81 1.294L18.446.068c2.043-.175 2.568-.057 3.852.875l5.311 3.733c.877.642 1.169.817 1.169 1.516v20.473c0 1.283-.468 2.042-2.102 2.158L7.357 29.99c-1.228.058-1.811-.117-2.454-.934l-3.91-5.074C.29 23.048 0 22.349 0 21.532V3.334c0-1.049.468-1.924 1.81-2.04z" fill="#fff"></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M18.447.068L1.808 1.294C.468 1.41 0 2.285 0 3.334v18.198c0 .817.291 1.516.992 2.45l3.911 5.074c.643.817 1.226.992 2.453.934l19.321-1.167c1.634-.116 2.102-.875 2.102-2.158V6.192c0-.663-.263-.854-1.037-1.42l-.132-.096L22.3.943c-1.285-.932-1.81-1.05-3.854-.875zM7.793 5.857c-1.577.106-1.936.13-2.831-.597L2.685 3.452c-.233-.234-.116-.526.467-.584l15.995-1.166c1.342-.117 2.043.35 2.568.758l2.744 1.983c.117.059.408.408.058.408l-16.52.992-.203.014zM5.954 26.49V9.11c0-.759.234-1.109.934-1.168l18.971-1.108c.643-.058.935.35.935 1.108v17.264c0 .759-.117 1.401-1.168 1.459l-18.154 1.05c-1.05.058-1.518-.291-1.518-1.225zm17.922-16.448c.116.525 0 1.05-.527 1.11l-.874.173v12.832c-.76.408-1.46.641-2.044.641-.934 0-1.168-.292-1.868-1.166l-5.721-8.982v8.69l1.81.409s0 1.05-1.46 1.05l-4.027.233c-.117-.234 0-.817.408-.933l1.051-.291v-11.49L9.165 12.2c-.117-.525.174-1.283.992-1.341l4.32-.292 5.954 9.1v-8.05l-1.518-.174c-.116-.643.35-1.109.934-1.167l4.029-.234z" fill="#000"></path>
          </svg>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>Notion</span>
        </div>

        {/* Top Right Badge */}
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            right: '-12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            borderTopLeftRadius: '20px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderLeft: '2px solid rgba(16, 185, 129, 0.6)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 10
          }}
        >
          <svg width="18" height="18" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1868DB" d="M7.967 21.323H5.748C2.401 21.323 0 19.273 0 16.271h11.933c.618 0 1.018.44 1.018 1.062V29.34c-2.983 0-4.984-2.416-4.984-5.784zm5.894-5.967h-2.22c-3.346 0-5.747-2.013-5.747-5.015h11.932c.618 0 1.055.402 1.055 1.025v12.007c-2.983 0-5.02-2.416-5.02-5.784zm5.93-5.93h-2.22c-3.347 0-5.748-2.05-5.748-5.052h11.933c.618 0 1.019.439 1.019 1.025v12.007c-2.983 0-4.984-2.416-4.984-5.784z"></path>
          </svg>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>Jira</span>
        </div>

        {/* Bottom Left Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '-12px',
            left: '-12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            borderBottomRightRadius: '20px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRight: '2px solid rgba(16, 185, 129, 0.6)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 10
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#5E6AD2"/>
            <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#5E6AD2"/>
          </svg>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>Linear</span>
        </div>

        {/* Bottom Right Badge - Asana */}
        <div
          style={{
            position: 'absolute',
            bottom: '-12px',
            right: '-12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            borderBottomLeftRadius: '20px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderLeft: '2px solid rgba(16, 185, 129, 0.6)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 10
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.78 12.653c-1.008 0-1.824.816-1.824 1.824s.816 1.824 1.824 1.824 1.824-.816 1.824-1.824-.816-1.824-1.824-1.824zm-13.56 0c-1.008 0-1.824.816-1.824 1.824s.816 1.824 1.824 1.824 1.824-.816 1.824-1.824-.816-1.824-1.824-1.824zm6.78 0c-1.008 0-1.824.816-1.824 1.824s.816 1.824 1.824 1.824 1.824-.816 1.824-1.824-.816-1.824-1.824-1.824z" fill="#F06A6A"/>
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.78 16.301c-1.008 0-1.824-.816-1.824-1.824s.816-1.824 1.824-1.824 1.824.816 1.824 1.824-.816 1.824-1.824 1.824zm-13.56 0c-1.008 0-1.824-.816-1.824-1.824s.816-1.824 1.824-1.824 1.824.816 1.824 1.824-.816 1.824-1.824 1.824zm6.78 0c-1.008 0-1.824-.816-1.824-1.824s.816-1.824 1.824-1.824 1.824.816 1.824 1.824-.816 1.824-1.824 1.824z" fill="#F06A6A"/>
            <circle cx="5.22" cy="12" r="1.824" fill="#F06A6A"/>
            <circle cx="12" cy="12" r="1.824" fill="#F06A6A"/>
            <circle cx="18.78" cy="12" r="1.824" fill="#F06A6A"/>
          </svg>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>Asana</span>
        </div>
        {/* Content */}
        <div className="text-center w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
            style={{ padding: '0 20px' }}
          >
            {/* Badge - Always visible */}
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full border-2 font-medium text-sm mb-4"
              style={{
                borderColor: '#d1fae5', // Light green equivalent to #e3e3fe
                backgroundColor: '#ecfdf5', // Light tint of main green (#10b981)
                color: '#166534' // Dark green text
              }}
            >
              Early Invite
            </div>

            {/* 2-line Heading - Always visible */}
            <h1
              className="mb-4"
              style={{ 
                color: '#1e293b', 
                fontFamily: 'Britti Sans, sans-serif', 
                fontSize: '44px',
                fontWeight: 500,
                lineHeight: '44px',
                textAlign: 'center'
              }}
            >
              <div style={{ display: 'block', whiteSpace: 'nowrap' }}>Get early access to</div>
              <div style={{ display: 'block', textAlign: 'center', marginLeft: '60px', whiteSpace: 'nowrap' }}>NOA Extension</div>
            </h1>

            {/* Subheading - Always visible */}
            <p
              className="mb-8"
              style={{ 
                color: '#262556', 
                lineHeight: '1.6',
                fontSize: '16px',
                textAlign: 'center'
              }}
            >
              No Spam. Only updates and early access to NOA Extension. Join thousands of creators using NOA.
            </p>

            {/* Form or Success Message */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex items-center gap-3" style={{ maxWidth: '380px', margin: '0 auto', width: '100%' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2 focus:outline-none"
                    style={{ 
                      color: '#1e293b',
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      height: '32px',
                      width: '234px',
                      marginBottom: 0,
                      paddingTop: '6px',
                      paddingBottom: '6px',
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
                    className="whitespace-nowrap disabled:opacity-50 font-semibold flex-1"
                    style={{
                      color: '#ffffff',
                      background: 'linear-gradient(180deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 1) 100%)',
                      border: 'none',
                      borderRadius: '6px',
                      height: '32px',
                      marginBottom: 0,
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      paddingLeft: '24px',
                      paddingRight: '24px',
                      fontSize: '14px',
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
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div
                  className="inline-flex items-center px-6"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.1)',
                    borderRadius: '6px',
                    height: '32px',
                    paddingTop: '6px',
                    paddingBottom: '6px'
                  }}
                >
                  <span
                    className="text-sm font-medium"
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

