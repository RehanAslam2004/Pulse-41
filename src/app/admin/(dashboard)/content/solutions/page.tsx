import AdminContentPage from '../page'

export default function SolutionsPage() {
  return <AdminContentPage searchParams={Promise.resolve({ tab: 'solutions' })} />
}
