import { useState } from 'react';
import { ArrowLeft, Bell, LogOut, Plus, Settings, Home } from 'lucide-react';
import NoteInDetail from './noteindetail/NoteInDetail';

const NoteDetail = ({ onBack, onLogout }) => {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('home');
  
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f8fafc' }}>
      {/* Left Sidebar */}
      <div className="w-64 flex flex-col" style={{ backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0' }}>
        {/* Sidebar Header */}
        <div className="px-6 flex items-center" style={{ borderBottom: '1px solid #e2e8f0', height: '56px' }}>
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
                  setSelectedSidebarItem('home');
                  onBack();
                }}
                className="w-full flex items-center space-x-3 px-3 rounded-lg text-left transition-colors"
                style={{
                  backgroundColor: selectedSidebarItem === 'home' ? '#f8fafc' : 'transparent',
                  height: '40px'
                }}
                onMouseEnter={(e) => {
                  if (selectedSidebarItem !== 'home') {
                    e.target.style.backgroundColor = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSidebarItem !== 'home') {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <i className="ri-home-line text-lg" style={{ color: selectedSidebarItem === 'home' ? '#372804' : '#64748b' }}></i>
                <div>
                  <div className="text-sm font-medium" style={{ color: selectedSidebarItem === 'home' ? '#1e293b' : '#64748b' }}>
                    Home
                  </div>
                </div>
              </button>

              {/* Folders Option */}
              <button
                onClick={() => setSelectedSidebarItem('folders')}
                className="w-full flex items-center space-x-3 px-3 rounded-lg text-left transition-colors"
                style={{
                  backgroundColor: selectedSidebarItem === 'folders' ? '#f8fafc' : 'transparent',
                  height: '40px'
                }}
                onMouseEnter={(e) => {
                  if (selectedSidebarItem !== 'folders') {
                    e.target.style.backgroundColor = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSidebarItem !== 'folders') {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <i className="ri-folder-line text-lg" style={{ color: selectedSidebarItem === 'folders' ? '#372804' : '#64748b' }}></i>
                <div>
                  <div className="text-sm font-medium" style={{ color: selectedSidebarItem === 'folders' ? '#1e293b' : '#64748b' }}>
                    Folders
                  </div>
                </div>
              </button>
            </div>
          </div>

          <button 
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors"
            style={{ color: '#64748b', backgroundColor: '#f1f5f9' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e2e8f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f1f5f9'}
          >
            <Plus className="h-4 w-4" />
            <span>Add New Folder</span>
          </button>

          {/* Divider */}
          <div className="my-4" style={{ borderTop: '1px solid #e2e8f0' }}></div>

          {/* Recent Notes Section */}
          <div className="mb-3">
            <h3 className="text-sm font-medium" style={{ color: '#1e293b' }}>
              RECENT NOTES
            </h3>
          </div>
          <div className="space-y-1">
            {/* Active Note - Tesla Motors */}
            <div
              className="flex items-center space-x-3 rounded-lg cursor-pointer transition-colors"
              style={{ 
                backgroundColor: '#f1f5f9',
                height: '36px',
                padding: '4px 8px'
              }}
            >
              <i className="ri-sticky-note-line text-lg flex-shrink-0" style={{ color: '#372804' }}></i>
              <div className="text-sm font-medium truncate flex-1" style={{ color: '#1e293b' }}>
                Tesla Motors
              </div>
            </div>

            {/* Second Note */}
            <button
              onClick={() => {
                setSelectedSidebarItem('home');
                onBack();
              }}
              className="w-full flex items-center space-x-3 rounded-lg cursor-pointer transition-colors text-left"
              style={{ 
                backgroundColor: 'transparent',
                height: '36px',
                padding: '4px 8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <i className="ri-sticky-note-line text-lg flex-shrink-0" style={{ color: '#64748b' }}></i>
              <div className="text-sm font-medium truncate flex-1" style={{ color: '#1e293b' }}>
                Tesla Motors
              </div>
            </button>
          </div>
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

