import { Skeleton } from "../../components/ui/skeleton";

const NotesPageSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="rounded-[36px] border border-[#1F2937] bg-[#111827] p-6 sm:p-8 md:p-10">
        <div className="space-y-10">
          {/* Text */}
          <div className="space-y-5 max-w-2xl">
            <Skeleton className="h-8 w-40 rounded-full bg-[#1F2937]" />

            <div className="space-y-3">
              <Skeleton className="h-12 w-[80%] bg-[#1F2937]" />
              <Skeleton className="h-12 w-[60%] bg-[#1F2937]" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-[#1F2937]" />
              <Skeleton className="h-4 w-[75%] bg-[#1F2937]" />
            </div>
          </div>

          {/* Month selector + button */}
          <div className="flex justify-between flex-wrap gap-4">
            <Skeleton className="h-[88px] w-[290px] rounded-3xl bg-[#1F2937]" />

            <Skeleton className="h-[56px] w-[180px] rounded-2xl bg-[#1F2937]" />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#111827] border border-[#1F2937] rounded-[30px] p-6"
          >
            <div className="flex justify-between">
              <div className="space-y-4">
                <Skeleton className="h-4 w-28 bg-[#1F2937]" />

                <Skeleton className="h-10 w-24 bg-[#1F2937]" />
              </div>

              <Skeleton className="w-14 h-14 rounded-2xl bg-[#1F2937]" />
            </div>
          </div>
        ))}
      </div>

      {/* NOTES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[32px] border border-[#1F2937] bg-[#111827] p-6"
          >
            {/* Header */}
            <div className="flex justify-between">
              <div className="flex gap-3">
                <Skeleton className="w-12 h-12 rounded-2xl bg-[#1F2937]" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-12 bg-[#1F2937]" />
                  <Skeleton className="h-8 w-10 bg-[#1F2937]" />
                </div>
              </div>

              <div className="flex gap-2">
                <Skeleton className="w-10 h-10 rounded-2xl bg-[#1F2937]" />
                <Skeleton className="w-10 h-10 rounded-2xl bg-[#1F2937]" />
              </div>
            </div>

            {/* Content */}
            <div className="mt-6 space-y-3">
              <Skeleton className="h-4 w-full bg-[#1F2937]" />
              <Skeleton className="h-4 w-full bg-[#1F2937]" />
              <Skeleton className="h-4 w-[80%] bg-[#1F2937]" />
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-between">
              <Skeleton className="h-4 w-32 bg-[#1F2937]" />
              <Skeleton className="h-4 w-16 bg-[#1F2937]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPageSkeleton;
