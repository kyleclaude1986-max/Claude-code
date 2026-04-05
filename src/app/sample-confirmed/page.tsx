import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SampleConfirmed() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
            &#128230;
          </div>
          <h1 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-1px] mb-4 text-gray-900">
            Sample on its way!
          </h1>
          <p className="text-[17px] text-gray-600 leading-relaxed mb-8">
            We&apos;ve received your request. Your free tile sample will be
            shipped within 5-7 business days.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-[15px] font-semibold rounded-full hover:bg-gray-800 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
