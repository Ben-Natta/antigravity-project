import { Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="Esther Clinic Logo"
                className="h-14 w-14 rounded-full object-cover ring-1 ring-gray-100"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Esther Clinic</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Aesthetic Surgery</p>
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed text-sm">
              แห่งแรกและแห่งเดียวในชัยภูมิที่ลูกค้าวางใจ ยกระดับความงามด้วยมาตรฐานโรงพยาบาล โดยหมอเบียร์และทีมแพทย์ผู้เชี่ยวชาญ
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900 text-lg">เมนูลัด</h4>
            <ul className="space-y-4">
              {[
                { label: "หน้าแรก", href: "/" },
                { label: "บริการของเรา", href: "/services" },
                { label: "ข่าวสาร", href: "/news" },
                { label: "ติดต่อเรา", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-gray-500 hover:text-primary transition-colors text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900 text-lg">ติดต่อเรา</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  123 ถ.มิตรภาพ ต.ในเมือง <br />
                  อ.เมือง จ.นครราชสีมา 30000
                </span>
              </li>
              <li>
                <a href="tel:099-454-5664" className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>099-454-5664</span>
                </a>
              </li>
              <li>
                <a href="https://line.me/ti/p/@estherkorat" target="_blank" className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>@estherkorat</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900 text-lg">เวลาทำการ</h4>
            <div className="flex items-start gap-3 text-sm text-gray-500 bg-gray-50 p-4 rounded-2xl">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 mb-1">จันทร์ - เสาร์</p>
                <p className="mb-2">10.00 - 20.00 น.</p>
                <p className="font-medium text-gray-900 mb-1">อาทิตย์</p>
                <p>หยุดทำการ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs text-center md:text-left">
            © 2026 Esther Clinic (Nakhon Ratchasima). All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <span className="sr-only">Facebook</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <span className="sr-only">Instagram</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
