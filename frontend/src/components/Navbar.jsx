import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", to: "/", id: "home" },
  { label: "How it Works", to: "/#how", id: "how", hash: true },
  { label: "Try Detector", to: "/detector", id: "detector" },
  { label: "Contact", to: "/#contact", id: "contact", hash: true },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e, link) => {
    setOpen(false);
    if (link.hash) {
      e.preventDefault();
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(link.id);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      } else {
        const el = document.getElementById(link.id);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (link.id === "home") {
      e.preventDefault();
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      data-testid="main-navbar"
      className="sticky top-0 z-50 bg-[#F7F5F0]/85 backdrop-blur-xl border-b border-black/15"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          data-testid="navbar-logo"
          className="flex items-center gap-3 group"
          onClick={handleLogoClick}
        >
          <span className="w-8 h-8 bg-[#111] text-[#F7F5F0] flex items-center justify-center font-display font-bold text-lg group-hover:bg-[#E63946] transition-colors">
            V
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            Vision<span className="text-[#E63946]">.</span>Gesture
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              data-testid={`navbar-${link.id}-link`}
              onClick={(e) => handleClick(e, link)}
              className="text-xs uppercase tracking-[0.18em] font-semibold text-[#111] hover:text-[#E63946] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/detector"
          data-testid="navbar-launch-button"
          className="hidden md:inline-flex items-center gap-2 bg-[#111] text-[#F7F5F0] px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#E63946] transition-colors"
        >
          Launch
        </Link>

        <button
          data-testid="navbar-mobile-toggle"
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/15 bg-[#F7F5F0]">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                data-testid={`navbar-mobile-${link.id}-link`}
                onClick={(e) => handleClick(e, link)}
                className="text-sm uppercase tracking-[0.18em] font-semibold text-[#111] hover:text-[#E63946]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/detector"
              data-testid="navbar-mobile-launch-button"
              onClick={() => setOpen(false)}
              className="bg-[#111] text-[#F7F5F0] px-5 py-3 text-xs uppercase tracking-[0.18em] font-semibold text-center"
            >
              Launch App
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;