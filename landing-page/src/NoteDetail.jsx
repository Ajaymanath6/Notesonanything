import { useState, useMemo } from 'react';
import { ArrowLeft, Bell, LogOut, Settings, Home } from 'lucide-react';
import Sidebar from './components/Sidebar';
import NoteInDetail from './noteindetail/NoteInDetail';

const NoteDetail = ({ onBack, onLogout }) => {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('home');
  const [selectedRecentNote, setSelectedRecentNote] = useState(null);

  const recentNotes = useMemo(
    () => Array.from({ length: 4 }).map((_, idx) => ({
      id: `detail-recent-${idx + 1}`,
      label: 'https://dart.unicourt.com/PXsgD/deep/widgets/search/unicourt-search/1.0.2510161026/documentation'
    })),
    []
  );

  const handleSelectView = (view) => {
    setSelectedSidebarItem(view);
    setSelectedRecentNote(null);
    if (view === 'home') {
      onBack();
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f8fafc' }}>
      <Sidebar
        currentView={selectedSidebarItem}
        onSelectView={handleSelectView}
        recentNotes={recentNotes}
        selectedRecentNote={selectedRecentNote}
        onSelectRecentNote={setSelectedRecentNote}
      />

      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Header - Same as Dashboard */}
        <header className="px-6 relative z-10 flex items-center" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', height: '56px' }}>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col justify-center" style={{ lineHeight: '1.2' }}>
              <h1 className="font-bold" style={{ fontSize: '20px', color: '#1e293b', marginBottom: '2px', lineHeight: '1.2' }}>
                Dashboard
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.2', margin: '0' }}>
                Organize, collaborate, and manage your notes efficiently
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button
                className="p-1.5 rounded-lg transition-colors relative"
                style={{ color: '#64748b' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
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
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-200 text-xs font-medium"
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                title="Sign out and return to landing page"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto relative z-10" style={{ paddingBottom: '80px' }} data-main-content>
          {/* New Note Section */}
          <div className="max-w-4xl mx-auto">
            {/* Home Icon */}
            <button
              onClick={() => {
                setSelectedSidebarItem('home');
                onBack();
              }}
              className="mb-4 p-2 rounded-lg transition-colors flex items-center space-x-2"
              style={{ color: '#64748b' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              title="Go to Dashboard"
            >
              <Home className="h-5 w-5" />
            </button>

            {/* Heading Group */}
            <div className="mb-8">
              <h1 className="font-bold" style={{ fontSize: '20px', color: '#1e293b', marginBottom: '4px' }}>
                Tesla Motors
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b' }}>
                Notes from tesla.com - Track updates, insights, and discussions about Tesla Motors innovations and developments.
              </p>
            </div>

            {/* Note Card */}
            <NoteInDetail
              date="August 29, 2025 15:55"
              siteName="Tesla Motors"
              noteCount={4}
              website="tesla.com"
              noteItems={[
                {
                  content: "The new Model S Plaid acceleration is incredible - 0-60 in under 2 seconds. This could revolutionize our performance benchmarks.",
                  authorInitial: "S",
                  author: "Sarah Chen",
                  timestamp: "2 hours ago",
                  comments: 3,
                  likes: 12
                },
                {
                  content: "Tesla's FSD Beta v12 neural network architecture is fascinating. The end-to-end approach might be the key to solving autonomous driving.",
                  authorInitial: "M",
                  author: "Mike Rodriguez",
                  timestamp: "4 hours ago",
                  comments: 8,
                  likes: 24
                },
                {
                  content: "Supercharger V4 deployment strategy looks promising. 350kW charging will make long-distance EV travel seamless.",
                  authorInitial: "E",
                  author: "Emma Watson",
                  timestamp: "1 day ago",
                  comments: 5,
                  likes: 18
                },
                {
                  content: "The Cybertruck production timeline update shows they're finally scaling. This could disrupt the entire pickup truck market.",
                  authorInitial: "D",
                  author: "David Kim",
                  timestamp: "2 days ago",
                  comments: 12,
                  likes: 35
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;

