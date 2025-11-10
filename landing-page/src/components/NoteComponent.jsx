import { useState, useRef } from 'react'

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
  const titleInputRef = useRef(null)

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
          <header className="relative">
            <a
              href="https://dart.unicourt.com/PXsgD/deep/widgets/search/unicourt-search/1.0.2510161026/documentation"
              className="block px-5 py-2 text-xs font-medium truncate"
              style={{ backgroundColor: 'rgba(239, 239, 239, 0.88)', color: '#1e293b', borderBottom: '1px solid #e2e8f0' }}
              onClick={(event) => event.stopPropagation()}
            >
              https://dart.unicourt.com/PXsgD/deep/widgets/search/unicourt-search/1.0.2510161026/documentation
            </a>
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: '#94a3b8' }}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  setOptionsOpen((prev) => !prev)
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

