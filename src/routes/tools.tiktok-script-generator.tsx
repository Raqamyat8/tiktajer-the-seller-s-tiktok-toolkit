import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Check, Wand2 } from "lucide-react";
import { Container, PageHero } from "../components/layout-bits";

export const Route = createFileRoute("/tools/tiktok-script-generator")({
  head: () => ({
    meta: [
      { title: "مولّد سكربتات تيك توك بالعربي مجانًا | تيك تاجر" },
      {
        name: "description",
        content:
          "أداة مجانية لكتابة سكربت تيك توك احترافي لمنتجك: خطاف قوي، عرض المشكلة، الحل، ودعوة للشراء — جاهز للتصوير خلال ثوانٍ.",
      },
      { name: "keywords", content: "سكربت تيك توك" },
      { property: "og:title", content: "مولّد سكربتات تيك توك بالعربي | تيك تاجر" },
      {
        property: "og:description",
        content: "حوّل فكرة منتجك إلى سكربت فيديو بيعي جاهز للتصوير مجانًا.",
      },
      { property: "og:url", content: "/tools/tiktok-script-generator" },
    ],
    links: [{ rel: "canonical", href: "/tools/tiktok-script-generator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "مولّد سكربتات تيك توك",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          inLanguage: "ar",
          offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
        }),
      },
    ],
  }),
  component: ScriptGenerator,
});

type Tone = "حماسي" | "تعليمي" | "ودّي" | "جريء";
type Goal = "زيادة المشاهدات" | "زيادة الطلبات" | "بناء الثقة";

function buildScript(o: {
  product: string;
  audience: string;
  problem: string;
  benefit: string;
  offer: string;
  tone: Tone;
  goal: Goal;
}) {
  const p = o.product || "المنتج";
  const a = o.audience || "جمهورك";
  const prob = o.problem || "المشكلة التي يعاني منها عميلك";
  const ben = o.benefit || "الفائدة الأساسية";
  const offer = o.offer || "اطلبه الآن من الرابط في البايو";

  const hooks: Record<Tone, string[]> = {
    حماسي: [
      `توقف! إذا كنت من ${a} فـ ${p} سيغيّر يومك.`,
      `ثلاث ثوانٍ فقط وأثبت لك إن ${prob} لها حل.`,
      `هذا أكثر شيء ندمت إني ما اشتريته من زمان.`,
    ],
    تعليمي: [
      `أغلب ${a} يقعون في خطأ واحد: ${prob}.`,
      `خليني أشرح لك بالتفصيل كيف تتخلص من ${prob} خلال دقيقة.`,
      `قبل ما تشتري أي ${p}، انتبه لهذه النقطة.`,
    ],
    "ودّي": [
      `سألتني وحدة من المتابعات: كيف أحل ${prob}؟ هذا جوابي.`,
      `تعال أوريك شي بسيط ساعدني كثير مع ${prob}.`,
      `لو عندك نفس المشكلة، هذا الفيديو لك.`,
    ],
    جريء: [
      `لا تشترِ ${p} قبل ما تشوف آخر المقطع.`,
      `أغلب اللي يبيعون ${p} ما يقولون لك هذي الحقيقة.`,
      `وفّر فلوسك: هذي الطريقة الوحيدة اللي نفعت مع ${prob}.`,
    ],
  };

  const cta: Record<Goal, string> = {
    "زيادة المشاهدات": "احفظ المقطع عشان ترجع له، وتابعنا لمزيد من الأفكار.",
    "زيادة الطلبات": `${offer} — الكمية محدودة.`,
    "بناء الثقة": "اقرأ تقييمات العملاء المثبتة في الحساب قبل ما تطلب.",
  };

  return {
    hooks: hooks[o.tone],
    sections: [
      {
        t: "٠–٢ ثانية | الخطاف",
        b: hooks[o.tone][0],
        note: "أظهر المنتج أو النتيجة في الإطار الأول مع نص كبير على الشاشة.",
      },
      {
        t: "٢–٧ ثانية | المشكلة",
        b: `كل واحد من ${a} يعاني من ${prob}، والنتيجة وقت ضائع وفلوس تروح بدون فايدة.`,
        note: "تكلّم بلغة العميل نفسه واذكر موقفًا يوميًا يعرفه.",
      },
      {
        t: "٧–٢٠ ثانية | الحل والعرض البصري",
        b: `هنا يجي دور ${p}: ${ben}. خليني أوريك النتيجة قدامك خطوة بخطوة.`,
        note: "اعرض قبل/بعد أو الاستخدام الحقيقي، لا تكتفِ بالكلام.",
      },
      {
        t: "٢٠–٢٥ ثانية | إزالة الاعتراض",
        b: `ممكن تقول: هل يستاهل السعر؟ جرّبه وإذا ما عجبك ترجعه — الضمان موجود.`,
        note: "اذكر اعتراضًا واحدًا فقط وأجب عنه بجملة قصيرة.",
      },
      {
        t: "٢٥–٣٠ ثانية | الدعوة للإجراء",
        b: cta[o.goal],
        note: "دعوة واحدة فقط، مكتوبة على الشاشة ومنطوقة بصوتك.",
      },
    ],
    caption: `${p} لـ ${a} 🔥 ${ben}\n${offer}\n#تيك_توك #متجر_الكتروني #${(p || "منتج").replace(/\s+/g, "_")}`,
  };
}

