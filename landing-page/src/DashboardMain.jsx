import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import { 
  MessageSquare,
  Heart,
  Send,
  Clock,
  ChevronDown,
  ChevronUp,
  Globe,
  Palette,
  Github,
  X
} from 'lucide-react'
import GrayNoteCompact from './GrayNoteCompact'

// Dashboard Main Component - Multi-Site Layout with Better Space Utilization
const DashboardMain = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [expandedSites, setExpandedSites] = useState({ 'tesla.com': true }); // Tesla expanded by default
  const [commentReplies, setCommentReplies] = useState({}); // Track reply text for each comment
  const [showReplyBoxes, setShowReplyBoxes] = useState({}); // Track which comments show reply boxes
  const [replyingToComment, setReplyingToComment] = useState(null); // Track which comment is being replied to
  const [justSentReply, setJustSentReply] = useState(null); // Track recently sent replies for visual feedback

  // Multi-site mock data - Tesla + GitHub + Figma
  const multiSiteData = [
    {
      siteId: 'tesla.com',
      siteName: 'Tesla Motors',
      siteIcon: '🚗',
      siteColor: '#dc2626',
      totalNotes: 4,
      notes: [
        {
          id: 'tesla-1',
          content: 'The new Model S Plaid acceleration is incredible - 0-60 in under 2 seconds. This could revolutionize our performance benchmarks.',
          author: 'Sarah Chen',
          avatar: 'SC',
          timestamp: '2 hours ago',
          website: 'tesla.com',
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
          comments: 12,
          likes: 35
        }
      ]
    },
    {
      siteId: 'github.com',
      siteName: 'GitHub Repository',
      siteIcon: <Github size={20} />,
      siteColor: '#24292e',
      totalNotes: 3,
      notes: [
        {
          id: 'github-1',
          content: 'The new React 18 concurrent features are game-changing. Our component rendering performance improved by 40%.',
          author: 'Alex Johnson',
          avatar: 'AJ',
          timestamp: '3 hours ago',
          website: 'github.com',
          comments: 6,
          likes: 15
        },
        {
          id: 'github-2',
          content: 'Code review: The new authentication system looks solid. Great work on the security implementation.',
          author: 'Lisa Park',
          avatar: 'LP',
          timestamp: '6 hours ago',
          website: 'github.com',
          comments: 4,
          likes: 9
        },
        {
          id: 'github-3',
          content: 'Pull request ready: Added TypeScript support for better type safety and developer experience.',
          author: 'John Smith',
          avatar: 'JS',
          timestamp: '1 day ago',
          website: 'github.com',
          comments: 7,
          likes: 22
        }
      ]
    },
    {
      siteId: 'figma.com',
      siteName: 'Figma Design',
      siteIcon: <Palette size={20} />,
      siteColor: '#f24e1e',
      totalNotes: 3,
      notes: [
        {
          id: 'figma-1',
          content: 'New design system components look fantastic! The spacing and typography guidelines are spot on.',
          author: 'Maya Patel',
          avatar: 'MP',
          timestamp: '5 hours ago',
          website: 'figma.com',
          comments: 2,
          likes: 8
        },
        {
          id: 'figma-2',
          content: 'Prototype feedback: The user onboarding flow is intuitive. Users completed tasks 60% faster.',
          author: 'Tom Wilson',
          avatar: 'TW',
          timestamp: '8 hours ago',
          website: 'figma.com',
          comments: 5,
          likes: 14
        },
        {
          id: 'figma-3',
          content: 'Design review: The mobile responsive layouts work perfectly. Ready for development handoff.',
          author: 'Nina Rodriguez',
          avatar: 'NR',
          timestamp: '1 day ago',
          website: 'figma.com',
          comments: 3,
          likes: 11
        }
      ]
    }
  ];

  // Calculate totals
  const totalSites = multiSiteData.length;
  const totalNotes = multiSiteData.reduce((sum, site) => sum + site.totalNotes, 0);

  // Mock user data for demonstration - showing "You" as current user
  const mockUser = {
    name: 'You', // Always show as current user
    avatar: 'YO', // Current user avatar
    notesCount: selectedNote ? multiSiteData.find(site => 
      site.notes.some(note => note.author === selectedNote.author)
    )?.notes.filter(note => note.author === selectedNote.author).length : 0,
    lastActivity: '2 hours ago'
  };

  // Mock comments with replies to demonstrate the reply system
  const [mockComments, setMockComments] = useState([
    {
      id: 1,
      author: 'Sarah Wilson',
      avatar: 'SW',
      content: 'Great insights! This aligns with our Q4 strategy perfectly.',
      timestamp: '1 hour ago',
      likes: 2,
      replies: [
        {
          id: 101,
          author: 'You',
          avatar: 'YO',
          content: 'Thanks Sarah! I think we should prioritize the mobile optimization part.',
          timestamp: '45 minutes ago'
        },
        {
          id: 102,
          author: 'Sarah Wilson',
          avatar: 'SW',
          content: 'Absolutely! Mobile-first approach will be key for Q4.',
          timestamp: '40 minutes ago'
        }
      ]
    },
    {
      id: 2,
      author: 'Mike Chen',
      avatar: 'MC',
      content: 'I agree with the analysis. Let me know if you need additional data points.',
      timestamp: '45 minutes ago',
      likes: 1,
      replies: [
        {
          id: 201,
          author: 'You',
          avatar: 'YO',
          content: 'Could you share the performance metrics from last quarter?',
          timestamp: '30 minutes ago'
        }
      ]
    }
  ]); // Initialize useState with mock data

  const handleNoteClick = useCallback((note) => {
    if (selectedNote?.id === note.id) {
      setSelectedNote(null);
    } else {
      setSelectedNote(note);
    }
  }, [selectedNote]);

  const handleSiteToggle = useCallback((siteId) => {
    setExpandedSites(prev => ({
      ...prev,
      [siteId]: !prev[siteId]
    }));
  }, []);

  // Calculate total comments including replies
  const getTotalCommentsCount = useCallback(() => {
    return mockComments.reduce((total, comment) => {
      return total + 1 + (comment.replies ? comment.replies.length : 0);
    }, 0);
  }, [mockComments]);

  const handleBackgroundClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setSelectedNote(null);
    }
  }, []);


  // Comment reply handlers
  const handleShowReplyBox = useCallback((commentId) => {
    setShowReplyBoxes(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
    setCommentReplies(prev => ({
      ...prev,
      [commentId]: prev[commentId] || ''
    }));
  }, []);

  const handleCommentReplyChange = useCallback((commentId, value) => {
    setCommentReplies(prev => ({
      ...prev,
      [commentId]: value
    }));
  }, []);

  const handleSendCommentReply = useCallback(async (commentId) => {
    const replyContent = commentReplies[commentId];
    if (replyContent?.trim() && replyingToComment !== commentId) {
      setReplyingToComment(commentId);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Sending reply to comment', commentId, ':', replyContent);
      
      // Add the reply to the mock comments to show it appeared
      const newReply = {
        id: Date.now(),
        author: 'You',
        avatar: 'YO',
        content: replyContent,
        timestamp: 'just now'
      };
      
      // Find and update the comment with the new reply
      setMockComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        return comment;
      }));
      
      // Clear the reply and hide the box
      setCommentReplies(prev => ({
        ...prev,
        [commentId]: ''
      }));
      setShowReplyBoxes(prev => ({
        ...prev,
        [commentId]: false
      }));
      setReplyingToComment(null);
      
      // Show success feedback for the reply
      setJustSentReply(newReply.id);
      setTimeout(() => setJustSentReply(null), 2000);
    }
  }, [commentReplies, replyingToComment]);

  const handleCommentReplyKeyDown = useCallback((e, commentId) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendCommentReply(commentId);
    }
  }, [handleSendCommentReply]);

  return (
    <div className="flex h-full w-full relative" onClick={handleBackgroundClick}>
      {/* Dot Pattern Background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '12px 12px'
        }}
      />

      {/* Global Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 py-4 border-b border-gray-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Globe size={24} style={{ color: '#10B981' }} />
              <h2 className="text-xl font-bold" style={{ color: '#1e293b' }}>Main Dashboard</h2>
            </div>
            <div className="text-sm" style={{ color: '#64748b' }}>
              {totalSites} sites • {totalNotes} notes
            </div>
          </div>
          
          <div className="text-sm" style={{ color: '#64748b' }}>
            Last updated: 2 hours ago
          </div>
        </div>
      </div>

      {/* Left Side - Multi-Site Notes */}
      <div 
        className="flex-shrink-0 overflow-y-auto border-r border-gray-200 relative z-10"
        style={{ 
          width: selectedNote ? '50%' : '100%', // 50% width when note is selected
          transition: 'width 0.3s ease-in-out',
          marginTop: '80px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }}
      >
        {/* Site Sections */}
        <div className="p-4 space-y-6">
          {multiSiteData.map((site) => (
            <motion.div
              key={site.siteId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
            >
              {/* Site Header */}
              <div 
                className="px-6 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSiteToggle(site.siteId)}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: site.siteColor }}
                    >
                      {typeof site.siteIcon === 'string' ? (
                        <span className="text-white text-lg">{site.siteIcon}</span>
                      ) : (
                        <div className="text-white">{site.siteIcon}</div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: '#1e293b' }}>
                        {site.siteName}
                      </h3>
                      <p className="text-sm" style={{ color: '#64748b' }}>
                        {site.totalNotes} notes from {site.siteId}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
                      {site.notes.reduce((sum, note) => sum + note.comments, 0)} comments
                    </div>
                    {expandedSites[site.siteId] ? (
                      <ChevronUp size={20} style={{ color: '#64748b' }} />
                    ) : (
                      <ChevronDown size={20} style={{ color: '#64748b' }} />
                    )}
                  </div>
                </div>
              </div>

              {/* Site Notes - Collapsible */}
              {expandedSites[site.siteId] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 space-y-3"
                >
                  {site.notes.map((note) => (
                    <GrayNoteCompact
                      key={note.id}
                      content={note.content}
                      author={note.author}
                      avatar={note.avatar}
                      timestamp={note.timestamp}
                      comments={note.comments}
                      likes={note.likes}
                      isSelected={selectedNote?.id === note.id}
                      onClick={() => handleNoteClick(note)}
                      simplified={true}
                      onSave={(content) => {
                        console.log('Saving note:', content);
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
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Side - Selected Note Details & Comments */}
      {selectedNote && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex flex-col relative z-10"
          style={{ 
            backgroundColor: 'rgba(250, 251, 252, 0.9)',
            marginTop: '80px',
            width: '50%', // Fixed 50% width for comments section
            backdropFilter: 'blur(8px)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* User Info Header */}
          <div className="p-6 border-b border-gray-200" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{ 
                    backgroundColor: '#E8E8E8',
                    color: '#4A4A4A'
                  }}
                >
                  {mockUser.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: '#1e293b' }}>
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

            {/* Simple Note Info */}
            <div className="mb-4">
              <p className="text-sm" style={{ color: '#64748b' }}>
                {selectedNote.author} • {selectedNote.timestamp}
              </p>
            </div>

            {/* Simple Comments Header */}
            <div>
              <div className="flex items-center space-x-2">
                <MessageSquare size={16} style={{ color: '#10B981' }} />
                <span className="text-sm font-medium" style={{ color: '#1e293b' }}>
                  {getTotalCommentsCount()} Comments
                </span>
              </div>
            </div>
          </div>

          {/* Comments Section - Always Active */}
          <div className="flex-1 flex flex-col">

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
                        className="p-3 rounded-lg transition-all duration-200"
                        style={{ 
                          backgroundColor: justSentReply === comment.id ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.95)', 
                          border: justSentReply === comment.id ? '1px solid #10B981' : '1px solid #e5e7eb'
                        }}
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
                        
                        {/* Comment Actions */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-3">
                            {comment.likes > 0 && (
                              <div className="flex items-center space-x-1">
                                <Heart size={12} className="fill-current" style={{ color: '#ef4444' }} />
                                <span className="text-xs" style={{ color: '#9ca3af' }}>
                                  {comment.likes}
                                </span>
                              </div>
                            )}
                            
                            <button
                              onClick={() => handleShowReplyBox(comment.id)}
                              className="text-xs px-2 py-1 rounded-md transition-colors"
                              style={{ 
                                color: '#6b7280',
                                backgroundColor: showReplyBoxes[comment.id] ? '#f3f4f6' : 'transparent'
                              }}
                              onMouseEnter={(e) => {
                                if (!showReplyBoxes[comment.id]) {
                                  e.target.style.backgroundColor = '#f9fafb';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!showReplyBoxes[comment.id]) {
                                  e.target.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                        
                        {/* Existing Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 space-y-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex space-x-2 ml-4">
                                <div 
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                                  style={{ 
                                    backgroundColor: reply.author === 'You' ? '#10B981' : '#E8E8E8',
                                    color: reply.author === 'You' ? '#ffffff' : '#4A4A4A'
                                  }}
                                >
                                  {reply.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div 
                                    className="p-2 rounded-lg transition-all duration-200"
                                    style={{ 
                                      backgroundColor: justSentReply === reply.id ? 'rgba(16, 185, 129, 0.08)' : 'rgba(249, 250, 251, 0.8)', 
                                      border: justSentReply === reply.id ? '1px solid #10B981' : '1px solid #f1f5f9' 
                                    }}
                                  >
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="text-xs font-medium" style={{ color: '#374151' }}>
                                        {reply.author}
                                      </span>
                                      <span className="text-xs" style={{ color: '#9ca3af' }}>
                                        {reply.timestamp}
                                      </span>
                                    </div>
                                    <p className="text-xs" style={{ color: '#374151' }}>
                                      {reply.content}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Reply Input Box */}
                        {showReplyBoxes[comment.id] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 pt-3 border-t"
                            style={{ borderTopColor: '#f1f5f9' }}
                          >
                            <div className="flex space-x-2">
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                                style={{ 
                                  backgroundColor: '#10B981',
                                  color: '#ffffff'
                                }}
                              >
                                {mockUser.avatar}
                              </div>
                              <div className="flex-1">
                                <textarea
                                  value={commentReplies[comment.id] || ''}
                                  onChange={(e) => handleCommentReplyChange(comment.id, e.target.value)}
                                  onKeyDown={(e) => handleCommentReplyKeyDown(e, comment.id)}
                                  placeholder={`Reply to ${comment.author}...`}
                                  className="w-full px-2 py-1 text-xs rounded-md resize-none focus:outline-none transition-colors"
                                  style={{
                                    backgroundColor: '#f8fafc',
                                    border: '1px solid #e5e7eb',
                                    color: '#1e293b',
                                    minHeight: '32px'
                                  }}
                                  onFocus={(e) => e.target.style.borderColor = '#10B981'}
                                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                  disabled={replyingToComment === comment.id}
                                />
                                <div className="flex items-center justify-between mt-1">
                                  <div className="text-xs" style={{ color: '#9ca3af' }}>
                                    Press Enter to send
                                  </div>
                                  <button
                                    onClick={() => handleSendCommentReply(comment.id)}
                                    disabled={!commentReplies[comment.id]?.trim() || replyingToComment === comment.id}
                                    className="flex items-center space-x-1 px-2 py-1 rounded-md text-xs transition-colors"
                                    style={{
                                      backgroundColor: commentReplies[comment.id]?.trim() && replyingToComment !== comment.id ? '#10B981' : '#f3f4f6',
                                      color: commentReplies[comment.id]?.trim() && replyingToComment !== comment.id ? '#ffffff' : '#9ca3af'
                                    }}
                                  >
                                    <Send size={10} />
                                    <span>{replyingToComment === comment.id ? 'Sending...' : 'Send'}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
        </motion.div>
      )}

      {/* Simple Empty State */}
      {!selectedNote && (
        <div 
          className="flex-1 flex items-center justify-center relative z-10" 
          style={{ 
            backgroundColor: 'rgba(250, 251, 252, 0.8)',
            marginTop: '80px',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1e293b' }}>
              Select a note
            </h3>
            <p className="text-sm" style={{ color: '#64748b' }}>
              Click any note to see comments
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMain;
