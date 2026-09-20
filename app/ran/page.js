const DMG_URL =
  "https://github.com/T31K/RAN/releases/download/installer/RanOdyssey.dmg";

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

const css = `
.ran-page{
  position:fixed; inset:0; z-index:50; overflow:hidden;
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  display:flex; align-items:center; justify-content:center;
}
.ran-bg{
  position:absolute; inset:0;
  background-image:url(/ran-bg.jpg);
  background-size:cover; background-position:center;
}
.ran-scrim{
  position:absolute; inset:0;
  background:linear-gradient(to bottom, rgba(0,0,0,.15), rgba(0,0,0,0) 35%, rgba(0,0,0,.55));
}
.ran-content{
  position:relative; z-index:10; display:flex; flex-direction:column;
  align-items:center; gap:20px; padding:0 24px; text-align:center;
}
.dl-btn{
  appearance:button; position:relative; z-index:0;
  background-color:#ffffff; color:#0a0a0a;
  border:solid transparent; border-radius:18px; border-width:0 0 6px;
  box-sizing:border-box; cursor:pointer;
  display:inline-flex; align-items:center; gap:14px;
  font-family:inherit; font-size:26px; font-weight:800; letter-spacing:.6px;
  line-height:28px; padding:24px 52px; text-align:center; text-transform:uppercase;
  transform:translateZ(0); transition:filter .15s; user-select:none;
  text-decoration:none; white-space:nowrap;
}
.dl-btn:after{
  content:""; position:absolute; inset:0 0 -6px 0; z-index:-1;
  background-color:#c7ccd3; border-radius:18px;
}
.dl-btn:hover{ filter:brightness(1.04); }
.dl-btn:active{ border-width:6px 0 0; background:none; }
.ran-note{ max-width:26rem; font-size:13px; line-height:1.6; color:rgba(255,255,255,.7); }
.ran-note b{ color:rgba(255,255,255,.9); font-weight:600; }
@media (max-width:480px){
  .dl-btn{ font-size:20px; padding:20px 36px; }
}
`;

export default function RanPage() {
  return (
    <main className="ran-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="ran-bg" aria-hidden />
      <div className="ran-scrim" aria-hidden />
      <div className="ran-content">
        <a href={DMG_URL} className="dl-btn">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
            <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
          </svg>
          Download for Mac
        </a>
        <p className="ran-note">
          macOS 13+ · Apple Silicon &amp; Intel · ~2&nbsp;GB
          <br />
          First launch: if macOS hesitates, right-click the app &rarr; <b>Open</b>.
        </p>
      </div>
    </main>
  );
}
