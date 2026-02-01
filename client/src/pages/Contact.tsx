import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, MapPin, MessageCircle, Clock, Map as MapIcon } from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

// Schema for validation
const formSchema = z.object({
  name: z.string().min(2, "กรุณาระบุชื่ออย่างน้อย 2 ตัวอักษร"),
  phone: z.string().min(10, "เบอร์โทรศัพท์ต้องมีอย่างน้อย 10 หลัก"),
  service: z.string().min(1, "กรุณาเลือกบริการที่สนใจ"),
  date: z.string().min(1, "กรุณาเลือกวันที่สะดวก"),
  message: z.string().optional(),
});

export default function Contact() {
  // Removed const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      date: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("ส่งข้อมูลสำเร็จ!", {
      description: "เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันคิวภายใน 24 ชม. ค่ะ",
      duration: 5000,
    });
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-kanit">
      <Helmet>
        <title>ติดต่อเรา | Esther Clinic</title>
        <meta name="description" content="ติดต่อสอบถาม นัดคิวปรึกษาหมอเบียร์ Esther Clinic สาขาโคราชและชัยภูมิ" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-secondary/30 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ติดต่อเรา / จองคิว</h1>
          <p className="text-gray-600">ปรึกษาปัญหาความงาม หรือนัดคิวเข้าใช้บริการ ได้ทุกช่องทาง</p>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 min-h-[700px]">

          {/* Left Side: Contact Info & Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <a href="tel:099-454-5664" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors group cursor-pointer border border-transparent hover:border-primary/20">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">โทรศัพท์</p>
                  <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">099-454-5664</p>
                </div>
              </a>
              <a href="https://line.me/ti/p/@estherkorat" target="_blank" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors group cursor-pointer border border-transparent hover:border-primary/20">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#00B900] group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">LINE Official</p>
                  <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">@estherkorat</p>
                </div>
              </a>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">จองคิว / ส่งข้อความ</h2>
              <p className="text-sm text-gray-500">กรอกข้อมูลด้านล่างเพื่อให้เจ้าหน้าที่ติดต่อกลับ</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อ - นามสกุล</FormLabel>
                        <FormControl>
                          <Input placeholder="คุณลูกค้าคนพิเศษ" {...field} className="rounded-xl h-12 bg-gray-50 border-transparent focus:bg-white focus:border-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>เบอร์โทรศัพท์</FormLabel>
                        <FormControl>
                          <Input placeholder="08x-xxx-xxxx" {...field} className="rounded-xl h-12 bg-gray-50 border-transparent focus:bg-white focus:border-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>บริการที่สนใจ</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl h-12 bg-gray-50 border-transparent focus:bg-white focus:border-primary/50">
                              <SelectValue placeholder="เลือกบริการ" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="surgery">ศัลยกรรม (จมูก/คาง/ตา)</SelectItem>
                            <SelectItem value="skin">ผิวพรรณ (Botox/Filler/Laser)</SelectItem>
                            <SelectItem value="consult">ปรึกษาทั่วไป</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>วันที่สะดวก</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="rounded-xl h-12 bg-gray-50 border-transparent focus:bg-white focus:border-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ข้อความเพิ่มเติม (ถ้ามี)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="เช่น กังวลเรื่องรอยแผล, อยากทราบราคาประเมิน"
                          className="resize-none rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary/50 min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/20">
                  ยื่นยันการจองคิว
                </Button>
              </form>
            </Form>
          </div>

          {/* Right Side: Map & Location Image */}
          <div className="w-full lg:w-1/2 relative bg-gray-900">
            <img
              src="/images/1200x1200.jpg"
              alt="Clinic Location"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="text-primary" /> Esther Clinic Korat
                </h3>
                <p className="text-gray-200 text-sm mb-6 leading-relaxed">
                  123 ถ.มิตรภาพ ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000 <br />
                  (ตรงข้าม The Mall Korat, ติดกับธนาคารกสิกรไทย)
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 bg-white text-gray-900 hover:bg-gray-100 border-none rounded-xl h-10">
                    <MapIcon className="w-4 h-4 mr-2" /> ดูแผนที่ Google Map
                  </Button>
                  <div className="flex-1 bg-black/30 rounded-xl flex items-center justify-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-primary" /> 10:00 - 20:00 น.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
