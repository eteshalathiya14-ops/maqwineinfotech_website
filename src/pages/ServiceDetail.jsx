import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import SERVICES_DATA from '../Data/servicesData';

/* ── Bubble config ── */
const POS_9 = [
  { left: "5%", top: "5%" },   // 0 - top-left
  { left: "35%", top: "5%" },  // 1 - top-mid
  { left: "70%", top: "5%" },  // 2 - top-right 
  { left: "2%", top: "38%" },  // 3 - mid-left
  { left: "75%", top: "38%" }, // 4 - mid-right
  { left: "5%", top: "70%" },  // 5 - bottom-left1
  { left: "27%", top: "70%" }, // 6 - bottom-left2
  { left: "55%", top: "70%" }, // 7 - bottom-mid
  { left: "78%", top: "70%" }, // 8 - bottom-right
];


const POS_SUBSETS = {
  1: [1], 2: [0,2], 3: [0,2,6], 4: [0,2,5,8],
  5: [0,1,2,5,8], 6: [0,1,2,3,4,7],
  7: [0,1,2,3,4,6,8], 8: [0,1,2,3,4,5,7,8],
  9: [0,1,2,3,4,5,6,7,8],
};



const orbStyleMap = {
  cyan:   { bg: 'radial-gradient(circle at 35% 35%, rgba(0,220,255,0.6) 0%, rgba(0,130,180,0.35) 50%, rgba(0,50,80,0.1) 80%, transparent 100%)',   sh: '0 0 0 1.5px rgba(0,220,255,0.4), 0 0 28px rgba(0,200,255,0.18), inset 0 0 24px rgba(0,200,240,0.1)' },
  yellow: { bg: 'radial-gradient(circle at 35% 35%, rgba(255,220,40,0.6) 0%, rgba(200,150,10,0.35) 50%, rgba(80,50,0,0.1) 80%, transparent 100%)',  sh: '0 0 0 1.5px rgba(255,220,40,0.4), 0 0 28px rgba(255,200,0,0.18), inset 0 0 24px rgba(240,200,30,0.1)' },
  orange: { bg: 'radial-gradient(circle at 35% 35%, rgba(255,140,40,0.6) 0%, rgba(200,80,20,0.35) 50%, rgba(80,20,0,0.1) 80%, transparent 100%)',   sh: '0 0 0 1.5px rgba(255,140,40,0.4), 0 0 28px rgba(255,120,0,0.18), inset 0 0 24px rgba(240,120,30,0.1)' },
  purple: { bg: 'radial-gradient(circle at 35% 35%, rgba(180,80,255,0.6) 0%, rgba(120,40,200,0.35) 50%, rgba(60,10,100,0.1) 80%, transparent 100%)', sh: '0 0 0 1.5px rgba(180,80,255,0.4), 0 0 28px rgba(160,60,255,0.18), inset 0 0 24px rgba(160,60,240,0.1)' },
  blue:   { bg: 'radial-gradient(circle at 35% 35%, rgba(60,150,255,0.6) 0%, rgba(30,80,200,0.35) 50%, rgba(10,30,100,0.1) 80%, transparent 100%)',  sh: '0 0 0 1.5px rgba(60,150,255,0.4), 0 0 28px rgba(40,120,255,0.18), inset 0 0 24px rgba(40,120,240,0.1)' },
  green:  { bg: 'radial-gradient(circle at 35% 35%, rgba(80,220,80,0.55) 0%, rgba(40,140,40,0.3) 50%, rgba(10,60,10,0.1) 80%, transparent 100%)',   sh: '0 0 0 1.5px rgba(80,220,80,0.35), 0 0 28px rgba(60,200,60,0.18), inset 0 0 24px rgba(60,200,60,0.1)' },
  teal:   { bg: 'radial-gradient(circle at 35% 35%, rgba(0,210,170,0.6) 0%, rgba(0,130,100,0.35) 50%, rgba(0,60,50,0.1) 80%, transparent 100%)',    sh: '0 0 0 1.5px rgba(0,220,180,0.4), 0 0 28px rgba(0,200,160,0.18), inset 0 0 24px rgba(0,200,160,0.1)' },
  dark:   { bg: 'radial-gradient(circle at 35% 35%, rgba(140,140,180,0.5) 0%, rgba(70,70,120,0.3) 50%, rgba(20,20,50,0.1) 80%, transparent 100%)',  sh: '0 0 0 1.5px rgba(160,160,200,0.3), 0 0 28px rgba(120,120,180,0.1), inset 0 0 24px rgba(100,100,150,0.08)' },
  pink:   { bg: 'radial-gradient(circle at 35% 35%, rgba(255,100,180,0.6) 0%, rgba(200,50,130,0.35) 50%, rgba(80,10,50,0.1) 80%, transparent 100%)', sh: '0 0 0 1.5px rgba(255,100,180,0.4), 0 0 28px rgba(240,80,160,0.18), inset 0 0 24px rgba(240,80,160,0.1)' },
};

