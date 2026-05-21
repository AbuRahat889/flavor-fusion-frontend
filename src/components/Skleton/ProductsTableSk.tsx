import { Table, TableBody, TableCell, TableRow } from "../ui/table";

export const ProductsTableSk = () => {
  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <Table>
          {/* <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden lg:table-cell">
                Description
              </TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden sm:table-cell">Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader> */}

          <TableBody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                {/* Image */}
                <TableCell>
                  <div className="w-12 h-12 rounded-lg bg-muted" />
                </TableCell>

                {/* Name */}
                <TableCell>
                  <div className="h-4 w-32 rounded bg-muted" />
                </TableCell>

                {/* Category */}
                <TableCell className="hidden md:table-cell">
                  <div className="h-6 w-20 rounded-full bg-muted" />
                </TableCell>

                {/* Description */}
                <TableCell className="hidden lg:table-cell">
                  <div className="h-4 w-52 rounded bg-muted" />
                </TableCell>

                {/* Price */}
                <TableCell>
                  <div className="h-4 w-16 rounded bg-muted" />
                </TableCell>

                {/* Rating */}
                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-muted" />
                    <div className="h-4 w-8 rounded bg-muted" />
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <div className="w-8 h-8 rounded bg-muted" />
                    <div className="w-8 h-8 rounded bg-muted" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
