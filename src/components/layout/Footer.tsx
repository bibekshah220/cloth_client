import { Link } from 'react-router-dom';
import { Camera, AtSign } from 'lucide-react';

const FOOTER_LINKS = {
  help: [
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  company: [
    { label: 'Store Locator', href: '/stores' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 text-stone-900">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="editorial-heading text-3xl md:text-4xl block leading-none">
              ELITE
              <br />
              THREADS
            </Link>
            <p className="caption text-stone-400 mt-8">
              © {new Date().getFullYear()} Elite Threads. All rights reserved.
            </p>
          </div>

          {/* Help Links */}
          <nav className="flex flex-col space-y-4" aria-label="Support">
            {FOOTER_LINKS.help.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm text-stone-500 hover:text-stone-900 hover:translate-x-1 transition-transform"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Company Links */}
          <nav className="flex flex-col space-y-4" aria-label="Company">
            {FOOTER_LINKS.company.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm text-stone-500 hover:text-stone-900 hover:translate-x-1 transition-transform"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div>
            <p className="caption text-stone-900 mb-4">Follow Us</p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-900 transition-colors"
                aria-label="Instagram"
              >
                <Camera size={20} />
              </a>
              <a
                href="mailto:hello@elitethreads.com"
                className="text-stone-500 hover:text-stone-900 transition-colors"
                aria-label="Email"
              >
                <AtSign size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
