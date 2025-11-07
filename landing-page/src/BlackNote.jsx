import { motion, useDragControls } from 'framer-motion'
import { useState, useCallback, useEffect, useRef } from 'react'
import { 
  Edit2,
  Trash2,
  FileText
} from 'lucide-react'

// Black-themed Developer Note Component
const BlackNote = ({ 
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
  onPositionChange
}) => {
  const [noteContent, setNoteContent] = useState(content);
  const textareaRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const dragControls = useDragControls();

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
        await onSave?.(noteContent);
      } finally {
        setIsSaving(false);
      }
    }
  }, [noteContent, onSave, isSaving]);

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
      {/* Main Note Container */}
      <div className="rounded-3xl border w-[320px] overflow-hidden"
           style={{ 
             backgroundColor: '#03190F',
             borderColor: 'rgba(255, 255, 255, 0.1)'
           }}>
        {/* Note Header with Black/Dark Green Theme */}
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

        {/* Note Content Area with Same Dark Background */}
        <div 
          className="p-4"
          style={{ backgroundColor: '#03190F' }}
        >
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={noteContent}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your code notes here... (Press Enter to save)"
              className="w-full h-24 p-3 text-sm rounded-lg resize-none focus:outline-none border"
              style={{ 
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                '::placeholder': { color: 'rgba(255, 255, 255, 0.5)' }
              }}
              disabled={isSaving}
            />
          ) : (
            <div 
              className="min-h-[6rem] p-3 text-sm whitespace-pre-wrap break-words cursor-pointer rounded-lg border border-transparent hover:border-white hover:border-opacity-20 transition-colors text-white"
              onClick={() => onEdit?.()}
            >
              {noteContent || "Click to add developer notes..."}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlackNote; 