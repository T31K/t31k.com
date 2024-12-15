import Parser from 'rss-parser';
import Link from 'next/link';

const MEDIUM_FEED_URL = 'https://medium.com/feed/@t31k';

async function fetchArticles() {
  const parser = new Parser();
  const feed = await parser.parseURL(MEDIUM_FEED_URL);
  console.log(feed.items.length);
  return feed.items.map((item) => {
    const slugParts = item.link.split('/').pop().split('-').slice(0, 2); // Extract slug from Medium link and limit to max 2 words
    return {
      title: item.title,
      slug: slugParts.join('-'), // Rejoin the first two words for the slug
      url: item.link, // Medium article URL
    };
  });
}

export default async function BlogPage() {
  const articles = await fetchArticles();

  return (
    <main>
      <h1>My Medium Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/blog/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
