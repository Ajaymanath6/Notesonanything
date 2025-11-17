const CandyButton = ({ onClick, title, children, className = "", style = {} }) => {
  return (
    <button
      onClick={onClick || (() => console.log('✨ Upgrade flow coming soon'))}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.5) 0%, rgba(22, 163, 74, 0.5) 30%, rgba(249, 115, 22, 0.5) 30%, rgba(249, 115, 22, 0.5) 60%, rgba(139, 92, 246, 0.5) 60%, rgba(59, 130, 246, 0.5) 100%)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.2) inset',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      title={title}
    >
      <span 
        style={{ 
          position: 'relative', 
          zIndex: 3, 
          fontWeight: 600,
          background: 'linear-gradient(135deg, #166534 0%, #166534 30%, #c2410c 30%, #c2410c 60%, #6d28d9 60%, #1e40af 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          textShadow: 'none'
        }}
      >
        {children}
      </span>
    </button>
  )
}

export default CandyButton

