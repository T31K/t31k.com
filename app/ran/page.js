const DMG_URL = 'https://github.com/T31K/RAN/releases/download/installer/RanOdyssey.dmg';

export const metadata = {
  title: 'RAN Odyssey Online',
  description:
    'RAN Odyssey Online — the classic RAN school-warfare MMO, rebuilt to run natively on Mac. Download and play.',
  openGraph: {
    title: 'RAN Odyssey Online',
    description: 'The classic RAN school-warfare MMO, rebuilt to run on Mac. Download and play.',
    images: [{ url: '/ran-og.jpg', width: 1731, height: 909 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAN Odyssey Online',
    description: 'The classic RAN school-warfare MMO, rebuilt to run on Mac. Download and play.',
    images: ['/ran-og.jpg'],
  },
};

const css = `
.ran-page{
  position:fixed; inset:0; z-index:50; overflow:hidden;
  font-family:Tahoma,Dotum,Verdana,Geneva,sans-serif; font-size:12px; color:#fff;
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
  align-items:center; gap:12px; padding:0 16px; text-align:center;
}
.ran-logo{ width:min(440px,80vw); height:auto; filter:drop-shadow(0 8px 24px rgba(0,0,0,.45)); }
.ran-win{ width:min(340px,92vw); text-align:left; }
.ran-title{
  height:18px; line-height:18px; padding:0 20px 0 4px;
  border-style:solid; border-width:0 24px 0 7px;
  border-image:url(/ran-ui/title.png) 0 24 0 7 fill stretch;
  font-weight:bold; text-shadow:1px 1px 0 #000;
}
.ran-body{
  display:flex; flex-direction:column; align-items:center; gap:12px; padding:16px 14px 14px;
  background:rgba(0,0,0,.6); border:2px solid #000; border-top-width:1px;
}
.ran-btn{
  display:flex; align-items:center; justify-content:center; gap:8px;
  border-style:solid; border-image:url(/ran-ui/btn.png) 0 7 fill stretch;
  image-rendering:pixelated; color:#fff; text-decoration:none; white-space:nowrap;
  font-weight:bold; text-shadow:1px 1px 0 #000; user-select:none; cursor:pointer;
}
.ran-btn:hover{ border-image-source:url(/ran-ui/btn-on.png); color:#ffd84a; }
.ran-btn:active{ transform:translateY(1px); }
.ran-dl{ width:100%; height:36px; border-width:0 14px; font-size:15px; letter-spacing:.3px; }
.ran-dl svg{ margin-top:-2px; }
.ran-small{ height:18px; border-width:0 7px; padding:0 10px; font-size:11px; }
.ran-note{ margin:0; font-size:11px; line-height:1.7; color:#ccc; text-align:center; }
.ran-note b{ color:#ffd84a; }
`;

export default function RanPage() {
  return (
    <main className="ran-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className="ran-bg"
        aria-hidden
      />
      <div
        className="ran-scrim"
        aria-hidden
      />
      <div className="ran-content">
        <img
          src="/ran-logo.png"
          alt="RAN Odyssey Online"
          className="ran-logo"
        />
        <div className="ran-win">
          <div className="ran-title">RAN Odyssey Online</div>
          <div className="ran-body">
            <a
              href={DMG_URL}
              className="ran-btn ran-dl"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden
              >
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
              </svg>
              Download for Mac
            </a>
            <p className="ran-note">
              macOS 13+ · Apple Silicon &amp; Intel · ~2&nbsp;GB
              <br />
              First launch: if macOS hesitates, right-click the app &rarr; <b>Open</b>.
            </p>
            <a
              href="/ran/items"
              className="ran-btn ran-small"
            >
              Item codes
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
