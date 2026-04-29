import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Maqwine-Logo.png';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Technologies', path: '/technologies' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="w-full relative z-40">
      {/* Main Footer */}
      <div className={`w-full py-16 px-6 md:px-10 transition-all duration-300 ${scrolled ? 'bg-[#020b18]/95 backdrop-blur-md border-t border-blue-400/10' : 'bg-gradient-to-t from-[#020b18]/90 to-transparent'}`}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="Maqwine Infotech" className="h-[50px] object-contain hover:scale-105 transition-transform" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[280px] mb-6">
              Maqwine Infotech is a top mobile app and web development company in Surat, India. We specialize in custom software solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm font-medium block hover:translate-x-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services/web-development" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm font-medium block hover:translate-x-2">Web Development</Link></li>
              <li><Link to="/services/mobile-development" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm font-medium block hover:translate-x-2">Mobile Apps</Link></li>
              <li><Link to="/services/ui-ux-design" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm font-medium block hover:translate-x-2">UI/UX Design</Link></li>
            </ul>
          </div>

          {/* Contact & CTA */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Get In Touch</h4>
            <p className="text-slate-400 text-sm mb-6">
              Have a project in mind? Let's talk on WhatsApp.
            </p>
            <button
              onClick={() => {
                const phoneNumber = "917878601491";
                const message = "Hi Maqwine Infotech 👋, I want to discuss a project.";
                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, "_blank");
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl text-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl mb-4"
            >
              💬 Chat on WhatsApp
            </button>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-blue-400/20 backdrop-blur hover:bg-white/10 transition-all">
                <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <a href="tel:+917878601491" className="text-slate-300 font-semibold hover:text-green-400">
                  +91 78786 01491
                </a>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-blue-400/20 backdrop-blur hover:bg-white/10 transition-all">
                <div className="w-8 h-8 bg-orange-400/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8 4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <a href="mailto:maqwineinfotech@gmail.com" className="text-slate-300 font-semibold hover:text-orange-400">
                  maqwineinfotech@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-400/10 bg-[#020b18]/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 text-center">
          <p className="text-slate-500 text-sm">
            © 2024 Maqwine Infotech. All rights reserved. | Made with ❤️ in Surat
          </p>
        </div>
      </div>
    </footer>
  );
}
