import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Smartphone,
  Globe,
  Palette,
  Cloud,
  Apple,
  Zap,
  MonitorSmartphone,
  Layers,
} from 'lucide-react';
import ParticleCanvas from '../Component/Particlecanvas';

const WORDS = [
  { text: 'Mobile Apps', icon: Smartphone },
  { text: 'Web Platforms', icon: Globe },
  { text: 'iOS & Android', icon: Apple },
  { text: 'Custom Solutions', icon: Layers },
  { text: 'Fast Delivery', icon: Zap },
];

const CHIPS = [
  { icon: <Smartphone size={14} strokeWidth={1.8} />, label: 'Mobile Apps',     cls: 'chip-tl' },
  { icon: <Globe       size={14} strokeWidth={1.8} />, label: 'Web Dev',          cls: 'chip-tr' },
  { icon: <Palette     size={14} strokeWidth={1.8} />, label: 'UI/UX Design',    cls: 'chip-ml' },
  { icon: <Cloud       size={14} strokeWidth={1.8} />, label: 'Cloud Solutions', cls: 'chip-mr' },
  { icon: <Apple       size={14} strokeWidth={1.8} />, label: 'iOS Apps',         cls: 'chip-bl' },
  { icon: <Zap         size={14} strokeWidth={1.8} />, label: 'Fast Delivery',   cls: 'chip-br' },
];

function useTyping(words) {
  const [typedState, setTypedState] = useState({ wordIdx: 0, charIdx: 0, deleting: false });
  const stateRef = useRef({ wordIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timeout;
    const tick = () => {
      const state = stateRef.current;
      const word = words[state.wordIdx];
      if (!state.deleting) {
        // Typing
        if (state.charIdx < word.text.length) {
          stateRef.current.charIdx += 1;
          setTypedState({...stateRef.current});
          timeout = setTimeout(tick, 90);
        } else {
          // Pause at end
          stateRef.current.deleting = true;
          setTypedState({...stateRef.current});
          timeout = setTimeout(tick, 1000);
        }
      } else {
        // Deleting
        if (state.charIdx > 0) {
          stateRef.current.charIdx -= 1;
          setTypedState({...stateRef.current});
          timeout = setTimeout(tick, 55);
        } else {
          // Move to next word
          stateRef.current.wordIdx = (state.wordIdx + 1) % words.length;
          stateRef.current.charIdx = 0;
          stateRef.current.deleting = false;
          setTypedState({...stateRef.current});
          timeout = setTimeout(tick, 100);
        }
      }
    };
    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  }, [words]);

  const currentWord = words[typedState.wordIdx];
  const displayText = currentWord ? currentWord.text.slice(0, typedState.charIdx) : '';
  const currentIcon = currentWord ? currentWord.icon : null;
  const showCursor = true;
  const isComplete = typedState.charIdx === currentWord?.text.length;

  return { currentIcon, displayText, showCursor ,isComplete};
}