function TechBubbles({ techs, svcColor, gradientTo }) {
  const [hovered, setHovered] = useState(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const count = Math.min(techs.length, 9);
  const subset = POS_SUBSETS[count] || POS_SUBSETS[9];

  // Responsive orb size based on container width
  const orbSize = containerWidth > 0 ? Math.min(90, Math.max(70, containerWidth * 0.18)) : 80;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const glowSize = Math.max(260, orbSize * 3.2);

  const animDur = ['7s','8.5s','7.5s','9s','6.5s','8s','9.5s','7s','8s'];
  const animDelay = ['0s','-2s','-4s','-1s','-3s','-5s','-2.5s','-6s','-3.5s'];

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden rounded-[20px] border" style={{
      height: '400px',
      background: 'radial-gradient(ellipse at 50% 25%, #0d1b3e 0%, #050b1a 55%, #000 100%)',
      borderColor: `${svcColor}25`
    }}>
      <div className="w-full h-full scale-[0.65] sm:scale-[0.85] md:scale-100 origin-center">
        {/* Stars */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: [
            'radial-gradient(1.5px 1.5px at 7% 10%, rgba(255,255,255,0.7) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 18% 35%, rgba(255,255,255,0.5) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 35% 7%, rgba(255,255,255,0.6) 0%, transparent 100%)',
            'radial-gradient(1.5px 1.5px at 50% 55%, rgba(255,255,255,0.4) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 65% 20%, rgba(255,255,255,0.7) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 80% 45%, rgba(255,255,255,0.5) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 12% 65%, rgba(255,255,255,0.55) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 88% 75%, rgba(255,255,255,0.4) 0%, transparent 100%)',
            'radial-gradient(2px 2px at 30% 50%, rgba(255,255,255,0.8) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 72% 5%, rgba(255,255,255,0.6) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 44% 30%, rgba(255,255,255,0.4) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 92% 38%, rgba(255,255,255,0.5) 0%, transparent 100%)',
          ].join(','),
        }} />

        {/* Center ambient glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: `${glowSize}px`, height: `${glowSize}px`, borderRadius: '50%',
          background: `radial-gradient(circle, ${svcColor}14 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Center label */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          textAlign: 'center', pointerEvents: 'none', zIndex: 10, whiteSpace: 'nowrap',
        }}>
          <div style={{
            fontSize: Math.max(9, orbSize * 0.12), fontWeight: 700, letterSpacing: '0.3em',
            color: `${svcColor}bb`, textTransform: 'uppercase',
            marginBottom: 6, fontFamily: 'sans-serif',
          }}>
            Stack
          </div>
          <h3 style={{
            fontSize: `clamp(16px, ${orbSize * 0.28}px, 26px)`, fontWeight: 800, color: '#fff',
            textShadow: `0 0 40px ${svcColor}88`,
            fontFamily: "'Syne',sans-serif", lineHeight: 1.25,
          }}>
            Technologies<br />
            <span style={{ background: `linear-gradient(90deg,${svcColor},${gradientTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              We Use
            </span>
          </h3>
        </div>

        {/* Bubbles */}
        {techs.slice(0, 9).map((tech, i) => {
          const posIdx = subset[i];
          const pos = POS_9[posIdx];
          const isHov = hovered === i;
          const cs = orbStyleMap[tech.color] || orbStyleMap.blue;

          return (
            <div
              key={tech.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'absolute',
                width: `${orbSize}px`, height: `${orbSize}px`,
                left: pos.left, top: pos.top,
                borderRadius: '50%',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                background: cs.bg,
                boxShadow: cs.sh,
                animation: `floatOrbDetail ${animDur[i % animDur.length]} linear ${animDelay[i % animDelay.length]} infinite`,
                transform: isHov ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                zIndex: isHov ? 30 : 2,
              }}
            >
              {/* Glare */}
              <div style={{
                position: 'absolute', top: '12%', left: '15%',
                width: '34%', height: '24%', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.06) 70%, transparent 100%)',
                pointerEvents: 'none',
              }} />
              <img
                src={tech.url}
                alt={tech.name}
                style={{
                  width: '48%', height: '48%', objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
                  transform: isHov ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              />
              <div style={{
                fontSize: Math.max(8, orbSize * 0.11), fontWeight: 700,
                color: 'rgba(255,255,255,0.92)',
                marginTop: 3, textAlign: 'center',
                lineHeight: 1.2, pointerEvents: 'none',
                textShadow: '0 1px 5px rgba(0,0,0,0.9)',
                maxWidth: '88%', fontFamily: 'sans-serif',
              }}>
                {tech.name}
              </div>
            </div>
          );
        })}

        <style>{`
          @keyframes floatOrbDetail {
            0% { transform: translateY(0px) translateX(0px); }
            15% { transform: translateY(-18px) translateX(10px); }
            35% { transform: translateY(-8px) translateX(-10px); }
            55% { transform: translateY(-22px) translateX(6px); }
            75% { transform: translateY(-5px) translateX(-8px); }
            100% { transform: translateY(0px) translateX(0px); }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ── Main ServiceDetail page ── */
export default function ServiceDetail() {
  const { slug }              = useParams();
  const navigate              = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [vis, setVis]         = useState(false);

  const svc = SERVICES_DATA.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, [slug]);

  if (!svc) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-400" style={{ background: '#020b18' }}>
        <p className="text-lg mb-4">Service not found.</p>
        <button onClick={() => navigate('/')} className="px-6 py-2 rounded-full text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(90deg,#0ea5e9,#6366f1)' }}>
          Go Home
        </button>
      </div>
    );
  }

  const c  = svc.color;
  const gF = svc.gradientFrom;
  const gT = svc.gradientTo;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg,#020b18 0%,#041428 60%,#020b18 100%)' }}>

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden pt-24 pb-16 px-6 md:px-10"
        style={{ borderBottom: `1px solid ${c}18` }}>

        {/* Grid pattern tinted with service color */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `linear-gradient(${c}0a 1px,transparent 1px),linear-gradient(90deg,${c}0a 1px,transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />

        {/* Glow blob — service color */}
        <div className="absolute top-[-20%] right-[10%] w-[500px] h-[500px] rounded-full z-0 pointer-events-none"
          style={{ background: `radial-gradient(circle,${c}1a 0%,transparent 70%)` }} />

        <div className="relative z-10 max-w-[1100px] mx-auto">
          {/* Back button */}
          <button onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-lg mb-8 transition-colors"
            style={{
              color: 'rgba(148,163,184,1)',
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateX(0)' : 'translateX(-16px)',
              transition: 'all 0.5s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = c}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(148,163,184,1)'}
          >
            <ArrowLeft size={16} /> Back to Services
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Icon badge */}
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${c}18`,
                border: `1px solid ${c}40`,
                opacity: vis ? 1 : 0,
                transform: vis ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 0.6s cubic-bezier(.22,.68,0,1.2)',
              }}>
              <img src={svc.icon} alt={svc.title} className="w-10 h-10 object-contain" />
            </div>

            <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.6s 0.1s ease' }}>
              {/* Tag pill */}
              <span className="inline-block text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                style={{ background: `${c}18`, border: `1px solid ${c}35`, color: c }}>
                {svc.tag}
              </span>

              <h1 className="font-extrabold text-[#f0f9ff] mb-3 leading-tight"
                style={{ fontSize: 'clamp(26px,4vw,46px)', fontFamily: "'Syne', sans-serif" }}>
                {svc.title}
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">{svc.hero}</p>
            </div>
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-2 mt-8"
            style={{ opacity: vis ? 1 : 0, transition: 'all 0.6s 0.2s ease' }}>
            {svc.pills.map(p => (
              <span key={p} className="text-sm px-3 py-1.5 rounded-full font-medium"
                style={{ background: `${c}12`, border: `1px solid ${c}30`, color: c }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16">

        {/* Features */}
        <div className="mb-20">
          <SectionLabel color={c}>What's included</SectionLabel>
          <h2 className="font-bold text-[#f0f9ff] mb-10"
            style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontFamily: "'Syne', sans-serif" }}>
            Everything you need to{' '}
            <GradientText from={gF} to={gT}>succeed</GradientText>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {svc.features.map((f, i) => (
              <FeatureCard key={f.title} feature={f} color={c} gradientFrom={gF} gradientTo={gT} index={i} />
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <SectionLabel color={c}>How we work</SectionLabel>
          <h2 className="font-bold text-[#f0f9ff] mb-10"
            style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontFamily: "'Syne', sans-serif" }}>
            Our <GradientText from={gF} to={gT}>Process</GradientText>
          </h2>
          <div className="flex flex-col gap-4">
            {svc.process.map((p, i) => (
              <ProcessStep key={p.step} step={p} color={c} gradientFrom={gF} gradientTo={gT} last={i === svc.process.length - 1} />
            ))}
          </div>
        </div>

        {/* Tech Bubbles */}
        <div className="mb-20">
          <SectionLabel color={c}>Tech Stack</SectionLabel>
          <h2 className="font-bold text-[#f0f9ff] mb-8"
            style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontFamily: "'Syne', sans-serif" }}>
            Technologies <GradientText from={gF} to={gT}>We Use</GradientText>
          </h2>
          <TechBubbles techs={svc.techStack} svcColor={c} gradientTo={gT} />
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <SectionLabel color={c}>FAQ</SectionLabel>
          <h2 className="font-bold text-[#f0f9ff] mb-8"
            style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontFamily: "'Syne', sans-serif" }}>
            Common <GradientText from={gF} to={gT}>Questions</GradientText>
          </h2>
          <div className="flex flex-col gap-3">
            {svc.faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background:  openFaq === i ? `${c}0a` : 'rgba(255,255,255,0.02)',
                  border:      openFaq === i ? `1px solid ${c}35` : 'rgba(255,255,255,0.06) solid 1px',
                  transition:  'all 0.3s ease',
                }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between px-6 py-4">
                  <p className="text-sm font-semibold text-[#f0f9ff]">{faq.q}</p>
                  {openFaq === i
                    ? <ChevronUp size={16} style={{ color: c, flexShrink: 0 }} />
                    : <ChevronDown size={16} className="text-slate-500 flex-shrink-0" />}
                </div>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-2xl py-14 px-8"
          style={{ background: `${c}08`, border: `1px solid ${c}20` }}>
          <h3 className="font-extrabold text-[#f0f9ff] mb-3"
            style={{ fontSize: 'clamp(20px,2.5vw,30px)', fontFamily: "'Syne', sans-serif" }}>
            Ready to start your project?
          </h3>
          <p className="text-slate-300 text-sm mb-8 max-w-md mx-auto">
            Let's talk about how we can help you build something amazing.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/"
              className="px-8 py-3 rounded-full text-sm font-semibold transition-all hover:bg-white/5"
              style={{ border: `1px solid ${c}44`, color: c }}>
              ← View All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helper components ── */
