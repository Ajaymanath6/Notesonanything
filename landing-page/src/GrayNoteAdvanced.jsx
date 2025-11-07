import { motion, useDragControls } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import {
  Edit2,
  Trash2,
  FileText,
  AtSign,
  Image,
  Copy,
  Settings,
  ExternalLink,
  X,
} from "lucide-react";

// Advanced Gray-themed Note Component with Connection Handle and Hover Toolbar
const GrayNoteAdvanced = ({
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
  onJiraIntegration,
  onPositionChange,
  onVariantChange,
}) => {
  const [noteContent, setNoteContent] = useState(content);
  const [isHovered, setIsHovered] = useState(false);
  const [showJiraModal, setShowJiraModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  // Mock users for Jira assignment
  const mockUsers = [
    { id: 1, name: "Alex Johnson", email: "alex@company.com", avatar: "AJ" },
    { id: 2, name: "Sarah Chen", email: "sarah@company.com", avatar: "SC" },
    { id: 3, name: "Mike Davis", email: "mike@company.com", avatar: "MD" },
    {
      id: 4,
      name: "Emily Rodriguez",
      email: "emily@company.com",
      avatar: "ER",
    },
    { id: 5, name: "Tom Wilson", email: "tom@company.com", avatar: "TW" },
  ];
  const textareaRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const dragControls = useDragControls();

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
      if (e.key === "Escape") {
        if (!noteContent.trim() || variant === "editing") {
          onCancel?.();
        }
      }
    };

    if (variant === "editing") {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [variant, noteContent, onCancel]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  // Helper functions for hover management with delay
  const showToolbar = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setIsHovered(true);
  };

  const hideToolbar = () => {
    const timeout = setTimeout(() => {
      setIsHovered(false);
      setHideTimeout(null);
    }, 150); // 150ms delay to allow mouse movement to toolbar
    setHideTimeout(timeout);
  };

  const cancelHideToolbar = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
  };

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
    if (e.key === "Enter") {
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

  const handleConnectionHandle = (e) => {
    e.stopPropagation();
    // Handle connection logic here
    console.log("Connection handle clicked");
  };

  const handleJiraIntegration = (e) => {
    e.stopPropagation();
    // Show Jira user selection modal
    setShowJiraModal(true);
    setSelectedUser(null); // Reset selection
    setSearchQuery(""); // Reset search
    setShowUserList(false); // Hide user list initially
  };

  const handleSearchInputClick = () => {
    setShowUserList(true);
  };

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserList && !event.target.closest(".user-search-container")) {
        setShowUserList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserList]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowUserList(true);
  };

  const handleJiraUserSelect = (user) => {
    setSelectedUser(user);
    setSearchQuery(user.name); // Set search to selected user name
    setShowUserList(false); // Hide the list after selection
  };

  const handleJiraConfirm = () => {
    if (selectedUser) {
      // Create Jira ticket with selected user
      console.log(
        "Creating Jira ticket for user:",
        selectedUser,
        "with content:",
        noteContent
      );
      onJiraIntegration?.({
        content: noteContent,
        assignee: selectedUser,
      });

      // Close modal and reset
      setShowJiraModal(false);
      setSelectedUser(null);
      setSearchQuery("");
      setShowUserList(false);
    }
  };

  const handleJiraCancel = () => {
    setShowJiraModal(false);
    setSelectedUser(null);
    setSearchQuery("");
    setShowUserList(false);
  };

  // Filter users based on search query
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete?.();
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
      {/* Container for note and modal */}
      <div className="relative">
        {variant === "comment" && (
          /* Comment Icon Variant */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200"
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #10B981",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
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
          /* Full Note Container - Editing Variant with Advanced Features */
          <div className="relative">
            {/* Connection Handle - Integrated into Border */}
            <div className="relative">
              {/* Hovering Toolbar - Above Connection Handle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -5 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8,
                  y: isHovered ? 0 : -5,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="toolbar-container absolute -top-14 left-1/2 transform -translate-x-1/2 z-30 flex items-center bg-white rounded-lg shadow-2xl border border-gray-200"
                style={{
                  pointerEvents: isHovered ? "auto" : "none",
                }}
                onMouseEnter={showToolbar}
                onMouseLeave={hideToolbar}
              >
                {/* Jira Integration Button */}
                <button
                  onClick={handleJiraIntegration}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-blue-50 transition-colors duration-150 rounded-l-lg border-r border-gray-200"
                  title="Create a ticket in Jira"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">
                    Jira
                  </span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={handleDeleteClick}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-red-50 transition-colors duration-150 rounded-r-lg"
                  title="Delete Note"
                >
                  <Trash2 className="h-3.5 w-3.5 text-red-600" />
                  <span className="text-xs font-medium text-red-700">
                    Delete
                  </span>
                </button>
              </motion.div>

              {/* Connection Handle - Integrated into top border */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 z-20 w-6 h-6 rounded-full border-2 border-gray-300 bg-white cursor-pointer hover:border-gray-400 transition-all duration-200 flex items-center justify-center"
                style={{ top: "-12px" }} // Half the height (24px/2) to center on border
                onClick={handleConnectionHandle}
                title="Connection Handle"
              >
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-3xl border border-gray-200 shadow-2xl backdrop-blur-xl w-[320px] overflow-hidden"
            >
              {/* Note Header with Gray Theme */}
              <div
                className="note-header flex items-center justify-between p-4 cursor-move"
                style={{
                  backgroundColor: "rgb(232, 232, 232)",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                }}
                onPointerDown={handleDragStart}
                onMouseEnter={showToolbar}
                onMouseLeave={hideToolbar}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{
                      backgroundColor:
                        avatar === "JIRA" ? "rgb(147, 197, 253)" : "#4A4A4A",
                      color: avatar === "JIRA" ? "#ffffff" : "#E8E8E8",
                    }}
                  >
                    {avatar === "JIRA" ? (
                      <ExternalLink className="h-4 w-4" />
                    ) : (
                      avatar || <FileText className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-800">
                      {author}
                    </h3>
                    <p className="text-xs text-gray-600">{timestamp}</p>
                  </div>
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
                    color: "#374151",
                    backgroundColor: "white",
                  }}
                  disabled={isSaving}
                />
              </div>

              {/* Footer with @ and Image Icons */}
              <div
                className="px-4 py-3 flex items-center space-x-4"
                style={{
                  backgroundColor: "rgb(248, 248, 248)",
                  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
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
          </div>
        )}

        {variant === "collapsed" && (
          /* Collapsed Note Variant with Advanced Features */
          <div className="relative">
            {/* Connection Handle - Integrated into Border */}
            <div className="relative">
              {/* Hovering Toolbar - Above Connection Handle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -5 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8,
                  y: isHovered ? 0 : -5,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="toolbar-container absolute -top-14 left-1/2 transform -translate-x-1/2 z-30 flex items-center bg-white rounded-lg shadow-2xl border border-gray-200"
                style={{
                  pointerEvents: isHovered ? "auto" : "none",
                }}
                onMouseEnter={showToolbar}
                onMouseLeave={hideToolbar}
              >
                {/* Jira Integration Button */}
                <button
                  onClick={handleJiraIntegration}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-blue-50 transition-colors duration-150 rounded-l-lg border-r border-gray-200"
                  title="Create a ticket in Jira"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">
                    Jira
                  </span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={handleDeleteClick}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-red-50 transition-colors duration-150 rounded-r-lg"
                  title="Delete Note"
                >
                  <Trash2 className="h-3.5 w-3.5 text-red-600" />
                  <span className="text-xs font-medium text-red-700">
                    Delete
                  </span>
                </button>
              </motion.div>

              {/* Connection Handle - Integrated into top border */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 z-20 w-6 h-6 rounded-full border-2 border-gray-300 bg-white cursor-pointer hover:border-gray-400 transition-all duration-200 flex items-center justify-center"
                style={{ top: "-12px" }} // Half the height (24px/2) to center on border
                onClick={handleConnectionHandle}
                title="Connection Handle"
              >
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="note-avatar w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200"
              style={{
                backgroundColor: avatar === "JIRA" ? "rgb(147, 197, 253)" : "#ffffff",
                border:
                  avatar === "JIRA" ? "2px solid rgb(147, 197, 253)" : "2px solid #10B981",
                boxShadow:
                  avatar === "JIRA"
                    ? "0 4px 12px rgba(147, 197, 253, 0.3)"
                    : "0 4px 12px rgba(16, 185, 129, 0.3)",
              }}
              onClick={handleExpandNote}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={(e) => {
                // Only hide if not moving to the toolbar
                const relatedTarget = e.relatedTarget;
                if (
                  !relatedTarget ||
                  !relatedTarget.closest(".toolbar-container")
                ) {
                  setIsHovered(false);
                }
              }}
              title={`Click to expand note by ${author}`}
            >
              {avatar === "JIRA" ? (
                <ExternalLink className="h-6 w-6 text-white" />
              ) : (
                <span className="text-green-600 font-bold text-lg">
                  {author.charAt(0).toUpperCase()}
                </span>
              )}
            </motion.div>
          </div>
        )}

        {/* Jira User Selection Modal - Positioned to the right of the note */}
        {showJiraModal && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-[200] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col"
            style={{
              left: "340px", // Position to the right of the note (relative positioning)
              top: "0px",
              width: "300px",
              minHeight: "200px",
            }}
          >
            {/* Modal Header */}
            <div 
              className="px-4 py-3 rounded-t-3xl"
              style={{
                backgroundColor: "rgb(232, 232, 232)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 text-sm">
                  Select User
                </h3>
                <button
                  onClick={handleJiraCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Search Input Section */}
            <div className="p-4 flex-1">
              <div className="relative user-search-container">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClick={handleSearchInputClick}
                  placeholder="Select user"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-700"
                />

                {/* User Dropdown List */}
                {showUserList && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => handleJiraUserSelect(user)}
                          className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors duration-150 text-left"
                        >
                          {/* Avatar */}
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                            style={{
                              backgroundColor: "rgb(147, 197, 253)",
                              color: "#ffffff",
                            }}
                          >
                            {user.avatar}
                          </div>
                          {/* User Info */}
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-sm text-gray-500">
                        No users found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selected User Display */}
              {selectedUser && (
                <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                      style={{
                        backgroundColor: "rgb(147, 197, 253)",
                        color: "#ffffff",
                      }}
                    >
                      {selectedUser.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-800">
                        {selectedUser.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {selectedUser.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div 
              className="px-4 py-3 flex items-center justify-between rounded-b-3xl"
              style={{
                backgroundColor: "rgb(248, 248, 248)",
                borderTop: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <button
                onClick={handleJiraCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleJiraConfirm}
                disabled={!selectedUser}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedUser
                    ? "bg-gray-600 text-white hover:bg-gray-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                OK Done
              </button>
            </div>
          </motion.div>
        )}
      </div>{" "}
      {/* End of relative container */}
    </motion.div>
  );
};

export default GrayNoteAdvanced;
