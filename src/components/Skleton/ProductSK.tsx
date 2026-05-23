import React from "react";

export default function ProductSK() {
  return (
    <div className="glass-card overflow-hidden animate-pulse">
      <div className="relative h-56 bg-muted" />

      <div className="p-5">
        <div className="h-6 w-3/4 rounded bg-muted mb-3" />

        <div className="space-y-2 mb-4">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
        </div>

        <div className="flex items-center justify-between">
          <div className="h-8 w-20 rounded bg-muted" />
          <div className="h-9 w-24 rounded-md bg-muted" />
        </div>
      </div>
    </div>
  );
}
