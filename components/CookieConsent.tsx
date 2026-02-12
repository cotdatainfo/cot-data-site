'use client';

import { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consentString = localStorage.getItem('cookieConsent');
    
    if (consentString) {
      try {
        const consent = JSON.parse(consentString);
        const consentDate = new Date(consent.timestamp);
        const now = new Date();
        const daysSinceConsent = (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60 * 24);
        
        // If consent is older than 30 days, show banner again
        if (daysSinceConsent > 30) {
          localStorage.removeItem('cookieConsent');
          setTimeout(() => setShowBanner(true), 1000);
        }
      } catch (error) {
        // Invalid consent data, show banner
        localStorage.removeItem('cookieConsent');
        setTimeout(() => setShowBanner(true), 1000);
      }
    } else {
      // No consent found, show banner
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
    
    // Here you would initialize analytics/marketing tools
    initializeOptionalServices(consent);
  };

  const handleRejectAll = () => {
    const consent = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
    
    // Initialize only approved services
    initializeOptionalServices(consent);
  };

  const initializeOptionalServices = (consent: any) => {
    // This is where you would initialize analytics (Google Analytics, etc.)
    if (consent.analytics) {
      // Example: Initialize Google Analytics
      // gtag('consent', 'update', { analytics_storage: 'granted' });
      console.log('Analytics enabled');
    }
    
    if (consent.marketing) {
      // Example: Initialize marketing pixels
      console.log('Marketing cookies enabled');
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-gray-800 border-t border-gray-700 shadow-2xl">
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            {!showSettings ? (
              // Main Banner
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Icon & Text */}
                <div className="flex items-start gap-4 flex-1">
                  <Cookie className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      We Value Your Privacy
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      We use cookies to enhance your browsing experience and analyze site traffic. 
                      Essential cookies are required for the site to function. Optional cookies help us 
                      improve our service. You can customize your preferences or accept all cookies.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      By clicking "Accept All", you consent to our use of cookies. 
                      Your choice will be remembered for 30 days. Read our{' '}
                      <a href="/privacy" className="text-emerald-400 hover:underline">
                        Privacy Policy
                      </a>
                      {' '}and{' '}
                      <a href="/cookies" className="text-emerald-400 hover:underline">
                        Cookie Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Settings className="w-4 h-4" />
                    Customize
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors whitespace-nowrap"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-semibold whitespace-nowrap"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              // Settings Panel
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Essential Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">Essential Cookies</h4>
                        <span className="text-xs bg-gray-600 text-gray-300 px-2 py-0.5 rounded">
                          Always Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Required for the website to function. These cannot be disabled.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="w-5 h-5 rounded cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Analytics Cookies</h4>
                      <p className="text-sm text-gray-300">
                        Help us understand how visitors use our site to improve user experience.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => 
                          setPreferences({ ...preferences, analytics: e.target.checked })
                        }
                        className="w-5 h-5 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Marketing Cookies</h4>
                      <p className="text-sm text-gray-300">
                        Used to deliver personalized ads and measure advertising effectiveness.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => 
                          setPreferences({ ...preferences, marketing: e.target.checked })
                        }
                        className="w-5 h-5 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-4 mb-4">
                  Your preferences will be saved for 30 days. After that, you'll be asked again.
                </p>

                {/* Save Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleRejectAll}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-semibold"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
