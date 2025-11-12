import { useCallback } from 'react'
import { Plus } from 'lucide-react'

const Sidebar = ({
  currentView,
  onSelectView,
  onAddFolder,
  recentNotes,
  selectedRecentNote,
  onSelectRecentNote,
  onNavigate
}) => {
  const renderNoteButton = useCallback(
    (note) => {
      const isSelected = selectedRecentNote === note.id
      return (
        <button
          key={note.id}
          onClick={() => onSelectRecentNote?.(note)}
          className="w-full flex items-center space-x-3 rounded-lg cursor-pointer transition-colors text-left"
          style={{
            backgroundColor: isSelected ? '#efefef' : 'transparent',
            height: '40px',
            padding: '4px 8px'
          }}
          onMouseEnter={(event) => {
            if (!isSelected) {
              event.currentTarget.style.backgroundColor = '#efefef'
            }
          }}
          onMouseLeave={(event) => {
            if (!isSelected) {
              event.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
            style={{
              color: isSelected ? '#372804' : '#64748b'
            }}
          >
            <rect width="256" height="256" fill="none" />
            <path
              d="M48,40H208V200a24,24,0,0,1-24,24H72a24,24,0,0,1-24-24Z"
              opacity="0.2"
              fill="currentColor"
            />
            <line
              x1="96"
              y1="128"
              x2="160"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="96"
              y1="160"
              x2="160"
              y2="160"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <path
              d="M48,40H208V200a24,24,0,0,1-24,24H72a24,24,0,0,1-24-24Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="80"
              y1="24"
              x2="80"
              y2="56"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="128"
              y1="24"
              x2="128"
              y2="56"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="176"
              y1="24"
              x2="176"
              y2="56"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
          <div
            className="text-sm font-medium truncate flex-1"
            style={{ color: '#1e293b' }}
            title={note.label}
          >
            {note.label}
          </div>
        </button>
      )
    },
    [onSelectRecentNote, selectedRecentNote]
  )

  return (
    <div className="w-64 flex flex-col h-screen" style={{ backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0' }}>
      <div className="px-6 flex items-center" style={{ borderBottom: '1px solid #e2e8f0', height: '56px' }}>
        <div className="flex items-center space-x-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: '#372804', color: '#FFF097' }}
          >
            N
          </div>
          <span className="text-lg font-semibold" style={{ color: '#1e293b' }}>
            NOA
          </span>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-6">
          <div className="mb-3">
            <h3 className="text-sm font-medium" style={{ color: '#1e293b' }}>
              Navigation
            </h3>
          </div>

          <div className="space-y-1">
            {(() => {
              const isHomeActive = currentView === 'home' && !selectedRecentNote
              return (
                <button
                  onClick={() => onSelectView('home')}
                  className="w-full flex items-center space-x-3 px-3 rounded-lg text-left transition-colors"
                  style={{
                    backgroundColor: isHomeActive ? '#efefef' : 'transparent',
                    height: '40px'
                  }}
                  onMouseEnter={(event) => {
                    if (!isHomeActive) {
                      event.currentTarget.style.backgroundColor = '#efefef'
                    }
                  }}
                  onMouseLeave={(event) => {
                    if (!isHomeActive) {
                      event.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: isHomeActive ? '#372804' : '#64748b' }}
                  >
                    <rect width="256" height="256" fill="none" />
                    <path
                      d="M104,216V152h48v64h64V120a8,8,0,0,0-2.34-5.66l-80-80a8,8,0,0,0-11.32,0l-80,80A8,8,0,0,0,40,120v96Z"
                      opacity="0.2"
                      fill="currentColor"
                    />
                    <path
                      d="M104,216V152h48v64h64V120a8,8,0,0,0-2.34-5.66l-80-80a8,8,0,0,0-11.32,0l-80,80A8,8,0,0,0,40,120v96Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                  </svg>
                  <div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: isHomeActive ? '#1e293b' : '#64748b' }}
                    >
                      Home
                    </div>
                  </div>
                </button>
              )
            })()}

            <button
              onClick={() => onSelectView('folders')}
              className="w-full flex items-center space-x-3 px-3 rounded-lg text-left transition-colors"
              style={{
                backgroundColor: currentView === 'folders' ? '#efefef' : 'transparent',
                height: '40px'
              }}
              onMouseEnter={(event) => {
                if (currentView !== 'folders') {
                  event.currentTarget.style.backgroundColor = '#efefef'
                }
              }}
              onMouseLeave={(event) => {
                if (currentView !== 'folders') {
                  event.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: currentView === 'folders' ? '#372804' : '#64748b' }}
              >
                <rect width="256" height="256" fill="none" />
                <path
                  d="M98.34,50.34,128,80H32V56a8,8,0,0,1,8-8H92.69A8,8,0,0,1,98.34,50.34Z"
                  opacity="0.2"
                  fill="currentColor"
                />
                <path
                  d="M216.89,208H39.38A7.4,7.4,0,0,1,32,200.62V80H216a8,8,0,0,1,8,8V200.89A7.11,7.11,0,0,1,216.89,208Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M32,80V56a8,8,0,0,1,8-8H92.69a8,8,0,0,1,5.65,2.34L128,80"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
              </svg>
              <div>
                <div
                  className="text-sm font-medium"
                  style={{ color: currentView === 'folders' ? '#1e293b' : '#64748b' }}
                >
                  Folders
                </div>
              </div>
            </button>
          </div>
        </div>

        {onAddFolder && (
          <button
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors"
            style={{ color: '#64748b', backgroundColor: 'transparent' }}
            onMouseEnter={(event) => (event.currentTarget.style.backgroundColor = '#efefef')}
            onMouseLeave={(event) => (event.currentTarget.style.backgroundColor = 'transparent')}
            onClick={onAddFolder}
          >
            <Plus className="h-4 w-4" />
            <span>Add New Folder</span>
          </button>
        )}

        <div className="my-4" style={{ borderTop: '1px solid #e2e8f0' }}></div>

        {recentNotes?.length ? (
          <>
            <div className="mb-3">
              <h3 className="text-sm font-medium" style={{ color: '#1e293b' }}>
                RECENT NOTES
              </h3>
            </div>
            <div className="space-y-1">
              {recentNotes.map(renderNoteButton)}
            </div>
          </>
        ) : null}
      </div>
      <div className="px-4 pb-6 space-y-2">
        <button
          onClick={() => onNavigate?.('accounts')}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors"
          style={{
            color: '#64748b',
            backgroundColor: currentView === 'accounts' ? '#efefef' : 'transparent'
          }}
          onMouseEnter={(event) => {
            if (currentView !== 'accounts') {
              event.currentTarget.style.backgroundColor = '#efefef'
            }
          }}
          onMouseLeave={(event) => {
            if (currentView !== 'accounts') {
              event.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
        >
          <i className="ri-user-3-line text-lg" style={{ color: currentView === 'accounts' ? '#372804' : '#64748b' }}></i>
          <span className="text-sm font-medium" style={{ color: '#1e293b' }}>
            Account
          </span>
        </button>
        <button
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors"
          style={{ color: '#64748b', backgroundColor: 'transparent' }}
          onMouseEnter={(event) => (event.currentTarget.style.backgroundColor = '#efefef')}
          onMouseLeave={(event) => (event.currentTarget.style.backgroundColor = 'transparent')}
        >
          <i className="ri-settings-3-line text-lg" style={{ color: '#64748b' }}></i>
          <span className="text-sm font-medium" style={{ color: '#1e293b' }}>
            Settings
          </span>
        </button>
        <button
          onClick={() => onNavigate?.('coming-soon')}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors"
          style={{ 
            color: currentView === 'coming-soon' ? '#1e293b' : '#64748b', 
            backgroundColor: currentView === 'coming-soon' ? '#efefef' : 'transparent' 
          }}
          onMouseEnter={(event) => {
            if (currentView !== 'coming-soon') {
              event.currentTarget.style.backgroundColor = '#efefef'
            }
          }}
          onMouseLeave={(event) => {
            if (currentView !== 'coming-soon') {
              event.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
        >
          <i className="ri-rocket-line text-lg" style={{ color: currentView === 'coming-soon' ? '#372804' : '#f97316' }}></i>
          <span className="text-sm font-medium" style={{ color: currentView === 'coming-soon' ? '#1e293b' : '#1e293b' }}>
            Upgrade to Premium
          </span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
