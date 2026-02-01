import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { Helmet } from "react-helmet-async";
import type { News as NewsType, Category } from "@shared/schema";

export default function News() {
  const [newsItems, setNewsItems] = useState<NewsType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [loading, setLoading] = useState(true);

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
          setNewsItems(newsData);
          setCategories(catsData);
        }
      } catch (error) {
        console.error("Failed to fetch news data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredNews = activeCategory === "ทั้งหมด"
    ? newsItems
    : newsItems.filter(item => {
      const cat = categories.find(c => c.id === item.categoryId);
      return cat?.name === activeCategory;
    });

  const displayCategories = ["ทั้งหมด", ...categories.map(c => c.name)];

  return (
    <div className="min-h-screen flex flex-col bg-background font-kanit">
      <Helmet>
        <title>ข่าวสารและโปรโมชั่น | Esther Clinic</title>
        <meta name="description" content="อัปเดตเทรนด์ความงาม โปรโมชั่นสุดคุ้ม และสาระน่ารู้เกี่ยวกับศัลยกรรมจากหมอเบียร์ Esther Clinic" />
      </Helmet>
      <Navbar />

      {/* Header */}
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ข่าวสารและโปรโมชั่น</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            อัปเดตเทรนด์ความงาม โปรโมชั่นสุดคุ้ม และสาระน่ารู้จากหมอเบียร์
          </p>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {displayCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            ยังไม่มีข่าวสารในหมวดหมู่นี้
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => {
              const categoryName = categories.find(c => c.id === item.categoryId)?.name || "ข่าวสาร";
              return (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden bg-gray-200">
                      <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/95 backdrop-blur text-xs font-bold text-primary rounded-full shadow-sm flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {categoryName}
                      </span>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-xs text-gray-400 mb-3">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(item.publishedAt).toLocaleDateString("th-TH", { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                        {item.content}
                      </p>
                      <div className="flex items-center text-primary text-sm font-bold mt-auto group-hover:translate-x-2 transition-transform">
                        อ่านเพิ่มเติม <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
