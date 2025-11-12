const ProfileLayout = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: '#1e293b' }}>Manage Profile</h3>
        <p className="text-sm" style={{ color: '#64748b' }}>
          Change your profile picture, email, fullname and username.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="space-y-3">
          <label className="block text-sm font-medium" style={{ color: '#1e293b' }}>Profile picture</label>
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold"
              style={{ backgroundColor: '#efefef', color: '#372804' }}
            >
              N
            </div>
            <button
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
              style={{
                backgroundColor: '#efefef',
                color: '#1e293b',
                border: '2px solid #e2e8f0',
                boxShadow: 'rgba(16, 24, 40, 0.05) 0px 1px 2px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#efefef'
              }}
            >
              Change picture
            </button>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#1e293b' }}>Email</label>
          <input
            type="email"
            className="px-4 py-2 rounded-xl text-sm focus:outline-none transition-all duration-200"
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              border: '2px solid #e2e8f0',
              color: '#1e293b',
              boxShadow: 'rgba(16, 24, 40, 0.05) 0px 1px 2px'
            }}
            placeholder="Enter your email"
            onFocus={(e) => {
              e.target.style.borderColor = '#cbd5e1'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0'
            }}
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#1e293b' }}>First name</label>
          <input
            type="text"
            className="px-4 py-2 rounded-xl text-sm focus:outline-none transition-all duration-200"
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              border: '2px solid #e2e8f0',
              color: '#1e293b',
              boxShadow: 'rgba(16, 24, 40, 0.05) 0px 1px 2px'
            }}
            placeholder="Enter your first name"
            onFocus={(e) => {
              e.target.style.borderColor = '#cbd5e1'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0'
            }}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#1e293b' }}>Last name</label>
          <input
            type="text"
            className="px-4 py-2 rounded-xl text-sm focus:outline-none transition-all duration-200"
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              border: '2px solid #e2e8f0',
              color: '#1e293b',
              boxShadow: 'rgba(16, 24, 40, 0.05) 0px 1px 2px'
            }}
            placeholder="Enter your last name"
            onFocus={(e) => {
              e.target.style.borderColor = '#cbd5e1'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0'
            }}
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            className="px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
            style={{
              backgroundColor: '#efefef',
              color: '#1e293b',
              border: '2px solid #e2e8f0',
              boxShadow: 'rgba(16, 24, 40, 0.05) 0px 1px 2px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#efefef'
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout

