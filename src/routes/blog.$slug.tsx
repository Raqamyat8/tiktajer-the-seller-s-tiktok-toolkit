import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, posts, toolMeta } from "../data/posts";
import { ArticleBody } from "../components/article-body";
import { Breadcrumbs, Container } from "../components/layout-bits";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "المقال غير متاح | تيك تاجر" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: p.seoTitle },
        { name: "description", content: p.description },
        { name: "keywords", content: p.keyword },
        { property: "og:title", content: p.seoTitle },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            inLanguage: "ar",
            author: { "@type": "Organization", name: "تيك تاجر" },
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const post = getPost(slug)!;
  const related = posts.filter((p) => post.relatedPosts.includes(p.slug));

  return (
    <article>
      <div className="surface-ink">
        <Container className="py-14 md:py-16">
          <nav className="flex flex-wrap items-center gap-2 text-xs opacity-70">
            <Link to="/">الرئيسية</Link>
            <span>/</span>
            <Link to="/blog">المدونة</Link>
            <span>/</span>
            <span>{post.category}</span>
          </nav>
          <h1 className="mt-5 max-w-3xl font-display text-3xl leading-[1.4] font-black md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-loose opacity-75">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs opacity-70">
            <span>الكلمة المستهدفة: {post.keyword}</span>
            <span>{post.readingMinutes} دقائق قراءة</span>
            <span>{post.date}</span>
          </div>
        </Container>
      </div>

      <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <ArticleBody blocks={post.blocks} />

          <section className="mt-12 rounded-3xl border border-border bg-secondary/60 p-7">
            <h2 className="text-xl font-black">جرب الأداة الآن</h2>
            <p className="mt-2 text-sm leading-loose text-muted-foreground">
              طبّق ما قرأته مباشرة عبر أدوات تيك تاجر المجانية.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {post.relatedTools.map((t) => (
                <Link
                  key={t}
                  to={toolMeta[t].path as "/"}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow"
                >
                  {toolMeta[t].title}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-sm font-black">مقالات ذات صلة</h2>
            <ul className="mt-4 space-y-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: r.slug }}
                    className="text-sm leading-relaxed font-bold hover:text-primary"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-sm font-black">كل الأدوات</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {Object.entries(toolMeta).map(([slug, meta]) => (
                <li key={slug}>
                  <Link to={meta.path as "/"} className="font-bold hover:text-primary">
                    {meta.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
      <Container className="pb-6">
        <Breadcrumbs
          items={[{ label: "الرئيسية", to: "/" }, { label: "المدونة", to: "/blog" }, { label: post.title }]}
        />
      </Container>
    </article>
  );
}
