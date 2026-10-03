import { NotFoundPage } from '@/components/ui/not-found-page';

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-[#F8FAFC] py-16">
      <NotFoundPage
        homeHref="/"
        title="404"
        description="Oops! Page not found"
        helperText="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        backLabel="Back to Home"
      />
    </main>
  );
}
