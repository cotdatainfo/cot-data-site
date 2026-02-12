import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {currentYear} COT Dashboard. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/disclaimers"
              className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
            >
              Disclaimers
            </Link>
            <a
              href="https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
            >
              CFTC Official
            </a>
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className="mt-6 text-xs text-gray-500 text-center max-w-3xl mx-auto">
          This site provides educational information only and is not financial advice. 
          Trading involves risk. Always consult with a qualified financial advisor before making trading decisions.
        </div>
      </div>
    </footer>
  );
}
