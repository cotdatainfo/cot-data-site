export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Cookie Policy</h1>
        <p className="text-text-muted">
          Understanding how we use cookies on this website
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-navy-lighter rounded-lg border border-navy-border p-8 space-y-8">
        
        {/* What Are Cookies */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🍪</span>
            What Are Cookies?
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you 
              visit a website. They help websites remember your preferences and improve your browsing experience.
            </p>
            <p>
              Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" 
              (remain on your device for a set period or until you delete them).
            </p>
          </div>
        </section>

        {/* Why We Use Cookies */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🎯</span>
            Why We Use Cookies
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>We use cookies for several reasons:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Essential Functionality:</strong> Enable core features like navigation and data display
              </li>
              <li>
                <strong>Remember Preferences:</strong> Store your filter selections and display settings
              </li>
              <li>
                <strong>Analytics:</strong> Understand how visitors use our site to improve it
              </li>
              <li>
                <strong>Security:</strong> Protect against fraudulent activity and abuse
              </li>
              <li>
                <strong>Personalization:</strong> Deliver relevant content based on your interests
              </li>
            </ul>
          </div>
        </section>

        {/* Types of Cookies We Use */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">📋</span>
            Types of Cookies We Use
          </h2>
          <div className="space-y-6 text-text-secondary">
            
            {/* Essential Cookies */}
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-text-primary">1. Essential Cookies</h3>
                <span className="text-xs bg-gray-600 text-gray-300 px-3 py-1 rounded-full">
                  Always Active
                </span>
              </div>
              <p className="mb-3">
                These cookies are necessary for the website to function properly. They cannot be disabled.
              </p>
              <div className="bg-gray-900/50 p-4 rounded">
                <p className="font-semibold mb-2">Examples:</p>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li><strong>cookieConsent:</strong> Stores your cookie preferences (Duration: 1 year)</li>
                  <li><strong>sessionID:</strong> Maintains your session while browsing (Duration: Session)</li>
                  <li><strong>security:</strong> Prevents fraudulent activity (Duration: Session)</li>
                </ul>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-text-primary">2. Analytics Cookies</h3>
                <span className="text-xs bg-extreme-blue text-white px-3 py-1 rounded-full">
                  Optional
                </span>
              </div>
              <p className="mb-3">
                These cookies help us understand how visitors interact with our website by collecting anonymous information.
              </p>
              <div className="bg-gray-900/50 p-4 rounded">
                <p className="font-semibold mb-2">Examples:</p>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li><strong>_ga:</strong> Google Analytics ID (Duration: 2 years)</li>
                  <li><strong>_gid:</strong> Google Analytics session ID (Duration: 24 hours)</li>
                  <li><strong>_gat:</strong> Google Analytics request throttle (Duration: 1 minute)</li>
                </ul>
                <p className="text-sm text-text-muted mt-3">
                  <strong>Data collected:</strong> Pages viewed, time spent, browser type, device type, 
                  referring website, geographic location (city level)
                </p>
                <p className="text-sm text-text-muted mt-2">
                  <strong>Purpose:</strong> Improve website content, identify popular features, fix bugs, 
                  optimize performance
                </p>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-text-primary">3. Marketing Cookies</h3>
                <span className="text-xs bg-extreme-blue text-white px-3 py-1 rounded-full">
                  Optional
                </span>
              </div>
              <p className="mb-3">
                These cookies track your browsing activity to deliver personalized advertisements.
              </p>
              <div className="bg-gray-900/50 p-4 rounded">
                <p className="font-semibold mb-2">Examples:</p>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li><strong>_fbp:</strong> Facebook Pixel (Duration: 3 months)</li>
                  <li><strong>IDE:</strong> Google Ads tracking (Duration: 1 year)</li>
                  <li><strong>ads/ga-audiences:</strong> Google Ads remarketing (Duration: Session)</li>
                </ul>
                <p className="text-sm text-text-muted mt-3">
                  <strong>Data collected:</strong> Pages viewed, clicks, time spent, device info, 
                  approximate location
                </p>
                <p className="text-sm text-text-muted mt-2">
                  <strong>Purpose:</strong> Show relevant ads on other websites, measure ad effectiveness, 
                  retarget visitors
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Third-Party Cookies */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🔗</span>
            Third-Party Cookies
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              Some cookies are set by third-party services that appear on our pages. We do not control these cookies.
            </p>
            <div className="bg-gray-800/50 p-4 rounded-lg space-y-2">
              <p className="font-semibold">Third-party services we use:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <strong>Google Analytics:</strong> Website analytics 
                  (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                      className="text-bullish-green hover:underline">Privacy Policy</a>)
                </li>
                <li>
                  <strong>Broker Affiliate Networks:</strong> Track referrals from broker links 
                  (each broker has its own privacy policy)
                </li>
              </ul>
            </div>
            <p>
              These third parties may use cookies to collect information about your online activities across 
              different websites over time.
            </p>
          </div>
        </section>

        {/* Managing Cookies */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">⚙️</span>
            How to Manage Cookies
          </h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-text-primary">On This Website:</h3>
              <p>
                You can manage your cookie preferences using our cookie banner (appears on first visit) or by 
                clicking the button below:
              </p>
              <button
                onClick={() => {
                  // Clear cookie consent to show banner again
                  localStorage.removeItem('cookieConsent');
                  window.location.reload();
                }}
                className="mt-3 px-6 py-3 bg-bullish-green hover:bg-bullish-green/90 text-navy-dark font-semibold rounded-lg transition-colors"
              >
                Update Cookie Preferences
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-text-primary">In Your Browser:</h3>
              <p className="mb-3">
                Most browsers allow you to control cookies through their settings. Here's how to manage cookies 
                in popular browsers:
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>Chrome:</strong>{' '}
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" 
                     className="text-bullish-green hover:underline">
                    Manage cookies in Chrome
                  </a>
                </li>
                <li>
                  <strong>Firefox:</strong>{' '}
                  <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" 
                     target="_blank" rel="noopener noreferrer" className="text-bullish-green hover:underline">
                    Manage cookies in Firefox
                  </a>
                </li>
                <li>
                  <strong>Safari:</strong>{' '}
                  <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" 
                     target="_blank" rel="noopener noreferrer" className="text-bullish-green hover:underline">
                    Manage cookies in Safari
                  </a>
                </li>
                <li>
                  <strong>Edge:</strong>{' '}
                  <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                     target="_blank" rel="noopener noreferrer" className="text-bullish-green hover:underline">
                    Manage cookies in Edge
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
              <p className="text-sm">
                <strong className="text-yellow-500">⚠️ Note:</strong> Blocking or deleting cookies may affect 
                your experience on this website. Some features may not work properly without cookies enabled.
              </p>
            </div>
          </div>
        </section>

        {/* Do Not Track */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🚫</span>
            Do Not Track Signals
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              Some browsers have a "Do Not Track" (DNT) feature that signals websites not to track you. 
              Currently, there is no industry standard for how websites should respond to DNT signals.
            </p>
            <p>
              At this time, our website does not respond to DNT signals. However, you can control tracking 
              through our cookie consent banner and your browser settings.
            </p>
          </div>
        </section>

        {/* Cookie Lifespan */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">⏰</span>
            Cookie Lifespan
          </h2>
          <div className="space-y-3 text-text-secondary">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-3 text-left">Cookie Type</th>
                    <th className="border border-gray-700 p-3 text-left">Typical Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-700 p-3">Session Cookies</td>
                    <td className="border border-gray-700 p-3">Deleted when you close your browser</td>
                  </tr>
                  <tr className="bg-gray-800/30">
                    <td className="border border-gray-700 p-3">Essential Cookies</td>
                    <td className="border border-gray-700 p-3">6 months to 1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 p-3">Analytics Cookies</td>
                    <td className="border border-gray-700 p-3">24 hours to 2 years</td>
                  </tr>
                  <tr className="bg-gray-800/30">
                    <td className="border border-gray-700 p-3">Marketing Cookies</td>
                    <td className="border border-gray-700 p-3">3 months to 1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Changes to Policy */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🔄</span>
            Changes to This Cookie Policy
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
              operational, legal, or regulatory reasons.
            </p>
            <p>
              When we make significant changes, we will update the "Last Updated" date at the top of this page.
            </p>
            <p className="text-sm text-text-muted">
              <strong>Last Updated:</strong> February 12, 2026
            </p>
          </div>
        </section>

        {/* More Information */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">📚</span>
            More Information
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>For more information about how we handle your data, please see:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <a href="/privacy" className="text-bullish-green hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="/disclaimers" className="text-bullish-green hover:underline">Disclaimers</a>
              </li>
            </ul>
            <p className="mt-4">
              If you have questions about our use of cookies, please contact us at: [Your Contact Email]
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
