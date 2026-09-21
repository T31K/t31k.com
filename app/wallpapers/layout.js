const title = "Wallpapers — T31K";
const description =
  "A curated collection of wallpapers I've fallen for on X, grouped by post.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/wallpapers-og.jpg", width: 1731, height: 909 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/wallpapers-og.jpg"],
  },
};

export default function WallpapersLayout({ children }) {
  return children;
}
