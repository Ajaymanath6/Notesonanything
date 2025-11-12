import { useState } from 'react'
import Sidebar from '../components/Sidebar'

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
    <div className="min-h-screen flex" style={{ backgroundColor: '#f8fafc' }}>
        <Sidebar
          currentView="coming-soon"
          onSelectView={(view) => {
            if (view === 'home' || view === 'folders') {
              onNavigate('dashboard')
            }
          }}
          onAddFolder={null}
          recentNotes={[]}
          selectedRecentNote={null}
          onSelectRecentNote={null}
          onNavigate={onNavigate}
        />
        
        <div 
          className="flex-1 flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(226, 232, 240, 0.3) 20px, rgba(226, 232, 240, 0.3) 21px),
              repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(226, 232, 240, 0.3) 20px, rgba(226, 232, 240, 0.3) 21px)
            `,
            backgroundColor: '#f8fafc',
            position: 'relative'
          }}
        >
          {/* Candy-style gradient background overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.3) 0%, rgba(22, 163, 74, 0.3) 30%, rgba(249, 115, 22, 0.3) 30%, rgba(249, 115, 22, 0.3) 60%, rgba(139, 92, 246, 0.3) 60%, rgba(59, 130, 246, 0.3) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
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
            {/* COMING SOON Text with most rounded font */}
            <h1
              className="text-8xl md:text-9xl font-bold mb-12"
              style={{
                fontFamily: "'Baloo 2', sans-serif",
                color: '#94a3b8',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                letterSpacing: '0.05em',
                fontWeight: 700
              }}
            >
              COMING SOON
            </h1>

            {/* Email Form Card - styled like share menu with CandyButton border */}
            <div
              className="w-full max-w-md bg-white rounded-lg shadow-xl"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.2) inset'
              }}
            >
              <div className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 
                    className="text-sm font-semibold" 
                    style={{ 
                      color: '#1e293b',
                      fontFamily: "'Baloo 2', sans-serif",
                      fontWeight: 600
                    }}
                  >
                    Get notified
                  </h3>
                </div>

                {/* Email Input Section */}
                <div className="space-y-2">
                  <p 
                    className="text-sm" 
                    style={{ 
                      color: '#64748b',
                      fontFamily: "'Baloo 2', sans-serif",
                      fontWeight: 400
                    }}
                  >
                    Want to learn how to add 3D to your websites?
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Add your email to get notified"
                        required
                        className="flex-1 px-3 py-2 text-xs rounded-lg border focus:outline-none transition-colors"
                        style={{
                          borderColor: '#e2e8f0',
                          color: '#1e293b',
                          backgroundColor: '#ffffff'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#cbd5e1'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-medium rounded-lg transition-colors"
                        style={{
                          backgroundColor: '#1e293b',
                          color: '#ffffff'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#1e293b'}
                      >
                        Notify
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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

