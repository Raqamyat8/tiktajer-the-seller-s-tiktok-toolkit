import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarRange } from "lucide-react";
import { Container, PageHero } from "../components/layout-bits";

export const Route = createFileRoute("/tools/tiktok-content-planner")({
  head: () => ({
    meta: [
      { title: "مخطط محتوى تيك توك 30 يوم للمتاجر | تيك تاجر" },
      {
        name: "description",
        content:
          "أداة مجانية لتوليد خطة محتوى تيك توك لثلاثين يومًا لمتجرك الإلكتروني، موزعة بين محتوى تعليمي وترفيهي وثقة وبيعي مع أفكار يومية جاهزة.",
      },
      { name: "keywords", content: "خطة محتوى تيك توك" },
      { property: "og:title", content: "مخطط محتوى تيك توك 30 يوم | تيك تاجر" },
      {
        property: "og:description",
        content: "خطة نشر شهرية جاهزة لمتجرك على تيك توك بضغطة واحدة.",
      },
      { property: "og:url", content: "/tools/tiktok-content-planner" },
    ],
    links: [{ rel: "canonical", href: "/tools/tiktok-content-planner" }],
  }),
  component: Planner,
});

const types = [
  { key: "تعليمي", color: "bg-accent/30" },
  { key: "ترفيهي", color: "bg-primary/10" },
  { key: "ثقة", color: "bg-secondary" },
  { key: "بيعي", color: "bg-foreground/10" },
] as const;

const ideas: Record<string, string[]> = {
  تعليمي: [
    "٣ أخطاء يقع فيها المشترون عند اختيار {n}",
    "كيف تختار {n} المناسب لك في دقيقة",
    "شرح سريع لطريقة استخدام {n}",
    "مقارنة بين الطريقة القديمة و{n}",
    "أسئلة يتكرر سؤالها عن {n}",
    "نصيحة توفر عليك فلوس عند شراء {n}",
  ],
  ترفيهي: [
    "ترند صوتي شائع مع لقطة لـ {n}",
    "موقف طريف يحصل مع عملاء {n}",
    "تحدٍ سريع: هل تلاحظ الفرق؟",
    "قبل/بعد سريع مع مؤثر صوتي",
  ],
  ثقة: [
    "لقطة لتقييم عميل حقيقي عن {n}",
    "كواليس تجهيز وتغليف طلبات {n}",
    "رد صريح على اعتراض: السعر غالي",
    "توثيق شحنة اليوم وعدد الطلبات",
  ],
  بيعي: [
    "عرض محدود على {n} لمدة ٤٨ ساعة",
    "حزمة موفرة تضم {n} + مكمل له",
    "إطلاق لون/إصدار جديد من {n}",
  ],
};

function buildPlan(niche: string, product: string, perDay: number) {
  const n = product || niche || "منتجك";
  const order = [
    "تعليمي","ترفيهي","تعليمي","ثقة","بيعي","تعليمي","ترفيهي",
  ];
  const counters: Record<string, number> = { تعليمي: 0, ترفيهي: 0, ثقة: 0, بيعي: 0 };
  return Array.from({ length: 30 }, (_, i) => {
    const type = order[i % order.length];
    const list = ideas[type];
    const idea = list[counters[type]++ % list.length].replaceAll("{n}", n);
    return {
      day: i + 1,
      type,
      idea,
      cta:
        type === "بيعي"
          ? "اطلب الآن من الرابط في البايو"
          : type === "ثقة"
            ? "اقرأ التقييمات المثبتة"
            : "احفظ المقطع وتابعنا",
      count: perDay,
    };
  });
}

function Planner() {
  const [niche, setNiche] = useState("");
  const [product, setProduct] = useState("");
  const [perDay, setPerDay] = useState(1);
  const [plan, setPlan] = useState<ReturnType<typeof buildPlan> | null>(null);

  const field =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <>
      <PageHero
        eyebrow="أداة مجانية"
        title="مخطط محتوى تيك توك لثلاثين يومًا"
        description="احصل على جدول نشر شهري كامل لمتجرك، موزع بذكاء بين المحتوى التعليمي والترفيهي ومحتوى الثقة والمحتوى البيعي، مع فكرة ودعوة إجراء لكل يوم."
      />

      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
          <section className="h-fit rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-black">بيانات متجرك</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold">مجال المتجر</label>
                <input
                  className={field}
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="مثال: أدوات منزلية"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold">المنتج الأساسي</label>
                <input
                  className={field}
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="مثال: منظّم الأدراج"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold">عدد المقاطع يوميًا</label>
                <select
                  className={field}
                  value={perDay}
                  onChange={(e) => setPerDay(Number(e.target.value))}
                >
                  <option value={1}>مقطع واحد</option>
                  <option value={2}>مقطعان</option>
                  <option value={3}>ثلاثة مقاطع</option>
                </select>
              </div>
              <button
                onClick={() => setPlan(buildPlan(niche, product, perDay))}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground shadow-glow hover:opacity-90"
              >
                <CalendarRange className="h-4 w-4" /> جرّب الآن — أنشئ الخطة
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black">خطة الثلاثين يومًا</h2>
            {!plan ? (
              <div className="mt-4 rounded-3xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
                أدخل بيانات متجرك ثم اضغط «أنشئ الخطة».
              </div>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {plan.map((d) => {
                  const t = types.find((x) => x.key === d.type)!;
                  return (
                    <div key={d.day} className="rounded-2xl border border-border bg-card p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black">اليوم {d.day}</span>
                        <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${t.color}`}>
                          {d.type}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed font-bold">{d.idea}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {d.count} مقطع · دعوة: {d.cta}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-black">لماذا تحتاج خطة شهرية؟</h2>
          <p className="mt-3 leading-loose text-muted-foreground">
            الانتظام هو العامل الأول في نمو حسابات المتاجر على تيك توك. الخطة الجاهزة تلغي التفكير
            اليومي وتتيح لك تصوير خمسة مقاطع في جلسة واحدة، كما تحافظ على توازن أنواع المحتوى حتى
            لا يملّ جمهورك من العروض المتكررة.
          </p>
          <h3 className="mt-6 text-lg font-black">مقالات مرتبطة</h3>
          <ul className="mt-3 space-y-2 text-sm font-bold">
            <li>
              <Link to="/blog/$slug" params={{ slug: "tiktok-content-plan-30-days" }} className="text-primary">
                خطة محتوى تيك توك لمدة 30 يوم للمتاجر
              </Link>
            </li>
            <li>
              <Link to="/blog/$slug" params={{ slug: "tiktok-marketing-guide" }} className="text-primary">
                دليل التسويق على تيك توك للمتاجر الإلكترونية
              </Link>
            </li>
            <li>
              <Link to="/tools/tiktok-script-generator" className="text-primary">
                حوّل أفكار الخطة إلى سكربتات جاهزة
              </Link>
            </li>
          </ul>
        </section>
      </Container>
    </>
  );
}
