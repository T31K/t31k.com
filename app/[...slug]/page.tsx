import { notFound } from "next/navigation"
import { Metadata } from "next"
import { allPages } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/")
  const page = allPages.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

const aboutFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are T31K and Timon Wong the same person?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. T31K is Timon Wong's online alias — the same person behind t31k.com, @t31kx on X, and t31k on GitHub.",
      },
    },
    {
      "@type": "Question",
      name: "Where is T31K from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Timon Wong was born in Kuala Lumpur, Malaysia, and grew up in Singapore, where he is based today and founded the Hackapura indie hacker community.",
      },
    },
    {
      "@type": "Question",
      name: "What does T31K do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "T31K is an indie hacker and solopreneur who runs a business with a portfolio of SaaS products, having built and shipped over 30 apps in the past 2 years, including one exit: Dreamchanted, a viral AI image generator acquired by Danny Postma. Alongside his products, he runs a software consultancy helping businesses with custom software, AI workflows, and SEO, and leads Hackapura, a weekly community of ~100 indie hackers in Singapore.",
      },
    },
    {
      "@type": "Question",
      name: "Has T31K had an exit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. One of his 30+ apps, Dreamchanted, a viral AI image generator, was acquired by Danny Postma.",
      },
    },
    {
      "@type": "Question",
      name: "How do I contact T31K?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The fastest way is X/Twitter: @t31kx.",
      },
    },
  ],
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      {page.slugAsParams === "about" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutFaqJsonLd) }}
        />
      )}
      <h1>{page.title}</h1>
      {page.description && <p className="text-xl">{page.description}</p>}
      <hr />
      <Mdx code={page.body.code} />
    </article>
  )
}
