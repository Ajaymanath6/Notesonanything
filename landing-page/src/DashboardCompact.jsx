import { motion } from 'framer-motion'
import { useState, useCallback, useRef } from 'react'
import { 
  MessageSquare,
  Heart,
  Smile,
  Send,
  User,
  Clock,
  X
} from 'lucide-react'
import GrayNoteCompact from './GrayNoteCompact'

// Dashboard Compact Component - Inbox Style Layout
const DashboardCompact = ({ userNotes = [], enhanced = false }) => {
  const [hoveredNote, setHoveredNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const replyInputRef = useRef(null);

  // Tesla-specific notes for enhanced experience
  const teslaNotesData = enhanced ? [
    {
      id: 'tesla-1',
      content: 'The new Model S Plaid acceleration is incredible - 0-60 in under 2 seconds. This could revolutionize our performance benchmarks.',
      author: 'Sarah Chen',
      avatar: 'SC',
      timestamp: '2 hours ago',
      website: 'tesla.com',
      websiteName: 'Tesla Motors',
      comments: 3,
      likes: 12
    },
    {
      id: 'tesla-2', 
      content: 'Tesla\'s FSD Beta v12 neural network architecture is fascinating. The end-to-end approach might be the key to solving autonomous driving.',
      author: 'Mike Rodriguez',
      avatar: 'MR',
      timestamp: '4 hours ago',
      website: 'tesla.com',
      websiteName: 'Tesla Motors',
      comments: 8,
      likes: 24
    },
    {
      id: 'tesla-3',
      content: 'Supercharger V4 deployment strategy looks promising. 350kW charging will make long-distance EV travel seamless.',
      author: 'Emma Watson',
      avatar: 'EW',
      timestamp: '1 day ago',
      website: 'tesla.com',
      websiteName: 'Tesla Motors',
      comments: 5,
      likes: 18
    },
    {
      id: 'tesla-4',
      content: 'The Cybertruck production timeline update shows they\'re finally scaling. This could disrupt the entire pickup truck market.',
      author: 'David Kim',
      avatar: 'DK',
      timestamp: '2 days ago',
      website: 'tesla.com',
      websiteName: 'Tesla Motors',
      comments: 12,
      likes: 35
    }
  ] : userNotes;

  // Mock user data for demonstration
  const mockUser = {
    name: selectedNote ? selectedNote.author : 'Alex Johnson',
    avatar: selectedNote ? selectedNote.avatar : 'AJ',
    notesCount: enhanced ? teslaNotesData.filter(note => note.author === selectedNote?.author).length : userNotes.length,
    lastActivity: selectedNote ? selectedNote.timestamp : '2 hours ago'
  };

  // Use Tesla notes if enhanced, otherwise use userNotes
  const displayNotes = enhanced ? teslaNotesData : userNotes;

  // Mock comments for demonstration
  const mockComments = [
    {
      id: 1,
      author: 'Sarah Wilson',
      avatar: 'SW',
      content: 'Great point! I think we should implement this in the next sprint.',
      timestamp: '1 hour ago',
      likes: 2
    },
    {
      id: 2,
      author: 'Mike Chen',
      avatar: 'MC',
      content: 'I agree with the approach. Let me know if you need any help with the implementation.',
      timestamp: '45 minutes ago',
      likes: 1
    }
  ];

  const handleNoteClick = useCallback((note) => {
    // If clicking the same note, deselect it
    if (selectedNote?.id === note.id) {
      setSelectedNote(null);
      setShowComments(false);
    } else {
      setSelectedNote(note);
      setShowComments(false); // Reset comments when selecting new note
    }
  }, [selectedNote]);

  const handleBackgroundClick = useCallback((e) => {
    // Deselect note when clicking outside
    if (e.target === e.currentTarget) {
      setSelectedNote(null);
      setShowComments(false);
    }
  }, []);

  const handleShowComments = useCallback(() => {
    setShowComments(true);
    // Keep the note selected when showing comments
  }, []);

  const handleCloseComments = useCallback(() => {
    setShowComments(false);
    setSelectedNote(null);
    setHoveredNote(null);
  }, []);

  const handleSendReply = useCallback(async () => {
    if (replyText.trim() && !isReplying) {
      setIsReplying(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would add the reply to the comments
      console.log('Sending reply:', replyText);
      
      setReplyText('');
      setIsReplying(false);
    }
  }, [replyText, isReplying]);

  const handleReplyKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  }, [handleSendReply]);

  return (
    <div className="flex h-full w-full" onClick={handleBackgroundClick}>
      {/* Website Header - Only for Enhanced Version */}
      {enhanced && (
        <div className="absolute top-0 left-0 right-0 z-10 px-6 py-4 border-b border-gray-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#dc2626' }}>
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div>
              <h2 className="font-bold" style={{ color: '#1e293b' }}>Tesla Motors</h2>
              <p className="text-sm" style={{ color: '#64748b' }}>4 notes from tesla.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Left Side - Notes List (Inbox Style) */}
      <div 
        className="flex-shrink-0 overflow-y-auto border-r border-gray-200"
        style={{ 
          width: selectedNote ? (showComments ? '300px' : '40%') : '100%',
          transition: 'width 0.3s ease-in-out',
          marginTop: enhanced ? '80px' : '0px'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-gray-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#1e293b' }}>
            {enhanced ? `Tesla Notes (${displayNotes.length})` : `Your Notes (${displayNotes.length})`}
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Click on notes to see details and interactions
          </p>
        </div>

        {/* Notes List */}
        <div className="p-4 space-y-3">
          {displayNotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#f8fafc' }}>
                <MessageSquare size={24} style={{ color: '#9ca3af' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#1e293b' }}>No notes yet</h3>
              <p className="text-sm" style={{ color: '#64748b' }}>
                Create your first note to see it appear here
              </p>
            </div>
          ) : (
            displayNotes.map((note, index) => (
              <GrayNoteCompact
                key={note.id}
                content={note.content}
                author={note.author || 'You'}
                avatar={note.author?.charAt(0) || 'YO'}
                timestamp={note.timestamp}
                comments={note.comments || Math.floor(Math.random() * 3)}
                likes={note.likes || Math.floor(Math.random() * 5)}
                isSelected={selectedNote?.id === note.id}
                onClick={() => handleNoteClick(note)}
                simplified={enhanced}
                onSave={(content) => {
                  console.log('Saving note:', content);
                  // Handle note save logic
                }}
                onEdit={() => {
                  console.log('Editing note:', note.id);
                }}
                onCancel={() => {
                  console.log('Cancelled editing:', note.id);
                }}
                onDelete={() => {
                  console.log('Deleting note:', note.id);
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* Right Side - Selected Note Details & Comments */}
      {selectedNote && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex-1 flex flex-col"
          style={{ 
            backgroundColor: '#fafbfc',
            marginTop: enhanced ? '80px' : '0px',
            minWidth: showComments ? '400px' : '300px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* User Info Header */}
          <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#ffffff' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{ 
                    backgroundColor: '#E8E8E8',
                    color: '#4A4A4A'
                  }}
                >
                  {mockUser.avatar}
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: '#1e293b' }}>
                    {mockUser.name}
                  </h3>
                  <p className="text-sm flex items-center space-x-1" style={{ color: '#64748b' }}>
                    <Clock size={12} />
                    <span>Active {mockUser.lastActivity}</span>
                  </p>
                </div>
              </div>
              
              {/* Close Comments Button */}
              <button
                onClick={() => setSelectedNote(null)}
                className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                style={{ color: '#6b7280' }}
                title="Close comments"
              >
                <X size={18} />
              </button>
            </div>

            {/* User Notes Summary */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Notes by {mockUser.name.split(' ')[0]}:
              </h4>
              <p className="text-sm" style={{ color: '#64748b' }}>
                Total: {mockUser.notesCount} notes • Latest: {selectedNote.timestamp}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShowComments}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: showComments ? '#10B981' : '#ffffff',
                  color: showComments ? '#ffffff' : '#64748b',
                  border: `1px solid ${showComments ? '#10B981' : '#e5e7eb'}`
                }}
                onMouseEnter={(e) => {
                  if (!showComments) {
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showComments) {
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.borderColor = '#e5e7eb';
                  }
                }}
              >
                <MessageSquare size={16} />
                <span className="text-sm font-medium">
                  Chat ({mockComments.length})
                </span>
              </button>
              
              <button
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#64748b',
                  border: '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f8fafc';
                  e.target.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.borderColor = '#e5e7eb';
                }}
              >
                <Smile size={16} />
                <span className="text-sm font-medium">React</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          {showComments ? (
            <div className="flex-1 flex flex-col">
              {/* Comments Header */}
              <div className="px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#ffffff' }}>
                <h4 className="font-medium" style={{ color: '#1e293b' }}>
                  Comments ({mockComments.length})
                </h4>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  Discussion about this note
                </p>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {mockComments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex space-x-3"
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                      style={{ 
                        backgroundColor: '#E8E8E8',
                        color: '#4A4A4A'
                      }}
                    >
                      {comment.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium" style={{ color: '#1e293b' }}>
                            {comment.author}
                          </span>
                          <span className="text-xs" style={{ color: '#9ca3af' }}>
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: '#374151' }}>
                          {comment.content}
                        </p>
                        {comment.likes > 0 && (
                          <div className="flex items-center space-x-1 mt-2">
                            <Heart size={12} className="fill-current" style={{ color: '#ef4444' }} />
                            <span className="text-xs" style={{ color: '#9ca3af' }}>
                              {comment.likes}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Reply Input */}
              <div className="p-6 border-t border-gray-200" style={{ backgroundColor: '#ffffff' }}>
                <div className="flex space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                    style={{ 
                      backgroundColor: '#10B981',
                      color: '#ffffff'
                    }}
                  >
                    {mockUser.avatar}
                  </div>
                  <div className="flex-1">
                    <textarea
                      ref={replyInputRef}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={handleReplyKeyDown}
                      placeholder="Write a reply... (Press Enter to send)"
                      className="w-full px-3 py-2 text-sm rounded-lg resize-none focus:outline-none transition-colors"
                      style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e5e7eb',
                        color: '#1e293b',
                        minHeight: '60px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10B981'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      disabled={isReplying}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs" style={{ color: '#9ca3af' }}>
                        Press Enter to send, Shift+Enter for new line
                      </div>
                      <button
                        onClick={handleSendReply}
                        disabled={!replyText.trim() || isReplying}
                        className="flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors"
                        style={{
                          backgroundColor: replyText.trim() && !isReplying ? '#10B981' : '#f3f4f6',
                          color: replyText.trim() && !isReplying ? '#ffffff' : '#9ca3af'
                        }}
                      >
                        <Send size={14} />
                        <span>{isReplying ? 'Sending...' : 'Send'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Note Preview */
            <div className="flex-1 p-6">
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
              >
                <h4 className="font-medium mb-2" style={{ color: '#1e293b' }}>
                  Note Preview
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
                  {selectedNote.content}
                </p>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="text-xs" style={{ color: '#9ca3af' }}>
                    Created {selectedNote.timestamp}
                  </div>
                  <div className="flex items-center space-x-3 text-xs" style={{ color: '#9ca3af' }}>
                    <span>{mockComments.length} comments</span>
                    <span>•</span>
                    <span>{Math.floor(Math.random() * 5)} likes</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Empty State for Right Side */}
      {!selectedNote && (
        <div 
          className="flex-1 flex items-center justify-center" 
          style={{ 
            backgroundColor: '#fafbfc',
            marginTop: enhanced ? '80px' : '0px'
          }}
        >
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#f8fafc' }}>
              <User size={24} style={{ color: '#9ca3af' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1e293b' }}>
              Select a note to view details
            </h3>
            <p className="text-sm" style={{ color: '#64748b' }}>
              Click on any note on the left to see user information, comments, and interactions
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCompact;
