import { useState, useEffect, useRef } from 'react';
import {
  Lightbulb, Handshake, Zap, ShieldCheck,
  Smartphone, Globe, Palette, Cloud, CheckCircle2,
} from 'lucide-react';

const STATS = [
  { num: '60+', label: 'Projects Delivered' },
  { num: '40+', label: 'Happy Clients' },
  { num: '3+', label: 'Years Experience' },
  { num: '98%', label: 'Client Satisfaction' },
];

const VALUES = [
  { icon: <Lightbulb size={22} strokeWidth={1.8} />, color: '#0ea5e9', title: 'Innovation First', desc: 'We stay ahead with cutting-edge tech and creative problem solving.' },
  { icon: <Handshake size={22} strokeWidth={1.8} />, color: '#6366f1', title: 'Client Partnership', desc: 'Your success is our success. We work as your extended tech team.' },
  { icon: <Zap size={22} strokeWidth={1.8} />, color: '#10b981', title: 'Fast Delivery', desc: 'Agile process, quick iterations, on-time delivery every time.' },
  { icon: <ShieldCheck size={22} strokeWidth={1.8} />, color: '#f59e0b', title: 'Quality Assured', desc: 'Rigorous testing and code reviews ensure rock-solid products.' },
];

const EXPERTISE = [
  {
    icon: <Smartphone size={18} strokeWidth={1.8} />,
    title: 'Mobile Development', desc: 'Android & iOS with Flutter & React Native',
    tags: ['Flutter', 'React Native'], color: '#0ea5e9', bg: 'rgba(14,165,233,',
  },
  {
    icon: <Globe size={18} strokeWidth={1.8} />,
    title: 'Web Development', desc: 'Full-stack with React, Next.js & Node.js',
    tags: ['Next.js', 'Node.js'], color: '#6366f1', bg: 'rgba(99,102,241,',
  },
  {
    icon: <Palette size={18} strokeWidth={1.8} />,
    title: 'UI/UX Design', desc: 'User-centric design & prototyping',
    tags: ['Figma', 'Prototyping'], color: '#10b981', bg: 'rgba(16,185,129,',
  },
  {
    icon: <Cloud size={18} strokeWidth={1.8} />,
    title: 'Cloud & DevOps', desc: 'AWS, Firebase & CI/CD pipelines',
    tags: ['AWS', 'Firebase'], color: '#f59e0b', bg: 'rgba(245,158,11,',
  },
];

const HIGHLIGHTS = [
  'Science-based product development approach',
  'Custom Android & iOS application development',
  'One of the best software companies in Surat',
];

