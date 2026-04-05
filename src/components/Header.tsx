import Link from "next/link";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          tile<span className="text-accent">text</span>
        </Link>
        <ul className="hidden sm:flex gap-8">
          <li>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link
              href="/#signup"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
