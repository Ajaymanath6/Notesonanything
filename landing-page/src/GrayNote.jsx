import { motion, useDragControls } from 'framer-motion'
import { useState, useCallback, useEffect, useRef } from 'react'
import { 
  Edit2,
  Trash2,
  FileText,
  AtSign,
  Image,
  Scissors,
  Copy,
  Square,
  Plus,
  Layers,
  Maximize2,
  Camera,
  Sparkles,
  Type,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  X,
  Search
} from 'lucide-react'

// Gray-themed Note Component
const GrayNote = ({ 
  content = "",
  author = "You",
  avatar = "YO",
  timestamp = "just now",
  position,
  variant = "comment", // "comment", "editing", "collapsed"
  onSave,
  onEdit,
  onCancel,
  onDelete,
  onPositionChange,
  onVariantChange
}) => {
  const [noteContent, setNoteContent] = useState(content);
  const textareaRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const dragControls = useDragControls();
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null); // 'jira' or 'notion'
  
  // Jira integration state
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedWorkType, setSelectedWorkType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [summary, setSummary] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProjectList, setShowProjectList] = useState(false);
  const [showWorkTypeList, setShowWorkTypeList] = useState(false);
  const [showStatusList, setShowStatusList] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState("");

  // Mock Jira projects
  const mockProjects = [
    { id: 1, name: "Web App Redesign", key: "WAR" },
    { id: 2, name: "Mobile App Development", key: "MAD" },
    { id: 3, name: "API Integration", key: "API" },
    { id: 4, name: "Bug Fixes", key: "BUG" },
    { id: 5, name: "Feature Requests", key: "FR" },
  ];

  // Mock work types
  const mockWorkTypes = [
    { id: 1, name: "Task", key: "TASK" },
    { id: 2, name: "Bug", key: "BUG" },
    { id: 3, name: "Story", key: "STORY" },
    { id: 4, name: "Epic", key: "EPIC" },
    { id: 5, name: "Subtask", key: "SUB" },
  ];

  // Mock statuses
  const mockStatuses = [
    { id: 1, name: "To Do" },
    { id: 2, name: "In Progress" },
    { id: 3, name: "In Review" },
    { id: 4, name: "Done" },
    { id: 5, name: "Blocked" },
  ];

  // Mock users for assignment
  const mockUsers = [
    { id: 1, name: "Alex Johnson", email: "alex@company.com", avatar: "AJ" },
    { id: 2, name: "Sarah Chen", email: "sarah@company.com", avatar: "SC" },
    { id: 3, name: "Mike Davis", email: "mike@company.com", avatar: "MD" },
    { id: 4, name: "Emily Rodriguez", email: "emily@company.com", avatar: "ER" },
    { id: 5, name: "Tom Wilson", email: "tom@company.com", avatar: "TW" },
  ];

  // Filter users based on search
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  // Sync content from props when content changes
  useEffect(() => {
    setNoteContent(content);
  }, [content]);

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (variant === "editing" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [variant]);

  // Handle escape key and other keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (!noteContent.trim() || variant === "editing") {
          onCancel?.();
        }
        if (showSidePanel) {
          setShowSidePanel(false);
        }
      }
    };

    if (variant === "editing" || showSidePanel) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [variant, noteContent, onCancel, showSidePanel]);

  // Handle click outside to close side panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSidePanel && !event.target.closest('.side-panel-container') && !event.target.closest('.integration-buttons-container')) {
        setShowSidePanel(false);
      }
    };

    if (showSidePanel) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSidePanel]);

  // Handle click outside for project and user dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProjectList && !event.target.closest('.project-select-container')) {
        setShowProjectList(false);
      }
      if (showWorkTypeList && !event.target.closest('.work-type-select-container')) {
        setShowWorkTypeList(false);
      }
      if (showStatusList && !event.target.closest('.status-select-container')) {
        setShowStatusList(false);
      }
      if (showUserList && !event.target.closest('.user-select-container')) {
        setShowUserList(false);
      }
    };

    if (showProjectList || showWorkTypeList || showStatusList || showUserList) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showProjectList, showWorkTypeList, showStatusList, showUserList]);

  const handleSave = useCallback(async () => {
    if (noteContent.trim() && !isSaving) {
      setIsSaving(true);
      try {
        await onSave?.(noteContent);
        // Change to collapsed variant after saving
        onVariantChange?.("collapsed");
      } finally {
        setIsSaving(false);
      }
    }
  }, [noteContent, onSave, isSaving, onVariantChange]);

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

  const handleExpandNote = () => {
    onVariantChange?.("editing");
  };

  const handleCommentClick = () => {
    onVariantChange?.("editing");
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
      {variant === "comment" && (
        /* Comment Icon Variant */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #10B981',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}
          onClick={handleCommentClick}
          title={`Click to create note by ${author}`}
        >
          <span className="text-green-600 font-bold text-lg">
            {author.charAt(0).toUpperCase()}
          </span>
        </motion.div>
      )}

      {variant === "editing" && (
        /* Full Note Container - Editing Variant */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl border border-gray-200 backdrop-blur-xl w-[320px] overflow-hidden"
        >
        {/* Note Header with Gray Theme */}
        <div 
          className="flex items-center justify-between p-4 border-b cursor-move"
          style={{ 
            backgroundColor: '#E8E8E8',
            borderBottomColor: 'rgba(0, 0, 0, 0.1)'
          }}
          onPointerDown={handleDragStart}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
              style={{ 
                backgroundColor: '#4A4A4A',
                color: '#E8E8E8'
              }}
            >
              {avatar || (
                <FileText className="h-4 w-4" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-800">{author}</h3>
              <p className="text-xs text-gray-600">{timestamp}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Integration Buttons */}
            <div className="integration-buttons-container flex items-center" style={{ marginRight: "8px" }}>
              {/* Jira Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIntegration('jira');
                  setShowSidePanel(!showSidePanel);
                }}
                className="transition-all duration-200 hover:scale-110 flex items-center justify-center rounded-l-lg"
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(209, 213, 219, 0.6)",
                  marginRight: "-1px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                title="Open options panel"
              >
                {/* Jira Logo */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="#1868DB" d="M7.967 21.323H5.748C2.401 21.323 0 19.273 0 16.271h11.933c.618 0 1.018.44 1.018 1.062V29.34c-2.983 0-4.984-2.416-4.984-5.784zm5.894-5.967h-2.22c-3.346 0-5.747-2.013-5.747-5.015h11.932c.618 0 1.055.402 1.055 1.025v12.007c-2.983 0-5.02-2.416-5.02-5.784zm5.93-5.93h-2.22c-3.347 0-5.748-2.05-5.748-5.052h11.933c.618 0 1.019.439 1.019 1.025v12.007c-2.983 0-4.984-2.416-4.984-5.784z"></path>
                </svg>
              </button>

              {/* Notion Badge Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIntegration('notion');
                  setShowSidePanel(!showSidePanel);
                }}
                className="transition-all duration-200 hover:scale-110 flex items-center justify-center rounded-r-lg"
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(209, 213, 219, 0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                title="Open options panel"
              >
                {/* Official Notion Logo */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 29 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1.81 1.294L18.446.068c2.043-.175 2.568-.057 3.852.875l5.311 3.733c.877.642 1.169.817 1.169 1.516v20.473c0 1.283-.468 2.042-2.102 2.158L7.357 29.99c-1.228.058-1.811-.117-2.454-.934l-3.91-5.074C.29 23.048 0 22.349 0 21.532V3.334c0-1.049.468-1.924 1.81-2.04z" fill="#fff"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.447.068L1.808 1.294C.468 1.41 0 2.285 0 3.334v18.198c0 .817.291 1.516.992 2.45l3.911 5.074c.643.817 1.226.992 2.453.934l19.321-1.167c1.634-.116 2.102-.875 2.102-2.158V6.192c0-.663-.263-.854-1.037-1.42l-.132-.096L22.3.943c-1.285-.932-1.81-1.05-3.854-.875zM7.793 5.857c-1.577.106-1.936.13-2.831-.597L2.685 3.452c-.233-.234-.116-.526.467-.584l15.995-1.166c1.342-.117 2.043.35 2.568.758l2.744 1.983c.117.059.408.408.058.408l-16.52.992-.203.014zM5.954 26.49V9.11c0-.759.234-1.109.934-1.168l18.971-1.108c.643-.058.935.35.935 1.108v17.264c0 .759-.117 1.401-1.168 1.459l-18.154 1.05c-1.05.058-1.518-.291-1.518-1.225zm17.922-16.448c.116.525 0 1.05-.527 1.11l-.874.173v12.832c-.76.408-1.46.641-2.044.641-.934 0-1.168-.292-1.868-1.166l-5.721-8.982v8.69l1.81.409s0 1.05-1.46 1.05l-4.027.233c-.117-.234 0-.817.408-.933l1.051-.291v-11.49L9.165 12.2c-.117-.525.174-1.283.992-1.341l4.32-.292 5.954 9.1v-8.05l-1.518-.174c-.116-.643.35-1.109.934-1.167l4.029-.234z" fill="#000"></path>
                </svg>
              </button>
            </div>

            {/* Delete button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              title="Delete note"
            >
              <Trash2 className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Note Content Area with White Background */}
        <div className="p-4 bg-white">
          <textarea
            ref={textareaRef}
            value={noteContent}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your note here... (Press Enter to save)"
            className="w-full h-24 p-3 text-sm rounded-lg resize-none focus:outline-none border border-gray-300 focus:border-gray-500"
            style={{ 
              color: '#374151',
              backgroundColor: 'white'
            }}
            disabled={isSaving}
          />
        </div>

        {/* Footer with @ and Image Icons */}
        <div 
          className="px-4 py-3 border-t flex items-center space-x-4"
          style={{ 
            backgroundColor: '#F8F8F8',
            borderTopColor: 'rgba(0, 0, 0, 0.1)'
          }}
        >
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
        </motion.div>
      )}

      {variant === "collapsed" && (
        /* Collapsed Note Variant */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #10B981',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}
          onClick={handleExpandNote}
          title={`Click to expand note by ${author}`}
        >
          <span className="text-green-600 font-bold text-lg">
            {author.charAt(0).toUpperCase()}
          </span>
        </motion.div>
      )}

      {/* Side Panel - Jira Integration */}
      {showSidePanel && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="side-panel-container absolute z-[200] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col"
          style={{
            left: "340px",
            top: "0px",
            width: "280px",
          }}
        >
          {/* Arrow pointing to note - positioned in the middle */}
          <div
            className="absolute left-0"
            style={{ 
              zIndex: 201,
              top: "50%",
              transform: "translate(-100%, -50%)",
            }}
          >
            <div
              className="w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent"
              style={{
                filter: "drop-shadow(-2px 0 2px rgba(0, 0, 0, 0.1))",
              }}
            />
          </div>

          {/* Header with Integration Logo */}
          <div 
            className="px-4 py-3 rounded-t-3xl flex items-center justify-between"
            style={{
              backgroundColor: "rgb(232, 232, 232)",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center space-x-2">
              {selectedIntegration === 'jira' ? (
                <>
                  {/* Jira Logo */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="#1868DB" d="M7.967 21.323H5.748C2.401 21.323 0 19.273 0 16.271h11.933c.618 0 1.018.44 1.018 1.062V29.34c-2.983 0-4.984-2.416-4.984-5.784zm5.894-5.967h-2.22c-3.346 0-5.747-2.013-5.747-5.015h11.932c.618 0 1.055.402 1.055 1.025v12.007c-2.983 0-5.02-2.416-5.02-5.784zm5.93-5.93h-2.22c-3.347 0-5.748-2.05-5.748-5.052h11.933c.618 0 1.019.439 1.019 1.025v12.007c-2.983 0-4.984-2.416-4.984-5.784z"></path>
                  </svg>
                  <span className="font-semibold text-sm text-gray-800">Jira Integration</span>
                </>
              ) : selectedIntegration === 'notion' ? (
                <>
                  {/* Notion Logo */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 29 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.81 1.294L18.446.068c2.043-.175 2.568-.057 3.852.875l5.311 3.733c.877.642 1.169.817 1.169 1.516v20.473c0 1.283-.468 2.042-2.102 2.158L7.357 29.99c-1.228.058-1.811-.117-2.454-.934l-3.91-5.074C.29 23.048 0 22.349 0 21.532V3.334c0-1.049.468-1.924 1.81-2.04z" fill="#fff"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.447.068L1.808 1.294C.468 1.41 0 2.285 0 3.334v18.198c0 .817.291 1.516.992 2.45l3.911 5.074c.643.817 1.226.992 2.453.934l19.321-1.167c1.634-.116 2.102-.875 2.102-2.158V6.192c0-.663-.263-.854-1.037-1.42l-.132-.096L22.3.943c-1.285-.932-1.81-1.05-3.854-.875zM7.793 5.857c-1.577.106-1.936.13-2.831-.597L2.685 3.452c-.233-.234-.116-.526.467-.584l15.995-1.166c1.342-.117 2.043.35 2.568.758l2.744 1.983c.117.059.408.408.058.408l-16.52.992-.203.014zM5.954 26.49V9.11c0-.759.234-1.109.934-1.168l18.971-1.108c.643-.058.935.35.935 1.108v17.264c0 .759-.117 1.401-1.168 1.459l-18.154 1.05c-1.05.058-1.518-.291-1.518-1.225zm17.922-16.448c.116.525 0 1.05-.527 1.11l-.874.173v12.832c-.76.408-1.46.641-2.044.641-.934 0-1.168-.292-1.868-1.166l-5.721-8.982v8.69l1.81.409s0 1.05-1.46 1.05l-4.027.233c-.117-.234 0-.817.408-.933l1.051-.291v-11.49L9.165 12.2c-.117-.525.174-1.283.992-1.341l4.32-.292 5.954 9.1v-8.05l-1.518-.174c-.116-.643.35-1.109.934-1.167l4.029-.234z" fill="#000"></path>
                  </svg>
                  <span className="font-semibold text-sm text-gray-800">Notion Integration</span>
                </>
              ) : null}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSidePanel(false);
                setSelectedIntegration(null);
              }}
              className="p-1 hover:bg-gray-300 rounded transition-colors"
            >
              <X className="h-4 w-4 text-gray-800" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="p-4 space-y-4 flex-1">
            {/* Project Selection */}
            <div className="project-select-container relative">
              <label className="block text-xs font-medium text-gray-800 mb-2">
                Select Project
              </label>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProjectList(!showProjectList);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left bg-white"
              >
                <span className="text-sm text-gray-900">
                  {selectedProject ? selectedProject.name : "Select a project"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {/* Project Dropdown */}
              {showProjectList && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                  {mockProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                        setShowProjectList(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {project.name}
                        </div>
                        <div className="text-xs text-gray-500">{project.key}</div>
                      </div>
                      {selectedProject?.id === project.id && (
                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Project Display */}
            {selectedProject && (
              <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-xs font-medium text-gray-900">
                  {selectedProject.name}
                </div>
                <div className="text-xs text-gray-600">{selectedProject.key}</div>
              </div>
            )}

            {/* Work Type Selection */}
            <div className="work-type-select-container relative">
              <label className="block text-xs font-medium text-gray-800 mb-2">
                Work Type
              </label>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWorkTypeList(!showWorkTypeList);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left bg-white"
              >
                <span className="text-sm text-gray-900">
                  {selectedWorkType ? selectedWorkType.name : "Select work type"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {/* Work Type Dropdown */}
              {showWorkTypeList && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                  {mockWorkTypes.map((workType) => (
                    <button
                      key={workType.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWorkType(workType);
                        setShowWorkTypeList(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {workType.name}
                        </div>
                        <div className="text-xs text-gray-500">{workType.key}</div>
                      </div>
                      {selectedWorkType?.id === workType.id && (
                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Selection */}
            <div className="status-select-container relative">
              <label className="block text-xs font-medium text-gray-800 mb-2">
                Status
              </label>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowStatusList(!showStatusList);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left bg-white"
              >
                <span className="text-sm text-gray-900">
                  {selectedStatus ? selectedStatus.name : "Select status"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {/* Status Dropdown */}
              {showStatusList && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                  {mockStatuses.map((status) => (
                    <button
                      key={status.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStatus(status);
                        setShowStatusList(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {status.name}
                      </div>
                      {selectedStatus?.id === status.id && (
                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Summary Field */}
            <div>
              <label className="block text-xs font-medium text-gray-800 mb-2">
                Summary
              </label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Enter summary..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Assignee Field */}
            <div className="user-select-container relative">
              <label className="block text-xs font-medium text-gray-800 mb-2">
                Assignee
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => {
                    setUserSearchQuery(e.target.value);
                    setShowUserList(true);
                  }}
                  onClick={() => setShowUserList(true)}
                  placeholder="Search user..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* User Dropdown */}
              {showUserList && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                          setUserSearchQuery(user.name);
                          setShowUserList(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                          style={{ backgroundColor: "rgb(147, 197, 253)" }}
                        >
                          {user.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        {selectedUser?.id === user.id && (
                          <div className="w-2 h-2 rounded-full bg-gray-600" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-gray-500 text-center">
                      No users found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected User Display */}
            {selectedUser && (
              <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: "rgb(147, 197, 253)" }}
                  >
                    {selectedUser.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">
                      {selectedUser.name}
                    </p>
                    <p className="text-xs text-gray-600">{selectedUser.email}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer with Create and Cancel Buttons */}
          <div 
            className="px-4 py-3 rounded-b-3xl border-t flex items-center space-x-3"
            style={{
              backgroundColor: "rgb(248, 248, 248)",
              borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSidePanel(false);
                setSelectedIntegration(null);
                setSelectedProject(null);
                setSelectedWorkType(null);
                setSelectedStatus(null);
                setSummary("");
                setSelectedUser(null);
                setUserSearchQuery("");
              }}
              className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (selectedProject && selectedUser) {
                  console.log("Creating Jira ticket:", {
                    project: selectedProject,
                    workType: selectedWorkType,
                    status: selectedStatus,
                    summary: summary,
                    assignee: selectedUser,
                    content: noteContent,
                  });
                  // Here you would call the actual Jira API
                  alert(
                    `Jira ticket created in ${selectedProject.name} assigned to ${selectedUser.name}`
                  );
                  setShowSidePanel(false);
                  setSelectedIntegration(null);
                  setSelectedProject(null);
                  setSelectedWorkType(null);
                  setSelectedStatus(null);
                  setSummary("");
                  setSelectedUser(null);
                  setUserSearchQuery("");
                }
              }}
              disabled={!selectedProject || !selectedUser}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-colors ${
                selectedProject && selectedUser
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Create
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GrayNote; 