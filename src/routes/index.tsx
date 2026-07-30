import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, CalendarRange, ImageDown, Sparkles } from "lucide-react";
import { posts } from "../data/posts";
import { Container, PageHero } from "../components/layout-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "تيك تاجر | أدوات تيك توك المجانية للمتاجر الإلكترونية" },
      {
        name: "description",
        content:
          "أدوات عربية مجانية لبائعي المتاجر على تيك توك: مولّد سكربتات، خطة محتوى 30 يوم، وتحسين صور المنتجات، مع مدونة سيو عربية متخصصة.",
      },
      { property: "og:title", content: "تيك تاجر | أدوات تيك توك للمتاجر الإلكترونية" },
      {
        property: "og:description",
        content:
          "ثلاث أدوات مجانية تساعد التاجر العربي على صناعة محتوى تيك توك يبيع: سكربتات، خطة نشر شهرية، وصور منتجات محسّنة.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "تيك تاجر",
          inLanguage: "ar",
        }),
      },
    ],
  }),
  component: Home,
});

const tools = [
  {
    to: "/tools/tiktok-script-generator",
    icon: FileText,
    title: "مولّد سكربتات تيك توك",
    desc: "أدخل فكرة المنتج واحصل على سكربت كامل بخطاف ومشكلة وحل ودعوة للشراء.",
  },
  {
    to: "/tools/tiktok-content-planner",
    icon: CalendarRange,
    title: "مخطط محتوى 30 يوم",
    desc: "خطة نشر شهرية متوازنة بين التعليمي والترفيهي والبيعي مخصصة لمتجرك.",
  },
  {
    to: "/tools/image-optimizer",
    icon: ImageDown,
    title: "تحسين صور المنتجات",
    desc: "إزالة خلفية الصورة وضغطها بالكامل داخل متصفحك دون رفع أي ملف.",
  },
] as const;

function Home() {
  return (
    <>
      <PageHero
        eyebrow="منصة عربية لتجار تيك توك"
        title={
          <>
            نمِّ متجرك على تيك توك <span className="text-brand-gradient">بأدوات جاهزة</span> لا
            بالتخمين
          </>
        }
        description="تيك تاجر يمنحك ما تحتاجه فعليًا لصناعة محتوى يبيع: سكربتات مكتوبة باحتراف، خطة نشر لثلاثين يومًا، وصور منتجات نظيفة وسريعة — كل ذلك بالعربية ومجانًا."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/tools/tiktok-script-generator"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" /> ابدأ بأول سكربت
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold transition-colors hover:bg-white/10"
          >
            اقرأ دليل التسويق
          </Link>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            ["3", "أدوات مجانية"],
            ["30", "يوم محتوى جاهز"],
            ["5+", "أدلة عربية"],
            ["100%", "داخل المتصفح"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="font-display text-3xl font-black">{v}</dt>
              <dd className="mt-1 text-xs opacity-70">{l}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Container className="py-16 md:py-20">
        <h2 className="font-display text-2xl font-black md:text-3xl">الأدوات</h2>
        <p className="mt-2 max-w-2xl text-sm leading-loose text-muted-foreground">
          كل أداة تعمل في صفحة مستقلة، مجانية بالكامل ولا تتطلب تسجيل دخول.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <t.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-black">{t.title}</h3>
              <p className="mt-2 text-sm leading-loose text-muted-foreground">{t.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
                افتح الأداة <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="pb-16">
        <div className="rounded-3xl border border-border bg-secondary/60 p-8 md:p-12">
          <h2 className="font-display text-2xl font-black md:text-3xl">كيف تعمل المنصة؟</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["١", "خطط شهرك", "ولّد خطة محتوى لثلاثين يومًا تناسب نوع متجرك وجمهورك."],
              ["٢", "اكتب السكربتات", "حوّل كل فكرة في الخطة إلى سكربت جاهز للتصوير."],
              ["٣", "جهّز الصور", "نظّف صور منتجاتك واضغطها لتسريع صفحات متجرك."],
            ].map(([n, t, d]) => (
              <li key={t}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-foreground/90 font-display text-sm font-black text-background">
                  {n}
                </span>
                <h3 className="mt-4 font-black">{t}</h3>
                <p className="mt-2 text-sm leading-loose text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      <Container className="pb-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-black md:text-3xl">من المدونة</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              أدلة عربية مطوّلة في التسويق على تيك توك وتحسين المتاجر.
            </p>
          </div>
          <Link to="/blog" className="shrink-0 text-sm font-bold text-primary">
            كل المقالات ←
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-primary/40"
            >
              <span className="text-xs font-bold text-primary">{p.category}</span>
              <h3 className="mt-3 text-base leading-relaxed font-black">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-loose text-muted-foreground">
                {p.excerpt}
              </p>
              <span className="mt-4 block text-xs text-muted-foreground">
                {p.readingMinutes} دقائق قراءة
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
