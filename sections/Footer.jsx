const Footer = ({ onPortalLogin }) => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm">
                NH
              </div>
              <div>
                <div className="font-bold text-white">Nikhil Harins</div>
                <div className="text-sm text-gray-400">Data Analytics & Consulting</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              I help businesses turn data into decisions. From one-off analyses to ongoing
              fractional consulting — every engagement is built around your outcomes.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '#services', label: 'Services' },
                { href: '#work', label: 'Case Studies' },
                { href: '#how-it-works', label: 'How It Works' },
                { href: '#faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onPortalLogin}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <i className="ri-user-3-line" />
                  Client Portal
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://linkedin.com/in/nikhilharins"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <i className="ri-linkedin-fill" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Harins-Portfolio/Portfolio_Site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <i className="ri-github-fill" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:nikhilharins10@gmail.com"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <i className="ri-mail-fill" />
                  nikhilharins10@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Nikhil Harins. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Built for decision makers</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="flex items-center gap-1">
              <i className="ri-flashlight-line" /> Data-driven
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
