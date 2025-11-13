import { motion } from 'framer-motion'

const TermsOfService = ({ onNavigate }) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div className="bg-white border-b" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => onNavigate?.('landing')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <i className="ri-arrow-left-line text-lg"></i>
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: '#1e293b', fontFamily: 'Lato, sans-serif' }}
          >
            Terms of Service
          </h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-gray max-w-none" style={{ color: '#475569' }}>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                1. Agreement to Terms
              </h2>
              <p className="mb-4 leading-relaxed">
                By accessing or using NOA, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                2. Use License
              </h2>
              <p className="mb-4 leading-relaxed">
                Permission is granted to temporarily use NOA for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                3. User Accounts
              </h2>
              <p className="mb-4 leading-relaxed">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                4. User Content
              </h2>
              <p className="mb-4 leading-relaxed">
                You retain ownership of any content you create, upload, or share through NOA. By using our service, you grant us a license to use, store, and process your content as necessary to provide the service. You are responsible for ensuring you have the right to share any content you upload.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                5. Prohibited Uses
              </h2>
              <p className="mb-4 leading-relaxed">
                You agree not to use NOA:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>In any way that violates any applicable law or regulation</li>
                <li>To transmit any malicious code or viruses</li>
                <li>To collect or harvest information about other users</li>
                <li>To impersonate or attempt to impersonate another user</li>
                <li>To interfere with or disrupt the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                6. Subscription and Payment
              </h2>
              <p className="mb-4 leading-relaxed">
                If you purchase a subscription, you agree to pay all charges associated with your account. Subscriptions automatically renew unless cancelled. You may cancel your subscription at any time through your account settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                7. Termination
              </h2>
              <p className="mb-4 leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                8. Disclaimer
              </h2>
              <p className="mb-4 leading-relaxed">
                The materials on NOA are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                9. Limitation of Liability
              </h2>
              <p className="mb-4 leading-relaxed">
                In no event shall NOA or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                10. Contact Information
              </h2>
              <p className="mb-4 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="mb-4 leading-relaxed">
                Email: legal@noa.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsOfService

