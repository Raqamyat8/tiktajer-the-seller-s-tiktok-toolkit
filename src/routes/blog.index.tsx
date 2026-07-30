import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "../data/posts";
import { Container, PageHero } from "../components/layout-bits";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "مدونة تيك تاجر | أدلة التسويق على تيك توك للمتاجر" },
      {
        name: "description",
        content:
          "مقالات عربية متعمقة في التسويق على تيك توك، خطط المحتوى، خوارزمية تيك توك، تحسين صور المنتجات، وزيادة معدل التحويل في المتاجر.",
      },
      { property: "og:title", content: "مدونة تيك تاجر | أدلة تيك توك للتجار" },
      {
        property: "og:description",
        content: "أدلة عربية عملية لزيادة مبيعات متجرك عبر تيك توك.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageHero
        eyebrow="المدونة"
        title="أدلة عربية لزيادة مبيعاتك عبر تيك توك"
        description="مقالات مطوّلة تشرح الاستراتيجية والتنفيذ خطوة بخطوة، مع روابط مباشرة للأدوات المناسبة لكل خطوة."
      />
      <Container className="py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <article
              key={p.slug}
              className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-bold text-primary">
                  {p.category}
                </span>
                <span className="text-muted-foreground">{p.readingMinutes} دقائق قراءة</span>
              </div>
              <h2 className="mt-4 text-xl leading-relaxed font-black">
                <Link to="/blog/$slug" params={{ slug: p.slug }}>
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-loose text-muted-foreground">{p.excerpt}</p>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="mt-5 inline-block text-sm font-bold text-primary"
              >
                اقرأ المقال ←
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
