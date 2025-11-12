import { useState } from 'react'

const ComingSoon = ({ onNavigate, onLogout }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle email submission here
    console.log('Email submitted:', email)
    // You can add your email collection logic here
    setEmail('')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8fafc' }}>
        {/* Back Arrow */}
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              color: '#1e293b'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#efefef'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff'
            }}
            title="Back to Dashboard"
          >
            <i className="ri-arrow-left-line text-lg"></i>
          </button>
        </div>
        
        <div 
          className="flex-1 flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundColor: '#f1f5f9',
            position: 'relative'
          }}
        >
          {/* Grid pattern in center fading away */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at center, 
                  repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(226, 232, 240, 0.4) 20px, rgba(226, 232, 240, 0.4) 21px),
                  repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(226, 232, 240, 0.4) 20px, rgba(226, 232, 240, 0.4) 21px)
                ),
                radial-gradient(ellipse 80% 80% at center, rgba(226, 232, 240, 0.3) 0%, rgba(226, 232, 240, 0.2) 30%, rgba(226, 232, 240, 0.1) 60%, transparent 100%)
              `,
              backgroundSize: '100% 100%, 100% 100%',
              backgroundPosition: 'center, center'
            }}
          />

          {/* Floating Question Mark Icons */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                fontSize: '24px',
                color: '#cbd5e1',
                opacity: 0.4,
                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                zIndex: 1
              }}
            >
              ?
            </div>
          ))}

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto px-6">
            {/* COMING SOON Text with badges */}
            <h1
              className="text-8xl md:text-9xl font-bold mb-12 text-center relative"
              style={{
                fontFamily: "'Baloo 2', sans-serif",
                color: '#475569',
                letterSpacing: '0.05em',
                fontWeight: 800,
                lineHeight: '0.9'
              }}
            >
              <div style={{ 
                textAlign: 'center', 
                position: 'relative',
                display: 'inline-block'
              }}>
                <span>COMING</span>
                {/* Badge above C in COMING */}
                <div
                  className="flex items-center justify-center flex-shrink-0 absolute"
                  style={{
                    width: '56px',
                    height: '56px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(12px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset, 0 1px 0 rgba(255, 255, 255, 0.3) inset',
                    top: '-70px',
                    left: '8%',
                    transform: 'translateX(-50%)',
                    zIndex: 10
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 256 256"
                    style={{
                      width: '56px',
                      height: '56px',
                      color: '#475569'
                    }}
                  >
                    <rect width="256" height="256" fill="none"/>
                    <path d="M160,160h40a40,40,0,0,0,0-80H160Z" opacity="0.2"/>
                    <path d="M160,80V200.67a8,8,0,0,0,3.56,6.65l11,7.33a8,8,0,0,0,12.2-4.72L200,160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                    <path d="M40,200a8,8,0,0,0,13.15,6.12C105.55,162.16,160,160,160,160h40a40,40,0,0,0,0-80H160S105.55,77.84,53.15,33.89A8,8,0,0,0,40,40Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                  </svg>
                </div>
              </div>
              <div style={{ 
                textAlign: 'center',
                position: 'relative',
                display: 'inline-block'
              }}>
                <span>SOON</span>
                {/* Badge below and right side of N in SOON */}
                <div
                  className="flex items-center justify-center flex-shrink-0 absolute"
                  style={{
                    width: '56px',
                    height: '56px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(12px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset, 0 1px 0 rgba(255, 255, 255, 0.3) inset',
                    top: '100%',
                    left: '75%',
                    transform: 'translateX(-50%)',
                    marginTop: '1px',
                    marginLeft: '40px',
                    zIndex: 10
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 256 256"
                    style={{
                      width: '56px',
                      height: '56px',
                      color: '#475569'
                    }}
                  >
                    <rect width="256" height="256" fill="none"/>
                    <path d="M160,160h40a40,40,0,0,0,0-80H160Z" opacity="0.2"/>
                    <path d="M160,80V200.67a8,8,0,0,0,3.56,6.65l11,7.33a8,8,0,0,0,12.2-4.72L200,160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                    <path d="M40,200a8,8,0,0,0,13.15,6.12C105.55,162.16,160,160,160,160h40a40,40,0,0,0,0-80H160S105.55,77.84,53.15,33.89A8,8,0,0,0,40,40Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                  </svg>
                </div>
              </div>
            </h1>
          </div>
        </div>

        {/* CSS Animation for Floating Icons */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>
      </div>
  )
}

export default ComingSoon

