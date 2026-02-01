import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>ไม่พบหน้านี้ | Esther Clinic</title>
        <meta name="description" content="ขออภัย ไม่พบหน้าที่คุณกำลังค้นหาที่ Esther Clinic" />
      </Helmet>
      <Navbar />

      <section className="flex-grow flex items-center justify-center py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-pink-700 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ไม่พบหน้านี้
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            ขออภัย หน้าที่คุณกำลังค้นหาไม่มีอยู่ หรืออาจถูกลบไปแล้ว
          </p>
          <Link href="/">
            <a className="inline-flex items-center gap-2 bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              <ChevronLeft className="w-5 h-5" />
              กลับไปหน้าแรก
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
