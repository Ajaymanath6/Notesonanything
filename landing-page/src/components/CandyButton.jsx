import { useState } from 'react'

const CandyButton = ({ onClick, title, children, className = "", style = {} }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick || (() => console.log('✨ Upgrade flow coming soon'))}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.5) 0%, rgba(22, 163, 74, 0.5) 30%, rgba(249, 115, 22, 0.5) 30%, rgba(249, 115, 22, 0.5) 60%, rgba(139, 92, 246, 0.5) 60%, rgba(59, 130, 246, 0.5) 100%)',
        color: '#ffffff',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.2) inset',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        ...style
      }}
      onMouseEnter={(e) => {
        setIsHovered(true)
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(22, 163, 74, 0.7) 0%, rgba(22, 163, 74, 0.7) 30%, rgba(249, 115, 22, 0.7) 30%, rgba(249, 115, 22, 0.7) 60%, rgba(139, 92, 246, 0.7) 60%, rgba(59, 130, 246, 0.7) 100%)'
        e.currentTarget.style.transform = 'scale(1.03) translateY(-1px)'
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4), 0 0 30px rgba(255, 255, 255, 0.4) inset, 0 2px 0 rgba(255, 255, 255, 0.3) inset'
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
      }}
      onMouseLeave={(e) => {
        setIsHovered(false)
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(22, 163, 74, 0.5) 0%, rgba(22, 163, 74, 0.5) 30%, rgba(249, 115, 22, 0.5) 30%, rgba(249, 115, 22, 0.5) 60%, rgba(139, 92, 246, 0.5) 60%, rgba(59, 130, 246, 0.5) 100%)'
        e.currentTarget.style.transform = 'scale(1) translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.2) inset'
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
      }}
      title={title}
    >
      {/* Sugar-coated glossy top layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
          borderRadius: '12px 12px 50% 50%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      
      {/* Shimmer effect - sugar coating shine */}
      <div
        data-shine
        style={{
          position: 'absolute',
          top: 0,
          left: isHovered ? '100%' : '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
          transition: isHovered ? 'left 0.6s ease' : 'none',
          pointerEvents: 'none',
          zIndex: 2,
          transform: 'skewX(-20deg)'
        }}
      />
      
      {/* Sparkle dots for candy effect */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.6)',
          boxShadow: `
            30px 10px 0 0 rgba(255, 255, 255, 0.4),
            60px 20px 0 0 rgba(255, 255, 255, 0.5),
            90px 5px 0 0 rgba(255, 255, 255, 0.3)
          `,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      
      <span style={{ position: 'relative', zIndex: 3, fontWeight: 600 }}>{children}</span>
    </button>
  )
}

export default CandyButton

