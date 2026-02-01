import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "หน้าแรก", href: "/" },
    { label: "บริการของเรา", href: "/services" },
    { label: "ข่าวสาร", href: "/news" },
    { label: "ติดต่อเรา", href: "/contact" },
  ];

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-2" : "bg-white py-4 border-b border-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <img
                src="/images/logo.jpg"
                alt="Esther Clinic Logo"
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all"
              />
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight leading-none group-hover:text-primary transition-colors">
                  Esther Clinic
                </h1>
                <span className="text-[10px] md:text-xs text-muted-foreground tracking-wide">
                  สาขา นครราชสีมา
                </span>
              </div>
            </a>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${location === item.href
                      ? "text-primary bg-primary/5"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:099-454-5664" className="text-sm font-medium text-gray-600 hover:text-primary flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">099-454-5664</span>
            </a>
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                จองคิว / ปรึกษาฟรี
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors ${location === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-50"
                    }`}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <Link href="/contact">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg shadow-md"
                onClick={handleLinkClick}
              >
                จองคิว / ปรึกษาฟรี
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
