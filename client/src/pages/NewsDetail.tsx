import { useRoute, Link } from "wouter";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import type { News as NewsType, Category } from "@shared/schema";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:id");
  const id = params?.id;

  const [news, setNews] = useState<NewsType | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      setLoading(true);
      try {
        const [newsRes, allNewsRes, catsRes] = await Promise.all([
          fetch(`/api/news/${id}`),
          fetch("/api/news"),
          fetch("/api/categories")
        ]);

        if (newsRes.ok && allNewsRes.ok && catsRes.ok) {
          const newsData = await newsRes.json();
          const allNewsData = await allNewsRes.json();
          const catsData = await catsRes.json();

          setNews(newsData);
          setRelatedNews(allNewsData.filter((item: NewsType) => item.id !== Number(id)).slice(0, 3));
          setCategories(catsData);
        }
      } catch (error) {
        console.error("Failed to fetch news detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-kanit">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-kanit">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-4">ไม่พบข่าวสารที่คุณต้องการ</h2>
          <Link href="/news">
            <Button>กลับไปหน้าข่าวสาร</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryName = categories.find(c => c.id === news.categoryId)?.name || "ข่าวสาร";
  const seoTitle = `${news.title} | Esther Clinic Korat`;
  const seoDescription = news.content.substring(0, 160);
  const seoImage = news.imageUrl.startsWith('http') ? news.imageUrl : window.location.origin + news.imageUrl;

  return (
    <div className="min-h-screen flex flex-col bg-background font-kanit">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
      </Helmet>

      <Navbar />

      <main className="flex-grow pb-20">
        {/* Header Image */}
        <div className="w-full h-[400px] md:h-[500px] bg-gray-200 relative">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white container mx-auto">
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-white text-sm font-semibold mb-4">
                {categoryName}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {news.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(news.publishedAt).toLocaleDateString("th-TH", { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-10 relative z-10 flex flex-col lg:flex-row gap-12">
          {/* Content */}
          <article className="w-full lg:w-2/3 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <Link href="/news">
              <a className="inline-flex items-center text-gray-500 hover:text-primary mb-8 text-sm transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับไปหน้าข่าวสาร
              </a>
            </Link>

            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-primary whitespace-pre-wrap">
              {news.content}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 space-y-8">
            {/* CTA Box */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100 text-center sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-2">สนใจบริการนี้?</h3>
              <p className="text-gray-600 mb-6 text-sm">ปรึกษาหมอเบียร์ฟรี ไม่มีค่าใช้จ่าย พร้อมรับสิทธิพิเศษมากมาย</p>
              <Link href="/contact">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/20">
                  จองคิว / ปรึกษาทันที
                </Button>
              </Link>
            </div>
          </aside>
        </div>

        {/* Related News Section (Moved to Bottom) */}
        {relatedNews.length > 0 && (
          <section className="container mx-auto px-4 mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">ข่าวสารที่เกี่ยวข้อง</h2>
              <Link href="/news">
                <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 transition-colors">
                  ดูทั้งหมด <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.map(item => {
                const relCatName = categories.find(c => c.id === item.categoryId)?.name || "ข่าวสาร";
                return (
                  <Link key={item.id} href={`/news/${item.id}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full">
                      <div className="aspect-[4/3] overflow-hidden bg-gray-200 relative">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-primary rounded-full">
                          {relCatName}
                        </span>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                          <span>{new Date(item.publishedAt).toLocaleDateString("th-TH")}</span>
                          <span className="text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                            อ่านต่อ <ArrowRight className="w-3 h-3 ml-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
