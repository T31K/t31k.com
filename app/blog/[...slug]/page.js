import Parser from 'rss-parser';

const MEDIUM_FEED_URL = 'https://medium.com/feed/@t31k';

// Function to fetch articles from Medium RSS feed
async function fetchArticles() {
  const parser = new Parser();
  const feed = await parser.parseURL(MEDIUM_FEED_URL);

  return feed.items.map((item) => {
    const slugParts = item.link.split('/').pop().split('-').slice(0, 2); // Extract slug from Medium link and limit to max 2 words
    return {
      slug: slugParts.join('-'), // Rejoin the first two words for the slug
      url: item.link, // Medium article URL
    };
  });
}

// Dynamic metadata generation
export async function generateStaticParams() {
  const articles = await fetchArticles();

  return articles.map((article) => ({
    params: { slug: article.slug.split('-') }, // Match the URL params, splitting slug back into array
  }));
}

// Dynamic Page Component
export default function BlogRedirectPage({ params }) {
  const slug = params.slug.join('-'); // Combine slug array into a string with hyphens
  const mediumURL = `https://medium.com/@t31k/${params.url}`;

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
