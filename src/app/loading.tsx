import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Header Skeleton */}
      <div className="space-y-4 max-w-3xl">
        <Skeleton className="h-4 w-32 rounded-full bg-slate-200" />
        <Skeleton className="h-12 sm:h-16 w-3/4 rounded-xl bg-slate-200/90" />
        <Skeleton className="h-5 w-full max-w-xl rounded-md bg-slate-200/70" />
        <Skeleton className="h-5 w-4/5 max-w-lg rounded-md bg-slate-200/70" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-11 w-36 rounded-lg bg-slate-300" />
          <Skeleton className="h-11 w-32 rounded-lg bg-slate-200" />
        </div>
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <Skeleton className="h-44 w-full rounded-xl bg-slate-200" />
            <Skeleton className="h-4 w-24 rounded bg-slate-200" />
            <Skeleton className="h-6 w-3/4 rounded bg-slate-200" />
            <Skeleton className="h-4 w-full rounded bg-slate-200/60" />
            <Skeleton className="h-4 w-5/6 rounded bg-slate-200/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
