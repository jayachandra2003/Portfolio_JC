// Skeleton matching the certification card grid — shown while
// getCertifications() fetches from Firestore.
export default function CertificationsLoading() {
  return (
    <section className="mx-auto max-w-3xl px-8 py-20 md:px-16">
      <div className="mb-10 h-10 w-64 animate-pulse rounded-lg bg-card" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl bg-card" />
        ))}
      </div>
    </section>
  );
}
