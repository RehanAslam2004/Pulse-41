import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getBlogPostBySlug,
  getBlogPosts,
  getAllBlogPostSlugs,
} from '@/lib/supabase/queries'
import { BlogPostDetailPageClient } from '@/components/pages/BlogPostDetailPageClient'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Insight Not Found | Pulse41',
    }
  }

  return {
    title: `${post.title} | Pulse41 Insights`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Pulse41 Insights`,
      description: post.excerpt,
      type: 'article',
      url: `https://pulse41.com/insights/${post.slug}`,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Pulse41`,
      description: post.excerpt,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  }
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getBlogPosts()

  return (
    <BlogPostDetailPageClient
      post={post}
      allPosts={allPosts}
    />
  )
}
