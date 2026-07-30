import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 surface-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-display text-2xl font-black">تيك تاجر</div>
          <p className="mt-3 text-sm leading-loose opacity-70">
            أدوات ومحتوى عربي يساعد أصحاب المتاجر الإلكترونية على النمو عبر تيك توك.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-black opacity-90">الأدوات</h2>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <Link to="/tools/tiktok-script-generator">مولّد سكربتات تيك توك</Link>
            </li>
            <li>
              <Link to="/tools/tiktok-content-planner">خطة محتوى 30 يوم</Link>
            </li>
            <li>
              <Link to="/tools/image-optimizer">تحسين صور المنتجات</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-black opacity-90">المدونة</h2>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <Link to="/blog">كل المقالات</Link>
            </li>
            <li>
              <Link to="/blog/$slug" params={{ slug: "tiktok-marketing-guide" }}>
                دليل التسويق على تيك توك
              </Link>
            </li>
            <li>
              <Link to="/blog/$slug" params={{ slug: "product-image-optimization" }}>
                تحسين صور المنتجات
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-black opacity-90">روابط مهمة</h2>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <Link to="/privacy-policy">سياسة الخصوصية</Link>
            </li>
            <li>
              <Link to="/terms-of-service">شروط الاستخدام</Link>
            </li>
            <li>
              <Link to="/contact-us">اتصل بنا</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} تيك تاجر — جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
