import AdminContentPage from '../page'

export default function InsightsPage() {
  return <AdminContentPage searchParams={Promise.resolve({ tab: 'blog_posts' })} />
}
