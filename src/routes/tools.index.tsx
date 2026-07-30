import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, PageHero } from "../components/layout-bits";
import { toolMeta } from "../data/posts";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "أدوات تيك توك المجانية للتجار | تيك تاجر" },
      {
        name: "description",
        content:
          "ثلاث أدوات مجانية لتجار تيك توك: مولّد سكربتات الفيديو، مخطط محتوى لثلاثين يومًا، وأداة تحسين صور المنتجات وإزالة الخلفية.",
      },
      { property: "og:title", content: "أدوات تيك توك المجانية للتجار | تيك تاجر" },
      {
        property: "og:description",
        content: "أدوات عربية مجانية تساعدك على صناعة محتوى تيك توك يبيع وتحسين متجرك.",
      },
      { property: "og:url", content: "/tools" },
    ],
    links: [{ rel: "canonical", href: "/tools" }],
  }),
  component: ToolsIndex,
});

function ToolsIndex() {
  const entries = Object.entries(toolMeta);
  return (
    <>
      <PageHero
        eyebrow="الأدوات"
        title="أدوات مجانية لصناعة محتوى تيك توك يبيع"
        description="كل أداة لها صفحتها المستقلة وتعمل مباشرة داخل متصفحك بدون تسجيل."
      />
      <Container className="py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {entries.map(([slug, meta]) => (
            <Link
              key={slug}
              to={meta.path as "/"}
              className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <h2 className="text-lg font-black">{meta.title}</h2>
              <p className="mt-2 text-sm leading-loose text-muted-foreground">{meta.short}</p>
              <span className="mt-5 inline-block text-sm font-bold text-primary">
                افتح الأداة ←
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
