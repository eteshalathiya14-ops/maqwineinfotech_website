import React, { useState, useEffect, useRef } from "react";

const techData = {
  Web: [
    { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "cyan" },
    { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "yellow" },
    { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "orange" },
    { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "blue" },
    { name: "Vue.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", color: "teal" },
    { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "blue" },
    { name: "Angular", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", color: "orange" },
    { name: "PHP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", color: "purple" },
    { name: "WordPress", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain-wordmark.svg", color: "dark" },
  ],
  App: [
    { name: "React Native", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "cyan" },
    { name: "Flutter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", color: "blue" },
    { name: "Android", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg", color: "green" },
    { name: "Swift", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", color: "orange" },
    { name: "Kotlin", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", color: "purple" },
    { name: "Dart", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", color: "blue" },
  ],
  Database: [
    { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "blue" },
    { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "teal" },
    { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "green" },
    { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", color: "orange" },
    { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "yellow" },
    { name: "MS SQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", color: "dark" },
  ],
  Cloud: [
    { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", color: "orange" },
    { name: "Azure", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", color: "blue" },
    { name: "Google Cloud", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", color: "teal" },
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "cyan" },
    { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", color: "purple" },
    { name: "DigitalOcean", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg", color: "green" },
  ],
  Design: [
    { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "purple" },
    { name: "Adobe XD", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg", color: "orange" },
    { name: "Photoshop", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg", color: "pink" },
    { name: "Illustrator", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg", color: "yellow" },
    { name: "Canva", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", color: "teal" },
    { name: "Sketch", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg", color: "blue" },
  ],
};

const orbStyleMap = {
  cyan: { bg: "radial-gradient(circle at 35% 35%, rgba(0,220,255,0.6) 0%, rgba(0,130,180,0.35) 50%, rgba(0,50,80,0.1) 80%, transparent 100%)", sh: "0 0 0 1.5px rgba(0,220,255,0.4), 0 0 28px rgba(0,200,255,0.18), inset 0 0 24px rgba(0,200,240,0.1)" },
  yellow: { bg: "radial-gradient(circle at 35% 35%, rgba(255,220,40,0.6) 0%, rgba(200,150,10,0.35) 50%, rgba(80,50,0,0.1) 80%, transparent 100%)", sh: "0 0 0 1.5px rgba(255,220,40,0.4), 0 0 28px rgba(255,200,0,0.18), inset 0 0 24px rgba(240,200,30,0.1)" },
  orange: { bg: "radial-gradient(circle at 35% 35%, rgba(255,140,40,0.6) 0%, rgba(200,80,20,0.35) 50%, rgba(80,20,0,0.1) 80%, transparent 100%)", sh: "0 0 0 1.5px rgba(255,140,40,0.4), 0 0 28px rgba(255,120,0,0.18), inset 0 0 24px rgba(240,120,30,0.1)" },
  purple: { bg: "radial-gradient(circle at 35% 35%, rgba(180,80,255,0.6) 0%, rgba(120,40,200,0.35) 50%, rgba(60,10,100,0.1) 80%, transparent 100%)", sh: "0 0 0 1.5px rgba(180,80,255,0.4), 0 0 28px rgba(160,60,255,0.18), inset 0 0 24px rgba(160,60,240,0.1)" },
  blue: { bg: "radial-gradient(circle at 35% 35%, rgba(60,150,255,0.6) 0%, rgba(30,80,200,0.35) 50%, rgba(10,30,100,0.1) 80%, transparent 100%)", sh: "0 0 0 1.5px rgba(60,150,255,0.4), 0 0 28px rgba(40,120,255,0.18), inset 0 0 24px rgba(40,120,240,0.1)" },
  green: { bg: "radial-gradient(circle at 35% 35%, rgba(80,220,80,0.55) 0%, rgba(40,140,40,0.3) 50%, rgba(10,60,10,0.1) 80%, transparent 100%)", sh: "0 0 0 1.5px rgba(80,220,80,0.35), 0 0 28px rgba(60,200,60,0.18), inset 0 0 24px rgba(60,200,60,0.1)" },
  teal: { bg: "radial-gradient(circle at 35% 35%, rgba(0,210,170,0.6) 0%, rgba(0,130,100,0.35) 50%, rgba(0,60,50,0.1) 80%, transparent 100%)", sh: "0 0 0 1.5px rgba(0,220,180,0.4), 0 0 28px rgba(0,200,160,0.18), inset 0 0 24px rgba(0,200,160,0.1)" },
  dark: { bg: "radial-gradient(circle at 35% 35%, rgba(140,140,180,0.5) 0%, rgba(70,70,120,0.3) 50%, rgba(20,20,50,0.1) 80%, transparent 100%)", sh: "0 0 0 1.5px rgba(160,160,200,0.3), 0 0 28px rgba(120,120,180,0.1), inset 0 0 24px rgba(100,100,150,0.08)" },
  pink: { bg: "radial-gradient(circle at 35% 35%, rgba(255,100,180,0.6) 0%, rgba(200,50,130,0.35) 50%, rgba(80,10,50,0.1) 80%, transparent 100%)", sh: "0 0 0 1.5px rgba(255,100,180,0.4), 0 0 28px rgba(240,80,160,0.18), inset 0 0 24px rgba(240,80,160,0.1)" },
};

function Technologies() {
  const [active, setActive] = useState("Web");
  const [hovered, setHovered] = useState(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const techs = techData[active];
  const count = Math.min(techs.length, 9);

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

  // Responsive orb size (smaller on mobile)
  const orbSize = Math.min(90, Math.max(70, containerWidth * 0.18));

  // Wider spacing positions to prevent overlap
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
    1: [4],
    2: [1, 7],
    3: [1, 4, 7],
    4: [0, 2, 5, 8],
    5: [0, 1, 2, 5, 8],
    6: [0, 1, 2, 3, 4, 8],
    7: [0, 1, 2, 3, 4, 7, 8],
    8: [0, 1, 2, 3, 4, 5, 7, 8],
    9: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  };

  const subset = POS_SUBSETS[count] || POS_SUBSETS[9];

  return (
    <div id="technologies" className="w-full flex flex-col items-center bg-[#030712] overflow-hidden">

      {/* ── HEADING + SUBTITLE + TABS ── */}
      <div className="w-full flex flex-col items-center pt-16 pb-10 px-4 relative z-10">
        
        <h2 className="text-center font-black text-[clamp(36px,5vw,56px)] leading-tight mb-4 bg-white bg-clip-text text-transparent">
          Our Core{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Technologies
          </span>
        </h2>

        <p className="text-[clamp(15px,2vw,18px)] font-medium max-w-[580px] text-center mb-9 leading-relaxed text-slate-400">
          We leverage cutting-edge frameworks and tools to build scalable, high-performance digital solutions.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 p-[6px_10px] rounded-full bg-white/3 border border-white/10">
          {Object.keys(techData).map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActive(tab)} 
              className={`px-6 py-2 rounded-full border-none cursor-pointer text-sm font-semibold transition-all duration-300 font-['Segoe_UI',sans-serif] ${
                active === tab 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.45)]" 
                  : "text-slate-400 hover:text-white bg-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── ORBS SCENE ── */}
      <div ref={containerRef} className="w-full relative overflow-hidden h-[400px] sm:h-[500px] md:h-[620px] bg-[radial-gradient(ellipse_at_50%_25%,#0d1b3e_0%,#050b1a_55%,#000_100%)]">
        <div className="w-full h-full scale-[0.65] sm:scale-[0.85] md:scale-100 origin-center">

          {/* Stars */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1.5px_1.5px_at_7%_10%,rgba(255,255,255,0.8)_0%,transparent_100%),radial-gradient(1px_1px_at_18%_35%,rgba(255,255,255,0.5)_0%,transparent_100%),radial-gradient(1px_1px_at_35%_7%,rgba(255,255,255,0.65)_0%,transparent_100%),radial-gradient(1.5px_1.5px_at_50%_55%,rgba(255,255,255,0.45)_0%,transparent_100%),radial-gradient(1px_1px_at_65%_20%,rgba(255,255,255,0.75)_0%,transparent_100%),radial-gradient(1px_1px_at_80%_45%,rgba(255,255,255,0.5)_0%,transparent_100%),radial-gradient(1px_1px_at_12%_65%,rgba(255,255,255,0.6)_0%,transparent_100%),radial-gradient(1px_1px_at_88%_75%,rgba(255,255,255,0.45)_0%,transparent_100%),radial-gradient(2px_2px_at_30%_50%,rgba(255,255,255,0.85)_0%,transparent_100%),radial-gradient(1px_1px_at_72%_5%,rgba(255,255,255,0.65)_0%,transparent_100%),radial-gradient(1px_1px_at_44%_30%,rgba(255,255,255,0.4)_0%,transparent_100%),radial-gradient(1px_1px_at_60%_80%,rgba(255,255,255,0.5)_0%,transparent_100%),radial-gradient(1px_1px_at_92%_38%,rgba(255,255,255,0.55)_0%,transparent_100%),radial-gradient(1px_1px_at_3%_85%,rgba(255,255,255,0.4)_0%,transparent_100%),radial-gradient(1px_1px_at_75%_62%,rgba(255,255,255,0.45)_0%,transparent_100%),radial-gradient(1.5px_1.5px_at_55%_15%,rgba(200,220,255,0.7)_0%,transparent_100%),radial-gradient(1px_1px_at_22%_90%,rgba(255,255,255,0.35)_0%,transparent_100%),radial-gradient(1px_1px_at_48%_70%,rgba(255,255,255,0.4)_0%,transparent_100%)]" />

          {/* Ambient center glow */}

          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 whitespace-nowrap">
            <div className="text-xs font-bold tracking-widest uppercase text-cyan-300/65 mb-[10px] font-['Segoe_UI',sans-serif]">Stack</div>
            <h3 className="font-black text-[clamp(22px,3vw,36px)] text-white drop-shadow-[0_0_20px_rgba(80,160,255,0.5)] leading-tight">
              Our <span className="text-cyan-400">{active}</span><br />Technologies
            </h3>
          </div>

          {/* Orbs */}
          {techs.slice(0, 9).map((tech, i) => {
            const posIdx = subset[i];
            const pos = POS_9[posIdx];
            const isHov = hovered === `${active}-${i}`;
            const cs = orbStyleMap[tech.color];

            return (
              <div
                key={`${active}-${i}`}
                onMouseEnter={() => setHovered(`${active}-${i}`)}
                onMouseLeave={() => setHovered(null)}

                className="absolute flex flex-col items-center justify-center cursor-pointer rounded-full"
                style={{
                  width: orbSize, height: orbSize,
                  left: pos.left, top: pos.top,
                  background: cs.bg,
                  boxShadow: cs.sh,
                  animation: `floatOrb ${["7s", "8.5s", "7.5s", "9s", "6.5s", "8s", "9.5s", "7s", "8s"][i % 9]} linear ${["0s", "-2s", "-4s", "-1s", "-3s", "-5s", "-2.5s", "-6s", "-3.5s"][i % 9]} infinite`,
                  transform: isHov ? "scale(1.2)" : "scale(1)",
                  transition: "transform 0.3s ease",
                  zIndex: isHov ? 30 : 2,
                }}
              >
                {/* Glare */}
                <div className="absolute top-[12%] left-[15%] w-[34%] h-[24%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.06)_70%,transparent_100%)] pointer-events-none" />

                <img
                  src={tech.url}
                  alt={tech.name}
                  className="w-[50%] h-[50%] object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] transition-transform duration-300"
                  style={{ transform: isHov ? "scale(1.1)" : "scale(1)" }}
                />

                <div className="font-['Segoe_UI',sans-serif] text-xs font-bold text-white mt-1.5 text-center leading-tight pointer-events-none drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)] max-w-[88%]">
                  {tech.name}
                </div>
              </div>
            );
          })}

          <style>{`
            @keyframes floatOrb {
              0% { transform: translateY(0px) translateX(0px); }
              15% { transform: translateY(-16px) translateX(8px); }
              35% { transform: translateY(-6px) translateX(-8px); }
              55% { transform: translateY(-18px) translateX(4px); }
              75% { transform: translateY(-4px) translateX(-6px); }
              100% { transform: translateY(0px) translateX(0px); }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

export default Technologies;
