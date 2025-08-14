import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin } from "lucide-react";


const menuLinks = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/features" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];



const Footer = () => {
  return (
    <footer className="bg-[#E1E9C9] text-[#455945] border-t border-gray-300 shadow-inner mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
        
        {/* Brand / About */}
        <div>
          <h3 className="text-xl font-bold mb-3">ALGOSLOG</h3>
          
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {menuLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="hover:underline hover:text-[#2f3e32] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get Started / Social */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Get Started</h4>
          <Link
            to="/get-started"
            className="inline-block border border-[#455945] rounded-full px-5 py-2 text-[#455945] hover:bg-[#455945] hover:text-white transition-colors"
          >
            Start Now
          </Link>

          <div className="mt-5">
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-4 text-xl">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-blue-500 transition-colors"
              >
                <Twitter size={22} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="hover:text-gray-800 transition-colors"
              >
                <Github size={22} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-blue-700 transition-colors"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-[#d6dfb8] text-sm text-center py-4 border-t border-gray-300">
        © {new Date().getFullYear()} ALGOSLOG. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
