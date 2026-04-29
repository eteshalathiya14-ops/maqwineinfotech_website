import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';

function useVisible(threshold = 0.15) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs?.disconnect();
  }, []);
  return [ref, vis];
}

export default function Contact() {
  const [secRef] = useVisible(0.1);
  const [formData, setFormData] = useState({ name: '', email: '', service: 'web', message: '' });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) { setStatus('Please fill all fields'); return; }
    setSubmitting(true);
    setStatus('Opening WhatsApp...');
    const phone = '917878601491';
    const msg = `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    setFormData({ name: '', email: '', service: 'web', message: '' });
    setSubmitting(false);
  };

  const CONTACTS = [
    { icon: Mail, label: 'Email', value: 'maqwineinfotech@gmail.com', href: 'mailto:maqwineinfotech@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 78786 01491', href: 'tel:+917878601491' },
    { icon: MapPin, label: 'Location', value: 'Amroli, Surat, Gujarat', href: 'https://www.google.com/maps/search/?api=1&query=Maqwine%20Infotech%20Amroli%20Surat%20Gujarat' },
    { icon: Globe, label: 'LinkedIn', value: 'Maqwine Infotech', href: 'https://www.linkedin.com/company/maqwine-infotech/posts/?feedView=all' },
  ];

  const inputCls = "w-full px-4 py-3 bg-slate-700/50 border border-slate-500/70 rounded-xl text-[#f0f9ff] placeholder-slate-400 text-sm focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300";

  return (
    <section id="contact" className="py-14 md:py-24 px-4 md:px-10 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#020b18 0%,#01060f 100%)' }}>
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div ref={secRef} className="text-center mb-10 md:mb-16">
          <p className="text-base tracking-[0.25em] uppercase text-blue-400 font-medium mb-1.5">Get In Touch</p>
          <h2 className="font-extrabold text-[#f0f9ff] mb-3"
            style={{ fontSize: 'clamp(24px,4vw,44px)', fontFamily: "'Syne', sans-serif" }}>
            Ready to start your{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">project?</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg font-medium max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can turn your vision into reality.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Left — Info */}
          <div>
            <div className="mb-5">
              <h3 className="font-bold text-lg md:text-xl text-[#f0f9ff] mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                Let's Talk Business
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you have a big idea or a small feature request, we're here to make it happen.
              </p>
            </div>

            {/* Contact Cards — 2 col on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
              {CONTACTS.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                  className="group flex items-start gap-3 p-3.5 rounded-xl border border-slate-800/60 hover:border-blue-400/30 hover:bg-slate-900/50 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-blue-400/10 border border-blue-400/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="font-semibold text-[#f0f9ff] text-xs group-hover:text-blue-400 transition-colors break-all leading-snug">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-gradient-to-br from-slate-700/30 to-slate-500/20 border border-slate-500/40 rounded-2xl p-5 md:p-8 shadow-2xl backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    className={inputCls} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className={inputCls} placeholder="your@email.com" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Service Needed</label>
                <select name="service" value={formData.service} onChange={handleChange} className={inputCls}>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Apps</option>
                  <option value="design">UI/UX Design</option>
                  <option value="fullstack">Full Stack</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Details</label>
                <textarea name="message" rows="4" value={formData.message} onChange={handleChange}
                  className={inputCls} placeholder="Describe your project, timeline, budget..." />
              </div>

              {status && (
                <div className={`p-3 rounded-xl text-xs font-semibold text-center ${
                  status.includes('Thanks')
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/30'
                    : 'bg-rose-500/10 text-rose-300 border border-rose-400/30'
                }`}>{status}</div>
              )}

              <button type="submit" disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm md:text-base shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 border border-blue-100/60 hover:border-blue-300/80"
                style={{ background: 'linear-gradient(100deg,#fff 60%,#e0f2fe 100%)', color: '#1e293b' }}>
                {submitting ? 'Sending...' : <><Send size={16} color="#3b82f6" /> Send Message</>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}