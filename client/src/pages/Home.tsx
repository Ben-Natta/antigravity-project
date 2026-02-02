import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Star, ShieldCheck, HeartPulse, UserCheck,
  MapPin, Phone, MessageCircle, Check, Stethoscope, Sparkles, Calendar, Tag
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";
import type { News, Category } from "@shared/schema";

export default function Home() {
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [newsRes, catsRes] = await Promise.all([
          fetch("/api/news"),
          fetch("/api/categories")
        ]);
        if (newsRes.ok && catsRes.ok) {
          const newsData = await newsRes.json();
          const catsData = await catsRes.json();
          setLatestNews(newsData.slice(0, 6));
          setCategories(catsData);
        }
      } catch (error) {
        console.error("Failed to fetch latest news:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-kanit overflow-x-hidden">
      <Helmet>
        <title>Esther Clinic | สวย ครบ จบที่เดียว ชัยภูมิ-โคราช</title>
        <meta name="description" content="เอสเธอร์ คลินิก (Esther Clinic) บริการศัลยกรรมความงาม งานละเอียด ปลอดภัย มาตรฐานโรงพยาบาล โดยหมอเบียร์และทีมแพทย์ผู้เชี่ยวชาญ" />
        <meta property="og:title" content="Esther Clinic | สวย ครบ จบที่เดียว ชัยภูมิ-โคราช" />
        <meta property="og:description" content="เอสเธอร์ คลินิก บริการศัลยกรรมความงาม งานละเอียด ปลอดภัย มาตรฐานโรงพยาบาล" />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative w-full h-[600px] lg:h-[700px] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gray-50 flex">
            <div className="w-full lg:w-1/2 bg-white hidden lg:block"></div>
            <div className="w-full lg:w-1/2 relative h-full">
              <img
                src="/images/1200x1200.jpg"
                alt="Esther Clinic Luxury Interior"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/90 lg:to-transparent"></div>
            </div>
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-2xl bg-white/80 lg:bg-transparent p-6 rounded-3xl backdrop-blur-sm lg:backdrop-blur-none">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 tracking-wide uppercase">
              Premium Aesthetic Clinic
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Esther Clinic <br />
              <span className="text-primary">สวย ครบ จบที่เดียว</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 font-light leading-relaxed max-w-lg">
              แห่งแรกและแห่งเดียวในชัยภูมิที่ลูกค้าวางใจ มาตรฐานระดับโรงพยาบาล ดูแลโดยหมอเบียร์และทีมแพทย์ผู้เชี่ยวชาญ
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-white text-lg shadow-xl shadow-primary/30 transition-all hover:scale-105">
                  จองคิวปรึกษา
                </Button>
              </Link>
              <a href="https://line.me/ti/p/@estherkorat" target="_blank" className="h-12 px-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-lg flex items-center justify-center transition-all">
                ปรึกษาฟรี Line
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex flex-col items-center md:items-start px-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">มาตรฐานโรงพยาบาล</h3>
              <p className="text-gray-500 text-sm">เครื่องมือและห้องผ่าตัดปลอดเชื้อ ได้มาตรฐานระดับสากล ปลอดภัย 100%</p>
            </div>
            <div className="flex flex-col items-center md:items-start px-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">ดูแลโดยแพทย์ผู้เชี่ยวชาญ</h3>
              <p className="text-gray-500 text-sm">หมอเบียร์ดูแลเองทุกเคส ให้คำปรึกษาตรงจุด ไม่เลี้ยงไข้</p>
            </div>
            <div className="flex flex-col items-center md:items-start px-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">ติดตามผลหลังทำ</h3>
              <p className="text-gray-500 text-sm">บริการหลังการขายยอดเยี่ยม มีทีมงานคอยดูแลและให้คำปรึกษาตลอด 24 ชม.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3.1 Surgery Feature Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="/images/1200x1200.jpg" alt="Surgery" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-primary font-bold flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" /> Surgery
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                ศัลยกรรมความงาม <br />
                <span className="text-primary">งานละเอียด ปลอดภัย</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                บริการศัลยกรรมครบวงจร ไม่ว่าจะเป็นเสริมจมูก เสริมคาง ตาสองชั้น หรือปรับรูปหน้า ด้วยเทคนิคเฉพาะของหมอเบียร์ที่เน้นความเป็นธรรมชาติ บวมช้ำน้อย และพักฟื้นไว เราให้ความสำคัญกับการวิเคราะห์โครงหน้าแบบเคสต่อเคส
              </p>
              <ul className="space-y-4 mb-8">
                {["ห้องผ่าตัดมาตรฐานโรงพยาบาล", "ซิลิโคนเกรดพรีเมียม นิ่ม บิดได้", "รับประกันผลงาน ดูแลจนกว่าจะสวย"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                      <Check className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services">
                <Button className="rounded-full px-8 h-12 bg-white border border-gray-200 text-gray-900 hover:border-primary hover:text-primary transition-all shadow-sm">
                  ดูรายการศัลยกรรมทั้งหมด <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3.2 Skin & Aesthetics Feature Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="w-16 h-16 bg-[#FFCAD4] rounded-2xl flex items-center justify-center text-[#E05C7A] mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                หัตถการ & ผิวพรรณ <br />
                <span className="text-primary">ย้อนวัย ผิวใสสุขภาพดี</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                ฟื้นฟูผิวให้กลับมาสดใส เปล่งปลั่ง ด้วยโปรแกรมดูแลผิวพรรณที่หลากหลาย ทั้งเลเซอร์ โบท็อกซ์ ฟิลเลอร์ และร้อยไหม คัดสรรตัวยาแท้ ผ่าน อย. ทุกกล่อง เพื่อผลลัพธ์ที่ชัดเจนและความปลอดภัยสูงสุด
              </p>
              <ul className="space-y-4 mb-8">
                {["ตัวยาแท้ แกะกล่องให้ดูต่อหน้า", "เครื่องมือเลเซอร์รุ่นใหม่ล่าสุด", "มือเบา ไม่เจ็บ เห็นผลจริง"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                      <Check className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services">
                <Button className="rounded-full px-8 h-12 bg-white border border-gray-200 text-gray-900 hover:border-primary hover:text-primary transition-all shadow-sm">
                  ดูโปรแกรมผิวพรรณทั้งหมด <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="/images/1200x1200.jpg" alt="Skin Care" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-primary font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Aesthetics
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Doctor Profile */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl bg-white relative z-10 mx-auto max-w-md">
                <img src="/images/1200x1200.jpg" alt="Doctor Beer" className="w-full h-full object-cover" />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 left-0 lg:-left-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10"></div>
              <div className="absolute bottom-10 right-0 lg:-right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            </div>

            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Doctor Profile</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">หมอเบียร์ (Dr. Beer)</h2>
              <p className="text-xl text-primary font-medium mb-6">แพทย์ผู้เชี่ยวชาญด้านศัลยกรรมความงามและปรับรูปหน้า</p>

              <div className="space-y-4 mb-8 text-gray-600">
                <p>
                  "หมอใส่ใจในรายละเอียดทุกเคส วิเคราะห์โครงหน้าตามหลักโหงวเฮ้งและความสวยงามที่สมส่วน เพื่อให้ผลลัพธ์ออกมาเป็นธรรมชาติและเป็นตัวเองในเวอร์ชันที่ดีที่สุด"
                </p>
                <div className="grid grid-cols-1 gap-3 text-left pl-4 border-l-4 border-primary/30">
                  <p className="font-bold text-gray-900">Education & Certification</p>
                  <p className="text-sm">แพทยศาสตรบัณฑิต (The Doctor of Medicine)</p>
                  <p className="text-sm">Certificate of Aesthetic Medicine</p>
                  <p className="text-sm">Certificate of Advanced Rhinoplasty</p>
                </div>
              </div>

              <Link href="/contact">
                <Button className="rounded-full px-8 h-12 bg-gray-900 text-white hover:bg-gray-800 shadow-lg">
                  นัดปรึกษาหมอเบียร์
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">รีวิวจากลูกค้าจริง</h2>
            <p className="text-gray-600">ความประทับใจจจากผู้ใช้บริการ Esther Clinic</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative group hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="text-primary mb-4 flex justify-center">
                  {[...Array(5)].map((_, stars) => (
                    <Star key={stars} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-center italic mb-8 relative z-10 text-lg">
                  "ประทับใจคุณหมอมากค่ะ มือเบามาก ทำเสร็จบวมนิดเดียว วันรุ่งขึ้นไปทำงานต่อได้เลย พี่ๆ พนักงานน่ารักทุกคนค่ะ"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 ring-2 ring-white shadow-md">
                    <img src="/images/1200x1200.jpg" alt="Client" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900 text-base">คุณมายด์</h4>
                    <p className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full inline-block mt-1">เสริมจมูก</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Section: Latest News (Before FAQ) */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Updates</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">ข่าวสารและโปรโมชั่นล่าสุด</h2>
            </div>
            <Link href="/news">
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 transition-colors">
                ดูข่าวสารทั้งหมด <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {latestNews.length === 0 ? (
            <div className="text-center py-10 text-gray-500">กำลังโหลดข่าวสาร...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map((item) => {
                const categoryName = categories.find(c => c.id === item.categoryId)?.name || "News";
                return (
                  <Link key={item.id} href={`/news/${item.id}`}>
                    <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-primary rounded-full shadow-sm flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {categoryName}
                        </span>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center text-xs text-muted-foreground mb-3">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(item.publishedAt).toLocaleDateString("th-TH", { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-primary text-sm font-bold group-hover:translate-x-2 transition-transform">
                          รายละเอียดเพิ่มเติม <ArrowRight className="ml-1 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">คำถามที่พบบ่อย (FAQ)</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "คลินิกตั้งอยู่ที่ไหน?", a: "Esther Clinic ตั้งอยู่ถนนมิตรภาพ ตรงข้าม..." },
              { q: "ต้องนัดคิวล่วงหน้าไหม?", a: "แนะนำให้นัดคิวล่วงหน้า 1-2 วัน เพื่อความสะดวกค่ะ..." },
              { q: "ปรึกษาหมอมีค่าใช้จ่ายไหม?", a: "ปรึกษาหมอเบียร์ฟรี ไม่มีค่าใช้จ่ายค่ะ..." },
              { q: "รับเคสแก้ไหม?", a: "รับค่ะ คุณหมอเบียร์เชี่ยวชาญงานแก้โดยเฉพาะ..." },
              { q: "มีที่จอดรถไหม?", a: "มีที่จอดรถกว้างขวาง สะดวกสบายค่ะ..." },
              { q: "รับบัตรเครดิตไหม?", a: "รับบัตรเครดิตทุกธนาคาร ผ่อน 0% ได้สูงสุด 10 เดือน..." },
            ].map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-gray-100 mb-2">
                <AccordionTrigger className="text-gray-800 hover:text-primary hover:no-underline py-4 text-left font-medium text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 7. CTA Strip */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">พร้อมเปลี่ยนคุณเป็นคนใหม่หรือยัง?</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="tel:099-454-5664" className="bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-colors shadow-lg w-full md:w-auto justify-center">
              <Phone className="w-5 h-5" /> โทร 099-454-5664
            </a>
            <a href="https://line.me/ti/p/@estherkorat" target="_blank" className="bg-[#00B900] text-white hover:bg-[#009900] px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-colors shadow-lg w-full md:w-auto justify-center">
              <MessageCircle className="w-5 h-5" /> แอดไลน์ @estherkorat
            </a>
            <a href="https://goo.gl/maps/placeholder" target="_blank" className="bg-white/20 backdrop-blur border border-white/40 text-white hover:bg-white/30 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-colors w-full md:w-auto justify-center">
              <MapPin className="w-5 h-5" /> แผนที่คลินิก
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
