import { motion } from 'framer-motion'

const PrivacyPolicy = ({ onNavigate }) => {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-gray max-w-none" style={{ color: '#475569' }}>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                1. Introduction
              </h2>
              <p className="mb-4 leading-relaxed">
                Welcome to NOA ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                2. Information We Collect
              </h2>
              <p className="mb-4 leading-relaxed">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Account information (name, email address)</li>
                <li>Content you create, upload, or share through our service</li>
                <li>Communications with us</li>
                <li>Payment information (processed securely through third-party providers)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                3. How We Use Your Information
              </h2>
              <p className="mb-4 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                4. Information Sharing and Disclosure
              </h2>
              <p className="mb-4 leading-relaxed">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist us in operating our service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                5. Data Security
              </h2>
              <p className="mb-4 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                6. Your Rights
              </h2>
              <p className="mb-4 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e293b' }}>
                7. Contact Us
              </h2>
              <p className="mb-4 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mb-4 leading-relaxed">
                Email: privacy@noa.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

