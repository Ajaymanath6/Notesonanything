import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search } from 'lucide-react'

const JIRA_PROJECTS = [
  { id: 1, name: 'Web App Redesign', key: 'WAR' },
  { id: 2, name: 'Mobile App Development', key: 'MAD' },
  { id: 3, name: 'API Integration', key: 'API' },
  { id: 4, name: 'Bug Fixes', key: 'BUG' },
  { id: 5, name: 'Feature Requests', key: 'FR' }
]

const JIRA_WORK_TYPES = [
  { id: 1, name: 'Task', key: 'TASK' },
  { id: 2, name: 'Bug', key: 'BUG' },
  { id: 3, name: 'Story', key: 'STORY' },
  { id: 4, name: 'Epic', key: 'EPIC' },
  { id: 5, name: 'Subtask', key: 'SUB' }
]

const JIRA_STATUSES = [
  { id: 1, name: 'To Do' },
  { id: 2, name: 'In Progress' },
  { id: 3, name: 'In Review' },
  { id: 4, name: 'Done' },
  { id: 5, name: 'Blocked' }
]

const JIRA_USERS = [
  { id: 1, name: 'Alex Johnson', email: 'alex@company.com', avatar: 'AJ' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@company.com', avatar: 'SC' },
  { id: 3, name: 'Mike Davis', email: 'mike@company.com', avatar: 'MD' },
  { id: 4, name: 'Emily Rodriguez', email: 'emily@company.com', avatar: 'ER' },
  { id: 5, name: 'Tom Wilson', email: 'tom@company.com', avatar: 'TW' }
]

const NOTION_WORKSPACES = [
  { id: 'ws-1', name: 'Hyprnote Product', members: 24 },
  { id: 'ws-2', name: 'Customer Success', members: 12 },
  { id: 'ws-3', name: 'Investor Updates', members: 6 }
]

const NOTION_DATABASES = [
  { id: 'db-1', name: 'Product Roadmap', badge: 'Roadmap', workspaceId: 'ws-1' },
  { id: 'db-2', name: 'Release Notes', badge: 'Ship 🚀', workspaceId: 'ws-1' },
  { id: 'db-3', name: 'Customer Interviews', badge: 'CX', workspaceId: 'ws-2' },
  { id: 'db-4', name: 'Capital Calls', badge: 'Finance', workspaceId: 'ws-3' }
]

const NOTION_TEMPLATES = [
  { id: 'tpl-1', name: 'Bug Report', description: 'Capture production issues and reproduction steps.' },
  { id: 'tpl-2', name: 'Product Spec', description: 'Outline feature goals, requirements, and success metrics.' },
  { id: 'tpl-3', name: 'Sprint Notes', description: 'Track sprint goals, wins, and follow-ups.' }
]

const NOTION_STATUS_OPTIONS = ['Backlog', 'In Progress', 'Review', 'Published']
const NOTION_TAGS = ['Engineering', 'Design', 'Product', 'Bug', 'Research']

// Helper function to extract company name from URL
const extractCompanyName = (urlString) => {
  try {
    const url = new URL(urlString)
    const hostname = url.hostname
    // Remove www. if present
    const domain = hostname.replace(/^www\./, '')
    // Extract the main domain name (e.g., "unicourt" from "dart.unicourt.com")
    const parts = domain.split('.')
    if (parts.length >= 2) {
      // Get the second-to-last part (usually the company name)
      const companyPart = parts[parts.length - 2]
      // Capitalize first letter of each word
      return companyPart.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }
    return domain
  } catch {
    return ''
  }
}

// Helper function to format URL for display
const formatUrlForDisplay = (urlString) => {
  try {
    const url = new URL(urlString)
    const pathSegments = url.pathname.split('/').filter(Boolean)
    if (pathSegments.length === 0) {
      return urlString
    }
    // If there are more than 2 segments, show all except last two, then ..., then last
    if (pathSegments.length > 2) {
      const segmentsToShow = pathSegments.slice(0, -2)
      const lastSegment = pathSegments[pathSegments.length - 1]
      return `/${segmentsToShow.join('/')}/.../${lastSegment}`
    }
    // If 2 segments, show both
    if (pathSegments.length === 2) {
      return `/${pathSegments.join('/')}`
    }
    // If 1 segment, show it
    return `/${pathSegments[0]}`
  } catch {
    // If URL parsing fails, try to extract path manually
    const match = urlString.match(/\/[^\/]+(?:\/[^\/]+)*\/?$/)
    if (match) {
      const path = match[0]
      const segments = path.split('/').filter(Boolean)
      if (segments.length > 2) {
        const segmentsToShow = segments.slice(0, -2)
        const lastSegment = segments[segments.length - 1]
        return `/${segmentsToShow.join('/')}/.../${lastSegment}`
      }
      return path
    }
    return urlString
  }
}

const NoteComponent = ({ onClick, isExpanded }) => {
  const pageContext = {
    siteName: 'Tesla Motors',
    siteUrl: 'https://www.tesla.com/investor-relations/dashboard',
    pageName: 'Investor Dashboard',
    pageLocation: 'tesla.com → investor-relations → dashboard',
    capturedAt: 'August 29, 2025 • 15:55',
    totalNotes: 4
  };

  const note = {
    id: 'case-1',
    title: 'Dummy Case Title Goes Here',
    bodyParagraphs: [
      'We believe in the power of notetaking, not notetakers. Meetings should be moments of presence, not passive attendance. If you are not added value, your time is better spent elsewhere for you and your team.',
      'Hyprnote exists to preserve what makes us human: conversations that spark ideas, collaborations tha'
    ],
    author: 'Ajay Manath',
    timestamp: '2 months ago',
    likes: 1,
    linkLabel: 'Locate',
    commentActionLabel: 'Comment',
    comments: [
      {
        id: 'cmt-1',
        author: 'Ajay Manath',
        timestamp: '27 minutes ago',
        content: 'First comment placeholder to match layout.'
      },
      {
        id: 'cmt-2',
        author: 'Ajay Manath',
        timestamp: '3 minutes ago',
        content: 'Second comment placeholder text.'
      },
      {
        id: 'cmt-3',
        author: 'Ajay Manath',
        timestamp: '3 minutes ago',
        content: 'Third comment sample content for testing.'
      }
    ]
  };

  const [showComments, setShowComments] = useState(true)
  const [showTitle, setShowTitle] = useState(true)
  const [customTitle, setCustomTitle] = useState(note.title)
  const [isPinned, setIsPinned] = useState(false)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [activeIntegration, setActiveIntegration] = useState(null)
  const [integrationMenuPosition, setIntegrationMenuPosition] = useState(null)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [shareMenuPosition, setShareMenuPosition] = useState(null)
  const [shareEmails, setShareEmails] = useState('')
  const jiraButtonRef = useRef(null)
  const notionButtonRef = useRef(null)
  const shareButtonRef = useRef(null)

  // Jira integration state
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedWorkType, setSelectedWorkType] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [summary, setSummary] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [userSearchQuery, setUserSearchQuery] = useState('')
  const [showProjectList, setShowProjectList] = useState(false)
  const [showWorkTypeList, setShowWorkTypeList] = useState(false)
  const [showStatusList, setShowStatusList] = useState(false)
  const [showUserList, setShowUserList] = useState(false)

  // Notion integration state
  const [selectedWorkspace, setSelectedWorkspace] = useState(NOTION_WORKSPACES[0])
  const [selectedDatabase, setSelectedDatabase] = useState(
    NOTION_DATABASES.find((database) => database.workspaceId === NOTION_WORKSPACES[0]?.id) || NOTION_DATABASES[0]
  )
  const [selectedTemplate, setSelectedTemplate] = useState(NOTION_TEMPLATES[0])
  const [notionPageTitle, setNotionPageTitle] = useState(note.title)
  const [notionStatus, setNotionStatus] = useState(NOTION_STATUS_OPTIONS[0])
  const [notionSelectedTags, setNotionSelectedTags] = useState([NOTION_TAGS[0]])
  const [notionIncludeContent, setNotionIncludeContent] = useState(true)
  const [showWorkspaceList, setShowWorkspaceList] = useState(false)
  const [showDatabaseList, setShowDatabaseList] = useState(false)
  const [showTemplateList, setShowTemplateList] = useState(false)
  const [showStatusOptions, setShowStatusOptions] = useState(false)

  const titleInputRef = useRef(null)
  const headerRef = useRef(null)

  const noteBodyContent = note.bodyParagraphs.join('\n\n')

  const filteredUsers = JIRA_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  )

  const filteredNotionDatabases = NOTION_DATABASES.filter(
    (database) => !selectedWorkspace || database.workspaceId === selectedWorkspace.id
  )

  const closeAllDropdowns = useCallback(() => {
    setShowProjectList(false)
    setShowWorkTypeList(false)
    setShowStatusList(false)
    setShowUserList(false)
    setShowWorkspaceList(false)
    setShowDatabaseList(false)
    setShowTemplateList(false)
    setShowStatusOptions(false)
  }, [])

  const resetJiraState = useCallback(() => {
    setSelectedProject(null)
    setSelectedWorkType(null)
    setSelectedStatus(null)
    setSummary('')
    setSelectedUser(null)
    setUserSearchQuery('')
    setShowProjectList(false)
    setShowWorkTypeList(false)
    setShowStatusList(false)
    setShowUserList(false)
  }, [])

  const resetNotionState = useCallback(() => {
    const defaultWorkspace = NOTION_WORKSPACES[0] || null
    setSelectedWorkspace(defaultWorkspace)
    const defaultDatabase =
      NOTION_DATABASES.find((database) => database.workspaceId === defaultWorkspace?.id) ||
      NOTION_DATABASES[0] ||
      null
    setSelectedDatabase(defaultDatabase)
    setSelectedTemplate(NOTION_TEMPLATES[0])
    setNotionPageTitle(note.title)
    setNotionStatus(NOTION_STATUS_OPTIONS[0])
    setNotionSelectedTags([NOTION_TAGS[0]])
    setNotionIncludeContent(true)
    setShowWorkspaceList(false)
    setShowDatabaseList(false)
    setShowTemplateList(false)
    setShowStatusOptions(false)
  }, [note.title])

  const closeIntegrationMenu = useCallback(() => {
    setActiveIntegration(null)
    setIntegrationMenuPosition(null)
    resetJiraState()
    resetNotionState()
  }, [resetJiraState, resetNotionState])

  const closeShareMenu = useCallback(() => {
    setShareMenuOpen(false)
    setShareMenuPosition(null)
    setShareEmails('')
  }, [])

  const handleShareButtonClick = useCallback(
    (rect) => {
      if (shareMenuOpen) {
        closeShareMenu()
        return
      }
      closeAllDropdowns()
      closeIntegrationMenu()
      setShareMenuPosition({
        top: rect.bottom + 8,
        left: rect.left
      })
      setShareMenuOpen(true)
      setOptionsOpen(false)
    },
    [shareMenuOpen, closeAllDropdowns, closeIntegrationMenu, closeShareMenu]
  )

  const handleIntegrationButtonClick = useCallback(
    (integration, rect) => {
      if (activeIntegration === integration) {
        closeIntegrationMenu()
        return
      }
      closeAllDropdowns()
      closeShareMenu()
      if (integration === 'jira') {
        resetJiraState()
      } else {
        resetNotionState()
      }
      setIntegrationMenuPosition({
        top: rect.bottom + 8,
        left: rect.left
      })
      setActiveIntegration(integration)
      setOptionsOpen(false)
    },
    [activeIntegration, closeAllDropdowns, closeIntegrationMenu, closeShareMenu, resetJiraState, resetNotionState]
  )

  useEffect(() => {
    if (!optionsOpen && !activeIntegration && !shareMenuOpen) return

    const handleClickAway = (event) => {
      const isInsideHeader = headerRef.current?.contains(event.target)
      const isInsideIntegrationMenu = event.target.closest('.note-integration-menu')
      const isInsideShareMenu = event.target.closest('.note-share-menu')
      if (!isInsideHeader && !isInsideIntegrationMenu && !isInsideShareMenu) {
        setOptionsOpen(false)
        closeIntegrationMenu()
        closeShareMenu()
      }
    }

    document.addEventListener('mousedown', handleClickAway)
    return () => document.removeEventListener('mousedown', handleClickAway)
  }, [optionsOpen, activeIntegration, shareMenuOpen, closeIntegrationMenu, closeShareMenu])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOptionsOpen(false)
        if (activeIntegration) {
          closeIntegrationMenu()
        }
        if (shareMenuOpen) {
          closeShareMenu()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeIntegration, shareMenuOpen, closeIntegrationMenu, closeShareMenu])

  // Update dropdown positions on scroll
  useEffect(() => {
    if (!activeIntegration && !shareMenuOpen) return

    const updatePositions = () => {
      if (activeIntegration === 'jira' && jiraButtonRef.current) {
        const rect = jiraButtonRef.current.getBoundingClientRect()
        setIntegrationMenuPosition({
          top: rect.bottom + 8,
          left: rect.left
        })
      } else if (activeIntegration === 'notion' && notionButtonRef.current) {
        const rect = notionButtonRef.current.getBoundingClientRect()
        setIntegrationMenuPosition({
          top: rect.bottom + 8,
          left: rect.left
        })
      }
      
      if (shareMenuOpen && shareButtonRef.current) {
        const rect = shareButtonRef.current.getBoundingClientRect()
        setShareMenuPosition({
          top: rect.bottom + 8,
          left: rect.left
        })
      }
    }

    // Update immediately
    updatePositions()

    window.addEventListener('scroll', updatePositions, true)
    window.addEventListener('resize', updatePositions)
    
    return () => {
      window.removeEventListener('scroll', updatePositions, true)
      window.removeEventListener('resize', updatePositions)
    }
  }, [activeIntegration, shareMenuOpen])

  useEffect(() => {
    if (!selectedWorkspace) {
      setSelectedDatabase(null)
      return
    }

    const match = NOTION_DATABASES.find(
      (database) => database.workspaceId === selectedWorkspace.id && database.id === selectedDatabase?.id
    )

    if (!match) {
      const fallback =
        NOTION_DATABASES.find((database) => database.workspaceId === selectedWorkspace.id) || null
      setSelectedDatabase(fallback)
    }
  }, [selectedWorkspace, selectedDatabase])

  const handleTagToggle = (tag) => {
    setNotionSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    )
  }

  const renderIntegrationMenu = () => {
    if (!activeIntegration || !integrationMenuPosition) return null

    const isJira = activeIntegration === 'jira'

    const handleCancel = () => {
      if (isJira) {
        resetJiraState()
      } else {
        resetNotionState()
      }
      closeIntegrationMenu()
    }

    const handleCreate = () => {
      if (isJira) {
        if (!selectedProject || !selectedUser) return
        console.log('Creating Jira ticket:', {
          project: selectedProject,
          workType: selectedWorkType,
          status: selectedStatus,
          summary,
          assignee: selectedUser,
          content: noteBodyContent
        })
        closeIntegrationMenu()
      } else {
        if (!selectedWorkspace || !selectedDatabase || !notionPageTitle.trim()) return
        console.log('Creating Notion page:', {
          workspace: selectedWorkspace,
          database: selectedDatabase,
          template: selectedTemplate,
          status: notionStatus,
          tags: notionSelectedTags,
          includeContent: notionIncludeContent,
          pageTitle: notionPageTitle,
          content: notionIncludeContent ? noteBodyContent : undefined
        })
        closeIntegrationMenu()
      }
    }

    const jiraMenu = (
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Project
          </label>
          <div className="relative">
            <button
              onClick={(event) => {
                event.stopPropagation()
                closeAllDropdowns()
                setShowProjectList((prev) => !prev)
              }}
              className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg text-left hover:border-slate-300 transition-colors bg-white"
            >
              <span className="text-sm text-slate-800">
                {selectedProject ? selectedProject.name : 'Select a project'}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
            {showProjectList && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-20">
                {JIRA_PROJECTS.map((project) => (
                  <button
                    key={project.id}
                    onClick={(event) => {
                      event.stopPropagation()
                      setSelectedProject(project)
                      setShowProjectList(false)
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-100 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">{project.name}</p>
                      <p className="text-xs text-slate-500">{project.key}</p>
                    </div>
                    {selectedProject?.id === project.id && (
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          {selectedProject && (
            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
              <p className="font-medium text-slate-700">{selectedProject.name}</p>
              <p>{selectedProject.key}</p>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Work Type
          </label>
          <div className="relative">
            <button
              onClick={(event) => {
                event.stopPropagation()
                closeAllDropdowns()
                setShowWorkTypeList((prev) => !prev)
              }}
              className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg text-left hover:border-slate-300 transition-colors bg-white"
            >
              <span className="text-sm text-slate-800">
                {selectedWorkType ? selectedWorkType.name : 'Select work type'}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
            {showWorkTypeList && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-44 overflow-y-auto z-20">
                {JIRA_WORK_TYPES.map((workType) => (
                  <button
                    key={workType.id}
                    onClick={(event) => {
                      event.stopPropagation()
                      setSelectedWorkType(workType)
                      setShowWorkTypeList(false)
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-100 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">{workType.name}</p>
                      <p className="text-xs text-slate-500">{workType.key}</p>
                    </div>
                    {selectedWorkType?.id === workType.id && (
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Status
          </label>
          <div className="relative">
            <button
              onClick={(event) => {
                event.stopPropagation()
                closeAllDropdowns()
                setShowStatusList((prev) => !prev)
              }}
              className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg text-left hover:border-slate-300 transition-colors bg-white"
            >
              <span className="text-sm text-slate-800">
                {selectedStatus ? selectedStatus.name : 'Select status'}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
            {showStatusList && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-44 overflow-y-auto z-20">
                {JIRA_STATUSES.map((status) => (
                  <button
                    key={status.id}
                    onClick={(event) => {
                      event.stopPropagation()
                      setSelectedStatus(status)
                      setShowStatusList(false)
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-slate-800">{status.name}</span>
                    {selectedStatus?.id === status.id && (
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Summary
          </label>
          <input
            type="text"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="Enter summary..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Assignee
          </label>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={userSearchQuery}
                onChange={(event) => {
                  setUserSearchQuery(event.target.value)
                  setShowUserList(true)
                  setShowProjectList(false)
                  setShowWorkTypeList(false)
                  setShowStatusList(false)
                }}
                onClick={(event) => {
                  event.stopPropagation()
                  closeAllDropdowns()
                  setShowUserList(true)
                }}
                placeholder="Search teammate..."
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
              />
            </div>
            {showUserList && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-20">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={(event) => {
                        event.stopPropagation()
                        setSelectedUser(user)
                        setUserSearchQuery(user.name)
                        setShowUserList(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-100 transition-colors"
                    >
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                        style={{ backgroundColor: 'rgb(147, 197, 253)' }}
                      >
                        {user.avatar}
                      </span>
                      <span className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </span>
                      {selectedUser?.id === user.id && (
                        <span className="w-2 h-2 rounded-full bg-slate-600" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-slate-500 text-center">
                    No users found
                  </div>
                )}
              </div>
            )}
          </div>
          {selectedUser && (
            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                style={{ backgroundColor: 'rgb(147, 197, 253)' }}
              >
                {selectedUser.avatar}
              </span>
              <div className="text-xs text-slate-600">
                <p className="font-medium text-slate-700">{selectedUser.name}</p>
                <p>{selectedUser.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )

    const notionMenu = (
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Workspace
          </label>
          <div className="relative">
            <button
              onClick={(event) => {
                event.stopPropagation()
                closeAllDropdowns()
                setShowWorkspaceList((prev) => !prev)
              }}
              className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg text-left hover:border-slate-300 transition-colors bg-white"
            >
              <span className="text-sm text-slate-800">
                {selectedWorkspace ? selectedWorkspace.name : 'Select workspace'}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
            {showWorkspaceList && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-44 overflow-y-auto z-20">
                {NOTION_WORKSPACES.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={(event) => {
                      event.stopPropagation()
                      setSelectedWorkspace(workspace)
                      setShowWorkspaceList(false)
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-100 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">{workspace.name}</p>
                      <p className="text-xs text-slate-500">{workspace.members} members</p>
                    </div>
                    {selectedWorkspace?.id === workspace.id && (
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Database
          </label>
          <div className="relative">
            <button
              onClick={(event) => {
                event.stopPropagation()
                closeAllDropdowns()
                setShowDatabaseList((prev) => !prev)
              }}
              className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg text-left hover:border-slate-300 transition-colors bg-white"
            >
              <span className="text-sm text-slate-800">
                {selectedDatabase ? selectedDatabase.name : 'Select database'}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
            {showDatabaseList && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-44 overflow-y-auto z-20">
                {filteredNotionDatabases.length > 0 ? (
                  filteredNotionDatabases.map((database) => (
                    <button
                      key={database.id}
                      onClick={(event) => {
                        event.stopPropagation()
                        setSelectedDatabase(database)
                        setShowDatabaseList(false)
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-100 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-800">{database.name}</p>
                        <p className="text-xs text-slate-500">{database.badge}</p>
                      </div>
                      {selectedDatabase?.id === database.id && (
                        <span className="w-2 h-2 rounded-full bg-slate-600" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-slate-500 text-center">
                    No databases for this workspace
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Template
          </label>
          <div className="relative">
            <button
              onClick={(event) => {
                event.stopPropagation()
                closeAllDropdowns()
                setShowTemplateList((prev) => !prev)
              }}
              className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg text-left hover:border-slate-300 transition-colors bg-white"
            >
              <span className="text-sm text-slate-800">
                {selectedTemplate ? selectedTemplate.name : 'Select template'}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
            {showTemplateList && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-44 overflow-y-auto z-20">
                {NOTION_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={(event) => {
                      event.stopPropagation()
                      setSelectedTemplate(template)
                      setShowTemplateList(false)
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-100 transition-colors"
                  >
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-800">{template.name}</p>
                      <p className="text-xs text-slate-500">{template.description}</p>
                    </div>
                    {selectedTemplate?.id === template.id && (
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Page title
          </label>
          <input
            type="text"
            value={notionPageTitle}
            onChange={(event) => setNotionPageTitle(event.target.value)}
            placeholder="Enter page title..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Status
          </label>
          <div className="relative">
            <button
              onClick={(event) => {
                event.stopPropagation()
                closeAllDropdowns()
                setShowStatusOptions((prev) => !prev)
              }}
              className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg text-left hover:border-slate-300 transition-colors bg-white"
            >
              <span className="text-sm text-slate-800">{notionStatus}</span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
            {showStatusOptions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20">
                {NOTION_STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={(event) => {
                      event.stopPropagation()
                      setNotionStatus(status)
                      setShowStatusOptions(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <span className="text-slate-800">{status}</span>
                    {notionStatus === status && (
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {NOTION_TAGS.map((tag) => {
              const isSelected = notionSelectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  onClick={(event) => {
                    event.stopPropagation()
                    handleTagToggle(tag)
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    isSelected
                      ? 'border-slate-700 bg-slate-800 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        <label
          className="flex items-start gap-3 px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-600 cursor-pointer transition-colors hover:border-slate-300"
          style={{ backgroundColor: 'rgba(239, 239, 239, 0.7)' }}
        >
          <input
            type="checkbox"
            checked={notionIncludeContent}
            onChange={(event) => {
              event.stopPropagation()
              setNotionIncludeContent(event.target.checked)
            }}
            className="mt-0.5 h-4 w-4 border border-slate-300 rounded text-slate-800 focus:ring-slate-400"
            style={{
              backgroundColor: '#efefef'
            }}
          />
          <span>
            <span className="block font-medium text-slate-700">Include note content</span>
            <span>Attach this card’s text inside the Notion page.</span>
          </span>
        </label>
      </div>
    )

    const canCreateJira = selectedProject && selectedUser
    const canCreateNotion = selectedWorkspace && selectedDatabase && notionPageTitle.trim().length > 0

    return createPortal(
      <div
        className="note-integration-menu w-[320px] rounded-2xl border bg-white px-4 py-4 text-xs shadow-2xl space-y-4"
        style={{
          position: 'fixed',
          top: `${integrationMenuPosition.top}px`,
          left: `${integrationMenuPosition.left}px`,
          transform: 'translateX(-100%)',
          zIndex: 9999,
          borderColor: '#e2e8f0',
          boxShadow: '0 28px 54px rgba(15, 23, 42, 0.24)'
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isJira ? (
              <>
                <svg width="18" height="18" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#1868DB" d="M7.967 21.323H5.748C2.401 21.323 0 19.273 0 16.271h11.933c.618 0 1.018.44 1.018 1.062V29.34c-2.983 0-4.984-2.416-4.984-5.784zm5.894-5.967h-2.22c-3.346 0-5.747-2.013-5.747-5.015h11.932c.618 0 1.055.402 1.055 1.025v12.007c-2.983 0-5.02-2.416-5.02-5.784zm5.93-5.93h-2.22c-3.347 0-5.748-2.05-5.748-5.052h11.933c.618 0 1.019.439 1.019 1.025v12.007c-2.983 0-4.984-2.416-4.984-5.784z"></path>
                </svg>
                <span className="font-semibold text-sm text-slate-900">Jira Integration</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.81 1.294L18.446.068c2.043-.175 2.568-.057 3.852.875l5.311 3.733c.877.642 1.169.817 1.169 1.516v20.473c0 1.283-.468 2.042-2.102 2.158L7.357 29.99c-1.228.058-1.811-.117-2.454-.934l-3.91-5.074C.29 23.048 0 22.349 0 21.532V3.334c0-1.049.468-1.924 1.81-2.04z" fill="#fff"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.447.068L1.808 1.294C.468 1.41 0 2.285 0 3.334v18.198c0 .817.291 1.516.992 2.45l3.911 5.074c.643.817 1.226.992 2.453.934l19.321-1.167c1.634-.116 2.102-.875 2.102-2.158V6.192c0-.663-.263-.854-1.037-1.42l-.132-.096L22.3.943c-1.285-.932-1.81-1.05-3.854-.875zM7.793 5.857c-1.577.106-1.936.13-2.831-.597L2.685 3.452c-.233-.234-.116-.526.467-.584l15.995-1.166c1.342-.117 2.043.35 2.568.758l2.744 1.983c.117.059.408.408.058.408l-16.52.992-.203.014zM5.954 26.49V9.11c0-.759.234-1.109.934-1.168l18.971-1.108c.643-.058.935.35.935 1.108v17.264c0 .759-.117 1.401-1.168 1.459l-18.154 1.05c-1.05.058-1.518-.291-1.518-1.225zm17.922-16.448c.116.525 0 1.05-.527 1.11l-.874.173v12.832c-.76.408-1.46.641-2.044.641-.934 0-1.168-.292-1.868-1.166l-5.721-8.982v8.69l1.81.409s0 1.05-1.46 1.05l-4.027.233c-.117-.234 0-.817.408-.933l1.051-.291v-11.49L9.165 12.2c-.117-.525.174-1.283.992-1.341l4.32-.292 5.954 9.1v-8.05l-1.518-.174c-.116-.643.35-1.109.934-1.167l4.029-.234z" fill="#000"></path>
                </svg>
                <span className="font-semibold text-sm text-slate-900">Notion Integration</span>
              </>
            )}
          </div>
          <button
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            style={{
              color: '#94a3b8'
            }}
            onClick={(event) => {
              event.stopPropagation()
              handleCancel()
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.backgroundColor = '#efefef'
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <i className="ri-close-line text-base text-slate-500"></i>
          </button>
        </div>

        {isJira ? jiraMenu : notionMenu}

        <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
          <button
            className="flex-1 py-2 rounded-lg text-slate-700 text-sm font-medium transition-colors"
            style={{ backgroundColor: '#efefef' }}
            onClick={(event) => {
              event.stopPropagation()
              handleCancel()
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.backgroundColor = '#efefef'
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.backgroundColor = '#efefef'
            }}
          >
            Cancel
          </button>
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              (isJira ? canCreateJira : canCreateNotion)
                ? 'bg-slate-900 text-white hover:bg-slate-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            disabled={!(isJira ? canCreateJira : canCreateNotion)}
            onClick={(event) => {
              event.stopPropagation()
              handleCreate()
            }}
          >
            {isJira ? 'Create ticket' : 'Create page'}
          </button>
        </div>
      </div>,
      document.body
    )
  }

  const renderShareMenu = () => {
    if (!shareMenuOpen || !shareMenuPosition) return null

    const mockPeople = [
      { name: 'M Madeline Bramham', avatar: 'M', role: 'owner', color: '#3b82f6' },
      { name: 'Rolfi Sánchez', avatar: 'RS', role: 'can view', color: '#64748b' },
      { name: 'Jenison Monteiro', avatar: 'JM', role: 'can view', color: '#64748b' },
      { name: 'V vishwas', avatar: 'V', role: 'can view', color: '#a855f7' },
      { name: 'V Vivek Texeira', avatar: 'V', role: 'can view', color: '#a855f7' },
      { name: 'Prathyush Shetty', avatar: 'PS', role: 'can view', color: '#64748b' }
    ]

    return createPortal(
      <div
        className="note-share-menu fixed bg-white rounded-lg border shadow-xl"
        style={{
          top: `${shareMenuPosition.top}px`,
          left: `${shareMenuPosition.left}px`,
          transform: 'translateX(-100%)',
          width: '400px',
          maxHeight: '600px',
          zIndex: 9999,
          borderColor: '#e2e8f0',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold" style={{ color: '#1e293b' }}>
              Share the note
            </h3>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
                style={{
                  color: '#64748b',
                  border: '1px solid #e2e8f0',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard?.writeText(window.location.href)
                }}
              >
                <i className="ri-links-line text-sm"></i>
                Copy link
              </button>
              <button
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: '#94a3b8' }}
                onClick={(e) => {
                  e.stopPropagation()
                  closeShareMenu()
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>
          </div>

          {/* Invite Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareEmails}
                onChange={(e) => setShareEmails(e.target.value)}
                placeholder="Add comma separated emails to invite"
                className="flex-1 px-3 py-2 text-xs rounded-lg border focus:outline-none"
                style={{
                  borderColor: '#e2e8f0',
                  color: '#1e293b',
                  backgroundColor: '#ffffff'
                }}
                onFocus={(e) => e.target.style.borderColor = '#cbd5e1'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
              <button
                className="px-4 py-2 text-xs font-medium rounded-lg transition-colors"
                style={{
                  backgroundColor: '#1e293b',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1e293b'}
                onClick={(e) => {
                  e.stopPropagation()
                  if (shareEmails.trim()) {
                    console.log('Inviting:', shareEmails)
                    setShareEmails('')
                  }
                }}
              >
                Invite
              </button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="px-2 py-1 text-xs rounded border" style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
                + Kishor Yermal
              </button>
              <button className="px-2 py-1 text-xs rounded border" style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
                + andyj
              </button>
              <button className="px-2 py-1 text-xs rounded border" style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
                + Antonio Dharmadas
              </button>
            </div>
          </div>

          {/* Who has access */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748b' }}>
              Who has access
            </h4>
            
            {/* Global Access */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <i className="ri-global-line text-base" style={{ color: '#64748b' }}></i>
                <span className="text-sm" style={{ color: '#1e293b' }}>Anyone</span>
              </div>
              <span className="text-xs" style={{ color: '#64748b' }}>can view</span>
            </div>

            {/* Project Access */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <i className="ri-folder-line text-base" style={{ color: '#64748b' }}></i>
                <span className="text-sm" style={{ color: '#1e293b' }}>Anyone in Marketing Design</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: '#64748b' }}>24 people</span>
                <i className="ri-arrow-right-s-line text-sm" style={{ color: '#64748b' }}></i>
              </div>
            </div>

            {/* People List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {mockPeople.map((person, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                      style={{ backgroundColor: person.color }}
                    >
                      {person.avatar}
                    </div>
                    <span className="text-sm" style={{ color: '#1e293b' }}>{person.name}</span>
                  </div>
                  <span className="text-xs" style={{ color: '#64748b' }}>{person.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(note.bodyParagraphs.join('\n\n'))
      console.log('Note text copied to clipboard')
    } catch (err) {
      console.warn('Clipboard copy failed', err)
    }
  }

  return (
    <div
      className="transition-all duration-200"
      style={{
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      <div className="relative rounded-xl overflow-hidden" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
        <div style={{ boxShadow: '0 18px 35px rgba(15, 23, 42, 0.08)', borderBottom: '1px solid rgba(15, 23, 42, 0.05)' }}>
          <header ref={headerRef} className="relative">
            <div
              className="flex items-center gap-3 px-5 py-2"
              style={{ backgroundColor: 'rgba(239, 239, 239, 0.88)', borderBottom: '1px solid #e2e8f0' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#efefef', color: '#372804' }}
              >
                <svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                  <rect width="256" height="256" fill="none" />
                  <path d="M48,40H208V200a24,24,0,0,1-24,24H72a24,24,0,0,1-24-24Z" opacity="0.2" fill="currentColor" />
                  <line x1="96" y1="128" x2="160" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <line x1="96" y1="160" x2="160" y2="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <path d="M48,40H208V200a24,24,0,0,1-24,24H72a24,24,0,0,1-24-24Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <line x1="80" y1="24" x2="80" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <line x1="128" y1="24" x2="128" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <line x1="176" y1="24" x2="176" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                </svg>
              </div>
            <a
              href="https://dart.unicourt.com/PXsgD/deep/widgets/search/unicourt-search/1.0.2510161026/documentation"
                className="flex-1 text-xs font-medium truncate flex items-center gap-2"
                style={{ color: '#1e293b' }}
              onClick={(event) => event.stopPropagation()}
            >
                <img 
                  src={`${import.meta.env.BASE_URL || '/'}fav.svg`}
                  alt="favicon" 
                  width="16"
                  height="16"
                  className="flex-shrink-0"
                  style={{ 
                    display: 'block', 
                    width: '16px', 
                    height: '16px',
                    objectFit: 'contain',
                    verticalAlign: 'middle'
                  }}
                  onError={(e) => {
                    // Fallback to remote favicon if local one fails
                    e.target.src = 'https://cdn.unicourt.com/common_resources/images/favicon.ico'
                    e.target.onerror = null
                  }}
                />
                <span>
                  <span style={{ fontWeight: 600 }}>{extractCompanyName('https://dart.unicourt.com/PXsgD/deep/widgets/search/unicourt-search/1.0.2510161026/documentation')}</span>
                  {formatUrlForDisplay('https://dart.unicourt.com/PXsgD/deep/widgets/search/unicourt-search/1.0.2510161026/documentation')}
                </span>
            </a>
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center gap-2">
              <div className="relative">
                <button
                  ref={jiraButtonRef}
                  className="flex items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    width: '28px',
                    height: '28px',
                    border: '1px solid rgba(209, 213, 219, 0.6)',
                    backgroundColor: activeIntegration === 'jira' ? '#ffffff' : 'transparent'
                  }}
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    const buttonRect = event.currentTarget.getBoundingClientRect()
                    handleIntegrationButtonClick('jira', buttonRect)
                  }}
                  title="Open Jira actions"
                  onMouseEnter={(event) => {
                    if (activeIntegration !== 'jira') event.currentTarget.style.backgroundColor = '#ffffff'
                  }}
                  onMouseLeave={(event) => {
                    if (activeIntegration !== 'jira') event.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#1868DB" d="M7.967 21.323H5.748C2.401 21.323 0 19.273 0 16.271h11.933c.618 0 1.018.44 1.018 1.062V29.34c-2.983 0-4.984-2.416-4.984-5.784zm5.894-5.967h-2.22c-3.346 0-5.747-2.013-5.747-5.015h11.932c.618 0 1.055.402 1.055 1.025v12.007c-2.983 0-5.02-2.416-5.02-5.784zm5.93-5.93h-2.22c-3.347 0-5.748-2.05-5.748-5.052h11.933c.618 0 1.019.439 1.019 1.025v12.007c-2.983 0-4.984-2.416-4.984-5.784z"></path>
                  </svg>
                </button>
              </div>

              <div className="relative">
                <button
                  ref={notionButtonRef}
                  className="flex items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    width: '28px',
                    height: '28px',
                    border: '1px solid rgba(209, 213, 219, 0.6)',
                    backgroundColor: activeIntegration === 'notion' ? '#ffffff' : 'transparent'
                  }}
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    const buttonRect = event.currentTarget.getBoundingClientRect()
                    handleIntegrationButtonClick('notion', buttonRect)
                  }}
                  title="Open Notion actions"
                  onMouseEnter={(event) => {
                    if (activeIntegration !== 'notion') event.currentTarget.style.backgroundColor = '#ffffff'
                  }}
                  onMouseLeave={(event) => {
                    if (activeIntegration !== 'notion') event.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.81 1.294L18.446.068c2.043-.175 2.568-.057 3.852.875l5.311 3.733c.877.642 1.169.817 1.169 1.516v20.473c0 1.283-.468 2.042-2.102 2.158L7.357 29.99c-1.228.058-1.811-.117-2.454-.934l-3.91-5.074C.29 23.048 0 22.349 0 21.532V3.334c0-1.049.468-1.924 1.81-2.04z" fill="#fff"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.447.068L1.808 1.294C.468 1.41 0 2.285 0 3.334v18.198c0 .817.291 1.516.992 2.45l3.911 5.074c.643.817 1.226.992 2.453.934l19.321-1.167c1.634-.116 2.102-.875 2.102-2.158V6.192c0-.663-.263-.854-1.037-1.42l-.132-.096L22.3.943c-1.285-.932-1.81-1.05-3.854-.875zM7.793 5.857c-1.577.106-1.936.13-2.831-.597L2.685 3.452c-.233-.234-.116-.526.467-.584l15.995-1.166c1.342-.117 2.043.35 2.568.758l2.744 1.983c.117.059.408.408.058.408l-16.52.992-.203.014zM5.954 26.49V9.11c0-.759.234-1.109.934-1.168l18.971-1.108c.643-.058.935.35.935 1.108v17.264c0 .759-.117 1.401-1.168 1.459l-18.154 1.05c-1.05.058-1.518-.291-1.518-1.225zm17.922-16.448c.116.525 0 1.05-.527 1.11l-.874.173v12.832c-.76.408-1.46.641-2.044.641-.934 0-1.168-.292-1.868-1.166l-5.721-8.982v8.69l1.81.409s0 1.05-1.46 1.05l-4.027.233c-.117-.234 0-.817.408-.933l1.051-.291v-11.49L9.165 12.2c-.117-.525.174-1.283.992-1.341l4.32-.292 5.954 9.1v-8.05l-1.518-.174c-.116-.643.35-1.109.934-1.167l4.029-.234z" fill="#000"></path>
                  </svg>
                </button>
              </div>

              <div className="relative">
                <button
                  ref={shareButtonRef}
                  className="flex items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    width: '28px',
                    height: '28px',
                    border: '1px solid rgba(209, 213, 219, 0.6)',
                    backgroundColor: shareMenuOpen ? '#ffffff' : 'transparent',
                    color: '#94a3b8'
                  }}
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    const buttonRect = event.currentTarget.getBoundingClientRect()
                    handleShareButtonClick(buttonRect)
                  }}
                  title="Share note"
                  onMouseEnter={(event) => {
                    if (!shareMenuOpen) event.currentTarget.style.backgroundColor = '#ffffff'
                  }}
                  onMouseLeave={(event) => {
                    if (!shareMenuOpen) event.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <i className="ri-share-line text-sm" style={{ color: '#1e293b' }}></i>
                </button>
              </div>

              <button
                className="flex items-center justify-center rounded-lg transition-all duration-200"
                style={{
                  width: '28px',
                  height: '28px',
                  border: '1px solid rgba(209, 213, 219, 0.6)',
                  backgroundColor: optionsOpen ? '#ffffff' : 'transparent',
                  color: '#94a3b8'
                }}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  if (optionsOpen) {
                    setOptionsOpen(false)
                  } else {
                    closeIntegrationMenu()
                    closeShareMenu()
                    setOptionsOpen(true)
                  }
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.backgroundColor = '#ffffff'
                }}
                onMouseLeave={(event) => {
                  if (!optionsOpen) event.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <i className="ri-more-2-fill text-sm" style={{ color: '#1e293b' }}></i>
              </button>
              {optionsOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-44 rounded-lg border px-2 py-2 space-y-1 text-xs font-medium shadow-lg"
                  style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', zIndex: 20 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    className="w-full px-2 py-1 rounded-md text-left transition-colors flex items-center gap-2"
                    style={{ color: '#0f172a' }}
                    onClick={() => {
                      console.log('Add tags clicked')
                      setOptionsOpen(false)
                    }}
                  >
                    <i className="ri-price-tag-3-line text-sm"></i>
                    <span>Add tags</span>
                  </button>
                  <button
                    className="w-full px-2 py-1 rounded-md text-left transition-colors flex items-center gap-2"
                    style={{ color: '#0f172a' }}
                    onClick={() => {
                      if (showTitle) {
                        setShowTitle(false)
                      } else {
                        setShowTitle(true)
                        setTimeout(() => titleInputRef.current?.focus(), 0)
                      }
                      setOptionsOpen(false)
                    }}
                  >
                    <i className="ri-edit-2-line text-sm"></i>
                    <span>{showTitle ? 'Remove title' : 'Add title'}</span>
                  </button>
                  <button
                    className="w-full px-2 py-1 rounded-md text-left transition-colors flex items-center gap-2"
                    style={{ color: '#0f172a' }}
                    onClick={() => {
                      handleCopy()
                      setOptionsOpen(false)
                    }}
                  >
                    <i className="ri-file-copy-line text-sm"></i>
                    <span>Copy text</span>
                  </button>
                  <button
                    className="w-full px-2 py-1 rounded-md text-left transition-colors flex items-center gap-2"
                    style={{ color: '#0f172a' }}
                    onClick={() => {
                      setIsPinned((prev) => !prev)
                      setOptionsOpen(false)
                    }}
                  >
                    <i className="ri-pushpin-2-line text-sm"></i>
                    <span>{isPinned ? 'Unpin this' : 'Pin this'}</span>
                  </button>
                </div>
              )}
            </div>
          </header>
          {activeIntegration && renderIntegrationMenu()}
          {shareMenuOpen && renderShareMenu()}

          <section className="px-5 py-4 space-y-3">
            {showTitle && (
              <input
                ref={titleInputRef}
                value={customTitle}
                onChange={(event) => setCustomTitle(event.target.value)}
                placeholder="Untitled"
                className="w-full bg-transparent font-semibold leading-tight focus:outline-none"
                style={{ color: '#0f172a', fontSize: '16px' }}
              />
            )}

            <div className="space-y-2">
              {note.bodyParagraphs.map((paragraph, index) => (
              <p key={index} className="leading-relaxed" style={{ color: '#1f2937', fontSize: '14px' }}>
                  {paragraph}
                </p>
              ))}
            </div>

          <div className="flex items-center justify-between text-xs font-medium" style={{ color: '#94a3b8' }}>
            <span>
              {note.author}
              <span style={{ color: '#94a3b8', fontWeight: 400 }}> • {note.timestamp}</span>
              </span>
              <button
                className="inline-flex items-center gap-1 text-xs font-medium transition-colors"
                style={{ color: '#94a3b8' }}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <span>Expand</span>
                <i className="ri-arrow-down-line text-sm"></i>
              </button>
            </div>
          </section>

          <footer
            className="flex items-center justify-between px-5 py-2 text-xs font-medium"
            style={{
              borderTop: '1px solid #e2e8f0',
              color: '#0f172a',
              boxShadow: '0 12px 25px rgba(15, 23, 42, 0.08)',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px'
            }}
          >
            <button
              className="inline-flex items-center gap-1 transition-colors"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <i className="ri-thumb-up-line text-sm"></i>
              <span>{note.likes} Like</span>
            </button>

            <div className="flex items-center gap-6">
              <button
                className="inline-flex items-center gap-1 transition-colors"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <i className="ri-map-pin-line text-sm"></i>
                <span>{note.linkLabel}</span>
              </button>
              <button
                className="inline-flex items-center gap-1 transition-colors"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setShowComments(prev => !prev);
                }}
              >
                <i className={`ri-chat-1-line text-sm ${showComments ? '' : 'opacity-80'}`} />
                <span>
                  {note.commentActionLabel}
                  <span style={{ marginLeft: '4px', color: '#94a3b8' }}>({note.comments.length})</span>
                </span>
                <i className={`ri-arrow-down-line text-sm transition-transform duration-200 ${showComments ? 'rotate-0' : '-rotate-180'}`} />
              </button>
            </div>
          </footer>
        </div>

        {showComments && (
          <section className="px-5 py-4 space-y-2" style={{ backgroundColor: 'rgba(239, 239, 239, 0.85)' }}>
            {note.comments.map((comment) => (
              <article
                key={comment.id}
                className="flex items-start justify-between px-3 py-2 border-b"
                style={{ color: '#475569', borderBottomColor: 'rgba(148, 163, 184, 0.3)' }}
              >
                <div>
                  <div className="text-xs font-medium" style={{ color: '#4b5563' }}>
                    {comment.author}
                    <span style={{ color: '#6b7280', fontWeight: 500 }}> • {comment.timestamp}</span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#1f2937' }}>
                    {comment.content}
                  </p>
                </div>
                <button
                  className="p-1 rounded-md transition-colors"
                  style={{ color: '#94a3b8' }}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  <i className="ri-more-2-fill text-sm"></i>
                </button>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default NoteComponent;

