import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Globe  } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'web',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.message) {
    setStatus('Please fill all fields');
    return;
  }
  setSubmitting(true);
  setStatus('Opening WhatsApp...');
  const phone = '917878601491';
  const msg =
    `Name: ${formData.name}\n` +
    `Email: ${formData.email}\n` +
    `Service: ${formData.service}\n` +
    `Message: ${formData.message}`;
  const encodedMsg = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
  window.open(waUrl, '_blank');
  setFormData({ name: '', email: '', service: 'web', message: '' });
  setSubmitting(false);
};

  return (
    <section id="contact" className="py-24 px-6 md:px-10 overflow-hidden" style={{ background: 'linear-gradient(180deg,#020b18 0%,#01060f 100%)' }}>
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div ref={secRef} className="text-center mb-20">
          <div className="text-center text-base tracking-[0.25em] uppercase text-blue-400 font-medium mb-1.5">
            Get In Touch
          </div>
          <h2 className="font-extrabold text-[#f0f9ff] mb-4" style={{ fontSize: 'clamp(28px,4vw,44px)', fontFamily: "'Syne', sans-serif" }}>
            Ready to start your{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              project?
            </span>
          </h2>
          <p className="text-center text-gray-400 text-sm md:text-lg font-medium max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can turn your vision into reality. 
            Drop us a line and we'll respond within 24 hours.
          </p>
        </div>

        {/* Contact Info & Form */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-[#f0f9ff]" style={{ fontFamily: "'Syne', sans-serif" }}>
                Let's Talk Business
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you have a big idea or small feature request, 
                we're here to make it happen. Fast delivery, fair pricing.
              </p>
            </div>

            {/* Contact Cards */}
            {[
              { icon: Mail, label: 'Email', value: 'maqwineinfotech@gmail.com', href: 'mailto:maqwineinfotech@gmail.com' },
              { icon: Phone, label: 'Phone', value: '+917878601491', href: 'tel:+917878601491' },
              { icon: MapPin, label: 'Location', value: 'Maqwine Infotech, Amroli, Surat, Gujarat',  href: 'https://www.google.com/maps/search/?api=1&query=Maqwine%20Infotech%20Amroli%20Surat%20Gujarat' },
              { icon: Globe, label: 'LinkedIn', value: 'Maqwine infotech', href: 'https://www.linkedin.com/company/maqwine-infotech/posts/?feedView=all' }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-x-2 hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)] border border-slate-800/50 hover:border-blue-400/30 hover:bg-slate-900/50"
              >
                <item.icon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 opacity-80 group-hover:opacity-100" />
                <div>
                  <p className="text-slate-400 text-sm mb-1">{item.label}</p>
                  <p className="font-semibold text-[#f0f9ff] group-hover:text-blue-400 transition-colors">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="backdrop-blur-xl">
            <div className="bg-gradient-to-br from-slate-700/30 to-slate-500/20 border border-slate-500/40 rounded-3xl p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-700/50 border border-slate-500/70 rounded-2xl text-[#f0f9ff] placeholder-slate-300 focus:border-blue-800/50 focus:outline-none focus:ring-2 focus:ring-blue-200/30 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-700/50 border border-slate-500/70 rounded-2xl text-[#f0f9ff] placeholder-slate-300 focus:border-blue-800/50 focus:outline-none focus:ring-2 focus:ring-blue-200/30 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Service Needed</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-700/50 border border-slate-500/70 rounded-2xl text-[#f0f9ff] placeholder-slate-300 focus:border-blue-800/50 focus:outline-none focus:ring-2 focus:ring-blue-200/30 transition-all duration-300"
                  >
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Apps</option>
                    <option value="design">UI/UX Design</option>
                    <option value="fullstack">Full Stack</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Tell us about your project</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-700/50 border border-slate-500/70 rounded-2xl text-[#f0f9ff] placeholder-slate-300 focus:border-blue-800/50 focus:outline-none focus:ring-2 focus:ring-blue-200/30 transition-all duration-300"
                    placeholder="Describe your project requirements, timeline, budget..."
                  />
                </div>

                {status && (
                  <div className={`p-4 rounded-2xl text-sm font-semibold text-center transition-all duration-300 ${
                    status.includes('Thanks') 
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/30' 
                      : 'bg-rose-500/10 text-rose-300 border border-rose-400/30'
                  }`}>
                    {status}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg shadow-[0_8px_32px_rgba(180,200,255,0.18)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.18)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-100/60 hover:border-blue-300/80"
                  style={{
                    background: 'linear-gradient(100deg,#fff 60%,#e0f2fe 100%)',
                    color: '#1e293b'
                  }}
                >
                  {submitting ? 'Sending...' : (
                    <>
                      <Send size={20} color="#3b82f6" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

