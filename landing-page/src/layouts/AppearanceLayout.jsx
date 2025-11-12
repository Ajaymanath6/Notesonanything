const AppearanceLayout = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: '#1e293b' }}>Theme</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input 
              type="radio" 
              name="theme" 
              value="light" 
              defaultChecked 
              className="w-4 h-4 cursor-pointer"
              style={{
                accentColor: '#10b981'
              }}
            />
            <span style={{ color: '#1e293b' }}>Light</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input 
              type="radio" 
              name="theme" 
              value="dark" 
              className="w-4 h-4 cursor-pointer"
              style={{
                accentColor: '#10b981'
              }}
            />
            <span style={{ color: '#1e293b' }}>Dark</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input 
              type="radio" 
              name="theme" 
              value="system" 
              className="w-4 h-4 cursor-pointer"
              style={{
                accentColor: '#10b981'
              }}
            />
            <span style={{ color: '#1e293b' }}>System</span>
          </label>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: '#1e293b' }}>Font Size</h3>
        <select
          className="px-4 py-2 rounded-xl text-sm focus:outline-none transition-all duration-200"
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            border: '2px solid #e2e8f0',
            color: '#1e293b',
            boxShadow: 'rgba(16, 24, 40, 0.05) 0px 1px 2px'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#cbd5e1'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0'
          }}
        >
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
      </div>
    </div>
  )
}

export default AppearanceLayout

