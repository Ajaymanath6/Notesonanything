import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ProfileLayout from './layouts/ProfileLayout'
import AppearanceLayout from './layouts/AppearanceLayout'
import SettingsLayout from './layouts/SettingsLayout'

const Accounts = ({ onBack, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'settings', label: 'Settings' }
  ]

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f8fafc' }}>
      <Sidebar
        currentView="accounts"
        onSelectView={(view) => {
          if (view === 'home' || view === 'folders') {
            onNavigate('dashboard')
          }
        }}
        onAddFolder={null}
        recentNotes={[]}
        selectedRecentNote={null}
        onSelectRecentNote={null}
      />
      
      <div className="flex-1 flex flex-col" style={{ backgroundColor: '#ffffff' }}>
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-bold" style={{ fontSize: '20px', color: '#1e293b', marginBottom: '4px' }}>
                Account
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.4', margin: 0 }}>
                View and manage your account
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b" style={{ borderColor: '#e2e8f0' }}>
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="px-4 py-2 text-sm font-medium transition-colors relative"
                      style={{
                        color: isActive ? '#1e293b' : '#64748b',
                        borderBottom: isActive ? '2px solid #372804' : '2px solid transparent',
                        marginBottom: '-2px'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#1e293b'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#64748b'
                        }
                      }}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === 'profile' && <ProfileLayout />}
              {activeTab === 'appearance' && <AppearanceLayout />}
              {activeTab === 'settings' && <SettingsLayout />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accounts

