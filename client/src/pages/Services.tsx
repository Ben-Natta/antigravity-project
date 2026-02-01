import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, User, ArrowRight, ShieldCheck, Stethoscope, HeartPulse, Sparkles, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

// Data Structure
const services = {
  surgery: [
    { title: "เสริมจมูก (Rhinoplasty)", benefits: ["ทรงสโลปปลายพุ่ง", "ซิลิโคนเกรดพรีเมียม", "บวมช้ำน้อย"], duration: "1-2 ชั่วโมง", for: "ผู้ที่ดั้งแบน ปลายจมูกสั้น" },
    { title: "เสริมคาง (Chin Augmentation)", benefits: ["ปรับหน้าเรียว V-Shape", "ไร้รอยต่อ", "ล็อคแกนแน่น"], duration: "1 ชั่วโมง", for: "คางตัด คางถอย หน้ากลม" },
    { title: "ตาสองชั้น (Eyelid Surgery)", benefits: ["ชั้นตาชัด", "ขนตาเด้ง", "แผลเล็กหายไว"], duration: "1-2 ชั่วโมง", for: "ตาชั้นเดียว หนังตาตก" },
    { title: "ปากกระจับ (Lip reduction)", benefits: ["ทรงปีกนก", "ยกมุมปาก", "เย็บซ่อนไหม"], duration: "1 ชั่วโมง", for: "ปากหนา ปากคว่ำ" },
    { title: "ปลูกผม (Hair Transplant)", benefits: ["เกาะติดแน่น 95%", "ไร้แผลเป็น", "แนวผมธรรมชาติ"], duration: "4-6 ชั่วโมง", for: "ศีรษะล้าน หน้าผากกว้าง" },
    { title: "ดูดไขมัน (Liposuction)", benefits: ["กระชับสัดส่วน", "แผลเล็ก 0.5 ซม.", "ไม่เป็นคลื่น"], duration: "2-3 ชั่วโมง", for: "ไขมันสะสมเฉพาะจุด" },
    { title: "ตัดไขมันกระพุ้งแก้ม", benefits: ["หน้าเรียวถาวร", "แผลในปาก", "ไม่ทิ้งรอยแผล"], duration: "45 นาที", for: "แก้มป่อง แก้มเยอะ" },
    { title: "เสริมหน้าผาก", benefits: ["นูนสวยรับจมูก", "ซิลิโคนสั่งทำพิเศษ", "ขอบเนียน"], duration: "1-2 ชั่วโมง", for: "หน้าผากแบน หน้าผากลาด" },
    { title: "ลักยิ้ม", benefits: ["เพิ่มเสน่ห์", "จุดตำแหน่งแม่นยำ", "เป็นธรรมชาติ"], duration: "30 นาที", for: "อยากมีรอยยิ้มหวาน" },
  ],
  skin: [
    { title: "Botox ลดกราม/ริ้วรอย", benefits: ["เห็นผลใน 2 สัปดาห์", "ของแท้แกะกล่อง", "ไม่แข็งตึง"], duration: "15 นาที", for: "กรามใหญ่ ริ้วรอยเยอะ" },
    { title: "Filler ปรับรูปหน้า", benefits: ["เติมเต็มร่องลึก", "ปั้นทรงสวย", "อย. ไทยและสากล"], duration: "30 นาที", for: "ขมับตอบ ร่องแก้มลึก" },
    { title: "ร้อยไหมยกกระชับ", benefits: ["หน้ายกทันที", "กระตุ้นคอลลาเจน", "อยู่ได้นาน 1-2 ปี"], duration: "45 นาที", for: "แก้มห้อย ผิวไม่กระชับ" },
    { title: "Meso หน้าใส", benefits: ["ลดรอยสิว", "ผิวฉ่ำวาว", "รูขุมขนกระชับ"], duration: "15 นาที", for: "หน้าหมองคล้ำ รอยสิว" },
    { title: "HIFU / Ultraformer", benefits: ["ยกกระชับเก็บกรอบหน้า", "ไม่เจ็บ", "ไม่ต้องพักฟื้น"], duration: "30-45 นาที", for: "แก้มเยอะ เหนียงยาน" },
    { title: "Laser กำจัดขน", benefits: ["ขนหลุดถาวร", "ผิวเรียบเนียน", "ลดตุ่มหนังไก่"], duration: "15-30 นาที", for: "ขนดก ขนคุด" },
  ]
};

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-kanit">
      <Helmet>
        <title>บริการของเรา | Esther Clinic</title>
        <meta name="description" content="บริการศัลยกรรมความงามและดูแลผิวพรรณครบวงจรที่ Esther Clinic ทั้งเสริมจมูก เสริมคาง ตาสองชั้น เลเซอร์ และหัตถการปรับรูปหน้า" />
        <meta property="og:title" content="บริการของเรา | Esther Clinic" />
        <meta property="og:description" content="บริการศัลยกรรมความงามและดูแลผิวพรรณครบวงจร ดูแลโดยหมอเบียร์และทีมแพทย์ผู้เชี่ยวชาญ" />
      </Helmet>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Our Services</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">บริการของเรา</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            ดูแลโดยทีมแพทย์ผู้เชี่ยวชาญ คัดสรรเครื่องมือและผลิตภัณฑ์ที่ดีที่สุด เพื่อคุณ
          </p>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-12">
        <Tabs defaultValue="surgery" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-gray-100 p-1 rounded-full">
              <TabsTrigger value="surgery" className="rounded-full px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white text-gray-600 transition-all font-medium text-lg min-w-[150px]">
                ศัลยกรรม
              </TabsTrigger>
              <TabsTrigger value="skin" className="rounded-full px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white text-gray-600 transition-all font-medium text-lg min-w-[150px]">
                ผิวพรรณ & เลเซอร์
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="surgery" className="space-y-8 animate-in fade-in-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.surgery.map((item, idx) => (
                <ServiceCard key={idx} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skin" className="space-y-8 animate-in fade-in-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.skin.map((item, idx) => (
                <ServiceCard key={idx} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Process Section */}
        <section className="py-20 mt-12 border-t border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ขั้นตอนการเข้ารับบริการ</h2>
            <p className="text-gray-500">ง่าย สบายใจ ทุกขั้นตอน</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: MessageCircle, title: "1. นัดปรึกษา", desc: "ทักแชทหรือโทรนัดคิวปรึกษาหมอเบียร์ ไม่มีค่าใช้จ่าย" },
              { icon: Stethoscope, title: "2. พบแพทย์", desc: "วิเคราะห์โครงหน้าและวางแผนการรักษาอย่างละเอียด" },
              { icon: HeartPulse, title: "3. เข้ารับบริการ", desc: "ดำเนินการด้วยเครื่องมือมาตรฐาน ปลอดเชื้อ 100%" },
              { icon: Sparkles, title: "4. ติดตามผล", desc: "ดูแลหลังการทำอย่างใกล้ชิด ทีมงานพร้อมตอบ 24 ชม." }
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 shadow-sm">
                  <step.icon className="w-10 h-10" />
                </div>
                {i < 3 && <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gray-200 -z-10"></div>}
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Standards */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-green-500" />
                Safety & Trusted Standards
              </h2>
              <p className="text-gray-600 max-w-xl">
                เอสเธอร์ คลินิก ใส่ใจทุกรายละเอียดความปลอดภัย เครื่องมือแพทย์ทุกชิ้นผ่านการรับรอง อย. ไทยและมาตรฐานสากล ห้องผ่าตัดระบบ Positive Pressure ปลอดเชื้อ
              </p>
            </div>
            <div className="flex gap-4">
              {/* Badges placeholder */}
              <div className="h-16 w-16 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-bold text-gray-400">FDA</div>
              <div className="h-16 w-16 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-bold text-gray-400">GMP</div>
              <div className="h-16 w-16 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-bold text-gray-400">ISO</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Reusable Service Card Component
function ServiceCard({ item }: { item: any }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="h-48 overflow-hidden bg-gray-200">
        <img src="/images/1200x1200.jpg" alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
        </div>

        <ul className="space-y-2 mb-6">
          {item.benefits.map((benefit: string, i: number) => (
            <li key={i} className="flex items-center text-sm text-gray-600">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
              {benefit}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-50">
          <div>
            <p className="text-xs text-gray-400 mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> ระยะเวลา</p>
            <p className="text-sm font-medium text-gray-700">{item.duration}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1 flex items-center gap-1"><User className="w-3 h-3" /> เหมาะกับ</p>
            <p className="text-sm font-medium text-gray-700 truncate">{item.for}</p>
          </div>
        </div>

        <Link href="/contact">
          <Button className="w-full bg-white border border-primary text-primary hover:bg-primary hover:text-white font-medium shadow-none hover:shadow-lg transition-all rounded-xl">
            จองคิว / ปรึกษาฟรี
          </Button>
        </Link>
      </div>
    </div>
  );
}
