import { Skeleton } from "../../components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* HERO */}
      <div className="relative overflow-hidden bg-[#111827] border border-[#1F2937] rounded-[32px] p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
          {/* LEFT */}
          <div className="max-w-3xl space-y-6 w-full">
            <Skeleton className="h-10 w-44 rounded-full bg-white/5" />

            <div className="space-y-3">
              <Skeleton className="h-14 w-[400px] max-w-full bg-white/10" />
              <Skeleton className="h-6 w-[500px] max-w-full bg-white/5" />
              <Skeleton className="h-6 w-[420px] max-w-full bg-white/5" />
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className="bg-[#0B0F14] border border-[#1F2937] rounded-2xl p-5 space-y-3">
                <Skeleton className="h-4 w-24 bg-white/5" />
                <Skeleton className="h-8 w-16 bg-white/10" />
              </div>

              <div className="bg-[#0B0F14] border border-[#1F2937] rounded-2xl p-5 space-y-3">
                <Skeleton className="h-4 w-20 bg-white/5" />
                <Skeleton className="h-8 w-28 bg-white/10" />
              </div>
            </div>
          </div>

          {/* AVATAR */}
          <Skeleton className="w-44 h-44 md:w-56 md:h-56 rounded-[36px] bg-white/5" />
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-[28px] border border-[#1F2937] bg-[#111827] p-6"
          >
            <div className="space-y-6">
              <Skeleton className="w-14 h-14 rounded-2xl bg-white/5" />

              <div className="space-y-3">
                <Skeleton className="h-4 w-24 bg-white/5" />
                <Skeleton className="h-10 w-28 bg-white/10" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* PERFORMANCE */}
        <div className="xl:col-span-2 bg-[#111827] border border-[#1F2937] rounded-[32px] p-6 md:p-8">
          <div className="flex justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-8 w-72 bg-white/10" />
              <Skeleton className="h-4 w-48 bg-white/5" />
            </div>

            <Skeleton className="h-10 w-20 rounded-full bg-white/5" />
          </div>

          <div className="mt-10 space-y-3">
            <Skeleton className="h-5 w-full rounded-full bg-white/5" />

            <div className="flex justify-between">
              <Skeleton className="h-3 w-12 bg-white/5" />
              <Skeleton className="h-3 w-16 bg-white/5" />
            </div>
          </div>
        </div>

        {/* MOTIVATION CARD */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-[32px] p-6">
          <div className="space-y-8">
            <Skeleton className="w-16 h-16 rounded-3xl bg-white/5" />

            <div className="space-y-3">
              <Skeleton className="h-8 w-full bg-white/10" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-5/6 bg-white/5" />
            </div>

            <div className="border border-[#1F2937] rounded-2xl p-5 space-y-3">
              <Skeleton className="h-4 w-24 bg-white/5" />
              <Skeleton className="h-6 w-40 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
