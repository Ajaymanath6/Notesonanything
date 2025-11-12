import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const AISearch = ({ notes = [], placeholder = "Ask AI about your notes...", width = "400px" }) => {
  const [aiSearchQuery, setAiSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [aiSearchResults, setAiSearchResults] = useState(null)
  const [showAiResults, setShowAiResults] = useState(false)
  const searchRef = useRef(null)

  const handleAiSearch = async (query) => {
    if (!query.trim()) {
      setAiSearchResults(null)
      setShowAiResults(false)
      return
    }

    setIsSearching(true)
    setShowAiResults(true)

    // Simulate AI search through notes
    setTimeout(() => {
      const relevantNotes = notes.filter(note => 
        note.content?.toLowerCase().includes(query.toLowerCase()) ||
        note.author?.toLowerCase().includes(query.toLowerCase()) ||
        note.title?.toLowerCase().includes(query.toLowerCase())
      )

      const aiResponse = {
        answer: relevantNotes.length > 0 
          ? `I found ${relevantNotes.length} note${relevantNotes.length === 1 ? '' : 's'} related to "${query}". ${
              relevantNotes.length === 1 
                ? 'Here\'s what I found:' 
                : 'Here are the most relevant findings:'
            }`
          : `I couldn't find any notes directly related to "${query}". Try searching with different keywords or create a new note about this topic.`,
        relatedNotes: relevantNotes.slice(0, 3), // Show top 3 matches
        query: query
      }

      setAiSearchResults(aiResponse)
      setIsSearching(false)
    }, 1000)
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAiSearch(aiSearchQuery)
    }
  }

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowAiResults(false)
      }
    }

    if (showAiResults) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showAiResults])

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <i className="ri-sparkling-2-line text-lg" style={{ color: '#f97316' }}></i>
        </div>
        <input
          type="text"
          value={aiSearchQuery}
          onChange={(e) => setAiSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder={placeholder}
          className="pl-12 pr-12 py-2 rounded-xl text-sm focus:outline-none transition-all duration-200"
          style={{ 
            width: width,
            backgroundColor: '#ffffff',
            border: '2px solid #e2e8f0',
            color: '#1e293b',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#f97316'
            e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)'
            if (aiSearchResults) setShowAiResults(true)
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0'
            e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        />
        <button
          onClick={() => handleAiSearch(aiSearchQuery)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center"
          style={{ 
            backgroundColor: aiSearchQuery.trim() ? '#f97316' : '#f1f5f9',
            color: aiSearchQuery.trim() ? '#ffffff' : '#64748b'
          }}
          disabled={isSearching}
          onMouseEnter={(e) => {
            if (aiSearchQuery.trim()) {
              e.target.style.backgroundColor = '#ea580c'
            }
          }}
          onMouseLeave={(e) => {
            if (aiSearchQuery.trim()) {
              e.target.style.backgroundColor = '#f97316'
            }
          }}
        >
          {isSearching ? (
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <i className="ri-send-plane-line text-sm"></i>
          )}
        </button>
      </div>

      {/* AI Search Results */}
      {showAiResults && aiSearchResults && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 w-96 rounded-lg shadow-lg overflow-hidden z-50"
          style={{ 
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* AI Response Header */}
          <div className="px-4 py-3" style={{ backgroundColor: '#fff7ed', borderBottom: '1px solid #fed7aa' }}>
            <div className="flex items-center space-x-2">
              <i className="ri-sparkling-2-line text-lg" style={{ color: '#f97316' }}></i>
              <span className="text-sm font-medium" style={{ color: '#1e293b' }}>
                AI Assistant
              </span>
              <div className="ml-auto">
                <i className="ri-robot-line text-sm" style={{ color: '#f97316' }}></i>
              </div>
            </div>
          </div>

          {/* AI Answer */}
          <div className="px-4 py-3">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>
              {aiSearchResults.answer}
            </p>

            {/* Related Notes */}
            {aiSearchResults.relatedNotes.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium mb-2" style={{ color: '#64748b' }}>Related Notes:</p>
                {aiSearchResults.relatedNotes.map((note, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-lg cursor-pointer transition-colors"
                    style={{ backgroundColor: '#f8fafc' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f1f5f9'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc'
                    }}
                  >
                    <p className="text-xs font-medium mb-1" style={{ color: '#1e293b' }}>
                      {note.title || 'Untitled Note'}
                    </p>
                    <p className="text-xs line-clamp-2" style={{ color: '#64748b' }}>
                      {note.content?.substring(0, 100)}...
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default AISearch

