import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ImageDown, Upload } from "lucide-react";
import { Container, PageHero } from "../components/layout-bits";

export const Route = createFileRoute("/tools/image-optimizer")({
  head: () => ({
    meta: [
      { title: "أداة تحسين صور المنتجات وإزالة الخلفية مجانًا | تيك تاجر" },
      {
        name: "description",
        content:
          "أداة مجانية لإزالة خلفية صور المنتجات وضغط حجمها داخل المتصفح مباشرة، لتسريع متجرك ورفع جودة صورك في تيك توك.",
      },
      { name: "keywords", content: "تحسين صور المنتجات" },
      { property: "og:title", content: "تحسين صور المنتجات وإزالة الخلفية | تيك تاجر" },
      {
        property: "og:description",
        content: "نظّف خلفية صور منتجاتك واضغطها بدون رفعها لأي خادم.",
      },
      { property: "og:url", content: "/tools/image-optimizer" },
    ],
    links: [{ rel: "canonical", href: "/tools/image-optimizer" }],
  }),
  component: Optimizer;
});

function ImageOptimizerPage() {
  return null;
}

function Optimizer() {
  const [src, setSrc] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [origSize, setOrigSize] = useState(0);
  const [outSize, setOutSize] = useState(0);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1200);
  const [removeBg, setRemoveBg] = useState(true);
  const [tolerance, setTolerance] = useState(40);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = (file: File) => {
    setOrigSize(file.size);
    setOut(null);
    const reader = new FileReader();
    reader.onload = () => setSrc(String(reader.result));
    reader.readAsDataURL(file);
  };

  const process = async () => {
    if (!src) return;
    setBusy(true);
    const img = new Image();
    img.src = src;
    await img.decode();
    const scale = Math.min(1, maxWidth / img.width);
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, w, h);

    if (removeBg) {
      const data = ctx.getImageData(0, 0, w, h);
      const d = data.data;
      const corner = [d[0], d[1], d[2]];
      const tol = tolerance * 2.55 * 1.6;
      for (let i = 0; i < d.length; i += 4) {
        const dist = Math.sqrt(
          (d[i] - corner[0]) ** 2 + (d[i + 1] - corner[1]) ** 2 + (d[i + 2] - corner[2]) ** 2,
        );
        if (dist < tol) d[i + 3] = 0;
      }
      ctx.putImageData(data, 0, 0);
    }

    const type = removeBg ? "image/png" : "image/webp";
    const url = canvas.toDataURL(type, quality / 100);
    setOut(url);
    setOutSize(Math.round((url.length - url.indexOf(",") - 1) * 0.75));
    setBusy(false);
  };

  const kb = (n: number) => `${Math.max(1, Math.round(n / 1024))} KB`;

  return (
    <>
      <PageHero
        eyebrow="أداة مجانية"
        title="تحسين صور المنتجات وإزالة الخلفية"
        description="ارفع صورة منتجك لتحصل على نسخة نظيفة الخلفية ومضغوطة جاهزة لمتجرك ولمقاطع تيك توك. المعالجة تتم داخل متصفحك بالكامل ولا تُرفع صورك لأي خادم."
      />

      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
          <section className="h-fit rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-black">الإعدادات</h2>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
            />
            <button
              onClick={() => inputRef.current?.click()}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-8 text-sm font-bold text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Upload className="h-4 w-4" /> اختر صورة المنتج
            </button>

            <div className="mt-5 space-y-5">
              <label className="flex items-center justify-between text-sm font-bold">
                إزالة الخلفية الموحدة
                <input
                  type="checkbox"
                  checked={removeBg}
                  onChange={(e) => setRemoveBg(e.target.checked)}
                  className="h-4 w-4 accent-[var(--primary)]"
                />
              </label>
              {removeBg && (
                <div>
                  <label className="mb-2 block text-sm font-bold">حساسية إزالة الخلفية: {tolerance}%</label>
                  <input
                    type="range"
                    min={5}
                    max={90}
                    value={tolerance}
                    onChange={(e) => setTolerance(Number(e.target.value))}
                    className="w-full accent-[var(--primary)]"
                  />
                </div>
              )}
              <div>
                <label className="mb-2 block text-sm font-bold">جودة الضغط: {quality}%</label>
                <input
                  type="range"
                  min={40}
                  max={95}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-[var(--primary)]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold">أقصى عرض: {maxWidth}px</label>
                <input
                  type="range"
                  min={400}
                  max={2000}
                  step={100}
                  value={maxWidth}
                  onChange={(e) => setMaxWidth(Number(e.target.value))}
                  className="w-full accent-[var(--primary)]"
                />
              </div>
              <button
                disabled={!src || busy}
                onClick={process}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground shadow-glow disabled:opacity-40"
              >
                <ImageDown className="h-4 w-4" /> {busy ? "جارٍ المعالجة..." : "جرّب الآن — حسّن الصورة"}
              </button>
            </div>
          </section>

          <section className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-5">
              <h2 className="text-sm font-black">الصورة الأصلية</h2>
              <div className="mt-3 grid h-64 place-items-center overflow-hidden rounded-2xl bg-secondary">
                {src ? (
                  <img src={src} alt="صورة المنتج الأصلية" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-xs text-muted-foreground">لم تُختر صورة بعد</span>
                )}
              </div>
              {!!origSize && <p className="mt-3 text-xs text-muted-foreground">الحجم: {kb(origSize)}</p>}
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <h2 className="text-sm font-black">النتيجة</h2>
              <div
                className="mt-3 grid h-64 place-items-center overflow-hidden rounded-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg,#e5e7eb 25%,transparent 25%),linear-gradient(-45deg,#e5e7eb 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e5e7eb 75%),linear-gradient(-45deg,transparent 75%,#e5e7eb 75%)",
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0,0 8px,8px -8px,-8px 0",
                }}
              >
                {out ? (
                  <img src={out} alt="صورة المنتج بعد التحسين" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-xs text-muted-foreground">ستظهر الصورة المحسّنة هنا</span>
                )}
              </div>
              {out && (
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    الحجم الجديد: {kb(outSize)}{" "}
                    {origSize > 0 && `(-${Math.max(0, Math.round((1 - outSize / origSize) * 100))}%)`}
                  </span>
                  <a
                    href={out}
                    download={removeBg ? "product-optimized.png" : "product-optimized.webp"}
                    className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background"
                  >
                    تنزيل الصورة
                  </a>
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-black">كيف تعمل الأداة؟</h2>
          <p className="mt-3 leading-loose text-muted-foreground">
            تقوم الأداة بتصغير أبعاد الصورة إلى الحد الذي تحتاجه صفحات المتجر، ثم تزيل الخلفية
            الموحدة اعتمادًا على لون الزاوية ودرجة الحساسية التي تختارها، ثم تضغط الملف بجودة قابلة
            للتحكم. أفضل النتائج تكون مع الصور الملتقطة أمام خلفية بلون واحد (أبيض أو رمادي فاتح).
          </p>
          <h3 className="mt-6 text-lg font-black">مقالات مرتبطة</h3>
          <ul className="mt-3 space-y-2 text-sm font-bold">
            <li>
              <Link to="/blog/$slug" params={{ slug: "product-image-optimization" }} className="text-primary">
                دليل تحسين صور المنتجات
              </Link>
            </li>
            <li>
              <Link to="/blog/$slug" params={{ slug: "ecommerce-conversion-rate" }} className="text-primary">
                زيادة معدل التحويل في المتجر الإلكتروني
              </Link>
            </li>
          </ul>
        </section>
      </Container>
    </>
  );
}
