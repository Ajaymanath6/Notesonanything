import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { X, StickyNote, Settings, MessageSquare } from "lucide-react";
import NotyNote from "./NotyNote";
import GrayNote from "./GrayNote";
import GrayNoteAdvanced from "./GrayNoteAdvanced";
import BlackNote from "./BlackNote";
import OvalNote from "./OvalNote";
import ThreadsNote from "./ThreadsNote";
import BlackNoteThread from "./BlackNoteThread";
import GrayNoteThread from "./GrayNoteThread";
import OvalNoteThread from "./OvalNoteThread";

function Canvas({ onBack }) {
  // Note state management - all note types
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

  const [showNote, setShowNote] = useState(false);
  const [notePosition, setNotePosition] = useState({ x: 0, y: 0 });
  const [isNoteActive, setIsNoteActive] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [currentNoteContent, setCurrentNoteContent] = useState("");
  const [recentTextSelection, setRecentTextSelection] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Get project URL from query params
  const projectUrl = (() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("url") || "about:blank";
  })();

  // Toggle note creation mode
  const toggleNoteCreationMode = useCallback(() => {
    setIsNoteCreationMode(!isNoteCreationMode);
    if (isNoteCreationMode) {
      setIsSelectionMode(false);
      setShowNote(false);
      setIsNoteActive(false);
    }
  }, [isNoteCreationMode]);

  // Handle note type selection
  const handleNoteTypeSelection = useCallback((noteType) => {
    setCurrentNoteType(noteType);
    setIsNoteCreationMode(true);
  }, []);

  // Handle click for note creation
  const handleClick = useCallback(
    (e) => {
      if (!isNoteCreationMode || recentTextSelection || isSelectionMode) return;

      if (
        !isNoteActive &&
        !e.target.closest(".note-container") &&
        !e.target.closest("button") &&
        !e.target.closest("a") &&
        !e.target.closest(".fab-button") &&
        !e.target.closest(".fab-menu")
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
      }
    },
    [
      isNoteActive,
      isNoteCreationMode,
      recentTextSelection,
      isSelectionMode,
    ]
  );


  // Handle right-click to toggle selection mode
  const handleContextMenu = useCallback(
    (e) => {
      if (isNoteCreationMode) {
        e.preventDefault();
        setIsSelectionMode(!isSelectionMode);
      }
    },
    [isNoteCreationMode, isSelectionMode]
  );

  // Get display content helper
  const getDisplayContent = useCallback(() => {
    if (activeNoteId) {
      // Find existing note content
      let note = null;
      if (currentNoteType === "yellow") {
        note = notyNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "gray") {
        note = grayNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "gray-advanced") {
        note = grayAdvancedNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "black") {
        note = blackNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "oval") {
        note = ovalNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "threads") {
        note = threadsNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "black-thread") {
        note = blackThreadNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "gray-thread") {
        note = grayThreadNotes.find((n) => n.id === activeNoteId);
      } else if (currentNoteType === "oval-thread") {
        note = ovalThreadNotes.find((n) => n.id === activeNoteId);
      }
      return note ? note.content : currentNoteContent;
    }
    return currentNoteContent;
  }, [
    activeNoteId,
    currentNoteType,
    currentNoteContent,
    notyNotes,
    grayNotes,
    grayAdvancedNotes,
    blackNotes,
    ovalNotes,
    threadsNotes,
    blackThreadNotes,
    grayThreadNotes,
    ovalThreadNotes,
  ]);

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
            localStorage.setItem("noa-noty-notes", JSON.stringify(updatedNotes));
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
            localStorage.setItem("noa-gray-notes", JSON.stringify(updatedNotes));
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
            localStorage.setItem("noa-black-notes", JSON.stringify(updatedNotes));
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
            localStorage.setItem("noa-oval-notes", JSON.stringify(updatedNotes));
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
            localStorage.setItem("noa-noty-notes", JSON.stringify(updatedNotes));
          } else if (currentNoteType === "gray") {
            const updatedNotes = [...grayNotes, newNote];
            setGrayNotes(updatedNotes);
            localStorage.setItem("noa-gray-notes", JSON.stringify(updatedNotes));
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
            localStorage.setItem("noa-black-notes", JSON.stringify(updatedNotes));
          } else if (currentNoteType === "oval") {
            const updatedNotes = [...ovalNotes, newNote];
            setOvalNotes(updatedNotes);
            localStorage.setItem("noa-oval-notes", JSON.stringify(updatedNotes));
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
    ]
  );

  // Handle note cancel
  const handleNoteCancel = useCallback(() => {
    setShowNote(false);
    setIsNoteActive(false);
    setActiveNoteId(null);
    setCurrentNoteContent("");
    setIsSelectionMode(false);
    setIsNoteCreationMode(false);
  }, []);

  // Handle note edit
  const handleNotyEdit = useCallback(() => {
    setIsNoteActive(true);
  }, []);

  // Handle delete note
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
        localStorage.setItem(
          "noa-threads-notes",
          JSON.stringify(updatedNotes)
        );
      } else if (currentNoteType === "black-thread") {
        const updatedNotes = blackThreadNotes.filter(
          (n) => n.id !== activeNoteId
        );
        setBlackThreadNotes(updatedNotes);
        localStorage.setItem(
          "noa-black-thread-notes",
          JSON.stringify(updatedNotes)
        );
      } else if (currentNoteType === "gray-thread") {
        const updatedNotes = grayThreadNotes.filter((n) => n.id !== activeNoteId);
        setGrayThreadNotes(updatedNotes);
        localStorage.setItem(
          "noa-gray-thread-notes",
          JSON.stringify(updatedNotes)
        );
      } else if (currentNoteType === "oval-thread") {
        const updatedNotes = ovalThreadNotes.filter((n) => n.id !== activeNoteId);
        setOvalThreadNotes(updatedNotes);
        localStorage.setItem(
          "noa-oval-thread-notes",
          JSON.stringify(updatedNotes)
        );
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
    blackThreadNotes,
    grayThreadNotes,
    ovalThreadNotes,
    handleNoteCancel,
  ]);

  // Comment handlers (placeholder functions)
  const handleAddComment = useCallback(() => {}, []);
  const handleReplyComment = useCallback(() => {}, []);
  const handleLikeComment = useCallback(() => {}, []);
  const handleDeleteComment = useCallback(() => {}, []);

  // Floating Note Button Component - Shows two gray notes when clicked
  const FloatingNotyButton = ({ isActive, onToggle, onNoteTypeSelect }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMainButtonClick = () => {
      if (isActive) {
        onToggle();
        setIsMenuOpen(false);
      } else {
        setIsMenuOpen(true);
      }
    };

    const handleNoteSelect = (noteType) => {
      onNoteTypeSelect(noteType);
      setIsMenuOpen(false);
    };

    return (
      <div className="fixed bottom-6 right-6 z-40">
        {/* Two Gray Note Options - Show when menu is open */}
        {isMenuOpen && !isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 flex flex-col space-y-2"
          >
            {/* Gray Note Option */}
            <motion.button
              onClick={() => handleNoteSelect("gray")}
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
              onClick={() => handleNoteSelect("gray-advanced")}
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
          </motion.div>
        )}

        {/* Main FAB Button - Hide when menu is open */}
        {!isMenuOpen && (
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
            title={isActive ? "Exit note mode" : "Choose note type"}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
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
        )}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-white relative cursor-default"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {/* Back Button - Just an X icon in circular button */}
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 bg-white hover:bg-gray-50"
        style={{
          border: "2px solid rgba(55, 40, 4, 0.3)",
        }}
        title="Back"
      >
        <X className="h-5 w-5" style={{ color: "rgb(55, 40, 4)" }} />
      </button>

      {/* Project iframe */}
      <div className="w-full h-screen relative bg-white">
        {projectUrl && projectUrl !== "about:blank" ? (
          <iframe
            src={projectUrl}
            className="w-full h-full border-0"
            title="Project View"
            style={{ backgroundColor: "#ffffff" }}
          />
        ) : (
          <div className="w-full h-full bg-white" />
        )}
      </div>

      {/* Floating Noty Button */}
      <FloatingNotyButton
        isActive={isNoteCreationMode}
        onToggle={toggleNoteCreationMode}
        onNoteTypeSelect={handleNoteTypeSelection}
      />

      {/* Show existing notes - All note types */}
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
            localStorage.setItem("noa-noty-notes", JSON.stringify(updatedNotes));
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = notyNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setNotyNotes(updatedNotes);
            localStorage.setItem("noa-noty-notes", JSON.stringify(updatedNotes));
          }}
        />
      ))}

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
            localStorage.setItem("noa-gray-notes", JSON.stringify(updatedNotes));
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
            localStorage.setItem("noa-gray-notes", JSON.stringify(updatedNotes));
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = grayNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setGrayNotes(updatedNotes);
            localStorage.setItem("noa-gray-notes", JSON.stringify(updatedNotes));
          }}
        />
      ))}

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
            console.log("Creating Jira ticket:", ticketData);
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
            localStorage.setItem("noa-black-notes", JSON.stringify(updatedNotes));
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = blackNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setBlackNotes(updatedNotes);
            localStorage.setItem("noa-black-notes", JSON.stringify(updatedNotes));
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
            localStorage.setItem("noa-oval-notes", JSON.stringify(updatedNotes));
          }}
          onPositionChange={(newPosition) => {
            const updatedNotes = ovalNotes.map((n) =>
              n.id === note.id ? { ...n, position: newPosition } : n
            );
            setOvalNotes(updatedNotes);
            localStorage.setItem("noa-oval-notes", JSON.stringify(updatedNotes));
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
            const updatedNotes = grayThreadNotes.filter((n) => n.id !== note.id);
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
            const updatedNotes = ovalThreadNotes.filter((n) => n.id !== note.id);
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

      {/* Show note overlay for new note creation */}
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
                  setIsNoteActive(false);
                }
              }}
              onSave={handleUnifiedNoteSave}
              onEdit={handleNotyEdit}
              onJiraIntegration={(ticketData) => {
                console.log("Creating Jira ticket for new note:", ticketData);
                alert(
                  `Jira ticket created for ${ticketData.assignee.name} with content: "${ticketData.content}"`
                );
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

    </div>
  );
}

export default Canvas;