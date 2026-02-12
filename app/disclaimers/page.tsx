export default function DisclaimersPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Disclaimers</h1>
        <p className="text-text-muted">
          Important information about this site and its content
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-navy-lighter rounded-lg border border-navy-border p-8 space-y-8">
        
        {/* Not Financial Advice */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">⚠️</span>
            Not Financial Advice
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              The information provided on this website is for <strong>educational and informational purposes only</strong>. 
              It does not constitute financial, investment, trading, or any other type of professional advice.
            </p>
            <p>
              We are not financial advisors, registered investment advisors, or broker-dealers. Nothing on this site 
              should be construed as a recommendation to buy, sell, or hold any financial instrument, including but not 
              limited to futures contracts, commodities, currencies, stocks, bonds, or cryptocurrencies.
            </p>
            <p>
              <strong>You should always consult with a qualified financial advisor</strong> before making any investment 
              or trading decisions. Any investment or trading decisions you make are solely your responsibility.
            </p>
          </div>
        </section>

        {/* Trading Risk Disclaimer */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">💹</span>
            Trading and Investment Risks
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              <strong className="text-bearish-red">Trading futures, commodities, currencies, and other financial instruments 
              involves substantial risk of loss and is not suitable for all investors.</strong>
            </p>
            <p>
              The high degree of leverage available in futures trading can work against you as well as for you. The use of 
              leverage can lead to large losses as well as gains. Before deciding to trade futures or any other financial 
              instruments, you should carefully consider your investment objectives, level of experience, and risk appetite.
            </p>
            <p>
              <strong>You could lose all or more than your initial investment.</strong> Never trade with money you cannot 
              afford to lose. The possibility exists that you could sustain a loss in excess of your deposited funds and 
              therefore, you should not speculate with capital that you cannot afford to lose.
            </p>
          </div>
        </section>

        {/* Data Accuracy Disclaimer */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">📊</span>
            Data Accuracy and Timeliness
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              While we strive to provide accurate and up-to-date information, we <strong>do not guarantee</strong> the 
              accuracy, completeness, or timeliness of any data displayed on this website, including but not limited to 
              COT (Commitment of Traders) data.
            </p>
            <p>
              COT data is sourced from the U.S. Commodity Futures Trading Commission (CFTC) and may be subject to revisions, 
              delays, or errors. We are not responsible for any inaccuracies in the source data or any errors in our presentation 
              of that data.
            </p>
            <p>
              Market conditions can change rapidly, and data displayed on this site may be outdated by the time you view it. 
              Always verify critical information from official sources before making any trading decisions.
            </p>
            <p>
              Official CFTC data can be found at:{' '}
              <a 
                href="https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bullish-green hover:underline"
              >
                CFTC.gov/MarketReports
              </a>
            </p>
          </div>
        </section>

        {/* Past Performance */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">📈</span>
            Past Performance
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              <strong>Past performance is not indicative of future results.</strong> Historical data, patterns, or trends 
              shown on this website should not be assumed to repeat in the future.
            </p>
            <p>
              Hypothetical or simulated performance results have inherent limitations. Unlike actual performance records, 
              simulated results do not represent actual trading and may not reflect the impact of brokerage fees, slippage, 
              or other real-world trading costs.
            </p>
          </div>
        </section>

        {/* No Liability */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🛡️</span>
            Limitation of Liability
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              To the fullest extent permitted by law, <strong>we shall not be liable</strong> for any losses, damages, or 
              injuries (whether direct, indirect, incidental, consequential, or otherwise) arising from:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Your use of or reliance on any information provided on this website</li>
              <li>Trading or investment decisions made based on information from this site</li>
              <li>Errors, inaccuracies, or omissions in the data or content provided</li>
              <li>Interruptions in service or website availability</li>
              <li>Any technical issues, including but not limited to server failures, data corruption, or security breaches</li>
            </ul>
            <p>
              You agree that your use of this website is at your own risk and that we provide all content "as is" without 
              warranties of any kind, either express or implied.
            </p>
          </div>
        </section>

        {/* Affiliate Disclosure */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🤝</span>
            Affiliate Relationships
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              This website may contain affiliate links to third-party brokers and services. If you click on these links and 
              sign up or make a purchase, we may receive a commission at no additional cost to you.
            </p>
            <p>
              <strong>Our affiliate relationships do not influence our rankings, reviews, or recommendations.</strong> We strive 
              to provide honest, unbiased information about brokers and services. However, you should conduct your own due 
              diligence before choosing any broker or service.
            </p>
            <p>
              We are not responsible for the services, products, or conduct of any third-party brokers or platforms. Always 
              verify that any broker you choose is properly regulated in your jurisdiction.
            </p>
          </div>
        </section>

        {/* Regulatory Disclaimer */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">⚖️</span>
            Regulatory Status
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              This website is not registered with or regulated by any financial regulatory authority, including but not limited to:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>U.S. Securities and Exchange Commission (SEC)</li>
              <li>U.S. Commodity Futures Trading Commission (CFTC)</li>
              <li>National Futures Association (NFA)</li>
              <li>Financial Industry Regulatory Authority (FINRA)</li>
              <li>Financial Conduct Authority (FCA) in the UK</li>
            </ul>
            <p>
              We do not operate as a broker, dealer, investment advisor, or any other regulated financial entity.
            </p>
          </div>
        </section>

        {/* Geographic Restrictions */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🌍</span>
            Geographic Restrictions
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              The information on this website may not be suitable or available for residents of all countries. It is your 
              responsibility to ensure that your access to and use of this website complies with applicable laws in your 
              jurisdiction.
            </p>
            <p>
              Some of the financial instruments and services discussed on this site may be restricted or prohibited in 
              certain countries. We do not represent that any content on this site is appropriate or available for use in 
              locations outside the United States.
            </p>
          </div>
        </section>

        {/* Educational Purpose */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🎓</span>
            Educational Purpose Only
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              All content on this website, including articles, analyses, and data visualizations, is provided solely for 
              educational purposes. Our goal is to help users understand COT reports and market positioning concepts.
            </p>
            <p>
              <strong>Understanding COT data does not guarantee trading success.</strong> Many factors influence market prices, 
              and COT data is just one analytical tool among many. Successful trading requires comprehensive analysis, risk 
              management, experience, and often professional guidance.
            </p>
          </div>
        </section>

        {/* Changes to Disclaimers */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">📝</span>
            Changes to These Disclaimers
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              We reserve the right to modify these disclaimers at any time without prior notice. Your continued use of this 
              website after any changes constitutes your acceptance of the new terms.
            </p>
            <p>
              Last updated: February 09, 2025
            </p>
          </div>
        </section>

        {/* Contact and Questions */}
        <section className="border-t border-navy-border pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">✉️</span>
            Questions
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              If you have any questions about these disclaimers or the content on this website, please understand that 
              we cannot provide personalized financial advice or trading recommendations.
            </p>
            <p>
              For questions about the website's functionality or general inquiries, you may reach out through standard 
              contact methods, but we cannot and will not provide advice about specific trading decisions or strategies.
            </p>
          </div>
        </section>

        {/* Final Warning */}
        <section className="border-t border-navy-border pt-8 bg-bearish-red/10 -mx-8 -mb-8 p-8 rounded-b-lg">
          <h2 className="text-2xl font-bold mb-4 text-bearish-red flex items-center">
            <span className="mr-3">🚨</span>
            Important Final Warning
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p className="font-semibold">
              By using this website, you acknowledge and agree that:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>You have read and understood all disclaimers on this page</li>
              <li>You accept all risks associated with trading financial instruments</li>
              <li>You will not hold us liable for any losses incurred</li>
              <li>You understand this is not financial advice</li>
              <li>You will consult with qualified professionals before trading</li>
            </ul>
            <p className="font-semibold text-bearish-red mt-4">
              IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT USE THIS WEBSITE.
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
