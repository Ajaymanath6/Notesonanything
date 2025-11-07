import { motion } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import { useState, useCallback, useEffect } from "react";

// Modern thin scrollbar styles
const scrollbarStyles = `
  /* Modern thin scrollbar for all scrollable areas */
  .overflow-y-auto::-webkit-scrollbar {
    width: 3px;
  }
  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 2px;
  }
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #4b5563;
  }
  
  /* Firefox scrollbar */
  .overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: #6b7280 transparent;
  }

  /* Fullscreen Blur Overlay */
  #fullscreen-blur-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    background-color: rgba(240, 240, 240, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Green Overlay (keeping for compatibility) */
  .green-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 99999 !important;
    backdrop-filter: blur(18px) !important;
    -webkit-backdrop-filter: blur(18px) !important;
    background-color: rgba(240, 240, 240, 0.2) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

// Inject scrollbar styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = scrollbarStyles;
  styleElement.id = "modern-scrollbar-styles";
  if (!document.head.querySelector("#modern-scrollbar-styles")) {
    document.head.appendChild(styleElement);
  }
}
import { 
  Gear, 
  Lightbulb, 
  CurrencyDollar, 
  Question,
  Book,
  PlayCircle,
  Crown,
  ChatTeardrop,
  Share,
  Export,
  Link,
  CheckSquare,
  Square,
  X,
  SidebarSimple,
} from "phosphor-react";
import { CardStackDemo } from "./components/ui/card-stack-demo";
import NotyNote from "./NotyNote";
import GrayNote from "./GrayNote";
import GrayNoteAdvanced from "./GrayNoteAdvanced";
import BlackNote from "./BlackNote";
import OvalNote from "./OvalNote";
import ThreadsNote from "./ThreadsNote";
import BlackNoteThread from "./BlackNoteThread";
import GrayNoteThread from "./GrayNoteThread";
import OvalNoteThread from "./OvalNoteThread";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import Canvas from "./Canvas";
import { 
  ArrowRight, 
  Check, 
  MapPin, 
  MessageSquare, 
  Users, 
  Zap, 
  Target, 
  Globe, 
  Code, 
  Palette, 
  Building, 
  BarChart3,
  Clock,
  Shield,
  Star,
  ChevronRight,
  Play,
  TrendingDown,
  AlertTriangle,
  Timer,
  Edit2,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  ChevronDown,
  Plus,
  FileText,
  Settings,
  Send,
  Heart,
  Reply,
  MoreHorizontal,
  Trash2,
  Camera,
  Copy,
  StickyNote,
  MousePointer,
} from "lucide-react";

// Helper functions for cursor badge (now using ChatTeardrop icon)
// const getNoteTypeIcon = (noteType) => {
//   const isThread = noteType.includes('thread') || noteType === 'threads';
//   if (isThread) {
//     return <MessageSquare className="h-3 w-3" style={{ color: '#6b7280' }} />;
//   }
//   return <StickyNote className="h-3 w-3" style={{ color: '#6b7280' }} />;
// };

// Main App with clean minimal header and ThreadsNote illustrations
function App() {
  // App state management - Check authentication immediately to prevent flicker
  const [currentView, setCurrentView] = useState(() => {
    // Check localStorage synchronously during initial state setup
    const savedUser = localStorage.getItem("noa-user");
    console.log(
      "🔍 Initial auth check:",
      savedUser
        ? "User found - going to dashboard"
        : "No user - showing landing"
    );
    return savedUser ? "dashboard" : "landing";
  });
  
  // Note state management
  const [isNoteCreationMode, setIsNoteCreationMode] = useState(false);
  const [currentNoteType, setCurrentNoteType] = useState("yellow");
  const [notyNotes, setNotyNotes] = useState(() => {
    const saved = localStorage.getItem("noa-noty-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [grayNotes, setGrayNotes] = useState(() => {
    const saved = localStorage.getItem("noa-gray-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [grayAdvancedNotes, setGrayAdvancedNotes] = useState(() => {
    const saved = localStorage.getItem("noa-gray-advanced-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [blackNotes, setBlackNotes] = useState(() => {
    const saved = localStorage.getItem("noa-black-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [ovalNotes, setOvalNotes] = useState(() => {
    const saved = localStorage.getItem("noa-oval-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [threadsNotes, setThreadsNotes] = useState(() => {
    const saved = localStorage.getItem("noa-threads-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [blackThreadNotes, setBlackThreadNotes] = useState(() => {
    const saved = localStorage.getItem("noa-black-thread-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [grayThreadNotes, setGrayThreadNotes] = useState(() => {
    const saved = localStorage.getItem("noa-gray-thread-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [ovalThreadNotes, setOvalThreadNotes] = useState(() => {
    const saved = localStorage.getItem("noa-oval-thread-notes");
    return saved ? JSON.parse(saved) : [];
  });

  // Initialize side panel with existing gray notes (only once on load)
  useEffect(() => {
    // Load gray notes from localStorage and initialize side panel
    const saved = localStorage.getItem("noa-gray-notes");
    if (saved) {
      const loadedGrayNotes = JSON.parse(saved);
      const sidePanelData = loadedGrayNotes.map((note) => ({
        ...note,
        type: "gray",
      }));
      setSidePanelNotes(sidePanelData);
    }
  }, []); // Only run once on component mount
  const [showNote, setShowNote] = useState(false);
  const [notePosition, setNotePosition] = useState({ x: 0, y: 0 });
  const [isNoteActive, setIsNoteActive] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [currentNoteContent, setCurrentNoteContent] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [recentTextSelection, setRecentTextSelection] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false); // Normal cursor for text selection
  const [typingTimeoutId, setTypingTimeoutId] = useState(null);

  // Side panel state for gray notes
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [sidePanelNotes, setSidePanelNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState(new Set());
  const [shareMode, setShareMode] = useState(null); // 'all' or 'selected'

  // Video overlay state
  const [showVideoOverlay, setShowVideoOverlay] = useState(false);

  // Note variant management (not used for gray notes anymore since they're in side panel)

  // Authentication handlers
  const handleGetStarted = () => {
    setCurrentView("auth");
  };

  const handleBookDemo = () => {
    setCurrentView("canvas");
  };

  const handleBackFromCanvas = () => {
    setCurrentView("landing");
  };

  const handleAuthSuccess = (
    userData = { name: "Alex Johnson", email: "alex@example.com" }
  ) => {
    // Save user data to localStorage
    localStorage.setItem("noa-user", JSON.stringify(userData));
    
    setCurrentView("loading");
    
    // Simulate loading time and then navigate to dashboard
    setTimeout(() => {
      setCurrentView("dashboard");
    }, 2500); // 2.5 seconds loading
  };

  const handleLogout = () => {
    console.log("🔓 handleLogout called in App.jsx");

    // Double-check localStorage is cleared
    localStorage.removeItem("noa-user");

    // Force immediate redirect to landing
    setCurrentView("landing");
    console.log("🏠 Redirected to landing page");

    // Force page reload as backup to ensure clean state
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  // Toggle note creation mode
  const toggleNoteCreationMode = useCallback(() => {
    setIsNoteCreationMode(!isNoteCreationMode);
    // Reset selection-related states when toggling off
    if (isNoteCreationMode) {
      setIsSelectionMode(false);
      setIsSelecting(false);
      // Clear typing animation
      if (typingTimeoutId) {
        clearTimeout(typingTimeoutId);
        setTypingTimeoutId(null);
      }
    }
  }, [isNoteCreationMode, typingTimeoutId]);

  // Handle note type selection
  const handleNoteTypeSelection = useCallback((noteType) => {
    setCurrentNoteType(noteType);
    setIsNoteCreationMode(true);
  }, []);

  // Handle right-click to toggle selection mode
  const handleContextMenu = useCallback(
    (e) => {
    if (isNoteCreationMode) {
        e.preventDefault(); // Prevent default context menu
        setIsSelectionMode(!isSelectionMode);
      }
    },
    [isNoteCreationMode, isSelectionMode]
  );

  // Handle mouse move for cursor tracking
  const handleMouseMove = useCallback(
    (e) => {
      if (isNoteCreationMode && !isSelectionMode) {
        // Only show comment cursor badge when not in selection mode
      const badgeWidth = 120; // Smaller minimal badge width
      const padding = 16;
      
      let x = e.clientX + 12;
      let y = e.clientY - 35;
      
      // Keep badge within right edge
      if (x + badgeWidth > window.innerWidth - padding) {
        x = e.clientX - badgeWidth - 12;
      }
      
      // Keep badge within top edge
      if (y < padding) {
        y = e.clientY + 12;
      }
      
      setCursorPosition({ x, y });
    }
    },
    [isNoteCreationMode, isSelectionMode]
  );

  // Handle mousedown to detect start of potential text selection
  const handleMouseDown = useCallback(
    (e) => {
      if (!isNoteCreationMode || isNoteActive || !isSelectionMode) return;

      // Don't interfere with buttons, inputs, or existing notes
      if (
        e.target.closest("button") ||
        e.target.closest("input") ||
        e.target.closest("textarea") ||
        e.target.closest(".note-container")
      ) {
        return;
      }

      setIsSelecting(true);
    },
    [isNoteCreationMode, isNoteActive, isSelectionMode]
  );

  // Handle mouseup to finish selection
  const handleMouseUp = useCallback(() => {
    if (isSelecting && isSelectionMode) {
      setIsSelecting(false);

      const selection = window.getSelection();

      // Check if user selected text with more than 1 word
      if (selection && selection.toString().trim().length > 0) {
        const selectedText = selection.toString().trim();
        const wordCount = countWords(selectedText);

        if (wordCount > 1) {
          // Get the range and position of selected text
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          // Position note NEAR the selected text, not on the right side
          const position = {
            x: Math.min(rect.right + 20, window.innerWidth - 340), // 20px right of selection, or adjust if too close to edge
            y: Math.max(rect.top, 20), // Align with selection vertically
          };

          // Ensure position is within viewport bounds
          position.y = Math.min(position.y, window.innerHeight - 320);
          position.x = Math.max(position.x, 20); // Don't go too far left

          // Set note position and content
          setNotePosition(position);
          setCurrentNoteContent(selectedText);

          // Show the note NOW (after drag ends)
          setShowNote(true);
          setIsNoteActive(true);
          setActiveNoteId(null);

          // Side panel will only open when user clicks the toggle button

          // Clear the selection
          selection.removeAllRanges();

          // Mark that we just had a text selection
          setRecentTextSelection(true);
          setTimeout(() => {
            setRecentTextSelection(false);
          }, 100);
        }
      }

      // Always switch back to comment cursor mode and clean up
      setIsSelectionMode(false);

      // Clear typing animation
      if (typingTimeoutId) {
        clearTimeout(typingTimeoutId);
        setTypingTimeoutId(null);
      }
    }
  }, [isSelecting, isSelectionMode, currentNoteType, typingTimeoutId]);

  // Helper function to count words in selected text
  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  // Text selection change handler - No longer shows note during dragging
  const handleSelectionChange = useCallback(() => {
    // This function now only tracks selection state but doesn't show note
    if (!isNoteCreationMode || isNoteActive || !isSelecting || !isSelectionMode)
      return;

    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const selectedText = selection.toString().trim();
      const wordCount = countWords(selectedText);

      // Only track if user has selected more than 1 word, but don't show note yet
      if (wordCount > 1) {
        // Selection is valid but we'll process it in handleMouseUp
      }
    }
  }, [isNoteCreationMode, isNoteActive, isSelecting, isSelectionMode]);

  // Handle click for note creation (only in comment cursor mode)
  const handleClick = useCallback(
    (e) => {
      if (!isNoteCreationMode || recentTextSelection || isSelectionMode) return;

      if (
        !isNoteActive &&
        !e.target.closest(".note-container") &&
        !e.target.closest("button") &&
        !e.target.closest("a")
      ) {
      const position = {
        x: e.clientX,
          y: e.clientY,
      };
      
      const noteWidth = 320;
      const noteHeight = 300;
      
      position.x = Math.min(position.x, window.innerWidth - noteWidth - 20);
      position.y = Math.min(position.y, window.innerHeight - noteHeight - 20);
      position.x = Math.max(position.x, 20);
      position.y = Math.max(position.y, 20);
      
      setNotePosition(position);
        setCurrentNoteContent("");
      setShowNote(true);
      setIsNoteActive(true);
      setActiveNoteId(null);
      
        // Side panel will only open when user clicks the toggle button
      }
    },
    [
      isNoteActive,
      isNoteCreationMode,
      currentNoteType,
      recentTextSelection,
      isSelectionMode,
    ]
  );

  // Handle note save
  const handleUnifiedNoteSave = useCallback(
    (content) => {
    if (content.trim()) {
      if (activeNoteId) {
        // Update existing note
          if (currentNoteType === "yellow") {
            const updatedNotes = notyNotes.map((note) =>
            note.id === activeNoteId 
                ? {
                    ...note,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
              : note
          );
          setNotyNotes(updatedNotes);
            localStorage.setItem(
              "noa-noty-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "gray") {
            const updatedNotes = grayNotes.map((note) =>
            note.id === activeNoteId 
                ? {
                    ...note,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
              : note
          );
          setGrayNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-notes",
              JSON.stringify(updatedNotes)
            );

            // Also update in side panel
            const updatedSidePanelNotes = sidePanelNotes.map((note) =>
            note.id === activeNoteId 
                ? {
                    ...note,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
                : note
            );
            setSidePanelNotes(updatedSidePanelNotes);
            // Side panel will only open when user clicks the toggle button
          } else if (currentNoteType === "gray-advanced") {
            const updatedNotes = grayAdvancedNotes.map((note) =>
              note.id === activeNoteId
                ? {
                    ...note,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
                : note
            );
            setGrayAdvancedNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-advanced-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "black") {
            const updatedNotes = blackNotes.map((note) =>
              note.id === activeNoteId
                ? {
                    ...note,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
              : note
          );
          setBlackNotes(updatedNotes);
            localStorage.setItem(
              "noa-black-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "oval") {
            const updatedNotes = ovalNotes.map((note) =>
            note.id === activeNoteId 
                ? {
                    ...note,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
              : note
          );
          setOvalNotes(updatedNotes);
            localStorage.setItem(
              "noa-oval-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "threads") {
            const updatedNotes = threadsNotes.map((note) =>
            note.id === activeNoteId 
                ? {
                    ...note,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
              : note
          );
          setThreadsNotes(updatedNotes);
            localStorage.setItem(
              "noa-threads-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "black-thread") {
            const updatedNotes = blackThreadNotes.map((note) =>
            note.id === activeNoteId 
                ? {
                    ...note,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
              : note
          );
          setBlackThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-black-thread-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "gray-thread") {
            const updatedNotes = grayThreadNotes.map((note) =>
            note.id === activeNoteId 
                ? {
                    ...note,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
              : note
          );
          setGrayThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-thread-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "oval-thread") {
            const updatedNotes = ovalThreadNotes.map((note) =>
            note.id === activeNoteId 
                ? {
                    ...note,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
              : note
          );
          setOvalThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-oval-thread-notes",
              JSON.stringify(updatedNotes)
            );
        }
        setCurrentNoteContent(content.trim());
        setIsNoteActive(false);
      } else {
        // Create new note
        const newNote = {
          id: Date.now(),
          content: content.trim(),
          position: notePosition,
          timestamp: new Date().toISOString(),
            type: currentNoteType,
        };
        
          if (currentNoteType === "yellow") {
          const updatedNotes = [...notyNotes, newNote];
          setNotyNotes(updatedNotes);
            localStorage.setItem(
              "noa-noty-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "gray") {
          const updatedNotes = [...grayNotes, newNote];
          setGrayNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-notes",
              JSON.stringify(updatedNotes)
            );

            // Also add to side panel (but don't auto-open)
            const sidePanelNote = { ...newNote, type: "gray" };
            setSidePanelNotes((prev) => [...prev, sidePanelNote]);
            // Side panel will only open when user clicks the toggle button
          } else if (currentNoteType === "gray-advanced") {
            const updatedNotes = [...grayAdvancedNotes, newNote];
            setGrayAdvancedNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-advanced-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "black") {
          const updatedNotes = [...blackNotes, newNote];
          setBlackNotes(updatedNotes);
            localStorage.setItem(
              "noa-black-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "oval") {
          const updatedNotes = [...ovalNotes, newNote];
          setOvalNotes(updatedNotes);
            localStorage.setItem(
              "noa-oval-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "threads") {
          const newThreadsNote = { ...newNote, comments: [] };
          const updatedNotes = [...threadsNotes, newThreadsNote];
          setThreadsNotes(updatedNotes);
            localStorage.setItem(
              "noa-threads-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "black-thread") {
          const newThreadsNote = { ...newNote, comments: [] };
          const updatedNotes = [...blackThreadNotes, newThreadsNote];
          setBlackThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-black-thread-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "gray-thread") {
          const newThreadsNote = { ...newNote, comments: [] };
          const updatedNotes = [...grayThreadNotes, newThreadsNote];
          setGrayThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-thread-notes",
              JSON.stringify(updatedNotes)
            );
          } else if (currentNoteType === "oval-thread") {
          const newThreadsNote = { ...newNote, comments: [] };
          const updatedNotes = [...ovalThreadNotes, newThreadsNote];
          setOvalThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-oval-thread-notes",
              JSON.stringify(updatedNotes)
            );
        }
        
        setActiveNoteId(newNote.id);
        setCurrentNoteContent(content.trim());
        setIsNoteActive(false);
        setShowNote(false);
        setIsNoteCreationMode(false);
      }
    } else {
      setShowNote(false);
      setIsNoteActive(false);
      setActiveNoteId(null);
        setCurrentNoteContent("");
      setIsNoteCreationMode(false);
    }
    },
    [
      notePosition,
      notyNotes,
      grayNotes,
      grayAdvancedNotes,
      blackNotes,
      ovalNotes,
      threadsNotes,
      blackThreadNotes,
      grayThreadNotes,
      ovalThreadNotes,
      activeNoteId,
      currentNoteType,
      sidePanelNotes,
    ]
  );

  // Handle note cancel
  const handleNoteCancel = useCallback(() => {
    setShowNote(false);
    setIsNoteActive(false);
    setActiveNoteId(null);
    setCurrentNoteContent("");
    setIsSelecting(false);
    setIsSelectionMode(false);
    // Clear typing animation
    if (typingTimeoutId) {
      clearTimeout(typingTimeoutId);
      setTypingTimeoutId(null);
    }
    // Don't automatically re-enable creation mode
    setIsNoteCreationMode(false);
  }, [typingTimeoutId]);

  // Handle note edit
  const handleNotyEdit = useCallback(() => {
    setIsNoteActive(true);
    if (activeNoteId) {
      let existingNote = null;
      
      if (currentNoteType === "yellow") {
        existingNote = notyNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "gray") {
        existingNote = grayNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "gray-advanced") {
        existingNote = grayAdvancedNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "black") {
        existingNote = blackNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "oval") {
        existingNote = ovalNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "threads") {
        existingNote = threadsNotes.find((n) => n.id === activeNoteId);
      }
      
      if (existingNote) {
        setCurrentNoteContent(existingNote.content);
      }
    }
  }, [
    activeNoteId,
    currentNoteType,
    notyNotes,
    grayNotes,
    grayAdvancedNotes,
    blackNotes,
    ovalNotes,
    threadsNotes,
  ]);

  // Handle note deletion
  const handleDeleteNote = useCallback(() => {
    if (activeNoteId) {
      if (currentNoteType === "yellow") {
        const updatedNotes = notyNotes.filter((n) => n.id !== activeNoteId);
        setNotyNotes(updatedNotes);
        localStorage.setItem("noa-noty-notes", JSON.stringify(updatedNotes));
      } else if (currentNoteType === "gray") {
        const updatedNotes = grayNotes.filter((n) => n.id !== activeNoteId);
        setGrayNotes(updatedNotes);
        localStorage.setItem("noa-gray-notes", JSON.stringify(updatedNotes));

        // Also remove from side panel
        const updatedSidePanelNotes = sidePanelNotes.filter(
          (n) => n.id !== activeNoteId
        );
        setSidePanelNotes(updatedSidePanelNotes);
      } else if (currentNoteType === "gray-advanced") {
        const updatedNotes = grayAdvancedNotes.filter(
          (n) => n.id !== activeNoteId
        );
        setGrayAdvancedNotes(updatedNotes);
        localStorage.setItem(
          "noa-gray-advanced-notes",
          JSON.stringify(updatedNotes)
        );
      } else if (currentNoteType === "black") {
        const updatedNotes = blackNotes.filter((n) => n.id !== activeNoteId);
        setBlackNotes(updatedNotes);
        localStorage.setItem("noa-black-notes", JSON.stringify(updatedNotes));
      } else if (currentNoteType === "oval") {
        const updatedNotes = ovalNotes.filter((n) => n.id !== activeNoteId);
        setOvalNotes(updatedNotes);
        localStorage.setItem("noa-oval-notes", JSON.stringify(updatedNotes));
      } else if (currentNoteType === "threads") {
        const updatedNotes = threadsNotes.filter((n) => n.id !== activeNoteId);
        setThreadsNotes(updatedNotes);
        localStorage.setItem("noa-threads-notes", JSON.stringify(updatedNotes));
      }
    }
    handleNoteCancel();
  }, [
    activeNoteId,
    currentNoteType,
    notyNotes,
    grayNotes,
    grayAdvancedNotes,
    blackNotes,
    ovalNotes,
    threadsNotes,
    sidePanelNotes,
    handleNoteCancel,
  ]);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isNoteCreationMode) {
        setIsNoteCreationMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isNoteCreationMode]);

  // Prevent body scroll when video overlay is open
  useEffect(() => {
    if (showVideoOverlay) {
      // Lock scroll
      document.body.style.overflow = "hidden";
    } else {
      // Unlock scroll
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [showVideoOverlay]);

  // Real-time selection change listener - only when in selection mode
  useEffect(() => {
    if (isNoteCreationMode && isSelectionMode) {
      document.addEventListener("selectionchange", handleSelectionChange);
      return () =>
        document.removeEventListener("selectionchange", handleSelectionChange);
    }
  }, [isNoteCreationMode, isSelectionMode, handleSelectionChange]);

  // Helper function to get the content to display in note
  const getDisplayContent = () => {
    // Show current note content (now set directly from selection)
    return currentNoteContent;
  };

  // Side panel handlers
  const handleNoteSelect = useCallback(
    (noteId) => {
      const newSelected = new Set(selectedNotes);
      if (newSelected.has(noteId)) {
        newSelected.delete(noteId);
      } else {
        newSelected.add(noteId);
      }
      setSelectedNotes(newSelected);

      // Reset share mode when selection changes
      if (shareMode === "selected" && newSelected.size === 0) {
        setShareMode(null);
      }
    },
    [selectedNotes, shareMode]
  );

  const handleShareAll = useCallback(() => {
    // Set share mode to 'all' and clear selected notes
    setShareMode("all");
    setSelectedNotes(new Set());

    // Create shareable link with all notes
    const notesToShare = sidePanelNotes.map((note) => ({
      content: note.content,
      timestamp: note.timestamp,
      type: note.type,
    }));

    const shareData = {
      url: window.location.href,
      notes: notesToShare,
      shareType: "all",
    };

    // Copy to clipboard for now (can be extended with actual sharing)
    navigator.clipboard
      .writeText(JSON.stringify(shareData, null, 2))
      .then(() => {
        alert("All notes copied to clipboard! You can now share them.");
      })
      .catch(() => {
        console.log("Share data:", shareData);
        alert("Share data logged to console");
      });
  }, [sidePanelNotes]);

  const handleShareSelected = useCallback(() => {
    // Set share mode to 'selected'
    setShareMode("selected");

    const selectedNotesData = sidePanelNotes.filter((note) =>
      selectedNotes.has(note.id)
    );
    const notesToShare = selectedNotesData.map((note) => ({
      content: note.content,
      timestamp: note.timestamp,
      type: note.type,
    }));

    const shareData = {
      url: window.location.href,
      notes: notesToShare,
      shareType: "selected",
    };

    // Copy to clipboard for now (can be extended with actual sharing)
    navigator.clipboard
      .writeText(JSON.stringify(shareData, null, 2))
      .then(() => {
        alert(
          `${selectedNotes.size} selected notes copied to clipboard! You can now share them.`
        );
      })
      .catch(() => {
        console.log("Share data:", shareData);
        alert("Share data logged to console");
      });
  }, [sidePanelNotes, selectedNotes]);

  const closeSidePanel = useCallback(() => {
    setShowSidePanel(false);
  }, []);

  // Comment handlers for ThreadsNote
  const handleAddComment = useCallback(() => {}, []);
  const handleReplyComment = useCallback(() => {}, []);
  const handleLikeComment = useCallback(() => {}, []);
  const handleDeleteComment = useCallback(() => {}, []);

  // NOA Logo Component
  const NOALogo = ({ className = "h-8 w-8" }) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    return (
      <img src={`${baseUrl}logo.svg`} alt="NOA Logo" className={className} />
    );
  };

  // Side Panel Component for Gray Notes with Sharing (Landing Page Theme)
  const SidePanel = ({
    isOpen,
    onClose,
    onToggle,
    notes,
    selectedNotes,
    onNoteSelect,
    onShareSelected,
    onShareAll,
    shareMode,
  }) => {
    const toggleSelectAll = () => {
      if (selectedNotes.size === notes.length) {
        setSelectedNotes(new Set());
        // Reset share mode when deselecting all
        if (shareMode === "selected") {
          setShareMode(null);
        }
      } else {
        setSelectedNotes(new Set(notes.map((note) => note.id)));
      }
    };

    const allSelected = notes.length > 0 && selectedNotes.size === notes.length;
    const someSelected = selectedNotes.size > 0;

    return (
      <>
        {/* Toggle Button - Left Border Overlay with 3 Icons */}
        <motion.div
          className="fixed top-1/2 z-50"
          style={{
            right: isOpen ? "384px" : "0px", // 384px = w-96 width
            transform: "translateY(-50%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="relative flex items-center space-x-1 transition-all duration-200"
            style={{
              width: "108px", // Reduced width to minimize right spacing
              height: "36px",
              backgroundColor: "#FFFFFF",
              borderRadius: isOpen ? "18px 0 0 18px" : "18px 0 0 18px", // Fully rounded left side
              border: "1px solid #E5E7EB",
              boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.1)",
              padding: "4px 4px", // Reduced right padding
            }}
          >
            {/* 1. NOA Logo - Toggle Side Panel */}
            <div className="relative">
              <button
                onClick={onToggle}
                className="flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  border: "none",
                  cursor: "pointer",
                }}
                title={isOpen ? "Close Notes Panel" : "Open Notes Panel"}
              >
    <img 
      src={`${import.meta.env.BASE_URL || '/'}logo.svg`}
                  alt="NOA"
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                />
              </button>

              {/* Note Count Badge - Above First Logo */}
              {notes.length > 0 && (
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{
                    backgroundColor: "#EF4444",
                    color: "#FFFFFF",
                    boxShadow: "0 2px 4px rgba(239, 68, 68, 0.3)",
                    border: "2px solid white",
                  }}
                >
                  {notes.length > 9 ? "9+" : notes.length}
                </div>
              )}
            </div>

            {/* 2. Teardrop Icon - Comment Cursor Mode */}
            <button
              onClick={() => {
                console.log(
                  "💬 Teardrop clicked - Activating comment cursor mode"
                );
                setIsNoteCreationMode(true);
                setCurrentNoteType("gray"); // Default to gray notes
                setIsSelectionMode(false); // Disable selection mode
              }}
              className="flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor:
                  isNoteCreationMode && !isSelectionMode
                    ? "#10B981"
                    : "#F3F4F6",
                border: "none",
                cursor: "pointer",
              }}
              title="Comment Cursor Mode - Click anywhere to create note"
            >
              <ChatTeardrop
                size={16}
                weight="fill"
                color={
                  isNoteCreationMode && !isSelectionMode ? "#FFFFFF" : "#6B7280"
                }
              />
            </button>

            {/* 3. Cursor Arrow Icon - Text Selection Mode */}
            <button
              onClick={() => {
                console.log(
                  "➤ Cursor arrow clicked - Activating text selection mode"
                );
                setIsSelectionMode(true);
                setIsNoteCreationMode(true); // Enable creation mode for selection
                setCurrentNoteType("gray"); // Default to gray notes
              }}
              className="flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: isSelectionMode ? "#10B981" : "#F3F4F6",
                border: "none",
                cursor: "pointer",
              }}
              title="Text Selection Mode - Drag text to create note"
            >
              <MousePointer
                size={16}
                color={isSelectionMode ? "#FFFFFF" : "#6B7280"}
              />
            </button>
          </div>
        </motion.div>

        {/* Side Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 right-0 h-full w-96 shadow-2xl border-l border-gray-200 z-40 flex flex-col"
          style={{
            background:
              "linear-gradient(135deg, #FFFFFF 0%, rgba(249, 250, 251, 0.5) 50%, #FFFFFF 100%)",
          }}
        >
          {/* Header - Landing Page Style */}
          <div
            className="flex items-center justify-between border-b border-gray-100"
            style={{
              padding: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <NOALogo className="h-8 w-8" />
                <h3
                  className="font-bold text-gray-900"
                  style={{ fontFamily: "Lato, sans-serif", fontSize: "18px" }}
                >
                  Notes Panel
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#F3F4F6";
                e.target.style.borderColor = "#D1D5DB";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "#E5E7EB";
              }}
            >
              <X size={18} className="text-gray-600" />
            </button>
          </div>

          {/* Sharing Controls - Landing Page Style */}
          {notes.length > 0 && (
            <div
              className="border-b border-gray-100"
              style={{
                padding: "20px",
                backgroundColor: "rgba(249, 250, 251, 0.8)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleSelectAll}
                    className="flex items-center space-x-2 text-sm transition-colors"
                    style={{
                      fontFamily: "Lato, sans-serif",
                      color: allSelected ? "#10B981" : "#6B7280",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#10B981")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = allSelected
                        ? "#10B981"
                        : "#6B7280")
                    }
                  >
                    <div
                      className="w-4 h-4 rounded-sm border flex items-center justify-center"
                      style={{
                        borderColor: allSelected ? "#10B981" : "#D1D5DB",
                        backgroundColor: allSelected
                          ? "#10B981"
                          : "transparent",
                      }}
                    >
                      {allSelected && (
                        <div
                          className="w-2 h-2 rounded-sm"
                          style={{ backgroundColor: "#FFFFFF" }}
                        />
                      )}
                    </div>
                    <span className="font-medium">
                      Select All ({notes.length})
                    </span>
                  </button>
                </div>
                <div
                  className="text-xs font-medium"
                  style={{ color: "#6B7280" }}
                >
                  {selectedNotes.size} selected
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={onShareAll}
                  className="flex-1 flex items-center justify-center space-x-2 transition-all duration-200 text-sm font-medium"
                  style={{
                    backgroundColor:
                      shareMode === "all" ? "#10B981" : "#FFFFFF",
                    color: shareMode === "all" ? "#FFFFFF" : "#6B7280",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: shareMode === "all" ? "none" : "1px solid #E5E7EB",
                  }}
                  onMouseEnter={(e) => {
                    if (shareMode !== "all") {
                      e.target.style.backgroundColor = "#F9FAFB";
                      e.target.style.borderColor = "#D1D5DB";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (shareMode !== "all") {
                      e.target.style.backgroundColor = "#FFFFFF";
                      e.target.style.borderColor = "#E5E7EB";
                      e.target.style.color = "#6B7280";
                    }
                  }}
                >
                  <Share size={16} />
                  <span>Share All</span>
                </button>

                <button
                  onClick={onShareSelected}
                  disabled={!someSelected}
                  className={`flex-1 flex items-center justify-center space-x-2 transition-all duration-200 text-sm font-medium ${
                    someSelected ? "" : "cursor-not-allowed"
                  }`}
                  style={{
                    backgroundColor:
                      shareMode === "selected" && someSelected
                        ? "#10B981"
                        : someSelected
                        ? "#FFFFFF"
                        : "#F3F4F6",
                    color:
                      shareMode === "selected" && someSelected
                        ? "#FFFFFF"
                        : someSelected
                        ? "#6B7280"
                        : "#9CA3AF",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border:
                      shareMode === "selected" && someSelected
                        ? "none"
                        : someSelected
                        ? "1px solid #E5E7EB"
                        : "1px solid #E5E7EB",
                  }}
                  onMouseEnter={(e) => {
                    if (someSelected && shareMode !== "selected") {
                      e.target.style.backgroundColor = "#F9FAFB";
                      e.target.style.borderColor = "#D1D5DB";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (someSelected && shareMode !== "selected") {
                      e.target.style.backgroundColor = "#FFFFFF";
                      e.target.style.borderColor = "#E5E7EB";
                      e.target.style.color = "#6B7280";
                    }
                  }}
                >
                  <Export size={16} />
                  <span>Share Selected</span>
                </button>
              </div>
            </div>
          )}

          {/* Notes List - Collapsed Card Style */}
          <div className="flex-1 overflow-y-auto" style={{ padding: "20px" }}>
            {notes.length === 0 ? (
              <div className="text-center text-gray-500 mt-12">
                <ChatTeardrop
                  size={56}
                  className="mx-auto mb-6"
                  style={{ color: "#D1D5DB" }}
                />
                <h4
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "16px",
                    color: "#6B7280",
                  }}
                >
                  No notes yet
                </h4>
                <p className="text-sm" style={{ color: "#9CA3AF" }}>
                  Create gray notes to see them here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative transition-all cursor-pointer group"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: selectedNotes.has(note.id)
                        ? "2px solid #10B981"
                        : "1px solid #E5E7EB",
                      borderRadius: "12px",
                      padding: selectedNotes.has(note.id) ? "15px" : "16px", // Adjust padding to account for thicker border
                      transition: "all 0.2s ease-in-out",
                      boxSizing: "border-box", // Ensure borders are included in element size
                    }}
                    onClick={() => onNoteSelect(note.id)}
                    onMouseEnter={(e) => {
                      if (!selectedNotes.has(note.id)) {
                        e.target.style.borderColor = "#D1D5DB";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedNotes.has(note.id)) {
                        e.target.style.borderColor = "#E5E7EB";
                      }
                    }}
                  >
                    {/* Note Content - Collapsed Style */}
                    <div className="pr-8">
                      <p
                        className="text-gray-900 mb-3 line-clamp-3"
                        style={{
                          fontFamily: "Lato, sans-serif",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          fontWeight: "400",
                        }}
                      >
                        {note.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center text-xs"
                          style={{ color: "#9CA3AF" }}
                        >
                          <span className="font-medium">
                            {new Date(note.timestamp).toLocaleDateString()}
                          </span>
                          <span className="mx-2">•</span>
                          <span>
                            {new Date(note.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Landing Page Style */}
          {notes.length > 0 && (
            <div
              className="border-t border-gray-100"
              style={{
                padding: "20px",
                backgroundColor: "rgba(249, 250, 251, 0.8)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-medium"
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "14px",
                    color: "#6B7280",
                  }}
                >
                  {notes.length} notes total
                </span>
                <button
                  className="flex items-center space-x-2 transition-all duration-200 hover:bg-gray-100 rounded-lg"
                  style={{
                    padding: "8px 12px",
                    fontFamily: "Lato, sans-serif",
                    fontSize: "13px",
                    color: "#6B7280",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#374151")}
                  onMouseLeave={(e) => (e.target.style.color = "#6B7280")}
                >
                  <Link size={14} />
                  <span className="font-medium">Copy page link</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </>
    );
  };

  // Floating Note Button Component with Type Selection
  const FloatingNotyButton = ({ isActive, onToggle, onNoteTypeSelect }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMainButtonClick = () => {
      if (isActive) {
        onToggle();
      } else {
        setIsMenuOpen(!isMenuOpen);
      }
    };

    return (
      <div className="fixed bottom-6 right-6 z-40">
        {/* Note Type Options */}
        {isMenuOpen && !isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 flex flex-col space-y-2"
          >
            {/* Yellow Note Option */}
            <motion.button
              onClick={() => {
                onNoteTypeSelect("yellow");
                setIsMenuOpen(false);
              }}
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: "#FFF097",
                border: "2px solid #372804",
                color: "#372804",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Yellow Note"
            >
              <StickyNote className="h-5 w-5" />
            </motion.button>

            {/* Gray Note Option */}
            <motion.button
              onClick={() => {
                onNoteTypeSelect("gray");
                setIsMenuOpen(false);
              }}
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: "#E8E8E8",
                border: "2px solid #4A4A4A",
                color: "#4A4A4A",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Gray Note"
            >
              <StickyNote className="h-5 w-5" />
            </motion.button>

            {/* Gray Advanced Note Option */}
            <motion.button
              onClick={() => {
                onNoteTypeSelect("gray-advanced");
                setIsMenuOpen(false);
              }}
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: "#D1D5DB",
                border: "2px solid #374151",
                color: "#374151",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Gray Advanced Note (with toolbar)"
            >
              <Settings className="h-5 w-5" />
            </motion.button>

            {/* Black Note Option */}
            <motion.button
              onClick={() => {
                onNoteTypeSelect("black");
                setIsMenuOpen(false);
              }}
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: "#03190F",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                color: "#FFFFFF",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Black Note (Developer)"
            >
              <StickyNote className="h-5 w-5" />
            </motion.button>

            {/* Oval Note Option */}
            <motion.button
              onClick={() => {
                onNoteTypeSelect("oval");
                setIsMenuOpen(false);
              }}
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: "#DF6D7A",
                border: "2px solid #C85A67",
                color: "#FFFFFF",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Oval Note (Social)"
            >
              <StickyNote className="h-5 w-5" />
            </motion.button>

            {/* Threads Note Option */}
            <motion.button
              onClick={() => {
                onNoteTypeSelect("threads");
                setIsMenuOpen(false);
              }}
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: "#FFF097",
                border: "2px solid #372804",
                color: "#372804",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Threads Note (Yellow with Comments)"
            >
              <MessageSquare className="h-5 w-5" />
            </motion.button>

            {/* Black Thread Note Option */}
            <motion.button
              onClick={() => {
                onNoteTypeSelect("black-thread");
                setIsMenuOpen(false);
              }}
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: "#03190F",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                color: "#FFFFFF",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Black Thread Note (Developer with Comments)"
            >
              <MessageSquare className="h-5 w-5" />
            </motion.button>

            {/* Gray Thread Note Option */}
            <motion.button
              onClick={() => {
                onNoteTypeSelect("gray-thread");
                setIsMenuOpen(false);
              }}
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: "#E8E8E8",
                border: "2px solid #4A4A4A",
                color: "#4A4A4A",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Gray Thread Note (with Comments)"
            >
              <MessageSquare className="h-5 w-5" />
            </motion.button>

            {/* Oval Thread Note Option */}
            <motion.button
              onClick={() => {
                onNoteTypeSelect("oval-thread");
                setIsMenuOpen(false);
              }}
              className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: "#DF6D7A",
                border: "2px solid #C85A67",
                color: "#FFFFFF",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Oval Thread Note (Social with Comments)"
            >
              <MessageSquare className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Main FAB Button */}
        <motion.button
          onClick={handleMainButtonClick}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isActive ? "#FFF097" : "white",
            border: isActive
              ? "2px solid #372804"
              : "2px solid rgba(55, 40, 4, 0.3)",
            color: "#372804",
            transform: isActive ? "scale(1.1)" : "scale(1)",
          }}
          whileHover={{ scale: isActive ? 1.15 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={isActive ? "Exit note mode (ESC)" : "Choose note type"}
        >
          <StickyNote
            className={`h-6 w-6 ${isActive ? "animate-pulse" : ""}`}
          />
          
          {/* Active mode indicator */}
          {isActive && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
              style={{ backgroundColor: "#372804" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>
    );
  };

  // Render different views based on current state
  if (currentView === "auth") {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  if (currentView === "canvas") {
    return <Canvas onBack={handleBackFromCanvas} />;
  }

  if (currentView === "loading") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f8fafc" }}
      >
        <div className="text-center">
          {/* Blinking Logo */}
          <motion.div
            className="mb-8"
            animate={{ 
              opacity: [1, 0.3, 1],
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut",
            }}
          >
            <img src={`${import.meta.env.BASE_URL || '/'}logo.svg`} alt="NOA Logo" className="w-16 h-16 mx-auto" />
          </motion.div>
          
          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "#1e293b" }}
            >
              Setting up your workspace...
            </h2>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Please wait while we prepare everything for you
            </p>
          </motion.div>

          {/* Loading Dots */}
          <div className="flex items-center justify-center space-x-1 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#372804" }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "dashboard") {
    // Collect all notes for dashboard
    const allUserNotes = [
      ...notyNotes.map((note) => ({ ...note, type: "yellow" })),
      ...grayNotes.map((note) => ({ ...note, type: "gray" })),
      ...grayAdvancedNotes.map((note) => ({ ...note, type: "gray-advanced" })),
      ...blackNotes.map((note) => ({ ...note, type: "black" })),
      ...ovalNotes.map((note) => ({ ...note, type: "oval" })),
      ...threadsNotes.map((note) => ({ ...note, type: "threads" })),
      ...blackThreadNotes.map((note) => ({ ...note, type: "black-thread" })),
      ...grayThreadNotes.map((note) => ({ ...note, type: "gray-thread" })),
      ...ovalThreadNotes.map((note) => ({ ...note, type: "oval-thread" })),
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return <Dashboard userNotes={allUserNotes} onLogout={handleLogout} />;
  }

  // Landing page view
  return (
    <div 
      className={`min-h-screen bg-white ${
        isNoteCreationMode && !isSelectionMode
          ? "cursor-none"
          : "cursor-default"
      }`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      {/* Clean Header */}
      <header
        className="sticky top-0 border-b border-gray-100"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          zIndex: 50,
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6"
          style={{
            height: "104px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo - Left */}
            <div className="flex items-center space-x-3">
            <NOALogo className="h-10 w-10" />
              <div className="text-xl font-bold text-gray-900">NOA</div>
            </div>
          
          {/* Navigation - Center */}
            <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Gear size={20} />
              <span>How it works</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Lightbulb size={20} />
              <span>Why Noa</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <CurrencyDollar size={20} />
              <span>Pricing</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Question size={20} />
              <span>FAQ</span>
            </a>
          </nav>
          
          {/* Buttons - Right */}
          <div className="flex items-center space-x-3">
              <button
                onClick={handleBookDemo}
                className="flex items-center space-x-2 font-medium transition-all duration-200 text-lg "
                style={{
                backgroundColor: "transparent",
                color: "#6B7280",
                padding: "15px 24px",
                borderRadius: "26px",
                height: "54px",
                border: "2px solid #E5E7EB",
                }}
                onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#F9FAFB";
                e.target.style.borderColor = "#D1D5DB";
                }}
                onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "#E5E7EB";
                }}
              >
                <PlayCircle size={20} />
                <span>Book Demo</span>
              </button>
              <button 
                onClick={handleGetStarted}
                className="font-medium transition-all duration-200 text-lg "
                style={{
                backgroundColor: "#10B981",
                color: "#ffffff",
                padding: "15px 24px",
                borderRadius: "26px",
                height: "54px",
                border: "none",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#059669")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#10B981")}
              >
                Get Started
              </button>
          </div>
        </div>
      </header>

      {/* Main Content Section - Medium-style Article */}
      <section
        className="relative min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #FFFFFF 0%, rgba(147, 197, 253, 0.3) 40%, rgba(179, 239, 211, 0.5) 70%, rgba(34, 197, 94, 0.4) 100%)",
        }}
      >
        <div
          className="max-w-6xl mx-auto px-6"
          style={{ paddingTop: "40px", paddingBottom: "40px" }}
        >
          <article className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 text-center relative">
                <h1
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "60px",
                    fontWeight: "bold",
                    color: "#111827",
                    lineHeight: "140%",
                    letterSpacing: "-1%",
                  }}
                >
                  Get Effective
                  <br />
                  <div className="relative inline-block">
                    Feedback faster
                    <img 
                      src={`${import.meta.env.BASE_URL || '/'}Scribble.svg`}
                      alt="scribble decoration" 
                      className="absolute -right-8"
                      style={{ 
                        transform: "rotate(0.5deg)",
                        width: "110px",
                        height: "65px",
                        top: "-10px",
                      }}
                    />
                  </div>
              </h1>
              </div>
              
              <p
                className="text-gray-600 mb-8 leading-relaxed max-w-2xl text-center mx-auto"
                style={{ fontSize: "20px" }}
              >
                Pin comments directly on live websites, turning vague
                conversations into crystal-clear action by eliminating endless
                back-and-forth through exact, contextual feedback for seamless
                team collaboration.
              </p>

              {/* Watch Video Link */}
              <div className="text-center mb-8">
                <button
                  onClick={() => {
                    console.log("Watch video clicked!");
                    setShowVideoOverlay(true);
                  }}
                  className="inline-flex items-center justify-center space-x-2 text-gray-800 hover:text-gray-900 transition-colors duration-200 cursor-pointer underline decoration-2 underline-offset-4"
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "18px",
                    fontWeight: "600",
                    padding: "12px 20px",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <Play size={24} style={{ marginRight: "8px" }} />
                  <span>Watch video</span>
                </button>
              </div>

              <div className="text-center mt-8 mb-8 relative">
                <button
                  className="font-medium transition-all duration-200 text-lg "
                  style={{
                    backgroundColor: "#10B981",
                    color: "#ffffff",
                    padding: "15px 32px",
                    borderRadius: "26px",
                    height: "54px",
                    border: "none",
                    boxShadow: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#059669")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#10B981")
                  }
                >
                  Get the Extension - it&apos;s Free
                </button>
                <img 
                  src={`${import.meta.env.BASE_URL || '/'}tarce.svg`}
                  alt="trace decoration" 
                  className="mx-auto mt-4"
                  style={{ 
                    width: "230px",
                    height: "28px",
                    opacity: 0.7,
                  }}
                />
              </div>

              {/* Video Section */}
              <div className="w-full mt-16 mb-16">
                {/* Video Container with Border */}
                <div className="mx-auto" style={{ width: "966px" }}>
                  <div
                    className="bg-white rounded-lg border"
                    style={{ padding: "8px" }}
                  >
                    <video
                      className="rounded-b-md w-full h-full"
                      style={{
                        width: "948px",
                        height: "639px",
                        objectFit: "fill",
                      }}
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={`${import.meta.env.BASE_URL || '/'}noav`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </motion.div>
          </article>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="bg-white"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border-2 border-green-500 text-green-700 font-medium text-sm mb-6">
            Simple Process
          </div>

          {/* Title */}
            <h2
              className="font-bold mb-6"
              style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "60px",
              lineHeight: "140%",
              letterSpacing: "-1%",
              color: "#111827",
              }}
            >
              How it works
              </h2>

          {/* Description */}
          <p
            className="text-gray-600 leading-relaxed max-w-4xl text-center mx-auto"
            style={{ fontSize: "20px" }}
          >
            Pin comments directly on live websites, turning vague conversations
            into crystal-clear action
            <br />
            by eliminating endless back-and-forth through exact, contextual
            feedback for seamless team collaboration.
          </p>
        </div>
      </section>

      {/* Step 1: Download Extension */}
      <section
        className="bg-white"
        style={{ paddingTop: "8px", paddingBottom: "8px" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 text-left">
            <h3
              className="font-bold text-gray-900 mb-4"
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "48px",
                lineHeight: "120%",
                letterSpacing: "-0.5%",
              }}
            >
              1. Download the Chrome extension
            </h3>
            <p className="text-base text-gray-600 leading-relaxed max-w-4xl">
              Add Noa to Chrome in seconds—no account setup, no complicated
              onboarding. Just one click and you&apos;re ready to go.
            </p>
          </div>
        </div>
      </section>

      {/* Step 2: Open Site and Pin */}
      <section
        className="bg-white"
        style={{ paddingTop: "8px", paddingBottom: "8px" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 text-left">
            <h3
              className="font-bold text-gray-900 mb-4"
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "48px",
                lineHeight: "120%",
                letterSpacing: "-0.5%",
              }}
            >
              2. Open any site and pin Noa extension
            </h3>
            <p className="text-base text-gray-600 leading-relaxed max-w-4xl">
              Add Noa to Chrome in seconds—no account setup, no complicated
              onboarding. Just one click and you&apos;re ready to go.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="flex justify-center mb-8">
            <div
              className="bg-white rounded-lg border-2 overflow-hidden"
              style={{ height: "", width: "" }}
            >
              <img
                src={`${import.meta.env.BASE_URL || '/'}hero2.png`}
                alt="Browser with annotation tools"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Share Notes */}
      <section
        className="bg-white"
        style={{ paddingTop: "8px", paddingBottom: "8px" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 text-left">
            <h3
              className="font-bold text-gray-900 mb-4"
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "48px",
                lineHeight: "120%",
                letterSpacing: "-0.5%",
              }}
            >
              3. Share notes
            </h3>
            <p className="text-base text-gray-600 leading-relaxed max-w-4xl">
              Collaborate seamlessly by sharing your notes with team members.
              Keep everyone on the same page with real-time updates and
              contextual feedback.
                </p>
              </div>

          {/* Image Placeholder */}
          <div className="flex justify-center mb-8">
            <div
              className="bg-white rounded-lg border-2 overflow-hidden"
              style={{ height: "", width: "" }}
            >
              <img
                src={`${import.meta.env.BASE_URL || '/'}hero3.png`}
                alt="Team collaboration and sharing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Noa Section */}
      <section 
        className="why-noa-section"
        style={{
          background:
            "linear-gradient(135deg, #FFFFFF 0%, rgba(179, 239, 211, 0.15) 50%, #FFFFFF 100%)",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        {/* Header Section */}
        <div className="max-w-6xl mx-auto px-6 text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full border-2 border-green-500 text-green-700 font-medium text-sm mb-6">
            Why Noa
          </div>
          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "60px",
              lineHeight: "140%",
              letterSpacing: "-1%",
              color: "#111827",
            }}
          >
            Why Noa stands out
          </h2>
          <p
            className="text-gray-600 leading-relaxed max-w-4xl mx-auto"
            style={{ fontSize: "20px" }}
          >
            Transform your feedback process with contextual comments that
            eliminate confusion and accelerate collaboration across your entire
            team.
          </p>
        </div>

        {/* Card Stack Container */}
        <div className="w-full mx-auto mb-20 flex justify-center overflow-hidden">
          <CardStackDemo />
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        style={{
          background:
            "linear-gradient(135deg, #FFFFFF 0%, rgba(147, 197, 253, 0.3) 40%, rgba(179, 239, 211, 0.5) 70%, rgba(34, 197, 94, 0.4) 100%)",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Badge and Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full border-2 border-green-500 text-green-700 font-medium text-sm mb-6">
              Pricing
            </div>
            <h2
              className="font-bold mb-6"
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "60px",
                lineHeight: "140%",
                letterSpacing: "-1%",
                color: "#111827",
              }}
            >
              Choose your plan
            </h2>
            <p
              className="text-gray-600 leading-relaxed max-w-4xl mx-auto"
              style={{ fontSize: "20px" }}
            >
              Start free and upgrade when you&apos;re ready to unlock advanced
              collaboration features for your growing team.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Forever Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center mb-6">
                <Book size={32} style={{ color: "#10B981" }} className="mr-4" />
                <h3 className="text-3xl font-bold" style={{ color: "#111827" }}>
                  Free Forever
                </h3>
              </div>
              
              <h4
                className="text-lg font-semibold mb-6 text-left"
                style={{ color: "#111827" }}
              >
                Perfect for individual creators and small teams
              </h4>
              
              <div className="mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">$0</div>
                <div className="text-gray-600">Forever free</div>
              </div>

              <ul className="text-left mb-8 space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600">
                    Unlimited notes and comments
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600">
                    Basic collaboration features
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600">Works on any website</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600">
                    Chrome extension included
                  </span>
                </li>
              </ul>

              <button
                className="w-full font-medium transition-all duration-200 text-lg py-4 px-6 rounded-4xl "
                style={{
                  backgroundColor: "#10B981",
                  color: "#ffffff",
                  border: "none",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#059669")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#10B981")
                }
              >
                Get Started
              </button>
            </div>

            {/* Pro Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <Crown
                  size={32}
                  style={{ color: "#10B981" }}
                  className="mr-4"
                />
                <h3 className="text-3xl font-bold" style={{ color: "#111827" }}>
                  Pro
                </h3>
              </div>
              
              <h4
                className="text-lg font-semibold mb-6 text-left"
                style={{ color: "#111827" }}
              >
                Advanced features for professional teams and agencies
              </h4>
              
              <div className="mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">$19</div>
                <div className="text-gray-600">per user/month</div>
              </div>

              <ul className="text-left mb-8 space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600">Everything in Free</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600">
                    Advanced team management
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600">Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600">Analytics and reporting</span>
                </li>
              </ul>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400"
                />
                <button
                  className="w-full font-medium transition-all duration-200 text-lg py-4 px-6 rounded-4xl "
                  style={{
                    backgroundColor: "#10B981",
                    color: "#ffffff",
                    border: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#059669")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#10B981")
                  }
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Noty Button */}
      <FloatingNotyButton 
        isActive={isNoteCreationMode}
        onToggle={toggleNoteCreationMode}
        onNoteTypeSelect={handleNoteTypeSelection}
      />

      {/* Show existing notes */}
      {notyNotes.map((note) => (
        <NotyNote
          key={note.id}
          content={note.content}
          author="You"
          avatar="YO"
          timestamp={note.timestamp}
          position={note.position}
          isEditing={false}
          onSave={handleUnifiedNoteSave}
          onEdit={() => {
            setActiveNoteId(note.id);
            setCurrentNoteType("yellow");
            setNotePosition(note.position);
            setCurrentNoteContent(note.content);
            setShowNote(true);
            setIsNoteActive(true);
          }}
          onCancel={handleNoteCancel}
          onDelete={() => {
            const updatedNotes = notyNotes.filter((n) => n.id !== note.id);
            setNotyNotes(updatedNotes);
            localStorage.setItem(
              "noa-noty-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = notyNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setNotyNotes(updatedNotes);
            localStorage.setItem(
              "noa-noty-notes",
              JSON.stringify(updatedNotes)
            );
          }}
        />
      ))}

      {/* Gray notes displayed both on page AND in side panel */}
      {grayNotes.map((note) => (
        <GrayNote
          key={note.id}
          content={note.content}
          author="You"
          avatar="YO"
          timestamp={note.timestamp}
          position={note.position}
          variant="collapsed"
          onVariantChange={(newVariant) => {
            // Handle variant changes for existing notes
            if (newVariant === "editing") {
              setActiveNoteId(note.id);
              setCurrentNoteType("gray");
              setNotePosition(note.position);
              setCurrentNoteContent(note.content);
              setShowNote(true);
              setIsNoteActive(true);
            }
          }}
          onSave={(content) => {
            // Update existing note
            const updatedNotes = grayNotes.map((n) =>
              n.id === note.id 
                ? {
                    ...n,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
                : n
            );
            setGrayNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-notes",
              JSON.stringify(updatedNotes)
            );

            // Also update in side panel
            const updatedSidePanelNotes = sidePanelNotes.map((n) =>
              n.id === note.id
                ? {
                    ...n,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
                : n
            );
            setSidePanelNotes(updatedSidePanelNotes);
          }}
          onEdit={() => {
            setActiveNoteId(note.id);
            setCurrentNoteType("gray");
            setNotePosition(note.position);
            setCurrentNoteContent(note.content);
            setShowNote(true);
            setIsNoteActive(true);
          }}
          onCancel={handleNoteCancel}
          onDelete={() => {
            const updatedNotes = grayNotes.filter((n) => n.id !== note.id);
            setGrayNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-notes",
              JSON.stringify(updatedNotes)
            );

            // Also remove from side panel
            const updatedSidePanelNotes = sidePanelNotes.filter(
              (n) => n.id !== note.id
            );
            setSidePanelNotes(updatedSidePanelNotes);
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = grayNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setGrayNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-notes",
              JSON.stringify(updatedNotes)
            );
          }}
        />
      ))}

      {/* Gray Advanced notes */}
      {grayAdvancedNotes.map((note) => (
        <GrayNoteAdvanced
          key={note.id}
          content={note.content}
          author="You"
          avatar="YO"
          timestamp={note.timestamp}
          position={note.position}
          variant="collapsed"
          onVariantChange={(newVariant) => {
            // Handle variant changes for existing notes
            if (newVariant === "editing") {
              setActiveNoteId(note.id);
              setCurrentNoteType("gray-advanced");
              setNotePosition(note.position);
              setCurrentNoteContent(note.content);
              setShowNote(true);
              setIsNoteActive(true);
            }
          }}
          onSave={(content) => {
            // Update existing note
            const updatedNotes = grayAdvancedNotes.map((n) =>
              n.id === note.id
                ? {
                    ...n,
                    content: content.trim(),
                    timestamp: new Date().toISOString(),
                  }
                : n
            );
            setGrayAdvancedNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-advanced-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onEdit={() => {
            setActiveNoteId(note.id);
            setCurrentNoteType("gray-advanced");
            setNotePosition(note.position);
            setCurrentNoteContent(note.content);
            setShowNote(true);
            setIsNoteActive(true);
          }}
          onJiraIntegration={(ticketData) => {
            // Create Jira ticket with note content and assigned user
            console.log("Creating Jira ticket:", ticketData);
            // In a real app, this would call Jira API to create a ticket
            alert(
              `Jira ticket created for ${ticketData.assignee.name} with content: "${ticketData.content}"`
            );
          }}
          onCancel={handleNoteCancel}
          onDelete={() => {
            const updatedNotes = grayAdvancedNotes.filter(
              (n) => n.id !== note.id
            );
            setGrayAdvancedNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-advanced-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = grayAdvancedNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setGrayAdvancedNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-advanced-notes",
              JSON.stringify(updatedNotes)
            );
          }}
        />
      ))}

      {blackNotes.map((note) => (
        <BlackNote
          key={note.id}
          content={note.content}
          author="You"
          avatar="YO"
          timestamp={note.timestamp}
          position={note.position}
          isEditing={false}
          onSave={handleUnifiedNoteSave}
          onEdit={() => {
            setActiveNoteId(note.id);
            setCurrentNoteType("black");
            setNotePosition(note.position);
            setCurrentNoteContent(note.content);
            setShowNote(true);
            setIsNoteActive(true);
          }}
          onCancel={handleNoteCancel}
          onDelete={() => {
            const updatedNotes = blackNotes.filter((n) => n.id !== note.id);
            setBlackNotes(updatedNotes);
            localStorage.setItem(
              "noa-black-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = blackNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setBlackNotes(updatedNotes);
            localStorage.setItem(
              "noa-black-notes",
              JSON.stringify(updatedNotes)
            );
          }}
        />
      ))}

      {ovalNotes.map((note) => (
        <OvalNote
          key={note.id}
          content={note.content}
          author="You"
          avatar="YO"
          timestamp={note.timestamp}
          position={note.position}
          isEditing={false}
          onSave={handleUnifiedNoteSave}
          onEdit={() => {
            setActiveNoteId(note.id);
            setCurrentNoteType("oval");
            setNotePosition(note.position);
            setCurrentNoteContent(note.content);
            setShowNote(true);
            setIsNoteActive(true);
          }}
          onCancel={handleNoteCancel}
          onDelete={() => {
            const updatedNotes = ovalNotes.filter((n) => n.id !== note.id);
            setOvalNotes(updatedNotes);
            localStorage.setItem(
              "noa-oval-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = ovalNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setOvalNotes(updatedNotes);
            localStorage.setItem(
              "noa-oval-notes",
              JSON.stringify(updatedNotes)
            );
          }}
        />
      ))}

      {threadsNotes.map((note) => (
        <ThreadsNote
          key={note.id}
          content={note.content}
          author="You"
          avatar="YO"
          timestamp={note.timestamp}
          position={note.position}
          isEditing={false}
          comments={note.comments || []}
          onSave={handleUnifiedNoteSave}
          onEdit={() => {
            setActiveNoteId(note.id);
            setCurrentNoteType("threads");
            setNotePosition(note.position);
            setCurrentNoteContent(note.content);
            setShowNote(true);
            setIsNoteActive(true);
          }}
          onCancel={handleNoteCancel}
          onDelete={() => {
            const updatedNotes = threadsNotes.filter((n) => n.id !== note.id);
            setThreadsNotes(updatedNotes);
            localStorage.setItem(
              "noa-threads-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = threadsNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setThreadsNotes(updatedNotes);
            localStorage.setItem(
              "noa-threads-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onAddComment={handleAddComment}
          onReplyComment={handleReplyComment}
          onLikeComment={handleLikeComment}
          onDeleteComment={handleDeleteComment}
        />
      ))}

      {blackThreadNotes.map((note) => (
        <BlackNoteThread
          key={note.id}
          content={note.content}
          author="You"
          avatar="YO"
          timestamp={note.timestamp}
          position={note.position}
          isEditing={false}
          comments={note.comments || []}
          onSave={handleUnifiedNoteSave}
          onEdit={() => {
            setActiveNoteId(note.id);
            setCurrentNoteType("black-thread");
            setNotePosition(note.position);
            setCurrentNoteContent(note.content);
            setShowNote(true);
            setIsNoteActive(true);
          }}
          onCancel={handleNoteCancel}
          onDelete={() => {
            const updatedNotes = blackThreadNotes.filter(
              (n) => n.id !== note.id
            );
            setBlackThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-black-thread-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = blackThreadNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setBlackThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-black-thread-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onAddComment={handleAddComment}
          onReplyComment={handleReplyComment}
          onLikeComment={handleLikeComment}
          onDeleteComment={handleDeleteComment}
        />
      ))}

      {grayThreadNotes.map((note) => (
        <GrayNoteThread
          key={note.id}
          content={note.content}
          author="You"
          avatar="YO"
          timestamp={note.timestamp}
          position={note.position}
          isEditing={false}
          comments={note.comments || []}
          onSave={handleUnifiedNoteSave}
          onEdit={() => {
            setActiveNoteId(note.id);
            setCurrentNoteType("gray-thread");
            setNotePosition(note.position);
            setCurrentNoteContent(note.content);
            setShowNote(true);
            setIsNoteActive(true);
          }}
          onCancel={handleNoteCancel}
          onDelete={() => {
            const updatedNotes = grayThreadNotes.filter(
              (n) => n.id !== note.id
            );
            setGrayThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-thread-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = grayThreadNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setGrayThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-gray-thread-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onAddComment={handleAddComment}
          onReplyComment={handleReplyComment}
          onLikeComment={handleLikeComment}
          onDeleteComment={handleDeleteComment}
        />
      ))}

      {ovalThreadNotes.map((note) => (
        <OvalNoteThread
          key={note.id}
          content={note.content}
          author="You"
          avatar="YO"
          timestamp={note.timestamp}
          position={note.position}
          isEditing={false}
          comments={note.comments || []}
          onSave={handleUnifiedNoteSave}
          onEdit={() => {
            setActiveNoteId(note.id);
            setCurrentNoteType("oval-thread");
            setNotePosition(note.position);
            setCurrentNoteContent(note.content);
            setShowNote(true);
            setIsNoteActive(true);
          }}
          onCancel={handleNoteCancel}
          onDelete={() => {
            const updatedNotes = ovalThreadNotes.filter(
              (n) => n.id !== note.id
            );
            setOvalThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-oval-thread-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = ovalThreadNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setOvalThreadNotes(updatedNotes);
            localStorage.setItem(
              "noa-oval-thread-notes",
              JSON.stringify(updatedNotes)
            );
          }}
          onAddComment={handleAddComment}
          onReplyComment={handleReplyComment}
          onLikeComment={handleLikeComment}
          onDeleteComment={handleDeleteComment}
        />
      ))}

      {/* Side Panel for Gray Notes */}
      <SidePanel
        isOpen={showSidePanel}
        onClose={closeSidePanel}
        onToggle={() => setShowSidePanel(!showSidePanel)}
        notes={sidePanelNotes}
        selectedNotes={selectedNotes}
        onNoteSelect={handleNoteSelect}
        onShareSelected={handleShareSelected}
        onShareAll={handleShareAll}
        shareMode={shareMode}
      />

      {/* Show note overlay for new note creation (including gray notes) */}
      {showNote && (
        <>
          {currentNoteType === "yellow" ? (
            <NotyNote
              content={getDisplayContent()}
              author="You"
              avatar="YO"
              timestamp="just now"
              position={notePosition}
              isEditing={!activeNoteId || isNoteActive}
              onSave={handleUnifiedNoteSave}
              onEdit={handleNotyEdit}
              onCancel={() => {
                if (activeNoteId) {
                  setIsNoteActive(false);
                } else {
                  handleNoteCancel();
                }
              }}
              onDelete={handleDeleteNote}
            />
          ) : currentNoteType === "gray" ? (
            <GrayNote
              content={getDisplayContent()}
              author="You"
              avatar="YO"
              timestamp="just now"
              position={notePosition}
              variant="editing"
              onVariantChange={(newVariant) => {
                if (newVariant === "collapsed") {
                  // Note was saved, handle completion
                  setIsNoteActive(false);
                }
              }}
              onSave={handleUnifiedNoteSave}
              onEdit={handleNotyEdit}
              onCancel={() => {
                if (activeNoteId) {
                  setIsNoteActive(false);
                } else {
                  handleNoteCancel();
                }
              }}
              onDelete={handleDeleteNote}
            />
          ) : currentNoteType === "gray-advanced" ? (
            <GrayNoteAdvanced
              content={getDisplayContent()}
              author="You"
              avatar="JIRA"
              timestamp="just now"
              position={notePosition}
              variant="editing"
              onVariantChange={(newVariant) => {
                if (newVariant === "collapsed") {
                  // Note was saved, handle completion
                  setIsNoteActive(false);
                }
              }}
              onSave={handleUnifiedNoteSave}
              onEdit={handleNotyEdit}
              onJiraIntegration={(ticketData) => {
                // Create Jira ticket for new note
                console.log("Creating Jira ticket for new note:", ticketData);
                alert(
                  `Jira ticket created for ${ticketData.assignee.name} with content: "${ticketData.content}"`
                );
              }}
              onLinearIntegration={(noteContent) => {
                // Create Linear issue for new note
                console.log("Creating Linear issue for new note:", noteContent);
                alert(`Linear issue would be created with: "${noteContent}"`);
              }}
              onAsanaIntegration={(noteContent) => {
                // Create Asana task for new note
                console.log("Creating Asana task for new note:", noteContent);
                alert(`Asana task would be created with: "${noteContent}"`);
              }}
              onCancel={() => {
                if (activeNoteId) {
                  setIsNoteActive(false);
                } else {
                  handleNoteCancel();
                }
              }}
              onDelete={handleDeleteNote}
            />
          ) : currentNoteType === "black" ? (
            <BlackNote
              content={getDisplayContent()}
              author="You"
              avatar="YO"
              timestamp="just now"
              position={notePosition}
              isEditing={!activeNoteId || isNoteActive}
              onSave={handleUnifiedNoteSave}
              onEdit={handleNotyEdit}
              onCancel={() => {
                if (activeNoteId) {
                  setIsNoteActive(false);
                } else {
                  handleNoteCancel();
                }
              }}
              onDelete={handleDeleteNote}
            />
          ) : currentNoteType === "oval" ? (
            <OvalNote
              content={getDisplayContent()}
              author="You"
              avatar="YO"
              timestamp="just now"
              position={notePosition}
              isEditing={!activeNoteId || isNoteActive}
              onSave={handleUnifiedNoteSave}
              onEdit={handleNotyEdit}
              onCancel={() => {
                if (activeNoteId) {
                  setIsNoteActive(false);
                } else {
                  handleNoteCancel();
                }
              }}
              onDelete={handleDeleteNote}
            />
          ) : currentNoteType === "threads" ? (
            <ThreadsNote
              content={getDisplayContent()}
              author="You"
              avatar="YO"
              timestamp="just now"
              position={notePosition}
              isEditing={!activeNoteId || isNoteActive}
              comments={[]}
              onSave={handleUnifiedNoteSave}
              onEdit={handleNotyEdit}
              onCancel={() => {
                if (activeNoteId) {
                  setIsNoteActive(false);
                } else {
                  handleNoteCancel();
                }
              }}
              onDelete={handleDeleteNote}
              onAddComment={handleAddComment}
              onReplyComment={handleReplyComment}
              onLikeComment={handleLikeComment}
              onDeleteComment={handleDeleteComment}
            />
          ) : currentNoteType === "black-thread" ? (
            <BlackNoteThread
              content={getDisplayContent()}
              author="You"
              avatar="YO"
              timestamp="just now"
              position={notePosition}
              isEditing={!activeNoteId || isNoteActive}
              comments={[]}
              onSave={handleUnifiedNoteSave}
              onEdit={handleNotyEdit}
              onCancel={() => {
                if (activeNoteId) {
                  setIsNoteActive(false);
                } else {
                  handleNoteCancel();
                }
              }}
              onDelete={handleDeleteNote}
              onAddComment={handleAddComment}
              onReplyComment={handleReplyComment}
              onLikeComment={handleLikeComment}
              onDeleteComment={handleDeleteComment}
            />
          ) : currentNoteType === "gray-thread" ? (
            <GrayNoteThread
              content={getDisplayContent()}
              author="You"
              avatar="YO"
              timestamp="just now"
              position={notePosition}
              isEditing={!activeNoteId || isNoteActive}
              comments={[]}
              onSave={handleUnifiedNoteSave}
              onEdit={handleNotyEdit}
              onCancel={() => {
                if (activeNoteId) {
                  setIsNoteActive(false);
                } else {
                  handleNoteCancel();
                }
              }}
              onDelete={handleDeleteNote}
              onAddComment={handleAddComment}
              onReplyComment={handleReplyComment}
              onLikeComment={handleLikeComment}
              onDeleteComment={handleDeleteComment}
            />
          ) : currentNoteType === "oval-thread" ? (
            <OvalNoteThread
              content={getDisplayContent()}
              author="You"
              avatar="YO"
              timestamp="just now"
              position={notePosition}
              isEditing={!activeNoteId || isNoteActive}
              comments={[]}
              onSave={handleUnifiedNoteSave}
              onEdit={handleNotyEdit}
              onCancel={() => {
                if (activeNoteId) {
                  setIsNoteActive(false);
                } else {
                  handleNoteCancel();
                }
              }}
              onDelete={handleDeleteNote}
              onAddComment={handleAddComment}
              onReplyComment={handleReplyComment}
              onLikeComment={handleLikeComment}
              onDeleteComment={handleDeleteComment}
            />
          ) : null}
        </>
      )}

      {/* Comments Icon Cursor Badge - Only when not in selection mode and no note is showing */}
      {isNoteCreationMode && !isSelectionMode && !showNote && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center border"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "#10B981",
              boxShadow: "0 2px 6px rgba(16, 185, 129, 0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ChatTeardrop size={14} weight="fill" color="#10B981" />
          </div>
        </motion.div>
      )}

      {/* Full Page Video Overlay */}
      {showVideoOverlay && (
        <div 
          id="fullscreen-blur-overlay"
          className="green-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 99999,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            backgroundColor: "rgba(240, 240, 240, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Video Player Container */}
          <div
            className="relative bg-black overflow-hidden"
            style={{
              width: "982px",
              height: "522px",
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100000,
              borderRadius: "24px",
              border: "3px solid #10B981",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.2)",
            }}
          >
            <video
              className="w-full h-full object-contain"
              controls
              autoPlay
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <source src="/noav" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Close Button - Below Video */}
          <button
            onClick={() => {
              console.log("Closing overlay");
              setShowVideoOverlay(false);
            }}
            className="mt-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-200/50"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              border: "2px solid rgba(0, 0, 0, 0.2)",
              zIndex: 100000,
              cursor: "pointer",
            }}
          >
            <X size={24} className="text-gray-900" style={{ fontWeight: "bold", color: "#111827" }} />
          </button>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Logo */}
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center space-x-3">
                <NOALogo className="h-8 w-8" />
                <div className="text-lg font-bold text-gray-900">NOA</div>
            </div>
              <p className="text-sm text-gray-600">
                Contextual notes for digital collaboration
              </p>
            </div>
            
            {/* Links */}
            <div className="flex items-center space-x-8 text-sm">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
