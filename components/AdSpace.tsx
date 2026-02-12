'use client';

import React, { useState, useEffect } from 'react';

export default function AdSpace() {
  const [currentAd, setCurrentAd] = useState(0);

  // Placeholder ads - replace with real AdSense when approved
  const carouselAds = [
    {
      title: 'Advertisement Space 1',
      description: 'Premium ad placement - Rotating banner',
      cta: 'Learn More'
    },
    {
      title: 'Advertisement Space 2',
      description: 'Your brand here - High visibility',
      cta: 'Contact Us'
    },
    {
      title: 'Advertisement Space 3',
      description: 'Reach traders & investors',
      cta: 'Advertise'
    }
  ];

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % carouselAds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselAds.length]);

  return (
    <div className="space-y-4">
      {/* Carousel Ad Tile */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 min-h-[200px] flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Replace this placeholder with actual AdSense code */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5"></div>
        <div className="relative z-10">
          <div className="text-sm text-gray-500 mb-2">Advertisement</div>
          <h3 className="text-xl font-bold text-white mb-2">
            {carouselAds[currentAd].title}
          </h3>
          <p className="text-gray-400 mb-4">
            {carouselAds[currentAd].description}
          </p>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
            {carouselAds[currentAd].cta}
          </button>
          
          {/* Carousel indicators */}
          <div className="flex gap-2 justify-center mt-4">
            {carouselAds.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAd(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentAd ? 'bg-emerald-500 w-6' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Static Ad Zone */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 min-h-[250px] flex flex-col items-center justify-center text-center">
        {/* Replace this placeholder with actual AdSense code */}
        <div className="text-sm text-gray-500 mb-2">Advertisement</div>
        <div className="text-gray-400">
          <div className="w-64 h-48 border-2 border-dashed border-gray-700 rounded flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm mb-1">Ad Space 300x250</p>
              <p className="text-xs text-gray-600">Awaiting AdSense approval</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions for adding AdSense (only visible in dev, remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-xs text-blue-300">
          <strong>Developer Note:</strong> Replace placeholder content above with Google AdSense code once approved.
        </div>
      )}
    </div>
  );
}