function SectionLabel({ children, color }) {
  return (
    <p className="text-[11px] text-lg tracking-[0.25em] uppercase font-medium mb-2" style={{ color }}>
      {children}
    </p>
  );
}

function GradientText({ children, from, to }) {
  return (
    <span style={{ background: `linear-gradient(90deg,${from},${to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      {children}
    </span>
  );
}

function FeatureCard({ feature, color, gradientFrom, gradientTo }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative rounded-2xl p-6 overflow-hidden"
      style={{
        background:  hov ? `${color}0a` : 'rgba(255,255,255,0.02)',
        border:      hov ? `1px solid ${color}40` : '1px solid rgba(255,255,255,0.06)',
        transition:  'all 0.3s cubic-bezier(.22,.68,0,1.2)',
        transform:   hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow:   hov ? `0 12px 32px ${color}15` : 'none',
      }}
    >
      {/* Bottom shimmer — service gradient */}
      <div className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
        style={{
          width:      hov ? '100%' : '0%',
          background: `linear-gradient(90deg,${gradientFrom},${gradientTo})`,
          transition: 'width 0.4s ease',
        }}
      />
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={18} style={{ color, flexShrink: 0, marginTop: '2px' }} />
        <h4 className="text-sm font-bold text-[#f0f9ff]" style={{ fontFamily: "'Syne', sans-serif" }}>
          {feature.title}
        </h4>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed pl-7">{feature.desc}</p>
    </div>
  );
}

function ProcessStep({ step, color, gradientFrom, gradientTo, last }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background: `linear-gradient(135deg,${gradientFrom}22,${gradientTo}22)`,
            border:     `1px solid ${color}44`,
            color,
          }}>
          {step.step}
        </div>
        {!last && (
          <div className="w-px flex-1 mt-1"
            style={{ background: `linear-gradient(180deg,${color}33,transparent)`, minHeight: '28px' }} />
        )}
      </div>
      <div className="pb-6 pt-1.5">
        <h4 className="text-sm font-bold text-[#f0f9ff] mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
          {step.title}
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}