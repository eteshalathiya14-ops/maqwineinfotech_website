import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import webIcon    from '../assets/web.png';
import mobileIcon from '../assets/app.png';
import designIcon from '../assets/ui-ux.png';

const SERVICES = [
  {
    slug:  'web-development',
    icon:  <img src={webIcon}    alt="web"    className="w-6 h-6" />,
    tag:   'Web',
    title: 'Full Stack Web Development',
    desc:  'Fast, scalable web apps with modern tech. From MVP to enterprise — responsive, secure, and always performant.',
    pills: ['React', 'Next.js', 'Node.js', 'REST API'],
  },
  {
    slug:  'mobile-development',
    icon:  <img src={mobileIcon} alt="mobile" className="w-6 h-6" />,
    tag:   'Mobile',
    title: 'Mobile Apps Development',
    desc:  'iOS & Android apps users love. Smooth native feel with cross-platform reach in one clean build cycle.',
    pills: ['Flutter', 'React Native', 'iOS', 'Android'],
  },
  {
    slug:  'ui-ux-design',
    icon:  <img src={designIcon} alt="design" className="w-6 h-6" />,
    tag:   'Design',
    title: 'UI/UX Design Service',
    desc:  'Designs that delight and convert. User-first thinking with pixel-perfect visuals across every screen size.',
    pills: ['Figma', 'Prototyping', 'Research', 'Design System'],
  },
];

function ServiceCard({ svc, index }) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const ref           = useRef(null);
  const navigate      = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVis(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative rounded-[20px] p-8 overflow-hidden cursor-pointer"
      style={{
        background:      hov ? 'rgba(14,165,233,0.06)' : 'rgba(255,255,255,0.02)',
        border:          hov ? '1px solid rgba(14,165,233,0.35)' : '1px solid rgba(14,165,233,0.12)',
        transition:      'all 0.35s cubic-bezier(.22,.68,0,1.2)',
        transform:       vis ? (hov ? 'translateY(-7px) scale(1.02)' : 'translateY(0)') : 'translateY(32px)',
        opacity:         vis ? 1 : 0,
        transitionDelay: vis ? `${index * 0.13}s` : '0s',
        boxShadow:       hov ? '0 20px 48px rgba(14,165,233,0.12)' : 'none',
      }}
    >
      {/* Orbs */}
      {[70, 38, 18].map((size, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: `${size}px`, height: `${size}px`,
            background: '#0ea5e9', opacity: 0.06,
            top:   i === 0 ? '-20px' : i === 1 ? '12px' : '50px',
            right: i === 0 ? '-20px' : i === 1 ? '28px' : '62px',
            animation: `floatOrb ${4 + i}s ${i * 1.2}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Shimmer */}
      <div className="absolute bottom-0 left-0 h-[3px] rounded-b-[20px]"
        style={{ width: hov ? '100%' : '0%', background: 'linear-gradient(90deg,#0ea5e9,#6366f1)', transition: 'width 0.45s cubic-bezier(.22,.68,0,1.2)' }}
      />

      {/* Icon */}
      <div className="w-[50px] h-[50px] flex items-center justify-center rounded-[13px] mb-4 border border-blue-400/20"
        style={{ background: 'rgba(14,165,233,0.1)', transition: 'transform 0.38s cubic-bezier(.22,.68,0,1.2)', transform: hov ? 'scale(1.12) rotate(-6deg)' : 'none' }}>
        {svc.icon}
      </div>

      {/* Tag */}
      <span className="inline-block text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-blue-400/20 text-blue-400 mb-3"
        style={{ background: 'rgba(14,165,233,0.1)' }}>
        {svc.tag}
      </span>

      <h3 className="text-lg font-bold text-[#f0f9ff] mb-2 leading-snug" style={{ fontFamily: "'Syne', sans-serif" }}>
        {svc.title}
      </h3>

      <p className="text-[13px] text-slate-400 leading-relaxed mb-5">{svc.desc}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {svc.pills.map(p => (
          <span key={p} className="text-[11px] px-2.5 py-1 rounded-full border border-blue-400/20 text-blue-400"
            style={{ background: 'rgba(14,165,233,0.06)' }}>
            {p}
          </span>
        ))}
      </div>

      {/* CTA — navigates to detail page */}
      <button
        onClick={() => navigate(`/service/${svc.slug}`)}
        className="flex items-center text-[13px] text-lg text-blue-500 bg-transparent border-none cursor-pointer p-0"
        style={{ gap: hov ? '10px' : '5px', transition: 'gap 0.3s' }}
      >
        Explore service
        <span style={{ display: 'inline-block', transition: 'transform 0.3s cubic-bezier(.22,.68,0,1.2)', transform: hov ? 'translateX(4px)' : 'none' }}>→</span>
      </button>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-10"
      style={{ background: 'linear-gradient(180deg,#020b18 0%,#041428 100%)' }}>
      <div className="max-w-[1100px] mx-auto">

        <p className="text-center text-base tracking-[0.25em] uppercase text-blue-400 font-medium mb-1.5">
          What we offer
        </p>

        <h2 className="text-center font-extrabold text-[#f0f9ff] mb-2"
          style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontFamily: "'Syne', sans-serif" }}>
          Our Core{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
        </h2>

        <p className="text-center text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12">
          End-to-end digital solutions crafted for your business growth
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatOrb {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-10px) scale(1.12); }
        }
      `}</style>
    </section>
  );
}