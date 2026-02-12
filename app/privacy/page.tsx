export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-text-muted">
          How we collect, use, and protect your information
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-navy-lighter rounded-lg border border-navy-border p-8 space-y-8">
        
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🔒</span>
            Introduction
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              Welcome to COT Dashboard ("we", "us", or "our"). We are committed to protecting your privacy and 
              being transparent about how we collect, use, and share information.
            </p>
            <p>
              This Privacy Policy explains what information we collect when you visit our website, how we use it, 
              and your rights regarding your personal information.
            </p>
            <p className="text-sm text-text-muted">
              <strong>Last Updated:</strong> February 12, 2026
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">📊</span>
            Information We Collect
          </h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">Information You Provide</h3>
              <p className="mb-2">We may collect information you voluntarily provide, such as:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Email addresses (if you subscribe to our newsletter)</li>
                <li>Contact information (if you reach out to us)</li>
                <li>Feedback and comments you submit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">Automatically Collected Information</h3>
              <p className="mb-2">When you visit our website, we may automatically collect:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Usage Data:</strong> Pages viewed, time spent, click patterns, referring URLs</li>
                <li><strong>Device Information:</strong> Browser type, operating system, device type, screen resolution</li>
                <li><strong>IP Address:</strong> Approximate geographic location (country/city level only)</li>
                <li><strong>Cookies:</strong> Small data files stored on your device (see our Cookie Policy)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">Information We Do NOT Collect</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>We do NOT collect financial information (credit cards, bank accounts)</li>
                <li>We do NOT collect government IDs or social security numbers</li>
                <li>We do NOT track your trading activity or positions</li>
                <li>We do NOT sell your personal information to third parties</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🎯</span>
            How We Use Your Information
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Provide and Improve Our Service:</strong> Display COT data, maintain website functionality, 
                and improve user experience
              </li>
              <li>
                <strong>Analytics:</strong> Understand how visitors use our site to improve content and features
              </li>
              <li>
                <strong>Communication:</strong> Send newsletters or respond to your inquiries (only if you've subscribed)
              </li>
              <li>
                <strong>Security:</strong> Detect and prevent fraud, abuse, or security issues
              </li>
              <li>
                <strong>Legal Compliance:</strong> Comply with applicable laws and regulations
              </li>
            </ul>
            <p className="mt-4">
              <strong>We do NOT use your information to:</strong> Provide trading advice, manage investments, 
              or make financial decisions on your behalf.
            </p>
          </div>
        </section>

        {/* Cookies and Tracking */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🍪</span>
            Cookies and Tracking Technologies
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              We use cookies and similar tracking technologies to collect information about your browsing activity. 
              Cookies are small text files stored on your device.
            </p>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Types of cookies we use:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Essential Cookies:</strong> Required for website functionality (always active)</li>
                <li><strong>Analytics Cookies:</strong> Help us understand site usage (optional, requires consent)</li>
                <li><strong>Marketing Cookies:</strong> For personalized ads (optional, requires consent)</li>
              </ul>
            </div>
            <p>
              For detailed information about our cookie usage, please read our{' '}
              <a href="/cookies" className="text-bullish-green hover:underline">Cookie Policy</a>.
            </p>
          </div>
        </section>

        {/* Third-Party Services */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🔗</span>
            Third-Party Services
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              Our website may use third-party services that collect information about you:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Analytics Services</strong> (e.g., Google Analytics): Track website usage and visitor statistics
              </li>
              <li>
                <strong>Broker Affiliates:</strong> If you click on broker links, those sites have their own privacy policies
              </li>
              <li>
                <strong>CFTC Data:</strong> We fetch public data from the U.S. Commodity Futures Trading Commission
              </li>
            </ul>
            <p className="mt-4">
              <strong>We are not responsible for third-party privacy practices.</strong> When you leave our website, 
              we encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🤝</span>
            How We Share Your Information
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              <strong>We do NOT sell your personal information.</strong>
            </p>
            <p>We may share your information only in the following limited circumstances:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who help us operate the website 
                (hosting, analytics, email services)
              </li>
              <li>
                <strong>Legal Requirements:</strong> If required by law, court order, or government regulation
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets
              </li>
              <li>
                <strong>With Your Consent:</strong> When you explicitly agree to share information
              </li>
            </ul>
          </div>
        </section>

        {/* Data Security */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🛡️</span>
            Data Security
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              We implement reasonable security measures to protect your information from unauthorized access, 
              alteration, disclosure, or destruction. This includes:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Secure HTTPS encryption for all data transmission</li>
              <li>Regular security updates and monitoring</li>
              <li>Limited access to personal information</li>
            </ul>
            <p>
              <strong>However, no method of transmission over the internet is 100% secure.</strong> While we strive 
              to protect your information, we cannot guarantee absolute security.
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">⚖️</span>
            Your Privacy Rights
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of the personal information we hold about you
              </li>
              <li>
                <strong>Correction:</strong> Request corrections to inaccurate or incomplete information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time
              </li>
              <li>
                <strong>Cookie Control:</strong> Manage cookie preferences through our cookie banner or browser settings
              </li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us using the information at the bottom of this page.
            </p>
          </div>
        </section>

        {/* Data Retention */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">📅</span>
            Data Retention
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              We retain your information only as long as necessary to provide our services and comply with legal obligations:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Cookie Preferences:</strong> Stored locally on your device (you can clear anytime)</li>
              <li><strong>Analytics Data:</strong> Aggregated and anonymized after 26 months</li>
              <li><strong>Contact Information:</strong> Until you request deletion or unsubscribe</li>
            </ul>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">👶</span>
            Children's Privacy
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              Our website is not intended for children under 18 years of age. We do not knowingly collect personal 
              information from children. If you believe we have inadvertently collected information from a child, 
              please contact us immediately.
            </p>
          </div>
        </section>

        {/* International Users */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🌍</span>
            International Data Transfers
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              Your information may be transferred to and processed in countries other than your own. By using our 
              website, you consent to the transfer of information to countries that may have different data protection 
              laws than your country of residence.
            </p>
          </div>
        </section>

        {/* Changes to Policy */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🔄</span>
            Changes to This Privacy Policy
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by 
              posting the new policy on this page with an updated "Last Updated" date.
            </p>
            <p>
              Your continued use of the website after changes indicates your acceptance of the updated policy.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">✉️</span>
            Contact Us
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              If you have questions about this Privacy Policy or want to exercise your privacy rights, please contact us:
            </p>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p><strong>Email:</strong> [Your Contact Email]</p>
              <p className="text-sm text-text-muted mt-2">
                Please allow up to 30 days for a response to privacy-related requests.
              </p>
            </div>
          </div>
        </section>

        {/* GDPR/CCPA Notice */}
        <section className="border-t border-navy-border pt-8 bg-bullish-green/10 -mx-8 -mb-8 p-8 rounded-b-lg">
          <h2 className="text-2xl font-bold mb-4 text-bullish-green flex items-center">
            <span className="mr-3">🇪🇺</span>
            GDPR & CCPA Compliance
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              <strong>For EU Residents (GDPR):</strong> You have the right to access, correct, delete, restrict 
              processing, data portability, and object to processing of your personal data.
            </p>
            <p>
              <strong>For California Residents (CCPA):</strong> You have the right to know what personal information 
              we collect, request deletion, opt-out of sales (we don't sell data), and non-discrimination.
            </p>
            <p className="text-sm mt-4">
              To exercise these rights, contact us using the information above.
            </p>
          </div>
        </section>

      </div>

      {/* Back to Home */}
      <div className="mt-8 text-center">
        <a
          href="/"
          className="inline-block px-6 py-3 bg-bullish-green hover:bg-bullish-green/90 text-navy-dark font-semibold rounded-lg transition-colors"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
