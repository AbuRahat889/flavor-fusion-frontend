export const OverviewSk = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="h-4 w-72 bg-muted rounded" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/50 bg-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="w-9 h-9 rounded-full bg-muted" />
            </div>

            <div className="h-8 w-20 bg-muted rounded mb-2" />

            <div className="flex gap-2">
              <div className="h-3 w-12 bg-muted rounded" />
              <div className="h-3 w-16 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-xl border border-border/50 bg-card p-5 space-y-3">
          <div className="h-5 w-40 bg-muted rounded mb-4" />

          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
            >
              <div className="space-y-2">
                <div className="h-4 w-28 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded" />
              </div>

              <div className="text-right space-y-2">
                <div className="h-4 w-12 bg-muted rounded ml-auto" />
                <div className="h-3 w-14 bg-muted rounded ml-auto" />
              </div>
            </div>
          ))}
        </div>

        {/* Category Breakdown */}
        <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
          <div className="h-5 w-44 bg-muted rounded" />

          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-4 w-10 bg-muted rounded" />
              </div>
              <div className="h-2 w-full bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
