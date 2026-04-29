import { useState, useEffect, useRef } from 'react';
import { Eye, GitBranch } from 'lucide-react';
import abn from '../assets/abn.png';
import kaaryabook from '../assets/kaaryabook.png';
import mindhealer from '../assets/mindhealer.png';
import naturi from '../assets/nutri.png';
import rudraenterprise from '../assets/rudraenterprise.png';
import webkaaryabook from '../assets/webkaaryabook.png';
const PROJECTS = [
  {
    id: 1,
    title: 'Nutri Couture',
    desc: 'Nutri Couture fits seamlessly into your life! From quick breakfast solutions and healthy kid snacks to satisfying mid-day cravings and thoughtful gifts, we cover every need.',
    category: 'web',
    image: naturi,
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    live: 'https://nutricouture.in/',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 2,
    title: 'ABN (Ahir Business Network)',
    desc: 'ABN Networking Mobile App is an exclusive business networking platform designed for members of the Ahir Business Network (ABN) community. It connects Ahir entrepreneurs, professionals, and business owners on a single platform to collaborate, grow, and build strong business relationships',
    category: 'mobile',
    image: abn,
    tech: ['Flutter', 'Dart', 'C++','cMake','Swift','C','Ruby'],
    live: 'https://play.google.com/store/apps/details?id=com.app.abn',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 3,
    title: 'KaaryaBook Website',
    desc: 'Streamline Your Business with KaaryaBook Complete Inventory & Order Management Manage products, orders, expenses, and reports effortlessly. No more manual tracking – everything in one intuitive dashboard..',
    category: 'web',
    image: webkaaryabook,
    tech: ['Node.js', 'MongoDB', 'React.js'],
    live: 'https://kaaryabook.com/',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 4,
    title: 'KaaryaBook Billing & Inventory',
    desc: 'KaaryaBook is an all-in-one business management app designed to help small and growing businesses manage their daily operations easily. From billing and inventory management to order tracking, HRMS, analytics, and business reports — KaaryaBook provides everything you need to run your business smoothly in one simple app.',
    category: 'mobile',
    image: kaaryabook,
    tech: ['Flutter', 'Dart', 'C++','cMake','Swift','C','Ruby'],
    live: 'https://play.google.com/store/apps/details?id=com.app.kaaryabook',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 5,
    title: 'Rudra Enterprise',
    desc: 'A modern, responsive website design created for a security solutions company offering CCTV, biometric systems, fire alarms, and networking services. The design focuses on a clean dark theme, clear service categorization, and strong call-to-action elements.',
    category: 'web',
    image: rudraenterprise,
    tech: ['Next.js', 'TensorFlow', 'Chart.js', 'Supabase'],
    live: 'https://rudraenter.com/',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 6,
    title: 'The Mind Healer',
    desc: 'The Mind Healer is your all-in-one guide to mastering energy healing and spiritual transformation. Move beyond simple meditation with advanced courses like Money Reiki, Advanced Chakra Healing, and Hooponopono — each designed to help you clear blockages, attract abundance, and restore inner harmony',
    category: 'mobile',
    image: mindhealer,
    tech: ['Flutter', 'Dart', 'C++','cMake','Swift','C','Ruby'],
    live: 'https://play.google.com/store/apps/details?id=com.app.themindhealer',
    gradient: 'from-purple-500 to-violet-600'
  }
];

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

export default function Portfolio() {
  const [secRef, secVis] = useVisible(0.1);
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 px-6 md:px-10 overflow-hidden" style={{ background: 'linear-gradient(180deg,#030712 0%,#020b18 100%)' }}>
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div ref={secRef} className="text-center mb-20">
          <div className="text-center text-base tracking-[0.25em] uppercase text-blue-400 font-medium mb-1.5 ">
            Projects We're Proud Of
          </div>
          <h2 className="font-extrabold text-[#f0f9ff] mb-4" style={{ fontSize: 'clamp(28px,4vw,44px)', fontFamily: "'Syne', sans-serif" }}>
           Our Latest{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400  bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-center text-gray-400 text-sm md:text-lg font-medium max-w-1xl mx-auto mb-12">
            Handpicked projects showcasing our expertise in modern web & mobile development.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-md mx-auto">
          {['all', 'web', 'mobile'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filter === cat ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)] scale-105' : 'text-slate-400 border border-slate-700/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_12px_rgba(14,165,233,0.2)]'}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={secVis} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 pt-20 pb-12 px-8 md:px-12 rounded-3xl mx-4 md:mx-12 lg:mx-20 backdrop-blur-xl" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)), rgba(14,165,233,0.06)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-extrabold text-[#f0f9ff] mb-6" style={{ fontSize: 'clamp(24px,3.5vw,36px)', fontFamily: "'Syne', sans-serif" }}>
              Loved Our Work?{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Let&apos;s Build Yours
              </span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto">
              Ready to transform your ideas into reality? Get in touch for custom mobile apps, websites, 
              and digital solutions tailored to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-2xl text-white text-sm font-bold shadow-[0_8px_32px_rgba(14,165,233,0.4)] hover:shadow-[0_12px_40px_rgba(14,165,233,0.5)] hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
                style={{ background: 'linear-gradient(90deg,#0ea5e9,#6366f1)' }}
              >
                 Get Free Quote
              </a>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes cardSlide {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-slide-0 { animation: cardSlide 0.6s 0.1s ease both; }
        .card-slide-1 { animation: cardSlide 0.6s 0.2s ease both; }
        .card-slide-2 { animation: cardSlide 0.6s 0.3s ease both; }
        .card-slide-3 { animation: cardSlide 0.6s 0.4s ease both; }
        .card-slide-4 { animation: cardSlide 0.6s 0.5s ease both; }
        .card-slide-5 { animation: cardSlide 0.6s 0.6s ease both; }
      `}</style>
    </section>
  );
}

function ProjectCard({ project, index, visible }) {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl ${visible ? `card-slide-${index}` : ''}`}
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
        border: '1px solid rgba(14,165,233,0.15)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 scale-110" style={{ transformOrigin: 'center' }} />
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-xl font-bold text-[#f0f9ff] mb-2 group-hover:text-blue-400 transition-colors duration-300" style={{ fontFamily: "'Syne', sans-serif" }}>
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 mb-4 leading-relaxed line-clamp-3">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-semibold border border-slate-600/50 text-slate-300 hover:bg-slate-800 hover:border-slate-500 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ✅ FIXED: z-10 + relative so it stays above all absolute glow layers */}
        <div className="flex gap-4 relative z-10">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); window.open(project.live, '_blank'); }}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm p-3 rounded-xl border border-cyan-400/30 hover:bg-cyan-400/10 transition-all duration-300"
          >
            <Eye size={16} />
            Live Demo
          </a>
        </div>
      </div>

      {/* pointer-events-none so glow divs never block clicks */}
      <div className="pointer-events-none absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
      <div className="pointer-events-none absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
    </div>
  );
}