function useCounter(target, duration, delay = 600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now();
      const step = (now) => {
        const p    = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.floor(ease * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);
  return val;
}

export default function Hero() {
  const navigate = useNavigate();
  const typed = useTyping(WORDS);
  const s1    = useCounter(60,  1800);
  const s2    = useCounter(40,  1600);
  const s3    = useCounter(3,   1200);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ background: 'linear-gradient(135deg,#020b18 0%,#041428 50%,#050e20 100%)' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 z-0 animate-gridMove"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow */}
      <div
        className="absolute z-0 rounded-full animate-glowPulse"
        style={{
          top: '-10%', left: '35%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle,rgba(14,165,233,0.12) 0%,rgba(99,102,241,0.06) 40%,transparent 70%)',
        }}
      />

      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 pt-[100px] md:pt-[120px] pb-[60px] flex items-center lg:items-start gap-10 flex-wrap">

        {/* LEFT */}
        <div className="w-full lg:flex-[0_0_52%] min-w-0 md:min-w-[280px]">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/25 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-400 mb-6 animate-fadeUp">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-blink" />
            Mobile &amp; Web Development Company
          </div>

          {/* Headline */}
          <h1
            className="font-extrabold text-[#f0f9ff] leading-tight mb-5 animate-fadeUp"
            style={{ fontSize: 'clamp(26px,4vw,46px)', fontFamily: "'Syne', sans-serif", animationDelay: '0.1s' }}
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Maqwine<br />Infotech
            </span>
          </h1>

          {/* Typing */}
          <div
            className="text-base font-semibold text-blue-400  min-h-[26px]  border-blue-400 pr-[2px] animate-blink"
            style={{ animationDelay: '0.2s' }}
          >
            We build &nbsp;
            <div className="inline-flex items-center">
              <span>
                {typed.displayText}
              </span>
              {typed.isComplete && typed.currentIcon && (
                <typed.currentIcon
                  size={16}
                  strokeWidth={2}
                  className="text-blue-400 ml-2"
                />
              )}
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm text-slate-300 leading-relaxed max-w-[440px] mb-8 animate-fadeUp"
            style={{ animationDelay: '0.3s' }}
          >
            Maqwine Infotech is a{' '}
            <strong className="text-slate-100 font-semibold">Mobile app and website development company</strong>{' '}
            specializing in science-based product development and customized Android &amp; iOS application
            development services — one of the{' '}
            <strong className="text-slate-100 font-semibold">best software development companies in Surat.</strong>
          </p>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap animate-fadeUp" style={{ animationDelay: '0.4s' }}>
            <BtnPrimary onClick={() => navigate('/contact')}>Discuss Your Project</BtnPrimary>
            <BtnOutline onClick={() => navigate('/portfolio')}>View Our Work →</BtnOutline>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-9 flex-wrap animate-fadeUp" style={{ animationDelay: '0.5s' }}>
            <StatItem num={s1} suffix="+" label="Projects Delivered" />
            <StatItem num={s2} suffix="+" label="Happy Clients" />
            <StatItem num={s3} suffix="+" label="Years Experience" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:flex-1 min-w-0 sm:min-w-[320px] relative h-[320px] sm:h-[420px] flex items-center justify-center scale-[0.7] sm:scale-90 md:scale-100 origin-center">
          <Ring size={320} delay="0s" />
          <Ring size={440} delay="1s" />
          {CHIPS.map(c => <Chip key={c.label} icon={c.icon} label={c.label} cls={c.cls} />)}
          <Device />
        </div>
      </div>

      <style>{`
        @keyframes gridMove    { from{background-position:0 0} to{background-position:48px 48px} }
        @keyframes glowPulse   { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes fadeUp      { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes deviceFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes chipFloat   {
          0%,100%{transform:translateY(0) translateX(0)}
          30%{transform:translateY(-10px) translateX(5px)}
          70%{transform:translateY(-5px) translateX(-5px)}
        }
        @keyframes progFill    { from{width:0} to{width:var(--w)} }
        @keyframes cardPop     { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }
        @keyframes ringPulse   { 0%,100%{opacity:.4;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.8;transform:translate(-50%,-50%) scale(1.03)} }
        .animate-gridMove    { animation: gridMove 20s linear infinite; }
        .animate-glowPulse   { animation: glowPulse 4s ease-in-out infinite; }
        .animate-fadeUp      { animation: fadeUp 0.7s ease both; }
        .animate-blink       { animation: blink 1.2s ease infinite; }
        .animate-deviceFloat { animation: deviceFloat 5s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

/* ---- Sub-components ---- */

function BtnPrimary({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-7 py-3 rounded-full text-white text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(14,165,233,0.5)] shadow-[0_4px_24px_rgba(14,165,233,0.35)]"
      style={{ background: 'linear-gradient(90deg,#0ea5e9,#6366f1)' }}
    >
      {children}
    </button>
  );
}

function BtnOutline({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-7 py-3 rounded-full text-sm font-semibold text-blue-400 border border-blue-400/40 bg-transparent transition-all duration-200 hover:bg-blue-400/10 hover:border-blue-400"
    >
      {children}
    </button>
  );
}

function StatItem({ num, suffix, label }) {
  return (
    <div>
      <div className="text-[26px] font-extrabold text-[#f0f9ff]">
        {num}<span className="text-blue-500">{suffix}</span>
      </div>
      <div className="text-[11px] text-slate-500 font-medium mt-0.5">{label}</div>
    </div>
  );
}

function Ring({ size, delay }) {
  return (
    <div
      className="absolute rounded-full border border-blue-400/[0.08]"
      style={{
        width: `${size}px`, height: `${size}px`,
        top: '50%', left: '50%',
        animation: `ringPulse 3s ${delay} ease-in-out infinite`,
      }}
    />
  );
}

const CHIP_POS = {
  'chip-tl': { top: '8%',    left: '2%'   },
  'chip-tr': { top: '12%',   right: '0%'  },
  'chip-ml': { top: '44%',   left: '0%'   },
  'chip-mr': { top: '48%',   right: '0%'  },
  'chip-bl': { bottom: '10%', left: '4%'  },
  'chip-br': { bottom: '8%',  right: '2%' },
};

const CHIP_ANIM = {
  'chip-tl': { duration: '6s',   delay: '0s'    },
  'chip-tr': { duration: '7s',   delay: '-2s'   },
  'chip-ml': { duration: '5.5s', delay: '-1s'   },
  'chip-mr': { duration: '6.5s', delay: '-3s'   },
  'chip-bl': { duration: '7s',   delay: '-0.5s' },
  'chip-br': { duration: '5s',   delay: '-4s'   },
};

function Chip({ icon, label, cls }) {
  const pos  = CHIP_POS[cls];
  const anim = CHIP_ANIM[cls];
  return (
    <div
      className="absolute flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold text-slate-200 border border-blue-400/20 whitespace-nowrap z-10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md"
      style={{
        background: 'rgba(255,255,255,0.04)',
        animation: `chipFloat ${anim.duration} ${anim.delay} ease-in-out infinite`,
        ...pos,
      }}
    >
      <span className="text-blue-400 flex items-center">{icon}</span>
      {label}
    </div>
  );
}

function Device() {
  return (
    <div
      className="relative w-[220px] h-[340px] rounded-[28px] border border-blue-400/25 overflow-hidden z-[4] animate-deviceFloat"
      style={{
        background: 'linear-gradient(145deg,#0f1f35,#0a1628)',
        boxShadow: '0 0 60px rgba(14,165,233,0.15), 0 24px 64px rgba(0,0,0,0.5)',
      }}
    >
      <div className="absolute inset-2 rounded-[22px] overflow-hidden flex flex-col p-3 gap-2"
        style={{ background: '#050e1e' }}
      >
        {/* Dots */}
        <div className="flex gap-1.5 mb-1">
          {['#ef4444','#f59e0b','#22c55e'].map(c => (
            <div key={c} className="w-[7px] h-[7px] rounded-full" style={{ background: c }} />
          ))}
        </div>

        {/* Cards */}
        <DevCard icon={<Smartphone size={16} strokeWidth={1.8} color="#38bdf8" />} title="Android App"  sub="Development"  badge="Live" bc="rgba(34,197,94,0.15)"  tc="#4ade80" delay="0.5s" />
        <DevCard icon={<Apple      size={16} strokeWidth={1.8} color="#38bdf8" />} title="iOS App"      sub="Swift & RN"   badge="New"  bc="rgba(14,165,233,0.15)" tc="#38bdf8" delay="0.8s" />
        <DevCard icon={<MonitorSmartphone size={16} strokeWidth={1.8} color="#38bdf8" />} title="Web Platform" sub="Full Stack" badge="Pro" bc="rgba(139,92,246,0.15)" tc="#a78bfa" delay="1.1s" />

        {/* Progress */}
        <ProgBar label="Project Progress"    val={87} from="#0ea5e9" to="#6366f1" />
        <ProgBar label="Client Satisfaction" val={98} from="#10b981" to="#0ea5e9" />
      </div>
    </div>
  );
}

function DevCard({ icon, title, sub, badge, bc, tc, delay }) {
  return (
    <div
      className="flex items-center gap-2 rounded-[10px] px-2.5 py-2 border border-blue-400/15"
      style={{
        background: 'rgba(14,165,233,0.08)',
        animation: `cardPop 0.4s ${delay} ease both`,
      }}
    >
      <span className="flex items-center justify-center w-5 h-5 flex-shrink-0">{icon}</span>
      <div className="flex-1">
        <div className="text-[10px] font-bold text-slate-200">{title}</div>
        <div className="text-[9px] text-slate-500 mt-0.5">{sub}</div>
      </div>
      <div className="text-[8px] px-1.5 py-0.5 rounded-full font-bold"
        style={{ background: bc, color: tc }}
      >{badge}</div>
    </div>
  );
}

function ProgBar({ label, val, from, to }) {
  return (
    <div className="mt-0.5">
      <div className="flex justify-between text-[9px] text-slate-500 mb-1">
        <span>{label}</span><span>{val}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg,${from},${to})`,
            '--w': `${val}%`,
            animation: 'progFill 2s 1s ease both',
          }}
        />
      </div>
    </div>
  );
}