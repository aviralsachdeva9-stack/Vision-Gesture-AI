import { Github, Instagram, Linkedin, Mail } from "lucide-react";

const socials = [
  { icon: Mail, label: "email", href: "mailto:aviralsachdeva9@gmail.com" },
  { icon: Github, label: "github", href: "https://github.com/aviralsachdeva9-stack" },
  { icon: Linkedin, label: "linkedin", href: "https://www.linkedin.com/in/aviral-sachdeva-202289265/" },
  { icon: Instagram, label: "instagram", href: "https://www.instagram.com/avinotreal_" },
];

export const Footer = () => {
  return (
    <footer
      data-testid="main-footer"
      className="border-t border-black/15 bg-[#F7F5F0] relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <h3 className="font-display font-bold text-4xl md:text-5xl tracking-tighter leading-none">
            Vision<span className="text-[#E63946]">.</span>Gesture
          </h3>
          <p className="mt-4 text-sm text-[#555] max-w-sm leading-relaxed">
            Bridging human intent and machine action through real-time computer
            vision.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-[#111]">
            Navigate
          </p>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#E63946]">Home</a></li>
            <li><a href="/#how" className="hover:text-[#E63946]">How it Works</a></li>
            <li><a href="/detector" className="hover:text-[#E63946]">Try Detector</a></li>
            <li><a href="/#contact" className="hover:text-[#E63946]">Contact</a></li>
          </ul>
        </div>

        <div className="md:col-span-4" id="contact">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-[#111]">
            Contact
          </p>
          <a href="mailto:aviralsachdeva9@gmail.com" className="text-sm text-[#555] hover:text-[#E63946] transition-colors">aviralsachdeva9@gmail.com</a>
          <div className="flex gap-3 mt-6">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                data-testid={`footer-social-${label}`}
                aria-label={label}
                className="w-10 h-10 border border-[#111] flex items-center justify-center hover:bg-[#111] hover:text-[#F7F5F0] transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-mono-data text-xs text-[#555]">
            © {new Date().getFullYear()} Vision Gesture AI — All rights reserved.
          </p>
          <p className="font-mono-data text-xs text-[#555] uppercase tracking-widest">
            Built with Python · TensorFlow · OpenCV · React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;