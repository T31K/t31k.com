import Parser from 'rss-parser';

const MEDIUM_FEED_URL = 'https://medium.com/feed/@t31k';

// Function to fetch articles from Medium RSS feed
async function fetchArticles() {
  const parser = new Parser();
  const feed = await parser.parseURL(MEDIUM_FEED_URL);

  return feed.items.map((item) => ({
    slug: item.link.split('/').pop(), // Extract slug from Medium link
    url: item.link, // Medium article URL
  }));
}

// Dynamic metadata generation
export async function generateStaticParams() {
  const articles = await fetchArticles();

  return articles.map((article) => ({
    slug: [article.slug], // Match the URL params
  }));
}

// Dynamic Page Component
export default function BlogRedirectPage({ params }) {
  const slug = params.slug.join('/'); // Combine slug array into a string
  const mediumURL = `https://medium.com/@yourusername/${slug}`;

  return (
    <div>
      <h1>Redirecting...</h1>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.location.href = "${mediumURL}";
        `,
        }}
      />
    </div>
  );
}
