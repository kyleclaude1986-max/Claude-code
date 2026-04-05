import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ThankYou() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 bg-gray-100">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
            &#10003;
          </div>
          <h1 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-1px] mb-4 text-gray-900">
            You&apos;re all set!
          </h1>
          <p className="text-[17px] text-gray-600 leading-relaxed mb-8">
            Welcome to Tile Text. You&apos;ll receive your first tile pick on
            the next scheduled day — Monday, Wednesday, or Friday at 11 AM.
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
