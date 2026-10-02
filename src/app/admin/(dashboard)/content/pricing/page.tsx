import AdminContentPage from '../page'

export default function PricingPage() {
  return <AdminContentPage searchParams={Promise.resolve({ tab: 'solutions' })} />
}
