const DMG_URL =
  "https://github.com/T31K/RAN/releases/download/installer/RanOdyssey.dmg";
const GITHUB_URL = "https://github.com/T31K/RAN";

export const metadata = {
  title: "RAN Odyssey Online",
  description:
    "RAN Odyssey Online — the classic RAN school-warfare MMO, rebuilt to run natively on Mac. Download and play.",
  openGraph: {
    title: "RAN Odyssey Online",
    description:
      "The classic RAN school-warfare MMO, rebuilt to run on Mac. Download and play.",
    images: [{ url: "/ran-og.jpg", width: 1731, height: 909 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RAN Odyssey Online",
    description:
      "The classic RAN school-warfare MMO, rebuilt to run on Mac. Download and play.",
    images: ["/ran-og.jpg"],
  },
};

export default function RanPage() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden font-sans text-white">
      {/* full-bleed background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/ran-bg.jpg)" }}
        aria-hidden
      />
      {/* legibility gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85"
        aria-hidden
      />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-[max(3rem,env(safe-area-inset-bottom))] px-6 text-center">
        <div className="mb-8 flex flex-col items-center gap-5 sm:flex-row">
          <a
            href={DMG_URL}
            className="group inline-flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold tracking-wide text-white shadow-[0_8px_30px_rgba(220,38,38,0.45)] ring-1 ring-red-400/40 transition-all hover:bg-red-500 hover:shadow-[0_10px_40px_rgba(239,68,68,0.6)] active:scale-[0.98]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              aria-hidden
            >
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
            </svg>
            Download for Mac
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-4 text-base font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            View on GitHub
          </a>
        </div>

        <p className="max-w-md text-xs leading-relaxed text-white/60">
          macOS 13+ · Apple Silicon &amp; Intel · ~2&nbsp;GB download
          <br />
          First launch: if macOS hesitates, right-click the app &rarr;{" "}
          <span className="text-white/80">Open</span>.
        </p>
      </div>
    </main>
  );
}
