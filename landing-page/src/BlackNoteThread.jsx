import { motion, useDragControls } from 'framer-motion'
import { useState, useCallback, useEffect, useRef } from 'react'
import { 
  Edit2,
  Trash2,
  FileText,
  MessageSquare,
  Heart,
  Reply,
  Send,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

// Black-themed Thread Note Component with Comments (Developer Edition)
const BlackNoteThread = ({ 
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
  comments = [],
  onAddComment,
  onReplyComment,
  onLikeComment,
  onDeleteComment
}) => {
  const [noteContent, setNoteContent] = useState(content);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Comments always expanded in dashboard
  const isCommentsCollapsed = false;
  const textareaRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [wordCountError, setWordCountError] = useState(false);
  const dragControls = useDragControls();

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
        await onSave?.(noteContent);
      } finally {
        setIsSaving(false);
      }
    }
  }, [noteContent, onSave, isSaving, isOverLimit]);

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
      {/* Main Note Container */}
      <div className="rounded-3xl  border w-[320px] overflow-hidden"
           style={{ 
             backgroundColor: '#03190F',
             borderColor: 'rgba(255, 255, 255, 0.1)'
           }}>
        {/* Note Header with Black Theme */}
        <div 
          className="flex items-center justify-between p-4 border-b cursor-move"
          style={{ 
            backgroundColor: '#03190F',
            borderBottomColor: 'rgba(255, 255, 255, 0.1)'
          }}
          onPointerDown={handleDragStart}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff'
              }}
            >
              {avatar || (
                <FileText className="h-4 w-4" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-sm text-white">{author}</h3>
              <p className="text-xs text-gray-300">{timestamp}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Show edit icon only when note has content and not editing */}
            {content.trim() && !isEditing && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.();
                }}
                className="p-2 rounded-lg transition-colors hover:bg-white hover:bg-opacity-5"
                title="Edit note"
              >
                <Edit2 className="h-4 w-4 text-white" />
              </button>
            )}
            
            {/* Delete button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="p-2 rounded-lg transition-colors hover:bg-white hover:bg-opacity-5"
              title="Delete note"
            >
              <Trash2 className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Note Content Area with Black Theme */}
        <div 
          className="p-4"
          style={{ backgroundColor: '#03190F' }}
        >
          {isEditing ? (
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={noteContent}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your code notes here... (Press Enter to save)"
                className={`w-full h-24 p-3 text-sm rounded-lg resize-none focus:outline-none border ${
                  isOverLimit ? 'border-red-400' : 'border-gray-600'
                }`}
                style={{ 
                  color: '#ffffff',
                  backgroundColor: isOverLimit ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  borderColor: isOverLimit ? '#EF4444' : 'rgba(255, 255, 255, 0.2)'
                }}
                disabled={isSaving}
              />
              
              {/* Word Count Indicator */}
              <div className={`absolute bottom-2 right-2 text-xs ${
                isOverLimit ? 'text-red-400 font-medium' : 'text-gray-400'
              }`}>
                {wordCount}/100
              </div>
              
              {/* Error Message */}
              {wordCountError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-0 right-0 text-xs text-red-400 bg-red-900 bg-opacity-20 px-2 py-1 rounded border border-red-400"
                >
                  Message too long. Please keep it under 100 characters.
                </motion.div>
              )}
            </div>
          ) : (
            <div 
              className="min-h-[6rem] p-3 text-sm whitespace-pre-wrap break-words cursor-pointer rounded-lg border border-transparent hover:border-gray-600 transition-colors"
              style={{ color: '#ffffff' }}
              onClick={() => onEdit?.()}
            >
              {noteContent || "Click to start a developer thread..."}
            </div>
          )}
        </div>

        {/* Comments Section with Black Theme */}
        {!isEditing && (
          <div 
            className="border-t"
            style={{ 
              borderTopColor: 'rgba(255, 255, 255, 0.1)',
              backgroundColor: '#03190F'
            }}
          >
            {/* Comments Header - Always Expanded */}
            <div className="px-4 py-3 border-b" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.05)' }}>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                </span>
              </div>
            </div>

            {/* Comments Content - Always Visible */}
            <div>
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
                      />
                    ))}
                  </div>
                )}

                {/* Add Comment Form */}
                <div className="px-4 py-3">
                  <div className="flex items-start space-x-2">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#ffffff'
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
                        className="w-full px-3 py-2 text-sm rounded-lg resize-none border focus:outline-none"
                        style={{ 
                          color: '#ffffff',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderColor: 'rgba(255, 255, 255, 0.2)'
                        }}
                        rows="2"
                      />
                      <div className="flex items-center justify-between">
                        {/* Removed "Press Ctrl + Enter to comment" for cleaner dashboard */}
                        <span className="text-xs text-gray-400">
                          {/* Comment hint removed */}
                        </span>
                        <button
                          onClick={handleAddComment}
                          disabled={!newComment.trim() || isSubmitting}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center space-x-1 ${
                            newComment.trim() && !isSubmitting
                              ? 'text-black hover:opacity-90'
                              : 'opacity-50 cursor-not-allowed'
                          }`}
                          style={{ 
                            backgroundColor: newComment.trim() && !isSubmitting ? '#ffffff' : '#6B7280'
                          }}
                        >
                          {isSubmitting ? (
                            <motion.div
                              className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full"
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
              </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Black-themed Comment Item Component
const CommentItem = ({ comment, onReply, onLike, onDelete, isOwner = false }) => {
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
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            {comment.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <span className="text-sm font-medium text-white">{comment.author}</span>
            <span className="text-xs ml-2 text-gray-400">{comment.timestamp}</span>
          </div>
        </div>
        {isOwner && (
          <button
            onClick={() => onDelete?.(comment.id)}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <p className="text-sm leading-relaxed text-white">{comment.content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 text-xs transition-colors ${
              isLiked ? 'text-white opacity-100' : 'text-gray-400 opacity-70 hover:opacity-100'
            }`}
          >
            <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
          </button>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center space-x-1 text-xs text-gray-400 opacity-70 hover:opacity-100 transition-colors"
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
            className="flex-1 px-3 py-1.5 text-sm rounded-lg focus:outline-none border"
            style={{ 
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleReply()}
          />
          <button
            onClick={handleReply}
            disabled={!replyText.trim()}
            className={`p-1.5 text-black rounded-lg transition-colors ${
              replyText.trim() ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ backgroundColor: '#ffffff' }}
          >
            <Send className="h-3 w-3" />
          </button>
        </motion.div>
      )}

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 space-y-2 border-l-2 pl-3" style={{ borderLeftColor: 'rgba(255, 255, 255, 0.1)' }}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onDelete={onDelete}
              isOwner={reply.author === 'You'}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BlackNoteThread;