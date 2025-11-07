import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  Plus,
  Search,
  Bell,
  User,
  Settings,
  Grid3X3,
  LayoutGrid,
  Calendar,
  Filter,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Edit2,
  Trash2,
  FileText,
  StickyNote,
  LogOut
} from 'lucide-react'
import NotyNote from './NotyNote'
import GrayNote from './GrayNote'
import BlackNote from './BlackNote'
import OvalNote from './OvalNote'
import ThreadsNote from './ThreadsNote'
import BlackNoteThread from './BlackNoteThread'
import GrayNoteThread from './GrayNoteThread'
import OvalNoteThread from './OvalNoteThread'
import DashboardCompact from './DashboardCompact'
import DashboardExpand from './DashboardExpand'
import DashboardSimple from './DashboardSimple'
import DashboardMain from './DashboardMain'

const Dashboard = ({ userNotes = [], onLogout }) => {
  // selectedWorkspace will be managed through activeWorkspace state
  const [aiSearchQuery, setAiSearchQuery] = useState('')
  const [aiSearchResults, setAiSearchResults] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [showAiResults, setShowAiResults] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard') // 'dashboard' or 'website-notes'
  const [selectedWebsite, setSelectedWebsite] = useState(null)
  const [showWorkspacePopup, setShowWorkspacePopup] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState('')
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('')
  const [currentView, setCurrentView] = useState('home') // 'home' or 'folders'
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [sitesPage, setSitesPage] = useState(1)
  const [sitesPerPage] = useState(6) // Show 6 sites per page
  const [dashboardVersion, setDashboardVersion] = useState(1) // Track dashboard A/B testing version (1, 2, 3, 4, 5)
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('noa-folders')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Design Notes', description: 'UI/UX design related notes', color: '#f97316' },
      { id: 2, name: 'Development', description: 'Code and technical notes', color: '#3b82f6' },
      { id: 3, name: 'Ideas', description: 'Random thoughts and ideas', color: '#10b981' }
    ]
  })
  // const [workspaces] = useState(() => {
  //   const saved = localStorage.getItem('noa-workspaces')
  //   return saved ? JSON.parse(saved) : [
  //     { id: 1, name: 'Design Team Workspace', description: 'Main workspace for design collaboration', isActive: true }
  //   ]
  // })
  // const [activeWorkspace] = useState(() => {
  //   const saved = localStorage.getItem('noa-active-workspace')
  //   return saved ? JSON.parse(saved) : workspaces[0]
  // })

  const searchRef = useRef(null)
  const workspacePopupRef = useRef(null)

  // Handle click outside search and workspace popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowAiResults(false)
      }
      if (workspacePopupRef.current && !workspacePopupRef.current.contains(event.target)) {
        setShowWorkspacePopup(false)
      }
    }

    if (showAiResults || showWorkspacePopup) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showAiResults, showWorkspacePopup])

  // Click interactions disabled for cleaner dashboard experience
  // Notes now show comments automatically without clicking

  // AI Search functionality
  const handleAiSearch = async (query) => {
    if (!query.trim()) {
      setAiSearchResults(null)
      setShowAiResults(false)
      return
    }

    setIsSearching(true)
    setShowAiResults(true)

    // Simulate AI search through notes
    setTimeout(() => {
      const relevantNotes = notes.filter(note => 
        note.content.toLowerCase().includes(query.toLowerCase()) ||
        note.author.toLowerCase().includes(query.toLowerCase())
      )

      const aiResponse = {
        answer: relevantNotes.length > 0 
          ? `I found ${relevantNotes.length} note${relevantNotes.length === 1 ? '' : 's'} related to "${query}". ${
              relevantNotes.length === 1 
                ? 'Here\'s what I found:' 
                : 'Here are the most relevant findings:'
            }`
          : `I couldn't find any notes directly related to "${query}". Try searching with different keywords or create a new note about this topic.`,
        relatedNotes: relevantNotes.slice(0, 3), // Show top 3 matches
        query: query
      }

      setAiSearchResults(aiResponse)
      setIsSearching(false)
    }, 1000)
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAiSearch(aiSearchQuery)
    }
  }

  // Folder creation handler
  const handleCreateFolder = () => {
    if (newWorkspaceName.trim()) {
      const colors = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4', '#84cc16', '#f59e0b']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      
      const newFolder = {
        id: Date.now(),
        name: newWorkspaceName.trim(),
        description: newWorkspaceDescription.trim(),
        color: randomColor,
        createdAt: new Date().toISOString()
      }
      
      // Add to folders list
      const updatedFolders = [...folders, newFolder]
      setFolders(updatedFolders)
      
      // Save to localStorage
      localStorage.setItem('noa-folders', JSON.stringify(updatedFolders))
      
      // Reset form and close popup
      setNewWorkspaceName('')
      setNewWorkspaceDescription('')
      setShowWorkspacePopup(false)
      
      console.log('Folder created:', newFolder)
    }
  }

  // Workspace switching handler (currently unused but kept for future functionality)
  // const handleSwitchWorkspace = (workspace) => {
  //   const updatedWorkspaces = workspaces.map(w => ({
  //     ...w,
  //     isActive: w.id === workspace.id
  //   }))
  //   setWorkspaces(updatedWorkspaces)
  //   setActiveWorkspace(workspace)
  //   
  //   // Save to localStorage
  //   localStorage.setItem('noa-workspaces', JSON.stringify(updatedWorkspaces))
  //   localStorage.setItem('noa-active-workspace', JSON.stringify(workspace))
  // }

  const handleFolderKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleCreateFolder()
    }
    if (e.key === 'Escape') {
      setShowWorkspacePopup(false)
      setNewWorkspaceName('')
      setNewWorkspaceDescription('')
    }
  }

  // Note variants disabled for dashboard - always show consistent appearance

  // Calculate notes count for each workspace (for future use)
  // const getWorkspaceNotesCount = (workspaceId) => {
  //   // This would filter notes by workspace in a real app
  //   return notes.length // For now, show total notes count
  // }

  // Get recent notes (last 10 notes across all types)


  // Mock notes data (will be replaced with real data) - Gray notes with comments
  const mockNotes = [
    // Figma Design - 3 notes
    {
      id: 1,
      type: 'gray',
      content: 'Remember to update the user interface for the new dashboard design. The color scheme should match our brand guidelines.',
      author: 'You',
      timestamp: '2 hours ago',
      comments: 3,
      likes: 5,
      website: 'figma.com',
      websiteName: 'Figma Design',
      commentsList: [
        {
          id: 101,
          author: 'Sarah Wilson',
          avatar: 'SW',
          content: 'Great point about the color scheme! Should we also consider dark mode variants?',
          timestamp: '1 hour ago',
          likes: 2
        },
        {
          id: 102,
          author: 'Mike Chen',
          avatar: 'MC',
          content: 'The brand guidelines look solid. I can help with the implementation.',
          timestamp: '45 minutes ago',
          likes: 1
        }
      ]
    },
    {
      id: 2,
      type: 'gray',
      content: 'Design system components need to be updated with the new spacing tokens. Also check accessibility contrast ratios.',
      author: 'You',
      timestamp: '4 hours ago',
      comments: 1,
      likes: 2,
      website: 'figma.com',
      websiteName: 'Figma Design',
      commentsList: [
        {
          id: 201,
          author: 'Emma Davis',
          avatar: 'ED',
          content: 'Good point about accessibility! I can help with the contrast ratio testing.',
          timestamp: '2 hours ago',
          likes: 0
        }
      ]
    },
    {
      id: 3,
      type: 'gray',
      content: 'Prototype feedback: Users love the new interaction patterns. Consider adding micro-animations for better UX.',
      author: 'You',
      timestamp: '1 day ago',
      comments: 2,
      likes: 4,
      website: 'figma.com',
      websiteName: 'Figma Design',
      commentsList: [
        {
          id: 301,
          author: 'Tom Wilson',
          avatar: 'TW',
          content: 'The micro-animations would definitely enhance the user experience!',
          timestamp: '20 hours ago',
          likes: 2
        },
        {
          id: 302,
          author: 'Lisa Park',
          avatar: 'LP',
          content: 'I can implement the animations using Framer Motion.',
          timestamp: '18 hours ago',
          likes: 1
        }
      ]
    },
    // GitHub Repository - 2 notes
    {
      id: 4,
      type: 'gray',
      content: 'Code review: The authentication flow looks good but needs better error handling for edge cases.',
      author: 'You',
      timestamp: '3 hours ago',
      comments: 1,
      likes: 3,
      website: 'github.com',
      websiteName: 'GitHub Repository',
      commentsList: [
        {
          id: 401,
          author: 'Alex Johnson',
          avatar: 'AJ',
          content: 'I agree! Let me add proper error handling for network timeouts.',
          timestamp: '2 hours ago',
          likes: 1
        }
      ]
    },
    {
      id: 5,
      type: 'gray',
      content: 'Pull request ready for review: Added new API endpoints for user management with proper validation.',
      author: 'You',
      timestamp: '6 hours ago',
      comments: 2,
      likes: 1,
      website: 'github.com',
      websiteName: 'GitHub Repository',
      commentsList: [
        {
          id: 501,
          author: 'John Smith',
          avatar: 'JS',
          content: 'Great work on the validation logic! LGTM.',
          timestamp: '4 hours ago',
          likes: 1
        },
        {
          id: 502,
          author: 'Maya Patel',
          avatar: 'MP',
          content: 'Can we add rate limiting to these endpoints?',
          timestamp: '3 hours ago',
          likes: 0
        }
      ]
    },
    // Notion Workspace - 1 note
    {
      id: 6,
      type: 'gray',
      content: 'Meeting notes: Discussed Q1 2024 roadmap. Key priorities include mobile optimization and performance improvements.',
      author: 'You',
      timestamp: '2 days ago',
      comments: 0,
      likes: 1,
      website: 'notion.so',
      websiteName: 'Notion Workspace'
    },
    // Linear Issues - 1 note
    {
      id: 7,
      type: 'gray',
      content: 'Bug report: Login form validation not working on mobile devices. Need to fix responsive design issues.',
      author: 'You',
      timestamp: '1 day ago',
      comments: 1,
      likes: 2,
      website: 'linear.app',
      websiteName: 'Linear Issues',
      commentsList: [
        {
          id: 701,
          author: 'Nina Rodriguez',
          avatar: 'NR',
          content: 'I can reproduce this on iOS Safari. Looking into the CSS media queries.',
          timestamp: '20 hours ago',
          likes: 1
        }
      ]
    },
    // Slack Workspace - 2 notes
    {
      id: 8,
      type: 'gray',
      content: 'Team standup: Discussed the new feature rollout timeline. Need to coordinate with QA team for testing.',
      author: 'You',
      timestamp: '5 hours ago',
      comments: 2,
      likes: 3,
      website: 'slack.com',
      websiteName: 'Slack Workspace',
      commentsList: [
        {
          id: 801,
          author: 'QA Team',
          avatar: 'QA',
          content: 'We\'re ready for testing. Can we get the staging environment details?',
          timestamp: '3 hours ago',
          likes: 1
        },
        {
          id: 802,
          author: 'David Kim',
          avatar: 'DK',
          content: 'Timeline looks good. I\'ll coordinate with the deployment team.',
          timestamp: '2 hours ago',
          likes: 1
        }
      ]
    },
    {
      id: 9,
      type: 'gray',
      content: 'Channel discussion: The new design system is getting positive feedback from the team. Ready for implementation.',
      author: 'You',
      timestamp: '1 day ago',
      comments: 1,
      likes: 2,
      website: 'slack.com',
      websiteName: 'Slack Workspace',
      commentsList: [
        {
          id: 901,
          author: 'Design Lead',
          avatar: 'DL',
          content: 'Excellent work! The new components will save us so much time.',
          timestamp: '18 hours ago',
          likes: 1
        }
      ]
    },
    // Trello Board - 1 note
    {
      id: 10,
      type: 'gray',
      content: 'Project update: Sprint planning completed. New tasks added to the backlog for next iteration.',
      author: 'You',
      timestamp: '3 days ago',
      comments: 0,
      likes: 1,
      website: 'trello.com',
      websiteName: 'Trello Board'
    },
    // Jira Issues - 2 notes
    {
      id: 11,
      type: 'gray',
      content: 'Ticket #1234: User authentication bug reported. Priority set to high, assigned to frontend team.',
      author: 'You',
      timestamp: '4 hours ago',
      comments: 3,
      likes: 1,
      website: 'jira.atlassian.com',
      websiteName: 'Jira Issues',
      commentsList: [
        {
          id: 1101,
          author: 'Frontend Team',
          avatar: 'FT',
          content: 'Working on this now. Root cause identified in the JWT token validation.',
          timestamp: '2 hours ago',
          likes: 1
        },
        {
          id: 1102,
          author: 'Security Team',
          avatar: 'ST',
          content: 'Please ensure we follow the security checklist for auth fixes.',
          timestamp: '1 hour ago',
          likes: 0
        },
        {
          id: 1103,
          author: 'Product Manager',
          avatar: 'PM',
          content: 'Great work team! This was blocking several user flows.',
          timestamp: '30 minutes ago',
          likes: 2
        }
      ]
    },
    {
      id: 12,
      type: 'gray',
      content: 'Sprint retrospective: Team velocity improved by 15%. Need to maintain this momentum for next sprint.',
      author: 'You',
      timestamp: '2 days ago',
      comments: 1,
      likes: 4,
      website: 'jira.atlassian.com',
      websiteName: 'Jira Issues'
    },
    // Asana Projects - 1 note
    {
      id: 13,
      type: 'gray',
      content: 'Project milestone: Q1 deliverables completed ahead of schedule. Ready to start Q2 planning phase.',
      author: 'You',
      timestamp: '1 week ago',
      comments: 2,
      likes: 2,
      website: 'asana.com',
      websiteName: 'Asana Projects'
    },
    // Miro Board - 2 notes
    {
      id: 14,
      type: 'gray',
      content: 'Brainstorming session: New feature ideas documented. Need to prioritize based on user feedback.',
      author: 'You',
      timestamp: '3 days ago',
      comments: 1,
      likes: 3,
      website: 'miro.com',
      websiteName: 'Miro Board'
    },
    {
      id: 15,
      type: 'gray',
      content: 'User journey mapping: Completed the customer experience flow. Ready for stakeholder review.',
      author: 'You',
      timestamp: '5 days ago',
      comments: 0,
      likes: 1,
      website: 'miro.com',
      websiteName: 'Miro Board'
    },
    // Confluence Wiki - 1 note
    {
      id: 16,
      type: 'gray',
      content: 'Documentation update: API documentation refreshed with new endpoints. Added code examples for developers.',
      author: 'You',
      timestamp: '1 week ago',
      comments: 1,
      likes: 2,
      website: 'confluence.atlassian.com',
      websiteName: 'Confluence Wiki'
    },
    // Discord Server - 1 note
    {
      id: 17,
      type: 'gray',
      content: 'Community feedback: Users love the new dark mode feature. Consider adding more theme options.',
      author: 'You',
      timestamp: '2 days ago',
      comments: 2,
      likes: 5,
      website: 'discord.com',
      websiteName: 'Discord Server',
      commentsList: [
        {
          id: 1701,
          author: 'Community Mod',
          avatar: 'CM',
          content: 'Yes! Dark mode has been the most requested feature. Great job!',
          timestamp: '1 day ago',
          likes: 3
        },
        {
          id: 1702,
          author: 'User Voice',
          avatar: 'UV',
          content: 'Can we get a purple theme next? The community would love it!',
          timestamp: '1 day ago',
          likes: 2
        }
      ]
    },
    // Airtable Base - 1 note
    {
      id: 18,
      type: 'gray',
      content: 'Database update: User data migration completed successfully. All records validated and verified.',
      author: 'You',
      timestamp: '4 days ago',
      comments: 0,
      likes: 1,
      website: 'airtable.com',
      websiteName: 'Airtable Base'
    },
    // Test Gray Note - 1 note
    {
      id: 19,
      type: 'gray',
      content: 'This is a test gray note to demonstrate the 3-variant system. Hover to see comment icon, click to edit, press Enter to collapse.',
      author: 'You',
      timestamp: 'just now',
      comments: 0,
      likes: 0,
      website: 'test.com',
      websiteName: 'Test Workspace'
    }
  ]

  // Filter notes based on current view (home or folder)
  const getFilteredNotes = () => {
    const allNotes = userNotes.length > 0 ? userNotes : mockNotes
    
    if (currentView === 'home') {
      // Home shows all notes
      return allNotes
    } else if (currentView === 'folders' && selectedFolder) {
      // Filter notes by selected folder
      // For now, we'll simulate folder filtering - in a real app, notes would have folderId
      return allNotes.filter(note => {
        // Simulate folder assignment based on note content or type
        if (selectedFolder.name === 'Design Notes') {
          return note.website === 'figma.com' || note.content.toLowerCase().includes('design')
        } else if (selectedFolder.name === 'Development') {
          return note.website === 'github.com' || note.content.toLowerCase().includes('code')
        } else if (selectedFolder.name === 'Ideas') {
          return note.website === 'notion.so' || note.content.toLowerCase().includes('idea')
        }
        return false
      })
    }
    
    return []
  }
  
  const notes = getFilteredNotes()

  // Group notes by website
  const notesByWebsite = notes.reduce((acc, note) => {
    const website = note.website || 'unknown'
    if (!acc[website]) {
      acc[website] = []
    }
    acc[website].push(note)
    return acc
  }, {})

  // const websiteCount = Object.keys(notesByWebsite).length
  
  // Pagination logic for sites
  const totalSites = Object.keys(notesByWebsite).length
  const totalPages = Math.ceil(totalSites / sitesPerPage)
  const startIndex = (sitesPage - 1) * sitesPerPage
  const endIndex = startIndex + sitesPerPage
  
  // Get paginated sites
  const paginatedSites = Object.entries(notesByWebsite).slice(startIndex, endIndex)

  // const getNoteTypeColor = (type) => {
  //   const colors = {
  //     yellow: { bg: '#FFF097', text: '#372804', border: 'rgba(55, 40, 4, 0.2)' },
  //     black: { bg: '#03190F', text: '#FFFFFF', border: 'rgba(255, 255, 255, 0.1)' },
  //     gray: { bg: '#E8E8E8', text: '#4A4A4A', border: 'rgba(0, 0, 0, 0.1)' },
  //     oval: { bg: '#DF6D7A', text: '#FFFFFF', border: 'rgba(255, 255, 255, 0.2)' }
  //   }
  //   return colors[type] || colors.yellow
  // }

  // const getNoteTypeIcon = (type) => {
  //   if (type.includes('thread') || type === 'threads') {
  //     return <MessageSquare className="h-4 w-4" />
  //   }
  //   return <StickyNote className="h-4 w-4" />
  // }

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: '#f8fafc' }}
      >
        <StickyNote className="h-8 w-8" style={{ color: '#372804' }} />
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#1e293b' }}>
        No notes yet
      </h3>
      <p className="text-sm max-w-md" style={{ color: '#64748b' }}>
        Your notes will appear here once you create them from the landing page. Each note will be organized by workspace and displayed with all your collaborative comments.
      </p>
    </motion.div>
  )

  const renderNote = (note) => {
    // All notes show with comments automatically
    const baseProps = {
      key: note.id,
      content: note.content,
      author: note.author || 'You',
      avatar: note.author === 'You' ? 'YO' : (note.author ? note.author.split(' ').map(n => n[0]).join('').slice(0, 2) : 'YO'),
      timestamp: note.timestamp,
      position: { x: 0, y: 0 }, // Static position for dashboard
      variant: 'collapsed', // Always collapsed for clean appearance
      isEditing: false, // All notes in dashboard show as display mode
      onVariantChange: () => {}, // Disabled for dashboard
      onSave: (content) => {
        // Handle save logic here
        console.log('Saving note:', content)
      },
      onEdit: () => {}, // Disabled for dashboard
      onCancel: () => {}, // Disabled for dashboard
      onDelete: () => {
        // Delete note from localStorage and sync with landing page
        const noteType = note.type
        const noteId = note.id
        
        // Remove from appropriate localStorage based on note type
        if (noteType === 'yellow') {
          const existingNotes = JSON.parse(localStorage.getItem('noa-noty-notes') || '[]')
          const updatedNotes = existingNotes.filter(n => n.id !== noteId)
          localStorage.setItem('noa-noty-notes', JSON.stringify(updatedNotes))
        } else if (noteType === 'gray') {
          const existingNotes = JSON.parse(localStorage.getItem('noa-gray-notes') || '[]')
          const updatedNotes = existingNotes.filter(n => n.id !== noteId)
          localStorage.setItem('noa-gray-notes', JSON.stringify(updatedNotes))
        } else if (noteType === 'black') {
          const existingNotes = JSON.parse(localStorage.getItem('noa-black-notes') || '[]')
          const updatedNotes = existingNotes.filter(n => n.id !== noteId)
          localStorage.setItem('noa-black-notes', JSON.stringify(updatedNotes))
        } else if (noteType === 'oval') {
          const existingNotes = JSON.parse(localStorage.getItem('noa-oval-notes') || '[]')
          const updatedNotes = existingNotes.filter(n => n.id !== noteId)
          localStorage.setItem('noa-oval-notes', JSON.stringify(updatedNotes))
        }
        
        // Refresh the page to show updated notes
        window.location.reload()
      },
      onPositionChange: () => {}
    }

    // Add comment props for thread notes, grid view, and gray notes
    const commentProps = {
      comments: note.commentsList || [], // Use commentsList array
      onAddComment: () => {},
      onReplyComment: () => {},
      onLikeComment: () => {},
      onDeleteComment: () => {}
    }

    const allProps = { ...baseProps, ...commentProps }

    // Render appropriate note component based on type (always with comments - grid view)
    switch (note.type) {
      case 'yellow':
        return <ThreadsNote {...allProps} />
      case 'gray':
        return <GrayNoteThread {...allProps} /> // Always show gray notes with comments
      case 'black':
        return <BlackNoteThread {...allProps} />
      case 'oval':
        return <OvalNoteThread {...allProps} />
      case 'threads':
        return <ThreadsNote {...allProps} />
      case 'black-thread':
        return <BlackNoteThread {...allProps} />
      case 'gray-thread':
        return <GrayNoteThread {...allProps} />
      case 'oval-thread':
        return <OvalNoteThread {...allProps} />
      default:
        return <NotyNote {...allProps} />
    }
  }

  // Website-specific notes page
  if (currentPage === 'website-notes' && selectedWebsite) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#f8fafc' }}>
        {/* Left Sidebar */}
        <div className="w-64 flex flex-col" style={{ backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0' }}>
          {/* Sidebar Header */}
          <div className="p-6" style={{ borderBottom: '1px solid #e2e8f0' }}>
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ 
                  backgroundColor: '#372804',
                  color: '#FFF097'
                }}
              >
                N
              </div>
              <span className="text-lg font-semibold" style={{ color: '#1e293b' }}>NOA</span>
            </div>
          </div>

          {/* Back Button */}
          <div className="p-6">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors mb-6 w-full"
              style={{ 
                backgroundColor: '#f8fafc',
                color: '#64748b',
                border: '1px solid #e2e8f0'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f8fafc'}
            >
              <i className="ri-arrow-left-line text-sm"></i>
              <span>Back to Dashboard</span>
            </button>

            {/* Website Info */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                {selectedWebsite.website === 'figma.com' && <i className="ri-palette-line text-lg" style={{ color: '#f24e1e' }}></i>}
                {selectedWebsite.website === 'github.com' && <i className="ri-github-line text-lg" style={{ color: '#24292e' }}></i>}
                {selectedWebsite.website === 'notion.so' && <i className="ri-file-text-line text-lg" style={{ color: '#000000' }}></i>}
                {selectedWebsite.website === 'linear.app' && <i className="ri-bug-line text-lg" style={{ color: '#5e6ad2' }}></i>}
                <h3 className="font-semibold" style={{ color: '#1e293b' }}>
                  {selectedWebsite.websiteNotes[0]?.websiteName || selectedWebsite.website}
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#64748b' }}>
                {selectedWebsite.websiteNotes.length} notes total
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex-shrink-0 px-6 py-4" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#1e293b' }}>
                  {selectedWebsite.websiteNotes[0]?.websiteName || selectedWebsite.website} Notes
                </h1>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  All your notes from this website
                </p>
              </div>

              {/* AI Search for Website Notes */}
              <div className="relative" ref={searchRef}>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <i className="ri-sparkling-2-line text-lg" style={{ color: '#f97316' }}></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Search notes with AI..."
                    value={aiSearchQuery}
                    onChange={(e) => setAiSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    className="pl-12 pr-12 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                    style={{
                      width: '400px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      color: '#1e293b'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f97316'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button
                    onClick={() => handleAiSearch(aiSearchQuery)}
                    disabled={!aiSearchQuery.trim() || isSearching}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: aiSearchQuery.trim() && !isSearching ? '#f97316' : '#e5e7eb',
                      color: '#ffffff'
                    }}
                  >
                    {isSearching ? (
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <i className="ri-send-plane-line text-sm"></i>
                    )}
                  </button>
                </div>

                {/* AI Search Results Panel for Website Notes */}
                {showAiResults && aiSearchResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full right-0 mt-2 w-96 rounded-xl shadow-lg z-50"
                    style={{ 
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    {/* Results Header */}
                    <div 
                      className="px-4 py-3 border-b flex items-center justify-between"
                      style={{ 
                        backgroundColor: '#fff7ed',
                        borderBottomColor: '#fed7aa'
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <i className="ri-sparkling-2-line text-lg" style={{ color: '#f97316' }}></i>
                        <span className="font-medium text-sm" style={{ color: '#1e293b' }}>AI Search Results</span>
                      </div>
                      <button
                        onClick={() => setShowAiResults(false)}
                        className="p-1 rounded-lg transition-colors hover:bg-orange-100"
                      >
                        <i className="ri-close-line text-lg" style={{ color: '#64748b' }}></i>
                      </button>
                    </div>

                    {/* AI Answer */}
                    <div className="p-4 border-b" style={{ borderBottomColor: '#f1f5f9' }}>
                      <p className="text-sm leading-relaxed" style={{ color: '#1e293b' }}>
                        {aiSearchResults.answer}
                      </p>
                    </div>

                    {/* Related Notes */}
                    {aiSearchResults.relatedNotes.length > 0 && (
                      <div className="p-4">
                        <h4 className="text-sm font-medium mb-3" style={{ color: '#374151' }}>
                          Related Notes ({aiSearchResults.relatedNotes.length})
                        </h4>
                        <div className="space-y-2">
                          {aiSearchResults.relatedNotes.map((note, index) => (
                            <div
                              key={index}
                              className="p-3 rounded-lg cursor-pointer transition-colors"
                              style={{ backgroundColor: '#f8fafc' }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = '#f8fafc'}
                              onClick={() => {
                                const noteElement = document.querySelector(`[data-note-id="${note.id}"]`)
                                if (noteElement) {
                                  noteElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                  noteElement.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.4)'
                                  setTimeout(() => {
                                    noteElement.style.boxShadow = 'none'
                                  }, 2000)
                                }
                                setShowAiResults(false)
                              }}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                  <i className="ri-sticky-note-line text-base" style={{ color: '#f97316' }}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate" style={{ color: '#1e293b' }}>
                                    {note.content.substring(0, 60)}...
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs" style={{ color: '#64748b' }}>
                                      {note.timestamp}
                                    </span>
                                    <span className="text-xs" style={{ color: '#64748b' }}>
                                      by {note.author}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div 
                      className="px-4 py-2 text-xs text-center"
                      style={{ 
                        color: '#9ca3af',
                        backgroundColor: '#f9fafb',
                        borderTop: '1px solid #f1f5f9'
                      }}
                    >
                      AI-powered search across your {selectedWebsite.websiteNotes[0]?.websiteName || selectedWebsite.website} notes
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </header>

          {/* Notes Grid */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4" style={{ columnGap: '20px', rowGap: '32px' }}>
              {selectedWebsite.websiteNotes.map((note, index) => (
                <div key={note.id} className="flex flex-col">
                  {/* Note Header */}
                  <div className="mb-3 px-2">
                    <div className="flex items-center space-x-2 mb-1">
                      {selectedWebsite.website === 'figma.com' && <i className="ri-palette-line text-lg" style={{ color: '#f24e1e' }}></i>}
                      {selectedWebsite.website === 'github.com' && <i className="ri-github-line text-lg" style={{ color: '#24292e' }}></i>}
                      {selectedWebsite.website === 'notion.so' && <i className="ri-file-text-line text-lg" style={{ color: '#000000' }}></i>}
                      {selectedWebsite.website === 'linear.app' && <i className="ri-bug-line text-lg" style={{ color: '#5e6ad2' }}></i>}
                      {!['figma.com', 'github.com', 'notion.so', 'linear.app'].includes(selectedWebsite.website) && <i className="ri-global-line text-lg" style={{ color: '#64748b' }}></i>}
                      <h4 className="text-base font-semibold" style={{ color: '#1e293b' }}>
                        {note.websiteName || selectedWebsite.website || 'NOA Workspace'}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-3 text-xs" style={{ color: '#64748b' }}>
                      <div className="flex items-center space-x-1">
                        <i className="ri-time-line"></i>
                        <span>{note.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-user-line"></i>
                        <span>by {note.author || 'You'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Note Content */}
                  <div 
                    className="flex justify-center"
                    style={{
                      transform: 'scale(1.1)',
                      transformOrigin: 'center top'
                    }}
                  >
                    {renderNote(note, index)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f8fafc' }}>
      {/* Left Sidebar */}
      <div className="w-64 flex flex-col" style={{ backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0' }}>
        {/* Sidebar Header */}
        <div className="p-6" style={{ borderBottom: '1px solid #e2e8f0' }}>
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ 
                backgroundColor: '#372804',
                color: '#FFF097'
              }}
            >
              N
            </div>
            <span className="text-lg font-semibold" style={{ color: '#1e293b' }}>
              NOA
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <div className="mb-6">
            <div className="mb-3">
              <h3 className="text-sm font-medium" style={{ color: '#1e293b' }}>
                Navigation
              </h3>
            </div>
            
            <div className="space-y-1">
              {/* Home Option */}
              <button
                onClick={() => {
                  setCurrentView('home')
                  setSelectedFolder(null)
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors"
                style={{
                  backgroundColor: currentView === 'home' ? '#f8fafc' : 'transparent',
                  border: currentView === 'home' ? '1px solid #e2e8f0' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (currentView !== 'home') {
                    e.target.style.backgroundColor = '#f8fafc'
                    e.target.style.borderColor = '#e2e8f0'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentView !== 'home') {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.borderColor = 'transparent'
                  }
                }}
              >
                <i className="ri-home-line text-lg" style={{ color: currentView === 'home' ? '#372804' : '#64748b' }}></i>
                <div>
                  <div className="text-sm font-medium" style={{ color: currentView === 'home' ? '#1e293b' : '#64748b' }}>
                    Home
                  </div>
                </div>
              </button>

              {/* Folders Option */}
              <button
                onClick={() => setCurrentView('folders')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors"
                style={{
                  backgroundColor: currentView === 'folders' ? '#f8fafc' : 'transparent',
                  border: currentView === 'folders' ? '1px solid #e2e8f0' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (currentView !== 'folders') {
                    e.target.style.backgroundColor = '#f8fafc'
                    e.target.style.borderColor = '#e2e8f0'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentView !== 'folders') {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.borderColor = 'transparent'
                  }
                }}
              >
                <i className="ri-folder-line text-lg" style={{ color: currentView === 'folders' ? '#372804' : '#64748b' }}></i>
                <div>
                  <div className="text-sm font-medium" style={{ color: currentView === 'folders' ? '#1e293b' : '#64748b' }}>
                    Folders
                  </div>
                </div>
              </button>
            </div>
          </div>

          <button 
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors"
            style={{ color: '#64748b', backgroundColor: '#f8fafc' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f8fafc'}
            onClick={() => setShowWorkspacePopup(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Add New Folder</span>
          </button>

          {/* Folder List - Only show when in folders view */}
          {currentView === 'folders' && (
            <div className="mt-6">
              <div className="mb-3">
                <h3 className="text-sm font-medium" style={{ color: '#1e293b' }}>
                  Your Folders
                </h3>
              </div>
              <div className="space-y-1">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder)}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors"
                    style={{
                      backgroundColor: selectedFolder?.id === folder.id ? '#f8fafc' : 'transparent',
                      border: selectedFolder?.id === folder.id ? '1px solid #e2e8f0' : '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedFolder?.id !== folder.id) {
                        e.target.style.backgroundColor = '#f8fafc'
                        e.target.style.borderColor = '#e2e8f0'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedFolder?.id !== folder.id) {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.borderColor = 'transparent'
                      }
                    }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: folder.color }}
                    ></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ 
                        color: selectedFolder?.id === folder.id ? '#1e293b' : '#64748b' 
                      }}>
                        {folder.name}
                      </div>
                      <div className="text-xs" style={{ color: '#94a3b8' }}>
                        {folder.description}
                      </div>
                    </div>
                    {selectedFolder?.id === folder.id && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#372804' }}></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>



        {/* Sidebar Footer */}
        <div className="p-4" style={{ borderTop: '1px solid #e2e8f0' }}>
          <button 
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors"
            style={{ color: '#64748b' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Dot Pattern Background - Only for Version 1 */}
        {dashboardVersion === 1 && (
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '10px 10px'
            }}
          />
        )}
        {/* Header */}
        <header className="px-6 py-4 relative z-10" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold" style={{ color: '#1e293b' }}>
                {currentView === 'home' 
                  ? 'Dashboard' 
                  : selectedFolder 
                    ? selectedFolder.name
                    : 'Folders'
                }
              </h1>
              <p className="text-sm" style={{ color: '#64748b' }}>
                {currentView === 'home' 
                  ? 'Organize, collaborate, and manage your notes efficiently'
                  : selectedFolder
                    ? selectedFolder.description
                    : 'Select a folder to view its notes'
                }
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* AI Search */}
              <div className="relative" ref={searchRef}>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <i className="ri-sparkling-2-line text-lg" style={{ color: '#f97316' }}></i>
                  </div>
                  <input
                    type="text"
                    value={aiSearchQuery}
                    onChange={(e) => setAiSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Ask AI about your notes..."
                    className="pl-12 pr-12 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200"
                    style={{ 
                      width: '400px',
                      backgroundColor: '#ffffff',
                      border: '2px solid #e2e8f0',
                      color: '#1e293b',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f97316'
                      e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)'
                      if (aiSearchResults) setShowAiResults(true)
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0'
                      e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <button
                    onClick={() => handleAiSearch(aiSearchQuery)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center"
                    style={{ 
                      backgroundColor: aiSearchQuery.trim() ? '#f97316' : '#f1f5f9',
                      color: aiSearchQuery.trim() ? '#ffffff' : '#64748b'
                    }}
                    disabled={isSearching}
                    onMouseEnter={(e) => {
                      if (aiSearchQuery.trim()) {
                        e.target.style.backgroundColor = '#ea580c'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (aiSearchQuery.trim()) {
                        e.target.style.backgroundColor = '#f97316'
                      }
                    }}
                  >
                    {isSearching ? (
                      <motion.div
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <i className="ri-send-plane-line text-sm"></i>
                    )}
                  </button>
                </div>

                {/* AI Search Results */}
                {showAiResults && aiSearchResults && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 w-96 rounded-lg shadow-lg overflow-hidden z-50"
                    style={{ 
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* AI Response Header */}
                    <div className="px-4 py-3" style={{ backgroundColor: '#fff7ed', borderBottom: '1px solid #fed7aa' }}>
                      <div className="flex items-center space-x-2">
                        <i className="ri-sparkling-2-line text-lg" style={{ color: '#f97316' }}></i>
                        <span className="text-sm font-medium" style={{ color: '#1e293b' }}>
                          AI Assistant
                        </span>
                        <div className="ml-auto">
                          <i className="ri-robot-line text-sm" style={{ color: '#f97316' }}></i>
                        </div>
                      </div>
                    </div>

                    {/* AI Answer */}
                    <div className="px-4 py-3">
                      <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>
                        {aiSearchResults.answer}
                      </p>

                      {/* Related Notes */}
                      {aiSearchResults.relatedNotes.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-medium" style={{ color: '#64748b' }}>
                            Related Notes:
                          </h4>
                          {aiSearchResults.relatedNotes.map((note) => (
                            <div 
                              key={note.id}
                              className="p-2 rounded border cursor-pointer transition-colors hover:bg-gray-50"
                              style={{ borderColor: '#e2e8f0' }}
                              onClick={() => {
                                // Find the note element - it might be in a layered container
                                let noteElement = document.querySelector(`[data-note-id="${note.id}"]`);
                                if (!noteElement) {
                                  // If not found directly, look for the website group that contains this note
                                  const websiteGroup = Object.entries(notesByWebsite).find(([, notes]) => 
                                    notes.some(n => n.id === note.id)
                                  );
                                  if (websiteGroup) {
                                    noteElement = document.querySelector(`[data-note-id="${websiteGroup[1][0].id}"]`);
                                  }
                                }
                                if (noteElement) {
                                  noteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  noteElement.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.4)';
                                  setTimeout(() => {
                                    noteElement.style.boxShadow = '';
                                  }, 2000);
                                }
                                setShowAiResults(false);
                              }}
                            >
                              <div className="flex items-start space-x-2">
                                <div className="flex-shrink-0 mt-0.5">
                                  {note.type === 'yellow' && <i className="ri-sticky-note-line text-yellow-600"></i>}
                                  {note.type === 'black' && <i className="ri-sticky-note-line text-gray-800"></i>}
                                  {note.type === 'gray' && <i className="ri-sticky-note-line text-gray-600"></i>}
                                  {note.type === 'oval' && <i className="ri-sticky-note-line text-pink-600"></i>}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs truncate" style={{ color: '#374151' }}>
                                    {note.content}
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1 text-xs" style={{ color: '#64748b' }}>
                                    <span>{note.timestamp}</span>
                                    <span>•</span>
                                    <span>by {note.author}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 text-xs" style={{ backgroundColor: '#f8fafc', color: '#64748b' }}>
                      Press Enter or click send to search • Click on notes to view them
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Notifications */}
              <button 
                className="p-2 rounded-lg transition-colors relative"
                style={{ color: '#64748b' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>

              {/* Simple Sign Out Button */}
              <button
                onClick={() => {
                  console.log('🔓 Sign Out clicked!')
                  
                  // Clear user data immediately
                  localStorage.removeItem('noa-user')
                  console.log('🗑️ User data cleared from localStorage')
                  
                  // Call onLogout if available, otherwise force redirect
                  if (onLogout && typeof onLogout === 'function') {
                    console.log('✅ Calling onLogout function...')
                    onLogout()
                  } else {
                    console.log('🔄 No onLogout function - forcing redirect')
                    window.location.href = '/'
                  }
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                title="Sign out and return to landing page"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto relative z-10" style={{ paddingBottom: '80px' }} data-main-content>
          {/* Page Heading and Toolbar - Same Line */}
          {/* Professional Header */}
          <div className="mb-8">
            {/* Main Header Row */}
            <div className="flex items-center justify-between mb-4">
              {/* Left: Workspace Title */}
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#372804' }}
                >
                  <i className="ri-folder-3-line text-lg text-white"></i>
                </div>
                <div>
                                  <h1 className="text-2xl font-bold" style={{ color: '#1e293b' }}>
                  Design Team Workspace
                </h1>
                </div>
              </div>

            </div>


          </div>

          {/* Dashboard Version Toggle Buttons */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm font-medium mr-4" style={{ color: '#64748b' }}>
                Dashboard Version:
              </span>
              
              {[1, 2, 3, 4, 5].map((version) => (
                <button
                  key={version}
                  onClick={() => setDashboardVersion(version)}
                  className="w-8 h-8 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center"
                  style={{
                    backgroundColor: dashboardVersion === version ? '#372804' : '#ffffff',
                    color: dashboardVersion === version ? '#FFF097' : '#64748b',
                    border: dashboardVersion === version ? 'none' : '1px solid #e2e8f0',
                    boxShadow: dashboardVersion === version ? '0 2px 4px rgba(55, 40, 4, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (dashboardVersion !== version) {
                      e.target.style.backgroundColor = '#f8fafc';
                      e.target.style.borderColor = '#cbd5e1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (dashboardVersion !== version) {
                      e.target.style.backgroundColor = '#ffffff';
                      e.target.style.borderColor = '#e2e8f0';
                    }
                  }}
                  title={`Switch to Dashboard Version ${version}${version === 1 ? ' (Current)' : version === 2 ? ' (Compact)' : version === 3 ? ' (Expand)' : version === 4 ? ' (Simple)' : ' (Main)'}`}
                >
                  {version}
                </button>
              ))}
              
              <div className="ml-4 text-xs" style={{ color: '#9ca3af' }}>
                {dashboardVersion === 1 && 'Current Layout'}
                {dashboardVersion === 2 && 'Compact Layout'}
                {dashboardVersion === 3 && 'Expand Layout'}
                {dashboardVersion === 4 && 'Simple Layout'}
                {dashboardVersion === 5 && 'Main Layout'}
              </div>
            </div>
          </div>

          {/* Notes Display - Conditional based on dashboard version */}
          {dashboardVersion === 1 && (
            notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: '#f8fafc', border: '2px dashed #cbd5e1' }}
              >
                {currentView === 'home' ? (
                  <i className="ri-sticky-note-line text-2xl" style={{ color: '#9ca3af' }}></i>
                ) : (
                  <i className="ri-folder-open-line text-2xl" style={{ color: '#9ca3af' }}></i>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#1e293b' }}>
                {currentView === 'home' 
                  ? 'No notes yet' 
                  : selectedFolder 
                    ? `No notes in "${selectedFolder.name}" folder`
                    : 'Select a folder to view notes'
                }
              </h3>
              <p className="text-sm text-center mb-6 max-w-md" style={{ color: '#64748b' }}>
                {currentView === 'home' 
                  ? 'Start creating your first note by going to the landing page and placing a note anywhere on the canvas. Your notes will appear here once created.'
                  : selectedFolder
                    ? `This folder is empty. Add notes to "${selectedFolder.name}" or create new notes from the landing page.`
                    : 'Choose a folder from the sidebar to view its notes, or switch to Home to see all your notes.'
                }
              </p>
              <div className="flex items-center space-x-4">
                {currentView === 'home' ? (
                  <button
                    onClick={() => window.location.href = '/'}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                    style={{
                      backgroundColor: '#372804',
                      color: '#ffffff'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2d1f02'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#372804'}
                  >
                    <i className="ri-add-line text-base"></i>
                    <span>Create First Note</span>
                  </button>
                ) : selectedFolder ? (
                  <button
                    onClick={() => window.location.href = '/'}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                    style={{
                      backgroundColor: selectedFolder.color,
                      color: '#ffffff'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                  >
                    <i className="ri-add-line text-base"></i>
                    <span>Add Note to {selectedFolder.name}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentView('home')}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                    style={{
                      backgroundColor: '#372804',
                      color: '#ffffff'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2d1f02'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#372804'}
                  >
                    <i className="ri-home-line text-base"></i>
                    <span>View All Notes</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Sites Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4" style={{ columnGap: '20px', rowGap: '650px' }}>
                {paginatedSites.map(([website, websiteNotes]) => (
                <div key={website} className="flex flex-col">
                  {/* Website Header - Only Once Per Website */}
                  <div className="mb-4 px-2">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center space-x-2">
                        {website === 'figma.com' && <i className="ri-palette-line text-lg" style={{ color: '#f24e1e' }}></i>}
                        {website === 'github.com' && <i className="ri-github-line text-lg" style={{ color: '#24292e' }}></i>}
                        {website === 'notion.so' && <i className="ri-file-text-line text-lg" style={{ color: '#000000' }}></i>}
                        {website === 'linear.app' && <i className="ri-bug-line text-lg" style={{ color: '#5e6ad2' }}></i>}
                        {website === 'slack.com' && <i className="ri-slack-line text-lg" style={{ color: '#4a154b' }}></i>}
                        {website === 'trello.com' && <i className="ri-trello-line text-lg" style={{ color: '#0079bf' }}></i>}
                        {website === 'jira.atlassian.com' && <i className="ri-bug-2-line text-lg" style={{ color: '#0052cc' }}></i>}
                        {website === 'asana.com' && <i className="ri-checkbox-circle-line text-lg" style={{ color: '#f06a6a' }}></i>}
                        {website === 'miro.com' && <i className="ri-palette-2-line text-lg" style={{ color: '#ffd02f' }}></i>}
                        {website === 'confluence.atlassian.com' && <i className="ri-book-open-line text-lg" style={{ color: '#0052cc' }}></i>}
                        {website === 'discord.com' && <i className="ri-discord-line text-lg" style={{ color: '#5865f2' }}></i>}
                        {website === 'airtable.com' && <i className="ri-table-line text-lg" style={{ color: '#18bfff' }}></i>}
                        {!['figma.com', 'github.com', 'notion.so', 'linear.app', 'slack.com', 'trello.com', 'jira.atlassian.com', 'asana.com', 'miro.com', 'confluence.atlassian.com', 'discord.com', 'airtable.com'].includes(website) && <i className="ri-global-line text-lg" style={{ color: '#64748b' }}></i>}
                        <h4 className="text-base font-semibold" style={{ color: '#1e293b' }}>
                          {websiteNotes[0]?.websiteName || website || 'NOA Workspace'}
                        </h4>
                        {websiteNotes.length > 1 && (
                          <button
                            className="text-xs px-2 py-1 rounded-full font-medium transition-colors cursor-pointer ml-3"
                            style={{ 
                              backgroundColor: '#FFF097',
                              color: '#372804',
                              border: '1px solid #e4d6a7'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#FFE066'
                              e.target.style.transform = 'scale(1.05)'
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#FFF097'
                              e.target.style.transform = 'scale(1)'
                            }}
                            onClick={() => {
                              setSelectedWebsite({ website, websiteNotes })
                              setCurrentPage('website-notes')
                            }}
                            title={`Click to view all ${websiteNotes.length} notes from ${website}`}
                          >
                            {websiteNotes.length} notes
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-xs" style={{ color: '#64748b' }}>
                      <div className="flex items-center space-x-1">
                        <i className="ri-time-line"></i>
                        <span>Latest: {websiteNotes[0]?.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-user-line"></i>
                        <span>by {websiteNotes[0]?.author || 'You'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stacked Notes Container - Same note stacked below showing bottom edges */}
                  <div 
                    className="relative" 
                    data-note-id={websiteNotes[0]?.id}
                  >
                    {/* Background Note Stack - Show same note multiple times with bottom portions visible */}
                    {websiteNotes.length > 1 && (
                      <>
                        {/* Stack 2-3 copies of the same note below the main one */}
                        {Array.from({ length: Math.min(websiteNotes.length - 1, 3) }, (_, stackIndex) => (
                          <div
                            key={`stack-${stackIndex}`}
                            className="absolute top-0 left-0 w-full"
                            style={{
                              transform: `translateY(${(stackIndex + 1) * 8}px) translateX(${(stackIndex + 1) * 2}px)`, // Offset down and slightly right
                              zIndex: 5 - stackIndex, // Lower z-index for deeper stack items
                              opacity: 0.6 - (stackIndex * 0.15), // Progressive fade: 0.6, 0.45, 0.3
                              filter: 'blur(0.5px)' // Slight blur for depth
                            }}
                          >
                            {/* Render same note with slight modifications for stack effect */}
                            <div
                              style={{
                                transform: 'scale(0.98)', // Slightly smaller for depth
                                transformOrigin: 'top left'
                              }}
                            >
                              {renderNote(websiteNotes[0], stackIndex + 1)}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    
                    {/* Main Note (Top Card) */}
                    <div 
                      className="relative"
                      style={{
                        zIndex: 10 // Always on top
                      }}
                    >
                      {renderNote(websiteNotes[0], 0)}
                    </div>
                  </div>
                </div>
                ))}
              </div>

              {/* Minimal Pagination Controls */}
              {totalPages > 1 && (
                <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center py-2 space-x-3 z-40" style={{ backgroundColor: 'rgba(248, 250, 252, 0.95)', borderTop: '1px solid #f1f5f9' }}>
                  <button
                    onClick={() => setSitesPage(Math.max(1, sitesPage - 1))}
                    disabled={sitesPage === 1}
                    className="flex items-center justify-center w-7 h-7 rounded-full transition-colors"
                    style={{
                      backgroundColor: sitesPage === 1 ? 'transparent' : '#ffffff',
                      color: sitesPage === 1 ? '#cbd5e1' : '#64748b',
                      border: sitesPage === 1 ? '1px solid #f1f5f9' : '1px solid #e5e7eb',
                      cursor: sitesPage === 1 ? 'not-allowed' : 'pointer',
                      boxShadow: sitesPage === 1 ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <i className="ri-arrow-left-line text-xs"></i>
                  </button>

                  {/* Minimal Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setSitesPage(page)}
                        className="w-6 h-6 rounded-full text-xs font-medium transition-colors"
                        style={{
                          backgroundColor: page === sitesPage ? '#64748b' : 'transparent',
                          color: page === sitesPage ? '#ffffff' : '#94a3b8',
                          border: 'none'
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setSitesPage(Math.min(totalPages, sitesPage + 1))}
                    disabled={sitesPage === totalPages}
                    className="flex items-center justify-center w-7 h-7 rounded-full transition-colors"
                    style={{
                      backgroundColor: sitesPage === totalPages ? 'transparent' : '#ffffff',
                      color: sitesPage === totalPages ? '#cbd5e1' : '#64748b',
                      border: sitesPage === totalPages ? '1px solid #f1f5f9' : '1px solid #e5e7eb',
                      cursor: sitesPage === totalPages ? 'not-allowed' : 'pointer',
                      boxShadow: sitesPage === totalPages ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <i className="ri-arrow-right-line text-xs"></i>
                  </button>
                </div>
              )}

              {/* Sites Summary */}
              <div className="text-center mt-2 mb-16">
                <p className="text-xs" style={{ color: '#9ca3af' }}>
                  {startIndex + 1}-{Math.min(endIndex, totalSites)} of {totalSites} sites
                </p>
              </div>
            </>
          )
          )}

          {/* Dashboard Compact Version (Version 2) */}
          {dashboardVersion === 2 && (
            <div className="flex-1 overflow-hidden">
              <DashboardCompact userNotes={notes} />
            </div>
          )}

          {/* Expand Dashboard Version (Version 3) */}
          {dashboardVersion === 3 && (
            <div className="flex-1 overflow-hidden">
              <DashboardExpand userNotes={notes} />
            </div>
          )}

          {/* Simple Dashboard Version (Version 4) */}
          {dashboardVersion === 4 && (
            <div className="flex-1 overflow-hidden">
              <DashboardSimple userNotes={notes} />
            </div>
          )}

          {/* Main Dashboard Version (Version 5) */}
          {dashboardVersion === 5 && (
            <div className="flex-1 overflow-hidden">
              <DashboardMain userNotes={notes} />
            </div>
          )}
        </div>
      </div>

      {/* Add New Workspace Popup */}
      {showWorkspacePopup && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
        >
          <div 
            ref={workspacePopupRef}
            className="bg-white rounded-xl p-6 w-96 max-w-md mx-4"
            style={{ 
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Popup Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#372804' }}
                >
                  <i className="ri-folder-add-line text-white text-lg"></i>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: '#1e293b' }}>
                  Create New Folder
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowWorkspacePopup(false)
                  setNewWorkspaceName('')
                  setNewWorkspaceDescription('')
                }}
                className="p-1 rounded-lg transition-colors hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" style={{ color: '#64748b' }}></i>
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Workspace Name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                  Folder Name *
                </label>
                <input
                  type="text"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  onKeyDown={handleFolderKeyDown}
                  placeholder="Enter folder name..."
                  className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none transition-colors"
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    color: '#1e293b'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#372804'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  autoFocus
                />
              </div>

              {/* Workspace Description */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                  Description (Optional)
                </label>
                <textarea
                  value={newWorkspaceDescription}
                  onChange={(e) => setNewWorkspaceDescription(e.target.value)}
                  onKeyDown={handleFolderKeyDown}
                  placeholder="Describe your folder..."
                  rows="3"
                  className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    color: '#1e293b'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#372804'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Keyboard Shortcut Hint */}
              <div className="text-xs" style={{ color: '#64748b' }}>
                Press {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'} + Enter to create • ESC to cancel
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowWorkspacePopup(false)
                  setNewWorkspaceName('')
                  setNewWorkspaceDescription('')
                }}
                className="px-4 py-2 text-sm rounded-lg transition-colors"
                style={{
                  color: '#64748b',
                  backgroundColor: 'transparent',
                  border: '1px solid #e2e8f0'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={!newWorkspaceName.trim()}
                className="px-4 py-2 text-sm rounded-lg transition-colors"
                style={{
                  backgroundColor: newWorkspaceName.trim() ? '#372804' : '#e5e7eb',
                  color: newWorkspaceName.trim() ? '#ffffff' : '#9ca3af',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  if (newWorkspaceName.trim()) {
                    e.target.style.backgroundColor = '#2d1f02'
                  }
                }}
                onMouseLeave={(e) => {
                  if (newWorkspaceName.trim()) {
                    e.target.style.backgroundColor = '#372804'
                  }
                }}
              >
                Create Folder
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default Dashboard
