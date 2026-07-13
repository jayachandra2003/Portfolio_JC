// Skeleton matching the actual project card grid shape — shown while
// getProjects() fetches from Firestore, instead of a blank page.
export default function ProjectsLoading() {
  return (
    <section className="mx-auto max-w-4xl px-8 py-20 md:px-16">
      <div className="mb-10 h-10 w-48 animate-pulse rounded-lg bg-card" />
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-card" />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-xl bg-card" />
        ))}
      </div>
    </section>
  );
}