function ScriptGenerator() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [problem, setProblem] = useState("");
  const [benefit, setBenefit] = useState("");
  const [offer, setOffer] = useState("");
  const [tone, setTone] = useState<Tone>("حماسي");
  const [goal, setGoal] = useState<Goal>("زيادة الطلبات");
  const [result, setResult] = useState<ReturnType<typeof buildScript> | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () =>
    setResult(buildScript({ product, audience, problem, benefit, offer, tone, goal }));

  const plain = result
    ? [
        ...result.sections.map((s) => `${s.t}\n${s.b}`),
        "\nالوصف المقترح:\n" + result.caption,
      ].join("\n\n")
    : "";

  const copy = async () => {
    await navigator.clipboard.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const field =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

  return (
    <>
      <PageHero
        eyebrow="أداة مجانية"
        title="مولّد سكربتات تيك توك للمنتجات"
        description="أدخل تفاصيل منتجك واحصل على سكربت فيديو من خمسة أجزاء: خطاف، مشكلة، حل، معالجة اعتراض، ودعوة للشراء — مع وصف جاهز للنشر."
      />

      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-black">تفاصيل المنتج</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold">اسم المنتج</label>
                <input
                  className={field}
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="مثال: منظّم أدراج المطبخ"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold">الجمهور المستهدف</label>
                <input
                  className={field}
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="مثال: ربات البيوت المهتمات بالتنظيم"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold">المشكلة التي يحلها</label>
                <input
                  className={field}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="مثال: فوضى الأدراج وضياع الوقت"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold">الفائدة الأساسية</label>
                <input
                  className={field}
                  value={benefit}
                  onChange={(e) => setBenefit(e.target.value)}
                  placeholder="مثال: ترتيب كامل خلال خمس دقائق"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold">العرض أو طريقة الطلب</label>
                <input
                  className={field}
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  placeholder="مثال: خصم 20% مع الشحن المجاني"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-bold">نبرة الكلام</label>
                  <select
                    className={field}
                    value={tone}
                    onChange={(e) => setTone(e.target.value as Tone)}
                  >
                    {["حماسي", "تعليمي", "ودّي", "جريء"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold">هدف المقطع</label>
                  <select
                    className={field}
                    value={goal}
                    onChange={(e) => setGoal(e.target.value as Goal)}
                  >
                    {["زيادة المشاهدات", "زيادة الطلبات", "بناء الثقة"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={generate}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
              >
                <Wand2 className="h-4 w-4" /> جرّب الآن — ولّد السكربت
              </button>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">السكربت الناتج</h2>
              {result && (
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "تم النسخ" : "نسخ السكربت"}
                </button>
              )}
            </div>

            {!result ? (
              <div className="mt-4 rounded-3xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
                املأ الحقول ثم اضغط «ولّد السكربت» ليظهر السكربت هنا.
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="text-sm font-black">خطافات بديلة للتجربة</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {result.hooks.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </div>
                {result.sections.map((s) => (
                  <div key={s.t} className="rounded-3xl border border-border bg-card p-6">
                    <span className="text-xs font-black text-primary">{s.t}</span>
                    <p className="mt-2 leading-loose">{s.b}</p>
                    <p className="mt-3 text-xs text-muted-foreground">💡 {s.note}</p>
                  </div>
                ))}
                <div className="rounded-3xl border border-border bg-secondary/60 p-6">
                  <h3 className="text-sm font-black">وصف المنشور المقترح</h3>
                  <pre className="mt-3 font-sans text-sm leading-loose whitespace-pre-wrap text-muted-foreground">
                    {result.caption}
                  </pre>
                </div>
              </div>
            )}
          </section>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-black">كيف تستخدم مولّد السكربتات؟</h2>
          <p className="mt-3 leading-loose text-muted-foreground">
            الأداة مبنية على هيكل السكربت الذي يحقق أفضل نسبة مشاهدة كاملة في مقاطع المنتجات:
            خطاف في أول ثانيتين، ثم عرض المشكلة بلغة العميل، ثم إظهار الحل بصريًا، ثم معالجة أهم
            اعتراض، وأخيرًا دعوة واحدة واضحة لاتخاذ الإجراء. كلما كانت مدخلاتك محددة، كان السكربت
            أدق وأقرب للهجتك.
          </p>
          <h3 className="mt-6 text-lg font-black">نصائح لنتيجة أفضل</h3>
          <ul className="mt-3 list-disc space-y-2 ps-5 leading-loose text-muted-foreground">
            <li>اكتب المشكلة كما ينطقها عميلك في الرسائل، لا كما تكتبها في الإعلانات.</li>
            <li>ولّد ثلاث نسخ بنبرات مختلفة وصوّرها كلها لاختبار أيها ينجح.</li>
            <li>لا تتجاوز 30 ثانية إلا إذا كان المحتوى يستحق فعلًا.</li>
          </ul>
          <h3 className="mt-6 text-lg font-black">مقالات مرتبطة</h3>
          <ul className="mt-3 space-y-2 text-sm font-bold">
            <li>
              <Link to="/blog/$slug" params={{ slug: "tiktok-marketing-guide" }} className="text-primary">
                دليل التسويق على تيك توك للمتاجر الإلكترونية
              </Link>
            </li>
            <li>
              <Link to="/blog/$slug" params={{ slug: "tiktok-algorithm-explained" }} className="text-primary">
                شرح خوارزمية تيك توك وطرق زيادة المشاهدات
              </Link>
            </li>
            <li>
              <Link to="/tools/tiktok-content-planner" className="text-primary">
                جهّز خطة محتوى شهرية لسكربتاتك
              </Link>
            </li>
          </ul>
        </section>
      </Container>
    </>
  );
}
