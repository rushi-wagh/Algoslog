import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import LogoutButton from "./LogoutButton";

const authLinks = [
  { label: "Home", to: "/" },
  { label: "Problems", to: "/problems" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
];

const guestLinks = [
  { label: "Login", to: "/login" },
  { label: "Problems", to: "/problems" },
  { label: "About", to: "/about" },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { authUser } = useAuthStore();

  const isLoggedIn =
    authUser && typeof authUser === "object" && Object.keys(authUser).length > 0;

  const menuLinks = isLoggedIn ? authLinks : guestLinks;

  return (
    <header className="relative z-50 bg-[#FEFDFB] text-gray-700">
      <nav className="navbar px-4 md:px-12 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold tracking-wide text-gray-700"
        >
          ALGOSLOG
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5">
          {menuLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="transition-colors rounded-xl px-3 py-2 text-gray-700"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoggedIn && (
            <div className="border border-solid border-red-700 rounded-3xl">
              <Link
                to="/get-started"
                className="rounded-full px-5 py-2 text-red-700 hover:bg-red-700 hover:text-white transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <>
              <LogoutButton className="rounded-full px-5 py-2 text-red-700 hover:bg-red-700 hover:text-white transition-colors">
                Logout
              </LogoutButton>

              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar flex flex-row"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        authUser?.image ||
                        "https://avatar.iran.liara.run/public/boy"
                      }
                      alt="User Avatar"
                      className="object-cover"
                    />
                  </div>
                </label>
              </div>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen((s) => !s)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="p-1 text-gray-700"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[80%] max-w-xs bg-[#0F2740] text-[#E6EEF6] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            ALGOSLOG
          </Link>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-3 px-5">
          {menuLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="rounded-md px-3 py-2 hover:bg-[#13283f]"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/get-started"
            className="mt-3 text-center rounded-full px-5 py-2 text-white"
            style={{
              backgroundImage: "linear-gradient(90deg,#3B82F6,#7C8CFF)",
            }}
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
