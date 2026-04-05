import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignupForm from "@/components/SignupForm";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 text-center bg-gradient-to-b from-gray-100 to-white">
        <div className="inline-block px-4 py-1.5 bg-white border border-gray-200 rounded-full text-[13px] font-medium text-gray-600 mb-6">
          Free tile inspiration, delivered to your phone
        </div>
        <h1 className="text-[clamp(40px,7vw,72px)] font-bold tracking-[-2px] leading-[1.05] text-gray-900 mb-5">
          Discover beautiful tiles.
          <br />
          <span className="bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
            Every week.
          </span>
        </h1>
        <p className="text-[clamp(17px,2.5vw,21px)] text-gray-600 max-w-[580px] mx-auto mb-12 leading-relaxed">
          Get curated tile picks sent straight to your phone every Monday,
          Wednesday, and Friday. Love one? Request a free sample with one tap.
        </p>
        <a
          href="#signup"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-[17px] font-semibold rounded-full hover:bg-accent-hover transition-all hover:scale-[1.02]"
        >
          Get Started
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-24 px-6 max-w-[1200px] mx-auto"
      >
        <p className="text-sm font-semibold text-accent uppercase tracking-wider text-center mb-3">
          How It Works
        </p>
        <h2 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-1.5px] text-center mb-16 text-gray-900">
          Three simple steps.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              num: "1",
              title: "Sign Up",
              desc: "Enter your info below to join our text list. It takes 30 seconds.",
            },
            {
              num: "2",
              title: "Get Inspired",
              desc: "Receive a stunning tile pick via text three times a week, complete with a photo and description.",
            },
            {
              num: "3",
              title: "Request a Sample",
              desc: "Love a tile? Tap the link in your text to request a free sample shipped to your door.",
            },
          ].map((step) => (
            <div key={step.num} className="text-center px-6 py-10">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl font-bold text-accent mx-auto mb-6">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SMS Preview */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Phone mockup */}
          <div className="w-[300px] mx-auto bg-gray-100 rounded-[36px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
            <div className="bg-white rounded-3xl px-4 py-6 min-h-[500px]">
              <p className="text-[11px] text-gray-400 text-center mb-2">
                Today 11:00 AM
              </p>
              <p className="text-[13px] font-semibold text-gray-600 mb-1">
                Tile Text
              </p>
              <div className="bg-gray-100 rounded-[18px] rounded-bl-sm p-3 max-w-[240px] mt-4">
                <div className="w-full h-40 rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 mb-2 flex items-center justify-center">
                  <span className="text-5xl opacity-50">&#9638;</span>
                </div>
                <p className="text-sm text-gray-900 leading-snug">
                  <strong>Sahara Matte Porcelain</strong>
                  <br />A warm, earthy porcelain tile with a smooth matte
                  finish. Perfect for kitchens and bathrooms.
                </p>
                <p className="text-sm text-accent mt-2 underline">
                  Want a free sample? Tap here
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-first md:order-last">
            <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-1px] mb-5 leading-tight">
              Beautiful tiles,
              <br />
              right in your texts.
            </h2>
            <p className="text-[17px] text-gray-600 leading-relaxed mb-4">
              Every Monday, Wednesday, and Friday at 11 AM, you&apos;ll receive
              a hand-picked tile recommendation with a gorgeous photo and quick
              description.
            </p>
            <p className="text-[17px] text-gray-600 leading-relaxed mb-8">
              No spam. No sales pitches. Just beautiful tiles you&apos;ll
              actually want in your home.
            </p>
            <ul className="space-y-4">
              {[
                "Curated tile picks 3x per week",
                "High-quality tile photos",
                "One-tap free sample requests",
                "Unsubscribe anytime",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-gray-600">
                  <span className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center text-green-500 text-sm shrink-0">
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className="py-24 px-6 bg-gray-100">
        <div className="max-w-[560px] mx-auto">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider text-center mb-3">
            Join the List
          </p>
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-1.5px] text-center mb-12 text-gray-900">
            Start getting tile picks.
          </h2>
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_40px_rgba(0,0,0,0.04)]">
            <SignupForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
