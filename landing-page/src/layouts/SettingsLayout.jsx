const SettingsLayout = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: '#1e293b' }}>Notifications</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span style={{ color: '#1e293b' }}>Email notifications</span>
            <input 
              type="checkbox" 
              className="w-4 h-4 cursor-pointer" 
              defaultChecked
              style={{
                accentColor: '#10b981'
              }}
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span style={{ color: '#1e293b' }}>Push notifications</span>
            <input 
              type="checkbox" 
              className="w-4 h-4 cursor-pointer"
              style={{
                accentColor: '#10b981'
              }}
            />
          </label>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: '#1e293b' }}>Privacy</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span style={{ color: '#1e293b' }}>Make profile public</span>
            <input 
              type="checkbox" 
              className="w-4 h-4 cursor-pointer"
              style={{
                accentColor: '#10b981'
              }}
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span style={{ color: '#1e293b' }}>Show email</span>
            <input 
              type="checkbox" 
              className="w-4 h-4 cursor-pointer"
              style={{
                accentColor: '#10b981'
              }}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default SettingsLayout

