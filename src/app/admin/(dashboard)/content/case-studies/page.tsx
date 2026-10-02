import AdminContentPage from '../page'

export default function CaseStudiesPage() {
  return <AdminContentPage searchParams={Promise.resolve({ tab: 'case_studies' })} />
}
