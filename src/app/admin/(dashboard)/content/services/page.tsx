import AdminContentPage from '../page'

export default function ServicesPage() {
  return <AdminContentPage searchParams={Promise.resolve({ tab: 'services' })} />
}
