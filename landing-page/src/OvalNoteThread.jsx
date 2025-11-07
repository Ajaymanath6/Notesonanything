import { motion, useDragControls } from 'framer-motion'
import { useState, useCallback, useEffect, useRef } from 'react'
import { 
  Edit2,
  Trash2,
  MessageSquare,
  Share2,
  Heart,
  Bookmark,
  Reply,
  Send,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

// Color variants for the oval note
const COLOR_VARIANTS = {
  red: {
    primary: '#DF6D7A',
    secondary: '#F8BA9D',
    shadow: '#C85A67'
  },
  orange: {
    primary: '#F8BA9D', 
    secondary: '#FFD4B8',
    shadow: '#E5A584'
  },
  green: {
    primary: '#B8CFB2',
    secondary: '#D4E6CF',
    shadow: '#A2BF9C'
  }
};

// Oval-shaped Thread Note Component with Comments
const OvalNoteThread = ({ 
  content = "",
  author = "You",
  avatar = "YO",
  timestamp = "just now",
  position,
  isEditing = true,
  onSave,
  onEdit,
  onCancel,
  onDelete,
  onPositionChange,
  colorVariant = 'red',
  comments = [],
  onAddComment,
  onReplyComment,
  onLikeComment,
  onDeleteComment
}) => {
  const [noteContent, setNoteContent] = useState(content);
  const [currentColor, setCurrentColor] = useState(colorVariant);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Comments always expanded in dashboard
  const isCommentsCollapsed = false;
  const textareaRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [wordCountError, setWordCountError] = useState(false);
  const dragControls = useDragControls();

  const colors = COLOR_VARIANTS[currentColor];

  // Word count validation
  const wordCount = noteContent.length;
  const isOverLimit = wordCount > 100;

  // Sync content from props when content changes
  useEffect(() => {
    setNoteContent(content);
  }, [content]);

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  // Handle escape key and other keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (!noteContent.trim() || isEditing) {
          onCancel?.();
        }
      }
    };

    if (isEditing) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isEditing, noteContent, onCancel]);

  const handleSave = useCallback(async () => {
    if (isOverLimit) {
      setWordCountError(true);
      setTimeout(() => setWordCountError(false), 3000);
      return;
    }

    if (noteContent.trim() && !isSaving) {
      setIsSaving(true);
      try {
        await onSave?.(noteContent, currentColor);
      } finally {
        setIsSaving(false);
      }
    }
  }, [noteContent, currentColor, onSave, isSaving, isOverLimit]);

  const handleTextareaChange = (e) => {
    setNoteContent(e.target.value);
    if (wordCountError && e.target.value.length <= 100) {
      setWordCountError(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  const handleDragStart = (event) => {
    dragControls.start(event);
  };

  // Comment handlers
  const handleAddComment = async () => {
    if (newComment.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        const comment = {
          id: Date.now(),
          content: newComment.trim(),
          author: 'You',
          timestamp: 'just now',
          likes: 0,
          isLiked: false,
          replies: []
        };
        await onAddComment?.(comment);
        setNewComment('');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCommentKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.4 }}
      className="absolute z-50"
      style={{
        left: position?.x || 0,
        top: position?.y || 0,
      }}
    >
      {/* Main Oval Note Container */}
      <div 
        className="relative w-[280px] overflow-hidden"
        style={{
          backgroundColor: colors.primary,
          borderRadius: '2rem',
          minHeight: '160px',
          border: `2px solid ${colors.shadow}`
        }}
      >
        {/* Header with Avatar and Color Switcher */}
        <div 
          className="flex items-center justify-between p-4 cursor-move"
          onPointerDown={handleDragStart}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 border-white"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: colors.primary
              }}
            >
              {avatar}
            </div>
            <div>
              <h3 className="font-medium text-sm text-white">{author}</h3>
              <p className="text-xs text-white opacity-80">{timestamp}</p>
            </div>
          </div>
          
          {/* Color Switcher Circles */}
          <div className="flex items-center space-x-1">
            {Object.keys(COLOR_VARIANTS).map((colorKey) => (
              <button
                key={colorKey}
                onClick={() => setCurrentColor(colorKey)}
                className={`w-5 h-5 rounded-full border-2 transition-transform ${
                  currentColor === colorKey ? 'scale-110 border-white' : 'border-white border-opacity-50'
                }`}
                style={{ backgroundColor: COLOR_VARIANTS[colorKey].primary }}
                title={`${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)} theme`}
              />
            ))}
          </div>
        </div>

        {/* Note Content Area */}
        <div className="px-4 pb-4">
          {isEditing ? (
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={noteContent}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="What's on your mind? (Press Enter to save)"
                className={`w-full h-20 p-3 text-sm rounded-xl resize-none focus:outline-none border-none ${
                  isOverLimit ? 'bg-red-100' : ''
                }`}
                style={{ 
                  color: colors.primary,
                  backgroundColor: isOverLimit ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.9)',
                  fontWeight: '500'
                }}
                disabled={isSaving}
              />
              
              {/* Word Count Indicator */}
              <div className={`absolute bottom-1 right-2 text-xs ${
                isOverLimit ? 'text-red-600 font-medium' : 'opacity-70'
              }`} style={{ color: isOverLimit ? '#DC2626' : colors.primary }}>
                {wordCount}/100
              </div>
              
              {/* Error Message */}
              {wordCountError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-6 left-0 right-0 text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200"
                >
                  Message too long. Please keep it under 100 characters.
                </motion.div>
              )}
            </div>
          ) : (
            <div 
              className="min-h-[5rem] p-3 text-sm whitespace-pre-wrap break-words cursor-pointer rounded-xl transition-colors"
              style={{ 
                color: colors.primary,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '500'
              }}
              onClick={() => onEdit?.()}
            >
              {noteContent || "Click to add your thoughts..."}
            </div>
          )}
        </div>

        {/* Social Actions Button Group */}
        {!isEditing && (
          <div 
            className="flex items-center justify-center space-x-1 py-2 mx-4 mb-3 rounded-full border"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
            }}
          >
            <button
              onClick={() => onEdit?.()}
              className="p-2 rounded-full transition-colors hover:bg-gray-100"
              title="Edit note"
              style={{ color: colors.primary }}
            >
              <Edit2 className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => onDelete?.()}
              className="p-2 rounded-full transition-colors hover:bg-gray-100"
              title="Delete note"
              style={{ color: colors.primary }}
            >
              <Trash2 className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => setIsCommentsCollapsed(!isCommentsCollapsed)}
              className="p-2 rounded-full transition-colors hover:bg-gray-100"
              title="Toggle comments"
              style={{ color: colors.primary }}
            >
              <MessageSquare className="h-4 w-4" />
            </button>
            
            <button
              className="p-2 rounded-full transition-colors hover:bg-gray-100"
              title="Share note"
              style={{ color: colors.primary }}
            >
              <Share2 className="h-4 w-4" />
            </button>
            
            <button
              className="p-2 rounded-full transition-colors hover:bg-gray-100"
              title="Like note"
              style={{ color: colors.primary }}
            >
              <Heart className="h-4 w-4" />
            </button>
            
            <button
              className="p-2 rounded-full transition-colors hover:bg-gray-100"
              title="Bookmark note"
              style={{ color: colors.primary }}
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Comments Section */}
        {!isEditing && !isCommentsCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t"
            style={{ 
              borderTopColor: 'rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Comments Header */}
            <div className="px-4 py-3 border-b" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.2)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                  </span>
                </div>
              </div>
            </div>

            {/* Comments List */}
            {comments.length > 0 && (
              <div className="px-4 py-2 space-y-3 max-h-48 overflow-y-auto">
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReply={onReplyComment}
                    onLike={onLikeComment}
                    onDelete={onDeleteComment}
                    isOwner={comment.author === 'You'}
                    colors={colors}
                  />
                ))}
              </div>
            )}

            {/* Add Comment Form */}
            <div className="px-4 py-3">
              <div className="flex items-start space-x-2">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 border border-white"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: colors.primary
                  }}
                >
                  YO
                </div>
                <div className="flex-1 space-y-2">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleCommentKeyDown}
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 text-sm rounded-lg resize-none border-none focus:outline-none"
                    style={{ 
                      color: colors.primary,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }}
                    rows="2"
                  />
                  <div className="flex items-center justify-between">
                    {/* Removed "Press Ctrl + Enter to comment" for cleaner dashboard */}
                    <span className="text-xs text-white opacity-70">
                      {/* Comment hint removed */}
                    </span>
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || isSubmitting}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center space-x-1 ${
                        newComment.trim() && !isSubmitting
                          ? 'hover:opacity-90'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      style={{ 
                        backgroundColor: newComment.trim() && !isSubmitting ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
                        color: colors.primary
                      }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="w-3 h-3 border-2 border-current border-opacity-30 border-t-current rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <Send className="h-3 w-3" />
                      )}
                      <span>{isSubmitting ? 'Adding...' : 'Comment'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};