function useVisible(threshold = 0.15) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function ValueCard({ icon, color, title, desc, index, vis }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative rounded-2xl p-6 overflow-hidden cursor-default flex flex-col gap-3"
      style={{
        background: hov ? `${color}0d` : 'rgba(255,255,255,0.02)',
        border: hov ? `1px solid ${color}55` : '1px solid rgba(14,165,233,0.1)',
        transition: 'all 0.35s cubic-bezier(.22,.68,0,1.2)',
        transform: vis ? (hov ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(24px)',
        opacity: vis ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        boxShadow: hov ? `0 16px 36px ${color}1a` : 'none',
      }}
    >
      <div className="absolute bottom-0 left-0 h-[2.5px] rounded-b-2xl"
        style={{ width: hov ? '100%' : '0%', background: `linear-gradient(90deg,${color},${color}66)`, transition: 'width 0.4s cubic-bezier(.22,.68,0,1.2)' }} />

      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${color}18`, border: `1px solid ${color}33`, color, transform: hov ? 'scale(1.1) rotate(-6deg)' : 'scale(1)', transition: 'transform 0.35s cubic-bezier(.22,.68,0,1.2)' }}>
        {icon}
      </div>
      <h4 className="text-sm font-bold text-[#f0f9ff]" style={{ fontFamily: "'Syne', sans-serif" }}>{title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function About() {
  const [secRef, secVis] = useVisible(0.1);
  const [valRef, valVis] = useVisible(0.1);

  return (
    <section id="about" className="py-24 px-6 md:px-10 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#041428 0%,#020b18 100%)' }}>
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div ref={secRef} className="text-center mb-16">
          <p className="text-center text-base tracking-[0.25em] uppercase text-blue-400 font-medium mb-1.5"
            style={{ opacity: secVis ? 1 : 0, transform: secVis ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.6s ease' }}>
            Who we are
          </p>
          <h2 className="font-extrabold text-[#f0f9ff] mb-3"
            style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontFamily: "'Syne', sans-serif", opacity: secVis ? 1 : 0, transform: secVis ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.6s 0.1s ease' }}>
            About{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Maqwine Infotech</span>
          </h2>
          <p className="text-center text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12"
            style={{ opacity: secVis ? 1 : 0, transform: secVis ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.6s 0.2s ease' }}>
            Building digital products that make a difference — from Surat to the world.
          </p>
        </div>

        {/* Story + Expertise */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 items-center">

          {/* Left */}
          <div style={{ opacity: secVis ? 1 : 0, transform: secVis ? 'translateX(0)' : 'translateX(-32px)', transition: 'all 0.7s 0.15s ease' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 border border-cyan-400/25 mb-6"
              style={{ background: 'rgba(14,165,233,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Est. 2021 · Surat, India
            </div>

            <h3 className="text-2xl font-bold text-[#f0f9ff] mb-4 leading-snug" style={{ fontFamily: "'Syne', sans-serif" }}>
              We turn your ideas into{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">powerful digital products</span>
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Maqwine Infotech is a Surat-based software development company specializing in mobile app and web development. We work with startups and growing businesses to build products that are fast, beautiful, and built to scale.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              From Android &amp; iOS apps to full-stack web platforms, our team of passionate engineers and designers deliver end-to-end solutions — on time, every time.
            </p>

            {/* Highlights with CheckCircle2 icon */}
            <div className="flex flex-col gap-3">
              {HIGHLIGHTS.map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} strokeWidth={2} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Expertise cards */}
          <div className="rounded-2xl p-7"
            style={{ background: 'rgba(14,165,233,0.04)', border: '1px solid rgba(14,165,233,0.12)', opacity: secVis ? 1 : 0, transform: secVis ? 'translateX(0)' : 'translateX(32px)', transition: 'all 0.7s 0.25s ease' }}>
            <h4 className="text-base font-bold text-[#f0f9ff] mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Our Expertise</h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-5">What we build best</p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {EXPERTISE.map(({ icon, title, desc, tags, color, bg }) => (
                <div key={title} className="rounded-xl p-2.5" style={{ background: `${bg}0.07)`, border: `1px solid ${color}30` }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                    style={{ background: `${bg}0.15)`, border: `1px solid ${color}50`, color }}>
                    {icon}
                  </div>
                  <span className="block text-[11px] font-bold text-[#f0f9ff] mb-1 leading-tight">{title}</span>
                  <p className="text-[9.5px] text-slate-500 leading-relaxed mb-2">{desc}</p>
                  <div className="flex gap-1 flex-wrap">
                    {tags.map(t => (
                      <span key={t} className="text-[8.5px] px-1.5 py-0.5 rounded-full"
                        style={{ background: `${bg}0.1)`, color, border: `1px solid ${color}33` }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="pt-4 border-t border-cyan-400/10">
              <p className="text-[11px] text-slate-500 uppercase tracking-widest mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Flutter', 'Node.js', 'Next.js', 'Firebase', 'AWS', 'Figma', 'MongoDB'].map(t => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full border border-cyan-400/15 text-blue-400"
                    style={{ background: 'rgba(14,165,233,0.06)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          style={{ opacity: secVis ? 1 : 0, transform: secVis ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s 0.3s ease' }}>
          {STATS.map(({ num, label }) => (
            <div key={label} className="text-center rounded-2xl py-6 px-4"
              style={{ background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.12)' }}>
              <span className="block text-3xl font-extrabold text-blue-400 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{num}</span>
              <span className="text-xs text-slate-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div ref={valRef}>
          <h3 className="text-center font-bold text-[#f0f9ff] mb-2"
            style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontFamily: "'Syne', sans-serif", opacity: valVis ? 1 : 0, transition: 'all 0.6s ease' }}>
            Why Choose{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Us</span>
          </h3>
          <p className="text-center text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12"
            style={{ opacity: valVis ? 1 : 0, transition: 'all 0.6s 0.1s ease' }}>
            What makes Maqwine Infotech different from the rest
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} icon={v.icon} color={v.color} title={v.title} desc={v.desc} index={i} vis={valVis} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}