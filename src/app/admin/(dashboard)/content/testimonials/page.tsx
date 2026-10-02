import AdminContentPage from '../page'

export default function TestimonialsPage() {
  return <AdminContentPage searchParams={Promise.resolve({ tab: 'testimonials' })} />
}
