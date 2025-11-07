import { motion, useDragControls } from 'framer-motion'
import { useState, useCallback, useEffect, useRef } from 'react'
import { 
  Edit2,
  Trash2,
  MessageSquare,
  Share2,
  Heart,
  Bookmark
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

// Oval-shaped Note Component
const OvalNote = ({ 
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
  colorVariant = 'red'
}) => {
  const [noteContent, setNoteContent] = useState(content);
  const [currentColor, setCurrentColor] = useState(colorVariant);
  const textareaRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const dragControls = useDragControls();

  const colors = COLOR_VARIANTS[currentColor];

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
    if (noteContent.trim() && !isSaving) {
      setIsSaving(true);
      try {
        await onSave?.(noteContent, currentColor);
      } finally {
        setIsSaving(false);
      }
    }
  }, [noteContent, currentColor, onSave, isSaving]);

  const handleTextareaChange = (e) => {
    setNoteContent(e.target.value);
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
            <textarea
              ref={textareaRef}
              value={noteContent}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="What's on your mind? (Press Enter to save)"
              className="w-full h-20 p-3 text-sm rounded-xl resize-none focus:outline-none border-none"
              style={{ 
                color: colors.primary,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '500'
              }}
              disabled={isSaving}
            />
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

        {/* Bottom Button Group */}
        <div 
          className="flex items-center justify-center space-x-1 py-2 mx-4 mb-3 rounded-full bg-white border"
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
            className="p-2 rounded-full transition-colors hover:bg-gray-100"
            title="Add comment"
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
      </div>
    </motion.div>
  );
};

export default OvalNote; 