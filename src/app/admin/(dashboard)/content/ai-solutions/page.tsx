import AdminContentPage from '../page'

export default function AISolutionsPage() {
  return <AdminContentPage searchParams={Promise.resolve({ tab: 'services' })} />
}