// Oval-themed Comment Item Component
const CommentItem = ({ comment, onReply, onLike, onDelete, isOwner = false, colors }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likes, setLikes] = useState(comment.likes || 0);

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikes(prev => newLiked ? prev + 1 : prev - 1);
    onLike?.(comment.id, newLiked);
  };

  const handleReply = () => {
    if (replyText.trim()) {
      const reply = {
        id: Date.now(),
        content: replyText.trim(),
        author: 'You',
        timestamp: 'just now',
        likes: 0,
        isLiked: false,
        replies: []
      };
      onReply?.(comment.id, reply);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg p-3 space-y-2"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold border border-white"
            style={{ 
              backgroundColor: colors.primary,
              color: 'white'
            }}
          >
            {comment.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <span className="text-sm font-medium" style={{ color: colors.primary }}>{comment.author}</span>
            <span className="text-xs ml-2 opacity-70" style={{ color: colors.primary }}>{comment.timestamp}</span>
          </div>
        </div>
        {isOwner && (
          <button
            onClick={() => onDelete?.(comment.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <p className="text-sm leading-relaxed" style={{ color: colors.primary }}>{comment.content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 text-xs transition-colors ${
              isLiked ? 'opacity-100' : 'opacity-70 hover:opacity-100'
            }`}
            style={{ color: colors.primary }}
          >
            <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
          </button>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center space-x-1 text-xs opacity-70 hover:opacity-100 transition-colors"
            style={{ color: colors.primary }}
          >
            <Reply className="h-3 w-3" />
            <span>Reply</span>
          </button>
        </div>
      </div>

      {showReplyForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center space-x-2 mt-2"
        >
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 px-3 py-1.5 text-sm rounded-lg focus:outline-none border-none"
            style={{ 
              color: colors.primary,
              backgroundColor: 'rgba(255, 255, 255, 0.8)'
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleReply()}
          />
          <button
            onClick={handleReply}
            disabled={!replyText.trim()}
            className={`p-1.5 text-white rounded-lg transition-colors ${
              replyText.trim() ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ backgroundColor: colors.primary }}
          >
            <Send className="h-3 w-3" />
          </button>
        </motion.div>
      )}

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 space-y-2 border-l-2 pl-3" style={{ borderLeftColor: 'rgba(255, 255, 255, 0.5)' }}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onDelete={onDelete}
              isOwner={reply.author === 'You'}
              colors={colors}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OvalNoteThread;