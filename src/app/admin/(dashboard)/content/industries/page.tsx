import AdminContentPage from '../page'

export default function IndustriesPage() {
  return <AdminContentPage searchParams={Promise.resolve({ tab: 'industries' })} />
}
