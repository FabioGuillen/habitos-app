import { Skeleton } from "../../components/ui/skeleton";

const HabitsSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[36px] border border-[#1F2937] bg-[#111827] p-6 sm:p-8 md:p-10">
        <div className="space-y-10">
          {/* Texto */}
          <div className="space-y-5 max-w-2xl">
            <Skeleton className="h-8 w-36 rounded-full bg-[#1F2937]" />

            <div className="space-y-3">
              <Skeleton className="h-12 w-[80%] bg-[#1F2937]" />
              <Skeleton className="h-12 w-[60%] bg-[#1F2937]" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-[#1F2937]" />
              <Skeleton className="h-4 w-[80%] bg-[#1F2937]" />
            </div>
          </div>

          {/* Selector + botón */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Skeleton className="h-[88px] w-[280px] rounded-3xl bg-[#1F2937]" />

            <Skeleton className="h-[56px] w-[200px] rounded-2xl bg-[#1F2937]" />
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3">
        <Skeleton className="h-11 w-40 rounded-xl bg-[#1F2937]" />
        <Skeleton className="h-11 w-40 rounded-xl bg-[#1F2937]" />
      </div>

      {/* HABITS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[32px] border border-[#1F2937] bg-[#111827] p-6"
          >
            {/* Header */}
            <div className="flex justify-between">
              <div className="space-y-4">
                <Skeleton className="h-8 w-40 bg-[#1F2937]" />

                <div className="flex gap-3">
                  <Skeleton className="h-10 w-20 rounded-2xl bg-[#1F2937]" />
                  <Skeleton className="h-10 w-24 rounded-2xl bg-[#1F2937]" />
                </div>
              </div>

              <Skeleton className="h-11 w-32 rounded-2xl bg-[#1F2937]" />
            </div>

            {/* Progress */}
            <div className="mt-8 space-y-3">
              <Skeleton className="h-4 w-full bg-[#1F2937]" />
              <Skeleton className="h-3 w-full rounded-full bg-[#1F2937]" />
            </div>

            {/* Heatmap */}
            <div className="mt-8 grid grid-cols-7 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {Array.from({ length: 30 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-square rounded-xl bg-[#1F2937]"
                />
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-between items-center">
              <Skeleton className="h-5 w-40 bg-[#1F2937]" />

              <div className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-2xl bg-[#1F2937]" />
                <Skeleton className="h-10 w-10 rounded-2xl bg-[#1F2937]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitsSkeleton;
