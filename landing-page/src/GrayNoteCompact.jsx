import { motion } from 'framer-motion'
import { useState, useCallback, useEffect, useRef } from 'react'
import { 
  AtSign,
  Image,
  MessageSquare,
  Heart
} from 'lucide-react'

// Compact Gray Note Component (No Header) - For Dashboard Compact View
const GrayNoteCompact = ({ 
  content = "",
  author = "You",
  avatar = "YO",
  timestamp = "just now",
  comments = 0,
  likes = 0,
  onSave,
  onEdit,
  onCancel,
  onDelete,
  onHover,
  onMouseLeave,
  onClick,
  isHovered = false,
  isSelected = false,
  simplified = false,
  className = ""
}) => {
  const [noteContent, setNoteContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = useCallback(async () => {
    if (noteContent.trim() && !isSaving) {
      setIsSaving(true);
      try {
        await onSave?.(noteContent);
        setIsEditing(false);
      } finally {
        setIsSaving(false);
      }
    }
  }, [noteContent, onSave, isSaving]);

  const handleTextareaChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setNoteContent(content); // Reset to original content
      onCancel?.();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    onEdit?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`bg-white rounded-2xl border w-full overflow-hidden cursor-pointer transition-all duration-200 ${className}`}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
      onClick={(e) => {
        e.stopPropagation();
        if (isEditing) return;
        if (onClick) {
          onClick();
        } else {
          handleEdit();
        }
      }}
      style={{
        boxShadow: (isSelected || isHovered) ? '0 4px 12px rgba(16, 185, 129, 0.15)' : '0 2px 6px rgba(0, 0, 0, 0.08)',
        borderColor: isSelected ? '#10B981' : (isHovered ? '#10B981' : '#e5e7eb'),
        borderWidth: isSelected ? '2px' : '1px'
      }}
    >
      {/* Compact Content Area */}
      <div className="p-4">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={noteContent}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Edit your note... (Press Enter to save, Esc to cancel)"
            className="w-full h-20 p-3 text-sm rounded-lg resize-none focus:outline-none border border-gray-300 focus:border-green-500"
            style={{ 
              color: '#374151',
              backgroundColor: 'white'
            }}
            disabled={isSaving}
          />
        ) : (
          <div className="space-y-3">
            {/* Note Content */}
            <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
              {content || "Click to add note content..."}
            </p>
            
            {/* Metadata Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs" style={{ color: '#9ca3af' }}>
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{ 
                    backgroundColor: '#E8E8E8',
                    color: '#4A4A4A'
                  }}
                >
                  {avatar?.charAt(0) || 'U'}
                </div>
                <span className="font-medium">{author}</span>
                <span>•</span>
                <span>{timestamp}</span>
              </div>
              
              {/* Interaction Buttons */}
              <div className="flex items-center space-x-3">
                {comments > 0 && (
                  <div className="flex items-center space-x-1 text-xs" style={{ color: '#6b7280' }}>
                    <MessageSquare className="h-3 w-3" />
                    <span>{comments}</span>
                  </div>
                )}
                {likes > 0 && (
                  <div className="flex items-center space-x-1 text-xs" style={{ color: '#ef4444' }}>
                    <Heart className="h-3 w-3 fill-current" />
                    <span>{likes}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer - Simplified for dashboard or full for regular use */}
      {isEditing && (
        <div 
          className="px-4 py-3 border-t flex items-center"
          style={{ 
            backgroundColor: '#F8F8F8',
            borderTopColor: 'rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Advanced options only when not simplified */}
          {!simplified && (
            <div className="flex items-center space-x-4 mr-4">
              <button 
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                title="Mention someone"
              >
                <AtSign className="h-4 w-4" />
                <span className="text-xs">Mention</span>
              </button>
              
              <button 
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                title="Add image"
              >
                <Image className="h-4 w-4" />
                <span className="text-xs">Image</span>
              </button>
            </div>
          )}
          
          {/* Action buttons - always present */}
          <div className={`${simplified ? 'w-full' : 'ml-auto'} flex items-center space-x-2`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false);
                setNoteContent(content);
                onCancel?.();
              }}
              className="px-3 py-1 text-xs rounded-md transition-colors"
              style={{ 
                color: '#6b7280',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              disabled={!noteContent.trim() || isSaving}
              className="px-3 py-1 text-xs rounded-md transition-colors"
              style={{ 
                backgroundColor: noteContent.trim() ? '#10B981' : '#e5e7eb',
                color: noteContent.trim() ? '#ffffff' : '#9ca3af'
              }}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GrayNoteCompact;
