import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { X, Menu } from "lucide-react";
import logo from "../assets/Maqwine-Logo.png";

const NAV_LINKS = [
  { label: "Home",         to: "/",        },
  { label: "About Us",     to: "/about",     },
  { label: "Services",     to: "/services",   },
  { label: "Technologies", to: "/technologies", },
  { label: "Portfolio",    to: "/portfolio",    },
  { label: "Contact",      to: "/contact",    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={
          "fixed top-0 left-0 right-0 z-[60] h-[64px] transition-all duration-300 " +
          (scrolled
            ? "bg-[#020b18]/90 backdrop-blur-md border-b border-blue-400/10 shadow-lg"
            : "bg-[#020b18]")
        }
      >
        <div className="h-full max-w-[1200px] mx-auto px-4 md:px-10 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="z-[70]">
            <img src={logo} alt="Maqwine Logo" className="h-[40px] md:h-[50px]" />
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={
                    "px-4 py-2 rounded-full text-sm " +
                    (location.pathname === link.to
                      ? "text-blue-400 bg-blue-400/10"
                      : "text-slate-300 hover:text-white")
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* MOBILE BUTTON */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 z-[70] text-blue-500 hover:text-blue-400"
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - Only show on mobile when open */}
      {menuOpen && (
        <>
          {/* BACKDROP */}
          <div 
            className="fixed inset-0 z-[49] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
          />
          
          {/* DRAWER */}
          <div className={`fixed top-[64px] bottom-0 left-0 w-80 z-[50] bg-[#020b18] shadow-2xl md:hidden transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full p-8 gap-6 pt-8">
              
              <nav className="flex-1 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    className={
                      "py-3 px-6 rounded-xl text-lg font-medium transition-all " +
                      (location.pathname === link.to
                        ? "text-blue-400 bg-blue-400/20 shadow-lg scale-105"
                        : "text-slate-300 hover:text-white hover:bg-slate-700 hover:shadow-lg hover:scale-[1.02]")
                    }
                  >
                    {link.emoji ? <span className="mr-3">{link.emoji}</span> : null}
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
