// Shown automatically by Next.js while a route segment (and any async
// data it needs, like Firestore fetches) is loading — replaces the blank
// white flash that would otherwise happen during navigation.
export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
    </div>
  );
}
