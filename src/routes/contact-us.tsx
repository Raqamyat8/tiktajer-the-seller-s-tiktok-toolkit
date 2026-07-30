import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { Container, PageHero } from "../components/layout-bits";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "اتصل بنا | تيك تاجر" },
      {
        name: "description",
        content:
          "تواصل مع فريق تيك تاجر لاقتراح أداة جديدة، الإبلاغ عن مشكلة، أو الاستفسار عن التعاون والشراكات في المحتوى العربي لتيك توك.",
      },
      { property: "og:title", content: "اتصل بنا | تيك تاجر" },
      { property: "og:description", content: "نرد على رسائلك خلال يوم عمل واحد إلى ثلاثة أيام." },
      { property: "og:url", content: "/contact-us" },
    ],
    links: [{ rel: "canonical", href: "/contact-us" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const field =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <>
      <PageHero
        eyebrow="الدعم"
        title="اتصل بنا"
        description="سواء كان لديك اقتراح لأداة جديدة أو ملاحظة على المحتوى أو طلب تعاون، يسعدنا أن نسمع منك."
      />
      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="text-lg font-black">أرسل رسالتك</h2>
            {sent ? (
              <p className="mt-5 rounded-2xl bg-accent/25 p-5 text-sm leading-loose">
                تم تجهيز رسالتك. لإتمام الإرسال، انسخ نص رسالتك وأرسلها إلى البريد الموضّح جانبًا
                وسنرد عليك في أقرب وقت.
              </p>
            ) : (
              <form
                className="mt-5 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div>
                  <label className="mb-2 block text-sm font-bold">الاسم</label>
                  <input className={field} required placeholder="اسمك الكريم" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold">البريد الإلكتروني</label>
                  <input className={field} type="email" required placeholder="name@example.com" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold">نوع الرسالة</label>
                  <select className={field}>
                    <option>استفسار عام</option>
                    <option>اقتراح أداة</option>
                    <option>الإبلاغ عن مشكلة</option>
                    <option>تعاون وشراكات</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold">الرسالة</label>
                  <textarea className={`${field} min-h-36`} required placeholder="اكتب تفاصيل رسالتك هنا..." />
                </div>
                <button className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground shadow-glow hover:opacity-90">
                  إرسال الرسالة
                </button>
              </form>
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-border bg-card p-6">
              <Mail className="h-5 w-5 text-primary" />
              <h2 className="mt-3 text-sm font-black">البريد الإلكتروني</h2>
              <p className="mt-1 text-sm text-muted-foreground">support@tiktajer.com</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h2 className="mt-3 text-sm font-black">التعاون والشراكات</h2>
              <p className="mt-1 text-sm text-muted-foreground">partners@tiktajer.com</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="mt-3 text-sm font-black">وقت الرد</h2>
              <p className="mt-1 text-sm leading-loose text-muted-foreground">
                من الأحد إلى الخميس، ونرد عادة خلال يوم إلى ثلاثة أيام عمل.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
