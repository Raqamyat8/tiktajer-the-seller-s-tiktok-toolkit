import { Link } from "@tanstack/react-router";
import type { Block, ToolSlug } from "../data/posts";
import { toolMeta } from "../data/posts";

export function ToolCta({ tool, text }: { tool: ToolSlug; text: string }) {
  const meta = toolMeta[tool];
  return (
    <div className="my-8 rounded-2xl border border-primary/25 bg-primary/5 p-6">
      <h3 className="!mt-0 text-lg font-black text-foreground">جرب الأداة الآن</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      <Link
        to={meta.path as "/"}
        className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground no-underline shadow-glow transition-opacity hover:opacity-90"
      >
        {meta.title} ←
      </Link>
    </div>
  );
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-ar max-w-none text-[1.02rem]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "h3":
            return <h3 key={i}>{block.text}</h3>;
          case "p":
            return <p key={i}>{block.text}</p>;
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "toolCta":
            return <ToolCta key={i} tool={block.tool} text={block.text} />;
        }
      })}
    </div>
  );
}
