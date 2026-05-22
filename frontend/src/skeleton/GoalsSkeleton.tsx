import { Skeleton } from "../../components/ui/skeleton";

const GoalsPageSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* HERO SKELETON */}
      <div className="rounded-[36px] border border-[#1F2937] bg-[#111827] p-6 sm:p-8 md:p-10">
        <div className="space-y-10">
          <div className="space-y-5 max-w-2xl">
            <Skeleton className="h-8 w-40 rounded-full bg-[#1F2937]" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-[80%] bg-[#1F2937]" />
              <Skeleton className="h-12 w-[60%] bg-[#1F2937]" />
            </div>
            <Skeleton className="h-4 w-[90%] bg-[#1F2937]" />
          </div>

          <div className="flex justify-between flex-wrap gap-4">
            <Skeleton className="h-[72px] w-[290px] rounded-3xl bg-[#1F2937]" />
            <Skeleton className="h-[60px] w-[160px] rounded-2xl bg-[#1F2937]" />
          </div>
        </div>
      </div>

      {/* STATS SKELETON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#111827] border border-[#1F2937] rounded-[30px] p-6 flex justify-between items-center"
          >
            <div className="space-y-4">
              <Skeleton className="h-4 w-24 bg-[#1F2937]" />
              <Skeleton className="h-10 w-20 bg-[#1F2937]" />
            </div>
            <Skeleton className="w-14 h-14 rounded-2xl bg-[#1F2937]" />
          </div>
        ))}
      </div>

      {/* GOALS GRID SKELETON */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[32px] border border-[#1F2937] bg-[#111827] p-6 space-y-4"
          >
            <Skeleton className="h-6 w-1/3 bg-[#1F2937]" />
            <Skeleton className="h-20 w-full bg-[#1F2937]" />
            <div className="flex justify-between pt-4">
              <Skeleton className="h-8 w-24 bg-[#1F2937]" />
              <Skeleton className="h-8 w-24 bg-[#1F2937]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsPageSkeleton;
