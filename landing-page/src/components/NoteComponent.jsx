import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

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
  const titleInputRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    if (!optionsOpen && !activeIntegration) return

    const handleClickAway = (event) => {
      const isInsideHeader = headerRef.current?.contains(event.target)
      const isInsideIntegrationMenu = event.target.closest('.note-integration-menu')
      if (!isInsideHeader && !isInsideIntegrationMenu) {
        setOptionsOpen(false)
        setActiveIntegration(null)
        setIntegrationMenuPosition(null)
      }
    }

    document.addEventListener('mousedown', handleClickAway)
    return () => document.removeEventListener('mousedown', handleClickAway)
  }, [optionsOpen, activeIntegration])

  const renderIntegrationMenu = () => {
    if (!activeIntegration || !integrationMenuPosition) return null

    const commonContainerClasses =
      'note-integration-menu w-56 rounded-xl border px-3 py-3 text-xs font-medium shadow-2xl space-y-2 max-h-72 overflow-y-auto bg-white'
    const commonContainerStyle = {
      borderColor: '#e2e8f0',
      boxShadow: '0 24px 48px rgba(15, 23, 42, 0.22)'
    }

    const jiraMenu = (
      <>
        <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-500">
          Quick actions
        </p>
        <button
          className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          style={{ color: '#0f172a' }}
          onClick={() => {
            console.log('Log to Jira clicked')
            setActiveIntegration(null)
            setIntegrationMenuPosition(null)
          }}
        >
          <i className="ri-task-line text-sm"></i>
          <span>Log to Jira</span>
        </button>
        <button
          className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          style={{ color: '#0f172a' }}
          onClick={() => {
            console.log('Assign to me clicked')
            setActiveIntegration(null)
            setIntegrationMenuPosition(null)
          }}
        >
          <i className="ri-user-add-line text-sm"></i>
          <span>Assign to me</span>
        </button>
        <button
          className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          style={{ color: '#0f172a' }}
          onClick={() => {
            console.log('Open linked issue clicked')
            setActiveIntegration(null)
            setIntegrationMenuPosition(null)
          }}
        >
          <i className="ri-link text-sm"></i>
          <span>Open linked issue</span>
        </button>
        <div className="border-t border-slate-200 pt-2 mt-2 space-y-2">
          <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-500">
            Navigation
          </p>
          <button
            className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            style={{ color: '#0f172a' }}
            onClick={() => {
              console.log('View Jira project clicked')
              setActiveIntegration(null)
              setIntegrationMenuPosition(null)
            }}
          >
            <i className="ri-folder-open-line text-sm"></i>
            <span>View project</span>
          </button>
          <button
            className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            style={{ color: '#0f172a' }}
            onClick={() => {
              console.log('View backlog clicked')
              setActiveIntegration(null)
              setIntegrationMenuPosition(null)
            }}
          >
            <i className="ri-database-2-line text-sm"></i>
            <span>View backlog</span>
          </button>
          <button
            className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            style={{ color: '#0f172a' }}
            onClick={() => {
              console.log('Report bug clicked')
              setActiveIntegration(null)
              setIntegrationMenuPosition(null)
            }}
          >
            <i className="ri-bug-line text-sm"></i>
            <span>Report a bug</span>
          </button>
        </div>
      </>
    )

    const notionMenu = (
      <>
        <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-500">
          Notion
        </p>
        <button
          className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          style={{ color: '#0f172a' }}
          onClick={() => {
            console.log('Sync to Notion clicked')
            setActiveIntegration(null)
            setIntegrationMenuPosition(null)
          }}
        >
          <i className="ri-swap-line text-sm"></i>
          <span>Sync to Notion</span>
        </button>
        <button
          className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          style={{ color: '#0f172a' }}
          onClick={() => {
            console.log('Open in Notion clicked')
            setActiveIntegration(null)
            setIntegrationMenuPosition(null)
          }}
        >
          <i className="ri-external-link-line text-sm"></i>
          <span>Open in Notion</span>
        </button>
        <button
          className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          style={{ color: '#0f172a' }}
          onClick={() => {
            console.log('Duplicate in Notion clicked')
            setActiveIntegration(null)
            setIntegrationMenuPosition(null)
          }}
        >
          <i className="ri-file-copy-2-line text-sm"></i>
          <span>Duplicate page</span>
        </button>
        <button
          className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          style={{ color: '#0f172a' }}
          onClick={() => {
            console.log('Share in Notion clicked')
            setActiveIntegration(null)
            setIntegrationMenuPosition(null)
          }}
        >
          <i className="ri-share-line text-sm"></i>
          <span>Share with team</span>
        </button>
        <div className="border-t border-slate-200 pt-2 mt-2 space-y-2">
          <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-500">
            Templates
          </p>
          <button
            className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            style={{ color: '#0f172a' }}
            onClick={() => {
              console.log('Use bug triage template clicked')
              setActiveIntegration(null)
              setIntegrationMenuPosition(null)
            }}
          >
            <i className="ri-bug-line text-sm"></i>
            <span>Use bug triage template</span>
          </button>
          <button
            className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            style={{ color: '#0f172a' }}
            onClick={() => {
              console.log('Use release note template clicked')
              setActiveIntegration(null)
              setIntegrationMenuPosition(null)
            }}
          >
            <i className="ri-rocket-line text-sm"></i>
            <span>Use release note template</span>
          </button>
        </div>
      </>
    )

    return createPortal(
      <div
        className={commonContainerClasses}
        style={{
          ...commonContainerStyle,
          position: 'fixed',
          top: integrationMenuPosition.top,
          left: integrationMenuPosition.left,
          transform: 'translateX(-100%)',
          zIndex: 2000
        }}
      >
        {activeIntegration === 'jira' ? jiraMenu : notionMenu}
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
            <a
              href="https://dart.unicourt.com/PXsgD/deep/widgets/search/unicourt-search/1.0.2510161026/documentation"
              className="block px-5 py-2 text-xs font-medium truncate"
              style={{ backgroundColor: 'rgba(239, 239, 239, 0.88)', color: '#1e293b', borderBottom: '1px solid #e2e8f0' }}
              onClick={(event) => event.stopPropagation()}
            >
              https://dart.unicourt.com/PXsgD/deep/widgets/search/unicourt-search/1.0.2510161026/documentation
            </a>
            <div className="absolute inset-y-0 right-2 flex items-center gap-2">
              <div className="relative">
                <button
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
                    setActiveIntegration((prev) => {
                      if (prev === 'jira') {
                        setIntegrationMenuPosition(null)
                        return null
                      }
                      setIntegrationMenuPosition({
                        top: buttonRect.bottom + 8,
                        left: buttonRect.right
                      })
                      return 'jira'
                    })
                    setOptionsOpen(false)
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
                {activeIntegration === 'jira' && (
                  renderIntegrationMenu()
                )}
              </div>

              <div className="relative">
                <button
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
                    setActiveIntegration((prev) => {
                      if (prev === 'notion') {
                        setIntegrationMenuPosition(null)
                        return null
                      }
                      setIntegrationMenuPosition({
                        top: buttonRect.bottom + 8,
                        left: buttonRect.right
                      })
                      return 'notion'
                    })
                    setOptionsOpen(false)
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
                {activeIntegration === 'notion' && (
                  renderIntegrationMenu()
                )}
              </div>

              <button
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: '#94a3b8' }}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  setOptionsOpen((prev) => !prev)
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.backgroundColor = '#ffffff'
                }}
                onMouseLeave={(event) => {
                  if (!optionsOpen) event.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <i className="ri-more-2-fill text-sm"></i>
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
                <i className="ri-arrow-down-s-line text-sm"></i>
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
                <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${showComments ? 'rotate-0' : '-rotate-180'}`} />
              </button>
            </div>
          </footer>
        </div>

        {showComments && (
          <section className="px-5 py-4 space-y-2" style={{ backgroundColor: 'rgba(239, 239, 239, 0.85)' }}>
            {note.comments.map((comment) => (
              <article key={comment.id} className="flex items-start justify-between px-3 py-2 rounded-lg" style={{ color: '#475569' }}>
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

